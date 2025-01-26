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