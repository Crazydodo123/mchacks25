from flask import Blueprint, request, jsonify
import requests
from . import db
from .models import Transactions, User
from dotenv import load_dotenv

import requests, json, os

load_dotenv()

bp = Blueprint('debt', __name__, url_prefix='/api/debt')

# should be able to return all the transactions
@bp.get("/")
def get_transactions():
    transacts = Transactions.query.all()
    users = User.query.all()
    
    return jsonify({
        'users': [{
            'id': user.id,
            'user_id': user.user_id,
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
    
    user_owed = User.query.filter_by(user_id=user_owed_id).first()
    user_owing = User.query.filter_by(user_id=user_owing_id).first()

    user_owed.total_amount += amount
    user_owing.total_amount -= amount
    if user_owing.total_amount <= -50:
        url = "https://api.gumloop.com/api/v1/start_pipeline"
        email = user_owing.email
        message = "The user's name is " + email + " and they are " + str(user_owing.total_amount) + " dollars in debt with no signs of paying it back to their friends anytime soon."
        payload = {
            "user_id": "xAOao0fOp4chdJeXLOMy28LBiim1",
            "saved_item_id": "5kRukEgUKGUyADokZTcL2v",
            "pipeline_inputs": [
                {"input_name": "message", "value": message},
                {"input_name": "email", "value": email}
            ]
        }
        headers = {
            "Authorization": "Bearer dad6eb5438ed4df49e3bd066092e9d45",
            "Content-Type": "application/json"
        }
        response = requests.request("POST", url, json=payload, headers=headers)

    new_transaction = Transactions(
        user_owed_id=user_owed.user_id,
        user_owing_id=user_owing.user_id,
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
                'user_id': user_owed.user_id,
                'total_amount_curr': user_owed.total_amount
            },
            'user_owing': {
                'user_id': user_owing.user_id,
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
        (Transactions.user_owed_id == user.user_id) | (Transactions.user_owing_id == user.user_id)).all()

    return jsonify({
        'user': {
            'id': user.id,
            'user_id': user.user_id,
            'total_amount': user.total_amount
        },
        'transactions': [{
            'id': transact.id,
            'amount': transact.amount,
            'description': transact.description,
            'transaction_dt': transact.transaction_dt,
            'type': 'owed' if transact.user_owed_id == user.user_id else 'owing',
            'other_user': transact.user_owing_id if transact.user_owed_id == user.user_id else transact.user_owed_id
        } for transact in transacts]
    }), 200


# extracts costs of products and allows users to decide who bought what
@bp.post("/extract-receipt")
def extract_receipt():
    data = request.get_json()
    image = data.get('image')

    if not image:
        return jsonify({'error': 'Missing required fields'}), 400


    url = "https://api.veryfi.com/api/v8/partner/documents"

    payload = json.dumps({ "file_data": image })

    client_id = os.getenv('CLIENT_ID')
    authorization = os.getenv('AUTHORIZATION')

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'CLIENT-ID': client_id,
        'AUTHORIZATION': authorization
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.json()

@bp.post("/send-text")
def send_text():
    data = request.get_json()
    email = data.get('email')
    message = data.get('message')
    url = "https://api.gumloop.com/api/v1/start_pipeline"

    payload = {
        "user_id": "xAOao0fOp4chdJeXLOMy28LBiim1",
        "saved_item_id": "5kRukEgUKGUyADokZTcL2v",
        "pipeline_inputs": [
            {"input_name": "message", "value": message},
            {"input_name": "email", "value": email}
        ]
    }
    headers = {
        "Authorization": "Bearer dad6eb5438ed4df49e3bd066092e9d45",
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)