from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

import requests, json, os

load_dotenv()

bp = Blueprint('poker', __name__, url_prefix='/api/debt')

@bp.get("/")
def get_debts():
    return []

@bp.post("/")
def add_debt():
    return None

@bp.get("/<int:id>")
def get_debts_from_id():
    return []

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
