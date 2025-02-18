from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Appointment, Rating
import whatsapp_api

app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mysql+pymysql://root:yourpassword@localhost/whatsapp_chatbot'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    phone_number = data.get('phone_number')
    message = data.get('message', '').lower()

    user = User.query.filter_by(phone_number=phone_number).first()

    if "health" in message:
        return whatsapp_api.handle_health_info(phone_number)
    elif "schedule" in message:
        return whatsapp_api.handle_appointment(phone_number, user)
    elif "rate" in message:
        return whatsapp_api.handle_rating(phone_number, user, data.get('rating'))
    else:
        return jsonify({"status": "error", "message": "Invalid request"}), 400

if __name__ == '__main__':
    app.run(debug=True)