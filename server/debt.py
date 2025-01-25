from flask import Blueprint, request, jsonify
import requests
import base64

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
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

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