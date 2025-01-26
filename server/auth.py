from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from random import randint
from markupsafe import escape
from . import db
from .models import User

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
    
    # hash passwords 
    # similar to encrypting them, except they're never decrypted (ie. non reversible)
    hashed_password = generate_password_hash(password)
    if not check_password_hash(hashed_password, password):
        return jsonify({'error': 'Password hashing failed'}), 400
    
    # connects to the database
    new_user = User(username=username, email=email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()


    return jsonify({'message': 'User registered successfully'}), 201


@bp.post("/login")
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password) or not check_password_hash(users[email]["password"], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    response = users[email].copy()
    response.pop("password")
    return response, 200

@bp.get('/get_info/<id>')
def get_user_info(id):
    id = escape(id)

    if not id:
        return jsonify({'error': 'Missing id'}), 400

    if id not in [user["id"] for user in users.values()]:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    user = User.query.get(id)
    
    return jsonify({
        'id': user.id,
        'email': user.email,
        'username': user.username
    }), 200


@bp.get("/<int:id>")
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'email': user.email,
        'username': user.username
    }), 200