import collage
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from agent import collage_ai_agent

# Route to get course details by ID
@collage.app.route('/api/course/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get(course_id) # TODO: revise this based on schema
    if course:
        return jsonify({
            'course_id': course.course_id,
            'course_name': course.course_name,
            'course_description': course.course_description,
            'credits': course.credit_hours,
            'subject': course.subject_code,
            'department': course.class_topic,
            'status': course.enrollment_status,
            'ai_img_url': course.ai_img_url
        })
    return jsonify({'message': 'Course not found'}), 404


# Route to get Collage Board friends
@collage.app.route('/api/friends', methods=['GET'])
def get_friends():
    friends = User.query.limit(3).all() # TODO: revise this based on schema
    friend_list = [
        {'full_name': friend.full_name, 'major': friend.major, 'user_id': friend.user_id}
        for friend in friends
    ]
    return jsonify(friend_list)


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
    # TODO: add SQL query inserting a new record in `saved_courses`
    # Assume saving is successful
    return jsonify({'message': 'Course saved successfully'})