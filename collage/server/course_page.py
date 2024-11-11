import collage
from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from agent import collage_ai_agent

# Route to get course details by ID
@collage.app.route('/api/course/<int:course_id>', methods=['GET'])
def get_course(course_id):
    try:
        connection = collage.model.get_db()
        with connection.cursor(dictionary=True) as cursor:
            # Fetch course details
            query = """
                SELECT course_id, course_name, course_description, credit_hours AS credits,
                    class_topic AS department, icon_url AS ai_img_url
                FROM courses
                WHERE course_id = %s
            """
            cursor.execute(query, (course_id,))
            course = cursor.fetchone()

            # Query to get all tags associated with the course
            tags_query = """
                SELECT t.tag_name
                FROM tags t
                JOIN course_tags ct ON t.tag_id = ct.tag_id
                WHERE ct.course_id = %s
            """
            cursor.execute(tags_query, (course_id,))
            tags = [row['tag_name'] for row in cursor.fetchall()]
            course["tags"] = tags;

            if course:
                return jsonify(course)
            else:
                return jsonify({'message': 'Course not found'}), 404

    except mysql.connector.Error as err:
        print("Error:", err)
        return jsonify({'error': 'Database error'}), 500


# Route to get Collage Board friends
@collage.app.route('/api/friends', methods=['GET'])
def get_friends():
    try:
        connection = collage.model.get_db()
        with connection.cursor(dictionary=True) as cursor:
            # Fetch friends' data
            query = """
                SELECT user_id, full_name, major
                FROM users
                LIMIT 3
            """
            cursor.execute(query)
            friends = cursor.fetchall()

            friend_list = [
                {'user_id': friend['user_id'], 'full_name': friend['full_name'], 'major': friend['major']}
                for friend in friends
            ]
            print("hi")
            print(friend_list)
            return jsonify(friend_list)

    except mysql.connector.Error as err:
        print("Error:", err)
        return jsonify({'error': 'Database error'}), 500


# Route to search courses with AI Course Finder
@collage.app.route('/api/ai-course-finder', methods=['POST'])
def ai_course_finder():
    user_input = request.json.get('query')
    response = collage_ai_agent(user_input)
    return jsonify({'response': response})


# Route to save a course for a user
@collage.app.route('/api/save-course', methods=['POST'])
def save_course():
    user_id = request.json.get('user_id')
    course_id = request.json.get('course_id')

    try:
        connection = collage.model.get_db()
        with connection.cursor(dictionary=True) as cursor:
            # Insert saved course record
            query = """
                INSERT INTO saved_courses (user_id, course_id)
                VALUES (%s, %s)
            """
            cursor.execute(query, (user_id, course_id))
            connection.commit()

            return jsonify({'message': 'Course saved successfully'})

    except mysql.connector.Error as err:
        print("Error:", err)
        if err.errno == 1062:
            return jsonify({'error': 'Course already saved'}), 400
        else:
            return jsonify({'error': 'Database error'}), 500
