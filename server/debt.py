from flask import Blueprint

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