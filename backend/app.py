# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# import os

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Use a proper database in production
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # Initialize Database

#     app.run(debug=True)
# db.init_app(app)

# # Import models
# from models import db

# # Import routes and services
# from routes import main
# from services import send_whatsapp_message

# # Register Blueprint
# app.register_blueprint(main)

# # Run App
# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from routes import main as routes_bp  # Import the routes blueprint
from models import db  # Import the db instance

from flask_cors import CORS  # Import CORS



# def create_app():
#     app = Flask(__name__)
#     CORS(app, origins=["http://localhost:5173",])

#     # Configuration
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Use a proper database in production
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optional, disables SQLAlchemy's track modifications

#     # Enable CORS for frontend requests
#     CORS(app)

#     # Initialize Database
#     db.init_app(app)

#     # Register Blueprints
#     app.register_blueprint(routes_bp)  # Register the routes blueprint

#     return app

# if __name__ == '__main__':
#     app = create_app()
#     with app.app_context():
#         db.create_all()  # Create all tables
#     app.run(debug=True)
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from routes import main as routes_bp  # Import the routes blueprint
from models import db  # Import the db instance


load_dotenv()

WHATSAPP_API_URL = f"https://graph.facebook.com/v22.0/{os.getenv('WHATSAPP_PHONE_ID')}/messages"
ACCESS_TOKEN = os.getenv('WHATSAPP_ACCESS_TOKEN')

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Use a proper database in production
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optional, disables SQLAlchemy's track modifications

    # Enable CORS for frontend requests
    CORS(app)

    # Initialize Database
    db.init_app(app)
    migrate = Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(routes_bp)  # Register the routes blueprint

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()  # Create all tables
    app.run(debug=True)