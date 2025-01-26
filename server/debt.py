from flask import Blueprint, request, jsonify, Flask
import base64
from mindee import Client, PredictResponse, product

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
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    # Init a new client
    imgFile = request.files["file"]  
    mindee_client = Client(api_key="8a5a0fe590306339d4a2fb712dc715ea")

    # Load a file from disk
    input_doc = mindee_client.source_from_path(base64_string)

    # Load a file from disk and parse it.
    # The endpoint name must be specified since it cannot be determined from the class.
    result: PredictResponse = mindee_client.parse(product.ReceiptV5, input_doc)

    # Print a summary of the API result
    print(result.document)

    # Print the document-level summary
    # print(result.document.inference.prediction)