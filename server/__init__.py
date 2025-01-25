import os

from flask import Flask
from flask_cors import CORS

def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    from . import auth
    from . import debt

    app.register_blueprint(auth.bp)
    app.register_blueprint(debt.bp)


    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app