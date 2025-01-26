from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLALchemy
import requests
import base64
from . import db
from .models import Transactions, User

bp = Blueprint('debt', __name__, url_prefix='/api/debt')

# should be able to return all the transactions
@bp.get("/")
def get_transactions():
    transacts = Transactions.query.all()
    users = User.query.all()
    
    return jsonify({
        'users': [{
            'id': user.id,
            'username': user.username,
            'total_amount': user.total_amount
        } for user in users],
        'transactions': [{
            'id': transact.id,
            'user_owed_id': transact.user_owed_id,
            'user_owing_id': transact.user_owing_id,
            'amount': transact.amount,
            'description': transact.description,
            'transaction_dt': transact.transaction_dt.isoformat(),
        } for transact in transacts]
    })

# acculmulates debt for both users in transaction (user that is owed money and user that is owing money)
# adds new entry to mysql table representing interaction
@bp.post("/")
def add_debt():
    data = request.json
    amount = data.get('amount')
    user_owed_id = data.get('user_owed_id')
    user_owing_id = data.get('user_owing_id')
    description = data.get('description', '')

    if amount is None:
        return jsonify({'error': 'Invalid amount'}), 400
    
    user_owed = User.query.filter_by(username=user_owed_id).first()
    user_owing = User.query.filter_by(username=user_owing_id).first()

    new_transaction = Transactions(
        user_owed_id=user_owed.username,
        user_owing_id=user_owing.username,
        amount=amount,
        description=description
    )

    # addeds new entry to mysql table
    db.session.add(new_transaction)
    db.session.commit()
    
    return jsonify({
        'message': 'Successful transaction',
        'transaction': {
            'id' : new_transaction.id,
            'amount': amount,
            'description': new_transaction.description
        },
        'updated_balances': {
            'user_owed': {
                'username': user_owed.username,
                'total_amount_curr': user_owed.total_amount
            },
            'user_owing': {
                'username': user_owing.username,
                'total_amount_curr': user_owing.total_amount
            }
        }
    }), 201

# debt of a specific user
@bp.get("/<int:id>")
def get_debts_from_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    transacts = Transactions.query.filter(
        (Transactions.user_owed_id == user.username) | (Transactions.user_owing_id == user.username)).all()

    return jsonify({
        'user': {
            'id': user.id,
            'username': user.username,
            'total_amount': user.total_amount
        },
        'transactions': [{
            'id': transact.id,
            'amount': transact.amount,
            'description': transact.description,
            'transaction_dt': transact.transaction_dt,
            'type': 'owed' if transact.user_owed_id == user.username else 'owing',
            'other_user': transact.user_owing_id if transact.user_owed_id == user.username else transact.user_owed_id
        } for transact in transacts]
    }), 200


# extracts costs of products and allows users to decide who bought what
@bp.post("/extract-receipt")
def extract_receipt():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    # Retrieve the uploaded image
    image_file = request.files['image']

    # Convert the image to base64 (if required by the Gumloop API)
    image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    url = "https://api.gumloop.com/api/v1/start_pipeline"

    payload = {
    "user_id": "xAOao0fOp4chdJeXLOMy28LBiim1",
    "saved_item_id": "8ZfX7fynGzZsjsiJKynwJd",
    "file_name": "receipt_input",
    "file_content": image_file
    }
    headers = {
    "Authorization": "Bearer dad6eb5438ed4df49e3bd066092e9d45",
    "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)