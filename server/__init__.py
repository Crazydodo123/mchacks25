import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
<<<<<<< HEAD

class Base(DeclarativeBase):
    pass

load_dotenv()

db = SQLAlchemy(model_class=Base)from flask_cors import CORS
=======
from flask_cors import CORS
>>>>>>> a006cd8381b83fb82624b73623bbe85522454441

class Base(DeclarativeBase):
    pass

load_dotenv()

db = SQLAlchemy(model_class=Base)

def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)


<<<<<<< HEAD
    # os.environ.get is like os.gentenv but we can use like full dictionary
    db_user = os.environ.get('RAILWAY_USER', 'root')
    db_password = os.environ.get('RAILWAY_PASSWORD', 'zYXANbKmvKPUnRqfZpVPsUxbfckKPZdB')
    db_host = os.environ.get('RAILWAY_HOSTNAME', 'mysql.railway.internal')
    db_port = os.environ.get('RAILWAY_PORT', '3306')
    db_database = os.environ.get('RAILWAY_DATABASE', 'railway')

    db_url = f'mysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_database}'

    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
        SQLALCHEMY_DATABASE_URI = db_url,
=======
    # # os.environ.get is like os.gentenv but we can use like full dictionary
    # db_user = os.environ.get('RAILWAY_USER', 'root')
    # db_password = os.environ.get('RAILWAY_PASSWORD', '')
    # db_host = os.environ.get('RAILWAY_HOSTNAME', '127.0.0.1')
    # db_port = os.environ.get('RAILWAY_PORT', '3306')
    # db_database = os.environ.get('RAILWAY_DATABASE', 'railway')

    # db_url = f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_database}'

    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
        # SQLALCHEMY_DATABASE_URI = db_url,
        SQLALCHEMY_DATABASE_URI = 'sqlite:///debt_tracker.db',
>>>>>>> a006cd8381b83fb82624b73623bbe85522454441
        SQLALCHEMY_TRACK_MODIFICATIONS = False,
    )

    db.init_app(app)

    if os.environ.get('CREATE_TABLES', 'false').lower() == 'true':
        with app.app_context():
            db.create_all()

    from . import auth
    from . import debt

    app.register_blueprint(auth.bp)
    app.register_blueprint(debt.bp)


    with app.app_context():
        db.create_all()

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app