import re
import os
import requests
import flask
from flask import Flask, jsonify, request
import collage
from dotenv import load_dotenv
from datetime import datetime
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
# from collage.server.auth import auth
# from authlib.integrations.flask_client import OAuth
import io
from collage.server.recommend import recommend_classes
from collage.server.dalle import generate_image, format_prompt
from collage.server.nltk_utils import parse_resume
import pandas as pd

CORS(collage.app)
# Initialize JWTManager
collage.app.config['JWT_SECRET_KEY'] = os.getenv(
    'JWT_SECRET_KEY')  # Replace with your own secret key
collage.app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies', 'json']
jwt = JWTManager(collage.app)

load_dotenv()  # Load the environment variables from the .env file

GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_SECRET_KEY = os.environ['GOOGLE_SECRET_KEY']


def verify_user():
    """
        Ensures that the currently logged in user has completed their profile and has been added
        to the database. Should be called within any function that requires user information.
    """
    if flask.session['registered'] != True:
        return flask.jsonify(unregistered=True), 200


@collage.app.route('/api/', methods=['GET'])
def home():
    return flask.jsonify(working=True), 200


@collage.app.route('/api/login/', methods=['POST'])
def login():
    auth_code = flask.request.get_json()['code']
    if not flask.session.get('registered'):
        flask.session['registered'] = False
    data = {
        'code': auth_code,
        # client ID from the credential at google developer console
        'client_id': GOOGLE_CLIENT_ID,
        # client secret from the credential at google developer console
        'client_secret': GOOGLE_SECRET_KEY,
        'redirect_uri': 'postmessage',
        'grant_type': 'authorization_code'
    }

    response = requests.post(
        'https://oauth2.googleapis.com/token', data=data).json()
    headers = {
        'Authorization': f'Bearer {response["access_token"]}'
    }
    user_info = requests.get(
        'https://www.googleapis.com/oauth2/v3/userinfo', headers=headers).json()
    print(user_info)
    if 'hd' in user_info.keys():
        if user_info['hd'][-4:] == ".edu":
            """
                check here if user exists in database, if not, mark session user as unregistered, otherwise mark user as registered.
            """
            flask.session['current_user'] = user_info['email']
            flask.session['profile_img_url'] = user_info['picture']
            flask.session['registered'] = False
            connection = collage.model.get_db()
            with connection.cursor(dictionary=True) as cursor:
                user_query = """
                            SELECT *
                            FROM users
                            WHERE email = %s
                        """
                cursor.execute(user_query, (user_info['email'],))
                result = cursor.fetchone()
                if result is None:
                    flask.session['registered'] = False
                else:
                    flask.session['user_id'] = result['user_id']
                    flask.session['registered'] = True
            jwt_token = create_access_token(
                identity=user_info['email'])  # create jwt token
            # change the response to whatever is needed for other frontend operations
            response = flask.jsonify(
                status="success", user=user_info, registered=flask.session['registered'])
            response.set_cookie('access_token', value=jwt_token, secure=True)
            return response, 200
    else:
        print("login_failure")
        return flask.jsonify(status="failed"), 200


@collage.app.route('/api/signup/', methods=['POST'])
# @jwt_required()
def signup():
    """
        Users will be redirected here after a successful login if the login endpoint
        includes an 'unregistered' flag in the response.
    """
    data = flask.request.get_json()
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        insert_query = """
                    INSERT INTO users (email, full_name, start_year, graduation_year, enrollment_date,
                    credits_completed, major, profile_img_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
        print(flask.session['profile_img_url'])
        cursor.execute(insert_query, (flask.session['current_user'], data['full_name'], data['start_year'], data['graduation_year'],
                                      data['enrollment_date'], data['credits_completed'], data['major'], flask.session['profile_img_url']))
        flask.session['registered'] = True
        user_query = """
                            SELECT *
                            FROM users
                            WHERE email = %s
                        """
        cursor.execute(user_query, (flask.session['current_user'],))
        result = cursor.fetchone()
        flask.session['user_id'] = result['user_id']
    connection.commit()
    # also send back any other needed information later
    return flask.jsonify(registered=True), 200


@collage.app.route('/api/current-user/', methods=['GET'])
@jwt_required()
def current_user():
    print(flask.session['current_user'].split('@')[0])
    return flask.jsonify({'current_user': flask.session['current_user'].split('@')[0]}), 200

@collage.app.route('/api/current-user-id/', methods=['GET'])
@jwt_required()
def current_user_id():
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        query = """
            SELECT user_id
            FROM users
            WHERE email = %s
        """
        cursor.execute(query, (flask.session['current_user'],))
        result = cursor.fetchone()
    return flask.jsonify(result['user_id']), 200

@collage.app.route('/api/logout/', methods=['POST'])
# @jwt_required()
def logout():
    # verify_user()
    flask.session['registered'] = False
    flask.session['current_user'] = None
    flask.session['user_id'] = None
    jwt_token = flask.request.cookies.get('access_token') # Demonstration how to get the cookie
    # current_user = get_jwt_identity()
    return flask.jsonify(registered=False), 200


@collage.app.route('/api/filters/', methods=['GET'])
# @jwt_required()
def get_filters():
    # verify_user()
    connection = collage.model.get_db()  # open db
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""SELECT * FROM filters""")
        results = cursor.fetchall()
    response = []
    keys = {}
    counter = 0
    for result in results:
        if result['filter_cat'] not in keys:
            keys[result['filter_cat']] = counter
            counter += 1
            response.append({'category': result['filter_cat'], 'filters': []})
        response[keys[result['filter_cat']]]['filters'].append(result)
    for cat in response:
        cat['filters'] = sorted(
            cat['filters'], key=lambda x: x['filter_value'])
    return flask.jsonify(response), 200


@collage.app.route('/api/suggested-connections/<int:course_id>', methods=['GET'])
def get_suggested_connections(course_id):
    # upgrade this with better recommendations later
    connection = collage.model.get_db()
    mock_data = [
        {'id': 1, 'name': 'Charlie Zhang', 'major': 'Computer Science',
            'profileImage': 'https://hoopshype.com/wp-content/uploads/sites/92/2024/02/i_54_cf_2e_lebron-james.png?w=1000&h=600&crop=1'},
        {'id': 2, 'name': 'Daria Skalitzky', 'major': 'Cognitive Science',
            'profileImage': 'https://hoopshype.com/wp-content/uploads/sites/92/2024/02/i_54_cf_2e_lebron-james.png?w=1000&h=600&crop=1'},
        {'id': 3, 'name': 'Adam Meskouri', 'major': 'Political Science',
         'profileImage': 'https://hoopshype.com/wp-content/uploads/sites/92/2024/02/i_54_cf_2e_lebron-james.png?w=1000&h=600&crop=1'},
        {'id': 4, 'name': 'Max Green', 'major': 'Mechanical Engineering',
            'profileImage': 'https://hoopshype.com/wp-content/uploads/sites/92/2024/02/i_54_cf_2e_lebron-james.png?w=1000&h=600&crop=1'},
        {'id': 5, 'name': 'Alex Brown', 'major': 'Electrical Engineering',
         'profileImage': 'https://hoopshype.com/wp-content/uploads/sites/92/2024/02/i_54_cf_2e_lebron-james.png?w=1000&h=600&crop=1'},
        {'id': 6, 'name': 'Emily White', 'major': 'Biomedical Engineering',
            'profileImage': 'https://hoopshype.com/wp-content/uploads/sites/92/2024/02/i_54_cf_2e_lebron-james.png?w=1000&h=600&crop=1'}
    ]
    # with connection.cursor(dictionary=True) as cursor:
    #     search_query = """SELECT users.user_id AS id, users.full_name AS name, users.major, users.profile_img_url AS profileImage FROM users
    #                       LEFT ANTI JOIN connections ON users.user_id = connections.follower_id WHERE users.user_id != %s LIMIT 6"""  # select the first 6 people that the user has no connection with
    #     cursor.execute(search_query, (flask.session['user_id'],))
    return flask.jsonify(mock_data), 200


@collage.app.route('/api/individual-course/<int:course_id>', methods=['GET'])
def get_individual_course(course_id):
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        search_query = """SELECT course_id, course_code, credit_hours, course_name, class_topic, icon_url, total_rating, tag_1, tag_2, tag_3, tag_4, tag_5, num_ratings, open_status FROM courses WHERE course_id=%s"""
        cursor.execute(search_query, (course_id,))
        results = cursor.fetchall()[0]
        print(results)
        results['rating'] = 0
        if results['num_ratings'] != 0:
            results['rating'] = results['total_rating'] // results['num_ratings']
        results['percent_match'] = '96%'
        results['course_description'] = 'Temporary course description'
        results['department'] = 'LSA'
        results['open_status'] = 'Open'
        saved_query = """SELECT 1 FROM saved_courses WHERE course_id = %s AND user_id = %s"""
        cursor.execute(saved_query, (course_id, flask.session['user_id'],))
        print(cursor.fetchall())
        if len(cursor.fetchall()) < 1:
            results['saved'] = False
        else:
            results['saved'] = True
    return flask.jsonify(results), 200


@collage.app.route('/api/search/', methods=['POST'])
# @jwt_required()
def search_with_filters():
    # For now, topic description is the school
    # and course_description is keywords
    # major is under class topic
    # verify_user()
    connection = collage.model.get_db()  # open db
    data = flask.request.get_json()
    print(data)
    subject_search = ''
    credit_search = ''
    subjects = []
    credits = []
    if len(data['filters']) != 0:
        for filter in data['filters']:
            if filter[0] == 's':
                subjects.append(filter[1:])
            elif filter[0] == 'c':
                credits.append(filter[1])

    if len(subjects) > 0:
        subject_search = f'class_topic={subjects[0]}'
        for i in range(1, len(subjects)):
            subject_search = subject_search + ' AND class_topic=' + subjects[i]
        subject_search = subject_search + ' '

    if len(credits) > 0:
        subject_search = f'credit_hours={credits[0]}'
        for i in range(1, len(credits)):
            credit_search = credit_search + ' AND credit_hours=' + credits[i]
        credit_search = credit_search + ' '

    search_query = """SELECT course_id, course_code, credit_hours, course_name, class_topic, icon_url, total_rating, tag_1, tag_2, tag_3, tag_4, tag_5, num_ratings, open_status FROM courses"""
    if len(subjects) > 0 or len(credits) > 0:
        search_query = search_query + ' WHERE ' + subject_search + credit_search
    else:
        search_query = search_query + ' LIMIT 30'
    final = []

    with connection.cursor(dictionary=True) as cursor:
        cursor.execute(search_query)
        results = cursor.fetchall()
        if data['search_string'] != '':
            search_terms = set(data['search_string'].split(' '))
            for row in results:
                for term in search_terms:
                    if (term.lower() in row['course_code'].lower() or term.lower() in row['course_name'].lower() or term.lower() in row['class_topic'].lower() or
                        term.lower() in row['tag_1'].lower() or term.lower() in row['tag_2'].lower() or term.lower() in row['tag_3'].lower() or
                            term.lower() in row['tag_4'].lower() or term.lower() in row['tag_5'].lower()):
                        final.append(row)
                        break
        else:
            final = results
    final_agg = []
    for item in final:
        if item['credit_hours'] == 1:
            item['icon_color'] = '#F1D5A9'
            item['header_color'] = '#FFF9EF'
            item['credit_color'] = '#FFE6C1'
        elif item['credit_hours'] == 2:
            item['icon_color'] = '#7AAB85'
            item['header_color'] = '#E7FFEC'
            item['credit_color'] = '#B8FFC8'
        elif item['credit_hours'] == 3:
            item['icon_color'] = '#85A1EB'
            item['header_color'] = '#EFF4FF'
            item['credit_color'] = '#C2D7FE'
        elif item['credit_hours'] >= 4:
            item['icon_color'] = '#C55F5F'
            item['header_color'] = '#FFE8E8'
            item['credit_color'] = '#F79696'
        course_tags = []
        for i in range(1, 6):
            if item[f'tag_{str(i)}']:
                course_tags.append(item[f'tag_{str(i)}'])
        item['tags'] = course_tags
        item['rating'] = 0
        if item['num_ratings'] != 0:
            item['rating'] = item['total_rating'] // item['num_ratings']
        item['percent_match'] = '96%'
        final_agg.append(item)
    return flask.jsonify(results=final_agg), 200


@collage.app.route('/api/rate', methods=['POST'])
def update_rating():
    # flask.session['current_user'] = 'jadensun@umich.edu'
    data = request.get_json()
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        check_query = """
                    SELECT * FROM user_ratings WHERE user_email = %s AND course_id = %i
                """
        cursor.execute(
            check_query, (flask.session['current_user'], data['course_id']))
        results = cursor.fetchall()
        rating_query = """
                    SELECT total_rating, num_ratings FROM courses WHERE course_id = %i
                """
        cursor.execute(rating_query, (data['course_id']))
        rating_results = cursor.fetchone()
        # if user has already rated then replace old data
        if len(results) > 1:
            update_course = """UPDATE courses SET total_rating = %f WHERE course_id = %i"""
            udpate_rating = """UPDATE user_ratings SET rating = %f WHERE user_email = %s AND course_id = %i"""
            new_rating = rating_results[0]['total_rating'] - \
                results[0]['rating'] + data['rating']
            cursor.execute(update_course, (new_rating, data['course_id']))
        # if user has not rated then update with new data
        else:
            update_course = """UPDATE courses SET total_rating = %f, num_ratings = %i WHERE course_id = %i"""
            new_rating = rating_results[0]['total_rating'] + data['rating']
            num_ratings = rating_results[0]['num_ratings'] + 1
            udpate_rating = """INSERT INTO user_ratings (rating, user_email, course_id) VALUES (%i, %s, %f)"""
            cursor.execute(update_course, (num_ratings,
                           new_rating, data['course_id']))
        cursor.execute(udpate_rating, (new_rating,
                       flask.session['current_user'], data['course_id']))

    connection.commit()
    # also send back any other needed information later
    return jsonify(success=True), 200


@collage.app.route('/api/update-courses/', methods=['GET'])
def updatecourse():
    updates = [{'icon_url': 'comms', 'subjects': ['AERO', 'ALA', 'WRITING', 'URP', 'POLSCI', 'UC', 'RCCWLIT', 'COMM', 'MILSCI', 'COMPFOR', 'LSWA', 'COMPlIT', 'EEB', 'INTLSTD', 'EHS', 'ELI']},
                {'icon_url': 'cs', 'subjects': ['EECS', 'TO', 'ARCH', 'SI', 'RCNSCI', 'MATSCIE', 'NAVSCI', 'BIOLCHEM', 'COGSCI', 'DATSCI']},
                {'icon_url': 'culture', 'subjects': ['AAS', 'WGS', 'RELIGION', 'REEES', 'NATIVEAM', 'PUBPOL', 'MUSEUMS', 'AMAS', 'MIDEAST', 'MENAS', 'AMCULT', 'LATINOAM', 'ISLAM', 'KRSTD', 'LACS', 'ANTHRCUL', 'ASIAN', 'CCS', 'CJS']},
                {'icon_url': 'finance', 'subjects': ['ECON', 'ES', 'MUSMETH', 'PPE', 'RCCORE', 'RCSTP', 'STDABRD']},
                {'icon_url': 'history', 'subjects': ['ANTHRARC', 'LING', 'RCIDIV', 'MEMS', 'ARCHAM', 'CATALAN', 'CSP', 'HISTART', 'HISTORY']},
                {'icon_url': 'math', 'subjects': ['APPHYS', 'STATS', 'PHYSICS', 'QMSS', 'NERS', 'NEURO', 'MICROBIOL', 'MATH', 'MFG', 'IOE', 'APPPHYS', 'BIOINF', 'BIOPHYS', 'BIOSTAT', 'CHEM']},
                {'icon_url': 'media', 'subjects': ['ARTDES', 'THTREMUS', 'RCMUSIC', 'RCARTS', 'RCDRAMA', 'RCHUMS', 'DIGITAL', 'PAT', 'FTVM', 'JAZZ', 'MUSICOL', 'MUSTHTRE']},
                {'icon_url': 'nature', 'subjects': ['ANATOMY', 'STS', 'PHYSIOL', 'NEUROSCI', 'MCDB', 'MACROMOL', 'ANTHRBIO', 'BIOLOGY', 'GEOG', 'BIOPHYS', 'CLIMATE', 'EARTH', 'EAS', 'ENVIRON']},
                {'icon_url': 'thought', 'subjects': ['ASTRO', 'THEORY', 'SOC', 'SPACE', 'PSYCH', 'PHIL', 'CLCIV', 'NURS', 'ORGSTUDY', 'CMPLXSYS', 'ENS', 'ENSCEN', 'HONORS', ]},
                {'icon_url': 'lang', 'subjects': ['ARABIC', 'ARMENIAN', 'YIDDISH', 'UKR', 'ROMLING', 'TURKISH', 'SPANISH', 'SLAVIC', 'ROMLANG', 'RUSSIAN', 'SCAND', 'RCLANG', 'MELANG', 'RCASL', 'PORTUG', 'POLISH', 'PERSIAN', 'ASIANLAN', 'LADINO', 'LATIN', 'JUDAIC', 'ITALIAN', 'FRENCH', 'BCS', 'GERMAN', 'GREEKMOD', 'HEBREW', 'GREEK', 'CZECH', 'DUTCH', 'ENGLISH']},
    ]
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        for update in updates:
            update_string = "( '" + update['subjects'][0] + "'"
            for i in range(1, len(update['subjects'])-1):
                update_string = update_string + ", '" + update['subjects'][i] + "'"
            update_string = update_string + ')'
            full_url = """'https://firebasestorage.googleapis.com/v0/b/collage-849c3.appspot.com/o/icons%2Ficon-""" + update['icon_url'] + ".svg?alt=media'"
            update_icon = "UPDATE courses SET icon_url=" + full_url + " WHERE class_topic IN " + update_string
            cursor.execute(update_icon)
    connection.commit()
    return jsonify(status='success'), 200

@collage.app.route('/api/courses/', methods=['GET'])
def getcourse():
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""
                    SELECT * FROM courses LIMIT 10
                """)
        results = cursor.fetchall()
    return jsonify(query_results=results), 200


@collage.app.route('/api/student', methods=['GET'])
# @jwt_required()
def get_user_stats():
    # verify_user()
    user_email = flask.session['current_user']
    print(user_email)

    connection = collage.model.get_db()
    cursor = connection.cursor(dictionary=True)

    user_id_query = """
        SELECT user_id
        FROM users
        WHERE email = %s
    """
    cursor.execute(user_id_query, (user_email,))
    user_id = cursor.fetchone()['user_id']

    initial_query = """
        SELECT full_name, profile_img_url, major, college
        FROM users
        WHERE user_id = %s
    """
    cursor.execute(initial_query, (user_id,))
    info = cursor.fetchone()

    follower_query = """
        SELECT COUNT(*)
        AS follower_count
        FROM connections
        WHERE followed_id = %s
    """
    cursor.execute(follower_query, (user_id,))
    follower_count = cursor.fetchone()['follower_count']

    following_query = """
        SELECT COUNT(*)
        AS viewer_count
        FROM profileViewers
        WHERE viewed_id = %s
    """
    cursor.execute(following_query, (user_id,))
    profile_viewers = cursor.fetchone()['viewer_count']

    student_info_query = """
        SELECT graduation_year, start_year
        FROM users
        WHERE user_id = %s
    """
    cursor.execute(student_info_query, (user_id,))
    student_info = cursor.fetchone()

    credits_completed_query = """
        SELECT credits_completed
        FROM users
        WHERE user_id = %s
    """
    cursor.execute(credits_completed_query, (user_id,))
    credits_completed = cursor.fetchone()['credits_completed']

    # major_credits_query = """
    #     SELECT major_credits_required
    #     FROM users
    #     WHERE user_id = %s
    # """
    # cursor.execute(major_credits_query, (user_id,))
    # credits_required = cursor.fetchone()

    connection.close()

    response = {
        'full_name': info['full_name'],
        'prof_pic': info['profile_img_url'],
        'major': info['major'],
        'college': info['college'],
        'profile_viewers': profile_viewers,
        'follower_count': follower_count,
        'graduation_year': student_info['graduation_year'],
        'registration_term': student_info['start_year'],
        'credits_completed': credits_completed
    }
    return flask.jsonify(response)


@collage.app.route('/api/search/classes/<string:search_string>/<int:user_id>/', methods=['POST'])
def search_classes(serach_string, user_id):
    # take things in as a json object
    search_params = flask.request.get_json()


@collage.app.route('/api/delete/', methods=['GET'])
def delete():
    conn = collage.model.get_db()

    # Create a cursor object
    cursor = conn.cursor()

    # Execute a query
    cursor.execute("DELETE FROM users WHERE email = %s",
                   ('jadensun@umich.edu',))
    conn.commit()
    conn.close()

    return flask.jsonify({"flag": "success"})


@collage.app.route('/', defaults={'path': ''})
@collage.app.route('/collage/<path:path>')
def catch_refresh(path):
    print(path)
    return flask.render_template('index.html')


# @collage.app.route('/api/test/', methods=['GET'])
# def test():
#     # Load CSV files
#     course_tags_df = pd.read_csv("./collage/server/lsa_course_tags.csv")
#     course_info_df = pd.read_csv("./collage/server/WN2025.csv")
#     # Filter to keep only unique combinations of Subject and Catalog Nbr
#     course_info_df = course_info_df.drop_duplicates(subset=['Subject', 'Catalog Nbr'])
#     conn = collage.model.get_db()
#     cursor = conn.cursor()
#     print("Cursor created")
#     num_row = 0
#     num_actual_row = 0
#     # Step 1: Populate `courses` table
#     for _, row in course_info_df.iterrows():
#         num_row += 1
#         if num_row % 100 == 0:
#             print(f"Processed {num_row} rows")
#         # Extract only the subject code within parentheses using regex
#         subject_match = re.search(r'\((.*?)\)', row['Subject'])
#         if subject_match:
#             subject = subject_match.group(1)  # Get text inside parentheses
#         else:
#             subject = row['Subject'].strip()  # Fallback if format is unexpected
#         catalog_nbr = row['Catalog Nbr'].strip()
#         course_code = f"{subject} {catalog_nbr}"
#         course_name = row['Course Title']
#         instructor = row['Instructor']
#         # Extract credit hours, handling cases with ranges
#         units_value = row['Units']
#         if pd.notna(units_value):
#             credit_hours = int(float(units_value.split('-')[0].strip()))
#         else:
#             credit_hours = 0  # Default to 0 if Units is NaN
#         # Default values for additional fields
#         location = row.get('Location', '')  # Use empty string if Location is not available
#         open_status = row.get('Open Status', '')
#         # Retrieve tags from the course_tags_df DataFrame
#         course_tags_row = course_tags_df[course_tags_df['Course Number'] == course_code]
#         if not course_tags_row.empty:
#             tags = course_tags_row.iloc[0, 3:8].fillna('')  # Fill NaNs with empty strings
#             tag_1, tag_2, tag_3, tag_4, tag_5 = tags.tolist()
#             course_name = course_tags_row.iloc[0]['Course Title']
#             if num_row % 50 == 0:
#                 print(f"{course_code}: {course_name} found in tags CSV: {tag_1}, {tag_2}, {tag_3}, {tag_4}, {tag_5}")
#         else:
#             if num_row % 50 == 0:
#                 print(f"Not found in tags CSV: {course_code}")
#             continue
#         # Insert course data into the courses table
#         cursor.execute(
#             """
#             INSERT INTO courses (
#                 course_code, course_name, credit_hours, instructor_id, topic_description,
#                 course_description, class_topic, icon_url, total_rating, num_ratings,
#                 open_status, tag_1, tag_2, tag_3, tag_4, tag_5
#             )
#             VALUES (%s, %s, %s, NULL, '', '', %s, '', 0.0, 0, %s, %s, %s, %s, %s, %s)
#             """,
#             (course_code, course_name, credit_hours, subject, open_status, tag_1, tag_2, tag_3, tag_4, tag_5)
#         )
#         conn.commit()
#         num_actual_row += 1
#         print(f"Inserted {course_code}, Total inserted rows: {num_actual_row}")
#     # Close the database connection
#     cursor.close()
#     conn.close()
