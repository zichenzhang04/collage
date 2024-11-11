from flask import Flask, jsonify, request, render_template
import mysql.connector
import collage
from datetime import datetime
from flask_cors import CORS

# Route to get registration information
@collage.app.route('/api/registration-info', methods=['GET'])
def get_registration_info():
    user_id = request.args.get('user_id')
    connection = collage.model.get_db()
    try:
        with connection.cursor(dictionary=True) as cursor:
            # Fetch user registration information
            query = """
                SELECT credits_completed,
                    (100 - credits_completed) AS credits_to_complete_major, -- example calculation
                    5 AS credits_to_complete_minor1, -- replace with actual calculations or columns
                    12 AS credits_to_complete_minor2, -- replace with actual calculations or columns
                    DATE_FORMAT(enrollment_date, '%M %d at %h:%i%p') AS registration_date,
                    'Fall 2024' AS registration_term  -- replace with actual column if needed
                FROM users
                WHERE user_id = %s
            """
            cursor.execute(query, (user_id,))
            user_data = cursor.fetchone()

            personal_info_query = """
                SELECT users.profile_img_url, users.full_name, users.pronouns, users.major, users.minor, users.college, users.graduation_year, users.email, users.linkedin, 
                (SELECT COUNT(*) FROM connections c WHERE c.followed_id = users.user_id) AS follower_count, 
                (SELECT COUNT(*) FROM connections c WHERE c.follower_id = users.user_id) AS following_count 
                FROM users WHERE users.user_id = %s
            """
            cursor.execute(personal_info_query, (user_id,))
            personal_data = cursor.fetchone()

            if user_data:
                return jsonify({'registration': user_data, 'personal': personal_data})
            else:
                return jsonify({'message': 'User not found'}), 404

    except mysql.connector.Error as err:
        print("Error:", err)
        return jsonify({'error': 'Database error'}), 500

# @collage.app.route('/api/personal-info/<int:user_id>', methods=['GET'])
# def get_personal_info(user_id):
#     conn = collage.model.get_db()
#     with conn.cursor(dictionary=True) as cursor:
#         cursor.execute("""
#             SELECT profile_img_url, full_name, major, 
#         """)