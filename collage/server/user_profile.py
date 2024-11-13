from flask import Flask, jsonify, request, render_template, session
import mysql.connector
import flask
import collage
from datetime import datetime
from flask_cors import CORS

# Route to get registration information
@collage.app.route('/api/registration-info', methods=['GET'])
def get_registration_info():
    user_email = flask.session['current_user']
    connection = collage.model.get_db()
    try:
        with connection.cursor(dictionary=True) as cursor:
            # # Fetch user registration information
            # query = """
            #     SELECT credits_completed,
            #         (100 - credits_completed) AS credits_to_complete_major, -- example calculation
            #         5 AS credits_to_complete_minor1, -- replace with actual calculations or columns
            #         12 AS credits_to_complete_minor2, -- replace with actual calculations or columns
            #         DATE_FORMAT(enrollment_date, '%M %d at %h:%i%p') AS registration_date,
            #         'Fall 2024' AS registration_term  -- replace with actual column if needed
            #     FROM users
            #     WHERE user_id = %s
            # """
            # cursor.execute(query, (user_id,))
            # user_data = cursor.fetchone()

            personal_info_query = """
                SELECT users.profile_img_url, users.full_name, users.pronouns, users.major, users.minor, users.college, users.graduation_year, users.email, users.linkedin_url, 
                (SELECT COUNT(*) FROM connections c WHERE c.followed_id = users.user_id) AS follower_count, 
                (SELECT COUNT(*) FROM connections c WHERE c.follower_id = users.user_id) AS following_count 
                FROM users WHERE users.email = %s
            """
            cursor.execute(personal_info_query, ('alxswang@umich.edu',))
            personal_data = cursor.fetchone()

            return jsonify({'personal': personal_data})

    except mysql.connector.Error as err:
        print("Error:", err)
        return jsonify({'error': 'Database error'}), 500

@collage.app.route('/api/update-pfp', methods=['POST'])
def update_pfp():
    data = request.get_json()
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        update_query = """
                    UPDATE users SET profile_img_url = %s WHERE email = %s
                """
        cursor.execute(update_query, (data['profile_img_url'], session['current_user']))
    connection.commit()
    return jsonify(success=True), 200 # also send back any other needed information later

@collage.app.route('/api/test-pfp', methods=['GET'])
def get_test_pfp():
    print('Hi')
    session['current_user'] = 'jadensun@umich.edu'
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        update_query = """
                    SELECT profile_img_url FROM users WHERE email = %s
                """
        cursor.execute(update_query, (session['current_user'],))
        url = cursor.fetchall()[0]['profile_img_url']
    return jsonify(profile_img_url=url), 200
# @collage.app.route('/api/personal-info/<int:user_id>', methods=['GET'])
# def get_personal_info(user_id):
#     conn = collage.model.get_db()
#     with conn.cursor(dictionary=True) as cursor:
#         cursor.execute("""
#             SELECT profile_img_url, full_name, major, 
#         """)