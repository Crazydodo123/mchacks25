from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from random import randint

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

users = {

}


@bp.post('/register')
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    id = hex(randint(0, 16 ** 16))[2:]

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if email in users.keys():
        return jsonify({'error': 'Email already registered'}), 400
    

    hashed_password = generate_password_hash(password)
    users[email] = {
        "email": email,
        "password": hashed_password,
        "id": id,
    }

    return jsonify({'message': 'User registered successfully'}), 201


@bp.post("/login")
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    if email not in users.keys() or not check_password_hash(users[email]["password"], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    response = users[email].copy()
    response.pop("password")
    return response, 200

@bp.post('/get_info')
def get_user_info():
    data = request.get_json()
    id = data.get("id")

    if not id:
        return jsonify({'error': 'Missing id'}), 400

    if id not in [user["id"] for user in users.values()]:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return [user for user in users.values() if user["id"] == id][0]