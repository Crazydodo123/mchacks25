from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

users = {

}


@bp.post('/register')
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if email in users.keys():
        return jsonify({'error': 'Email already registered'}), 400
    

    hashed_password = generate_password_hash(password)
    users[email] = {
        "username": username,
        "email": email,
        "password": hashed_password,
    }

    return jsonify({'message': 'User registered successfully'}), 201


@bp.post("/login")
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    if email not in users.keys():
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return users[email], 200


@bp.get("/<int:id>")
def get_debts_from_id():
    return []