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

            if user_data:
                return jsonify(user_data)
            else:
                return jsonify({'message': 'User not found'}), 404

    except mysql.connector.Error as err:
        print("Error:", err)
        return jsonify({'error': 'Database error'}), 500
