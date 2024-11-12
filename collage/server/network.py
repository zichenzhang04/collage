import os
import requests
import flask
import collage
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS

#Return all followers for a given user.
@collage.app.route('/api/followers/<int:user_id>', methods=['GET'])
def get_followers(user_id):
    # MAKE SURE TO SET THE ...id NAME AS "id" SO THE NETWORK COMPONENT WORKS
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT follower_id AS id
            FROM connections 
            WHERE followed_id = %s AND relationship = %s
        """, (user_id, 'following'))
        followers = cursor.fetchall()
    return jsonify(followers), 200
    # img_url = '../images/Charlie.svg'
    # followers = [
    #     {
    #         "id": 1,
    #         "name": "Alice Smith",
    #         "username": "alice123",
    #         "profileImage": img_url,
    #         "major": "Computer Science",
    #         "gradYear": 2025,
    #         "followersCount": 120,
    #         "mutuals": ["John Doe", "Jane Doe"],
    #     },
    #     {
    #         "id": 2,
    #         "name": "Bob Johnson",
    #         "username": "bobJohn",
    #         "profileImage": img_url,
    #         "major": "Electrical Engineering",
    #         "gradYear": 2024,
    #         "followersCount": 80,
    #         "mutuals": ["Alice Smith", "Emily Davis"],
    #     },
    #     {
    #         "id": 3,
    #         "name": "Charlie Brown",
    #         "username": "charlie_0",
    #         "profileImage": img_url,
    #         "major": "Mechanical Engineering",
    #         "gradYear": 2023,
    #         "followersCount": 95,
    #         "mutuals": ["Bob Johnson", "Alice Smith"],
    #     },
    # ]
    # return flask.jsonify(followers), 200


#Return all users a given user is following.
@collage.app.route('/api/following/<int:user_id>', methods=['GET'])
def get_following(user_id):
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT followed_id
            FROM connections
            WHERE follower_id = %s AND relationship = %s
        """, (user_id, 'following'))
        following = cursor.fetchall()
    return jsonify(following), 200
    # following = [
    #     {
    #         "id": 1,
    #         "name": "Alice Smith",
    #         "username": "alice123",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Computer Science",
    #         "gradYear": 2025,
    #         "followersCount": 120,
    #         "mutuals": ["John Doe", "Jane Doe"],
    #     },
    #     {
    #         "id": 2,
    #         "name": "Bob Johnson",
    #         "username": "bobJohn",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Electrical Engineering",
    #         "gradYear": 2024,
    #         "followersCount": 80,
    #         "mutuals": ["Alice Smith", "Emily Davis"],
    #     },
    #     {
    #         "id": 3,
    #         "name": "Charlie Brown",
    #         "username": "charlie_0",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Mechanical Engineering",
    #         "gradYear": 2023,
    #         "followersCount": 95,
    #         "mutuals": ["Bob Johnson", "Alice Smith"],
    #     },
    # ]
    # return jsonify(following), 200

#Return all follow requests a user has
@collage.app.route('/api/requests/<int:user_id>', methods=['GET'])
def get_requests(user_id):
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT follower_id 
            FROM connections 
            WHERE followed_id = %s AND relationship = %s
        """, (user_id, 'pending'))
        requests = cursor.fetchall()
    return jsonify(requests), 200
    # requests = [
    #     {
    #         "id": 1,
    #         "name": "Alice Smith",
    #         "username": "alice123",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Computer Science",
    #         "gradYear": 2025,
    #         "followersCount": 120,
    #         "mutuals": ["John Doe", "Jane Doe"],
    #     },
    #     {
    #         "id": 2,
    #         "name": "Bob Johnson",
    #         "username": "bobJohn",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Electrical Engineering",
    #         "gradYear": 2024,
    #         "followersCount": 80,
    #         "mutuals": ["Alice Smith", "Emily Davis"],
    #     },
    #     {
    #         "id": 3,
    #         "name": "Charlie Brown",
    #         "username": "charlie_0",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Mechanical Engineering",
    #         "gradYear": 2023,
    #         "followersCount": 95,
    #         "mutuals": ["Bob Johnson", "Alice Smith"],
    #     },
    # ]
    # return jsonify(requests), 200

#Return all suggested connections a user gets, THIS ENDPOINT NEEDS TESTING
@collage.app.route('/api/connects/<int:user_id>', methods=['GET'])
def get_connects(user_id):
    connection = collage.model.get_db()
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT u.user_id FROM users u
            LEFT JOIN connections c ON u.user_id = c.followed_id AND c.follower_id = %s
            WHERE u.user_id != %s AND c.follower_id IS NULL
        """, (user_id, user_id))
        suggested = cursor.fetchall()
    return jsonify(suggested), 200
    # connects = [
    #     {
    #         "id": 1,
    #         "name": "Alice Smith",
    #         "username": "alice123",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Computer Science",
    #         "gradYear": 2025,
    #         "followersCount": 120,
    #         "mutuals": ["John Doe", "Jane Doe"],
    #     },
    #     {
    #         "id": 2,
    #         "name": "Bob Johnson",
    #         "username": "bobJohn",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Electrical Engineering",
    #         "gradYear": 2024,
    #         "followersCount": 80,
    #         "mutuals": ["Alice Smith", "Emily Davis"],
    #     },
    #     {
    #         "id": 3,
    #         "name": "Charlie Brown",
    #         "username": "charlie_0",
    #         "profileImage": "CharlieProfileImage",
    #         "major": "Mechanical Engineering",
    #         "gradYear": 2023,
    #         "followersCount": 95,
    #         "mutuals": ["Bob Johnson", "Alice Smith"],
    #     },
    # ]
    # return jsonify(connects), 200

#Follow a user by adding an entry in the connections table.
@collage.app.route('/api/follow', methods=['POST'])
def follow_user():
    data = request.get_json()
    follower_id = data['user_id']
    followed_id = data['follow_id']
    connection = collage.model.get_db()
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("""
                INSERT INTO connections (follower_id, followed_id, relationship)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE following_status = %s
            """, (follower_id, followed_id, 'pending', 'pending'))
        connection.commit()
        return jsonify({'message': 'User followed successfully'}), 200
    except Exception as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500

#Remove a follow request or follower
@collage.app.route('/api/remove_user', methods=['DELETE'])
def remove_request():
    data = request.get_json()
    followed_id = data['user_id']
    follower_id = data['follow_id']
    connection = collage.model.get_db()
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("""
                DELETE FROM connections 
                WHERE follower_id = %s AND followed_id = %s
            """, (follower_id, followed_id))
        connection.commit()
        return jsonify({'message': 'User removed successfully'}), 200
    except Exception as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500

#Unfollow a user
@collage.app.route('/api/unfollow', methods=['DELETE'])
def unfollow_user():
    data = request.get_json()
    follower_id = data['user_id']
    followed_id = data['follow_id']
    connection = collage.model.get_db()
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute("""
                DELETE FROM connections
                WHERE follower_id = %s AND followed_id = %s
            """, (follower_id, followed_id))
        connection.commit()
        return jsonify({'message': 'User unfollowed successfully'}), 200
    except Exception as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
