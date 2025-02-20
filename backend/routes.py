# from flask import Blueprint, request, jsonify
# from models import db, User, Appointment, Rating
# import json
# from pathlib import Path
# from datetime import datetime
# from flask import request
# import os
# from services import send_whatsapp_message

# main = Blueprint("main", __name__)

# women_health_data = json.loads(Path("women_health_data.json").read_text())

# @main.route("/chat", methods=["POST"])
# def handle_chat():
#     user_message = request.json.get("message", "").lower()
#     response = women_health_data["default_response"]

#     for intent in women_health_data["intents"]:
#         if any(keyword in user_message for keyword in intent["keywords"]):
#             response = intent["response"]
#             break

#     return jsonify({"response": response})

# @main.route('/webhook/whatsapp', methods=['POST'])
# def whatsapp_webhook():
#     data = request.get_json()
    
#     # Handle message status updates
#     if 'statuses' in data:
#         for status in data['statuses']:
#             print(f"Message ID: {status['id']} Status: {status['status']}")
#             # Update database with delivery status
    
#     # Handle user messages
#     if 'messages' in data:
#         # Implement message handling logic here
    
#         return jsonify({'status': 'success'}), 200

# @main.route('/webhook', methods=['GET', 'POST'])
# def webhook():
#     if request.method == 'GET':
#         # Verification challenge
#         mode = request.args.get('hub.mode')
#         token = request.args.get('hub.verify_token')
#         challenge = request.args.get('hub.challenge')
        
#         if mode == 'subscribe' and token == os.getenv('WEBHOOK_VERIFY_TOKEN'):
#             return challenge, 200
#         return "Verification failed", 403

#     # Handle incoming messages
#     data = request.get_json()
#     entries = data.get('entry', [])
    
#     for entry in entries:
#         for change in entry.get('changes', []):
#             if 'messages' in change.get('value', {}):
#                 handle_incoming_message(change['value']['messages'][0])
    
#     return jsonify({'status': 'success'}), 200

# def handle_incoming_message(message):
#     # Implement your message handling logic here
#     pass


# @main.route("/register", methods=["POST"])
# def register_user():
#     data = request.json
#     phone_number = data.get("phone_number")
#     name = data.get("name", "")
    
#     if not phone_number:
#         return jsonify({"error": "Phone number is required"}), 400
    
#     user = User.query.filter_by(phone_number=phone_number).first()
#     if not user:
#         user = User(phone_number=phone_number, name=name, opt_in_status=True)
#         db.session.add(user)
#         db.session.commit()
#         # Send WhatsApp welcome message
#         try:
#             send_whatsapp_message(phone_number, 
#                 "🚀 Welcome to HealthBot! You've successfully registered. "
#                 "We'll notify you via WhatsApp about important updates.")
#         except Exception as e:
#             print("WhatsApp message error:", str(e))
#         return jsonify({"message": "User registered successfully"}), 201
#     return jsonify({"message": "User already registered"}), 400

# # @main.route("/appointments", methods=["POST"])
# # def schedule_appointment():
# #     data = request.json
# #     phone_number = data.get("phone_number")
# #     date = data.get("date")
# #     time = data.get("time")
# #     reason = data.get("reason")

# #     if not all([phone_number, date, time, reason]):
# #         return jsonify({"error": "Phone number, date, time, and reason are required"}), 400

# #     user = User.query.filter_by(phone_number=phone_number).first()
# #     if not user:
# #         user = User(phone_number=phone_number, name="Anonymous", opt_in_status=False)
# #         db.session.add(user)
# #         db.session.commit()

# #     appointment = Appointment(user_id=user.id, date=date, time=time, reason=reason)
# #     db.session.add(appointment)
# #     db.session.commit()
    
# #     return jsonify({"message": "Appointment scheduled successfully"}), 201

# @main.route('/appointments', methods=['POST'])
# def create_appointment():
#     data = request.get_json()
    
#     # Changed from user_id to phone_number
#     phone_number = data.get('phone_number')
#     if not phone_number:
#         return jsonify({"error": "Phone number is required"}), 400

#     user = User.query.filter_by(phone_number=phone_number).first()
#     if not user:
#         return jsonify({"error": "User not found. Please register first."}), 404
    
#     try:
#         date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
#         time_obj = datetime.strptime(data['time'], '%H:%M').time()
#     except ValueError as e:
#         return jsonify({"error": f"Invalid date/time format: {e}"}), 400

#     new_appointment = Appointment(
#         user_id=user.id,
#         date=date_obj,
#         time=time_obj,
#         reason=data.get('reason'),
#         status='Scheduled'
#     )
    
#     db.session.add(new_appointment)
#     db.session.commit()

#     # Send WhatsApp confirmation
#     try:
#         message = (
#             f"📅 Appointment Confirmation\n\n"
#             f"Date: {data['date']}\n"
#             f"Time: {data['time']}\n"
#             f"Reason: {data['reason']}\n\n"
#             "We'll remind you 1 hour before your appointment."
#         )
#         send_whatsapp_message(phone_number, message)
#     except Exception as e:
#         print("WhatsApp message error:", str(e))
    
#     return jsonify({"message": "Appointment created!"}), 201

# # @main.route("/ratings", methods=["POST"])
# # def submit_rating():
# #     data = request.json
# #     rating = data.get("rating")
# #     feedback = data.get("feedback", "")

# #     if not (1 <= rating <= 5):
# #         return jsonify({"error": "Rating must be between 1 and 5"}), 400

# #     user = User.query.filter_by(user_id=user_id).first()
# #     if not user:
# #         user = User(phone_number=phone_number, name="Anonymous", opt_in_status=False)
# #         db.session.add(user)
# #         db.session.commit()

# #     new_rating = Rating(user_id=user.id, rating=rating, feedback=feedback)
# #     db.session.add(new_rating)
# #     db.session.commit()
    
# #     return jsonify({"message": "Rating submitted successfully"}), 201
# @main.route("/ratings", methods=["POST"])
# def submit_rating():
#     data = request.json
#     phone_number = data.get("phone_number")
#     rating = data.get("rating")
    
#     if not phone_number:
#         return jsonify({"error": "Phone number is required"}), 400

#     user = User.query.filter_by(phone_number=phone_number).first()
#     if not user:
#         user = User(phone_number=phone_number, name="Anonymous", opt_in_status=False)
#         db.session.add(user)
#         db.session.commit()

#     new_rating = Rating(
#         user_id=user.id,
#         rating=rating,
#         feedback=data.get("feedback", "")
#     )
#     db.session.add(new_rating)
#     db.session.commit()
    
#     # Send WhatsApp thank you
#     try:
#         send_whatsapp_message(phone_number,
#             "🌟 Thank you for your feedback!\n"
#             "We appreciate your rating of {rating}/5. "
#             "Your input helps us improve our service.")
#     except Exception as e:
#         print("WhatsApp message error:", str(e))
    
#     return jsonify({"message": "Rating submitted successfully"}), 201

from flask import Blueprint, request, jsonify
from models import db, User, Appointment, Rating
import json
from pathlib import Path
from datetime import datetime
import os
from services import send_whatsapp_message

main = Blueprint("main", __name__)

women_health_data = json.loads(Path("women_health_data.json").read_text())

@main.route("/chat", methods=["POST"])
def handle_chat():
    user_message = request.json.get("message", "").lower()
    response = women_health_data["default_response"]

    for intent in women_health_data["intents"]:
        if any(keyword in user_message for keyword in intent["keywords"]):
            response = intent["response"]
            break

    return jsonify({"response": response})

@main.route('/webhook/whatsapp', methods=['POST'])
def whatsapp_webhook():
    data = request.get_json()
    
    # Handle message status updates
    if 'statuses' in data:
        for status in data['statuses']:
            print(f"Message ID: {status['id']} Status: {status['status']}")
            # Update database with delivery status
    
    # Handle user messages
    if 'messages' in data:
        # Implement message handling logic here
        pass
    
    return jsonify({'status': 'success'}), 200

@main.route('/webhook', methods=['GET', 'POST'])
def webhook():
    if request.method == 'GET':
        # Verification challenge
        mode = request.args.get('hub.mode')
        token = request.args.get('hub.verify_token')
        challenge = request.args.get('hub.challenge')
        
        if mode == 'subscribe' and token == os.getenv('WEBHOOK_VERIFY_TOKEN'):
            return challenge, 200
        return "Verification failed", 403

    # Handle incoming messages
    data = request.get_json()
    entries = data.get('entry', [])
    
    for entry in entries:
        for change in entry.get('changes', []):
            if 'messages' in change.get('value', {}):
                handle_incoming_message(change['value']['messages'][0])
    
    return jsonify({'status': 'success'}), 200

def handle_incoming_message(message):
    # Implement your message handling logic here
    pass

@main.route("/register", methods=["POST"])
def register_user():
    data = request.json
    phone_number = data.get("phone_number")
    name = data.get("name", "")
    
    if not phone_number:
        return jsonify({"error": "Phone number is required"}), 400
    
    user = User.query.filter_by(phone_number=phone_number).first()
    if not user:
        user = User(phone_number=phone_number, name=name, opt_in_status=True)
        db.session.add(user)
        db.session.commit()
        # Send WhatsApp welcome message
        try:
            send_whatsapp_message(phone_number, 
                "🚀 Welcome to HealthBot! You've successfully registered. "
                "We'll notify you via WhatsApp about important updates.")
        except Exception as e:
            print(f"WhatsApp message error: {str(e)}")
        return jsonify({"message": "User registered successfully"}), 201
    return jsonify({"message": "User already registered"}), 400

@main.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    
    # Changed from user_id to phone_number
    phone_number = data.get('phone_number')
    if not phone_number:
        return jsonify({"error": "Phone number is required"}), 400

    user = User.query.filter_by(phone_number=phone_number).first()
    if not user:
        return jsonify({"error": "User not found. Please register first."}), 404
    
    try:
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
        time_obj = datetime.strptime(data['time'], '%H:%M').time()
    except ValueError as e:
        return jsonify({"error": f"Invalid date/time format: {e}"}), 400

    new_appointment = Appointment(
        user_id=user.id,
        date=date_obj,
        time=time_obj,
        reason=data.get('reason'),
        status='Scheduled'
    )
    
    db.session.add(new_appointment)
    db.session.commit()

    # Send WhatsApp confirmation
    try:
        message = (
            f"📅 Appointment Confirmation\n\n"
            f"Date: {data['date']}\n"
            f"Time: {data['time']}\n"
            f"Reason: {data['reason']}\n\n"
            "We'll remind you 1 hour before your appointment."
        )
        send_whatsapp_message(phone_number, message)
    except Exception as e:
        print(f"WhatsApp message error: {str(e)}")
    
    return jsonify({"message": "Appointment created!"}), 201

@main.route("/ratings", methods=["POST"])
def submit_rating():
    data = request.json
    phone_number = data.get("phone_number")
    rating = data.get("rating")
    
    if not phone_number:
        return jsonify({"error": "Phone number is required"}), 400
    
    if not rating or not isinstance(rating, int) or not (1 <= rating <= 5):
        return jsonify({"error": "Rating must be an integer between 1 and 5"}), 400

    user = User.query.filter_by(phone_number=phone_number).first()
    if not user:
        user = User(phone_number=phone_number, name="Anonymous", opt_in_status=False)
        db.session.add(user)
        db.session.commit()

    new_rating = Rating(
        user_id=user.id,
        rating=rating,
        feedback=data.get("feedback", "")
    )
    db.session.add(new_rating)
    db.session.commit()
    
    # Send WhatsApp thank you
    try:
        send_whatsapp_message(phone_number,
            f"🌟 Thank you for your feedback!\n"
            f"We appreciate your rating of {rating}/5. "
            "Your input helps us improve our service.")
    except Exception as e:
        print(f"WhatsApp message error: {str(e)}")
    
    return jsonify({"message": "Rating submitted successfully"}), 201