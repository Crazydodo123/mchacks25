from . import db
from datetime import datetime as dt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.String(100), nullable=False)
    total_amount = db.Column(db.Float, default = 0.0)

class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_owed_id = db.Column(db.String(100), db.ForeignKey('user.username'), nullable=False)
    user_owing_id = db.Column(db.String(100), db.ForeignKey('user.username'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(250), nullable=True)
    transaction_dt = db.Column(db.DateTime, default = dt.now)

    user_owed = db.relationship('User', foreign_keys=[user_owed_id])
    user_owing = db.relationship('User', foreign_keys=[user_owing_id])
