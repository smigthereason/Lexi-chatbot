# from flask import jsonify
# from models import db, User, Appointment, Rating
# import requests
# from dotenv import load_dotenv

# load_dotenv()

# WHATSAPP_API_URL = f"https://graph.facebook.com/v22.0/{os.getenv('WHATSAPP_PHONE_ID')}/messages"
# ACCESS_TOKEN = os.getenv('WHATSAPP_ACCESS_TOKEN')

# def send_whatsapp_message(phone_number, message):
#     headers = {
#         "Authorization": f"Bearer {ACCESS_TOKEN}",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "messaging_product": "whatsapp",
#         "to": phone_number,
#         "type": "text",
#         "text": {"body": message}
#     }
#     response = requests.post(WHATSAPP_API_URL, headers=headers, json=payload)
#     return response.json()

# def handle_health_info(phone_number):
#     message = """Women's Health Information:
#     - Maternal Health: [Information...]
#     - Reproductive Health: [Information...]"""
#     return send_whatsapp_message(phone_number, message)

# def handle_appointment(phone_number, user):
#     if not user:
#         return jsonify({"status": "error", "message": "User not found"}), 404
    
#     new_appointment = Appointment(
#         user_id=user.id,
#         date="2023-12-25",  # Replace with actual date input
#         time="10:00",       # Replace with actual time input
#         status="Scheduled"
#     )
#     db.session.add(new_appointment)
#     db.session.commit()
    
#     return send_whatsapp_message(
#         phone_number,
#         f"Appointment scheduled for {new_appointment.date} at {new_appointment.time}"
#     )

# def handle_rating(phone_number, user, rating):
#     if not user or not (1 <= rating <=5):
#         return jsonify({"status": "error", "message": "Invalid request"}), 400
    
#     new_rating = Rating(
#         user_id=user.id,
#         rating=rating,
#         feedback="Sample feedback"  # Replace with actual feedback input
#     )
#     db.session.add(new_rating)
#     db.session.commit()
    
#     return send_whatsapp_message(phone_number, "Thank you for your rating!")

import os
import requests
from flask import jsonify
from models import db, User, Appointment, Rating
from dotenv import load_dotenv

load_dotenv()

def send_whatsapp_message(phone_number, message):
    """
    Send a WhatsApp message using the WhatsApp Business API.
    
    Args:
        phone_number (str): The recipient's phone number
        message (str): The message content to send
        
    Returns:
        dict: The API response as a dictionary
    """
    phone_id = os.getenv('WHATSAPP_PHONE_ID')
    access_token = os.getenv('WHATSAPP_ACCESS_TOKEN')
    
    if not phone_id or not access_token:
        raise ValueError("WhatsApp credentials not configured")
    
    # Clean phone number
    cleaned_phone = phone_number.lstrip('+').replace(' ', '')
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "messaging_product": "whatsapp",
        "to": cleaned_phone,
        "type": "text",
        "text": {"body": message}
    }
    
    response = requests.post(
        f"https://graph.facebook.com/v22.0/{phone_id}/messages",
        headers=headers,
        json=payload
    )
    
    # Check for HTTP errors
    response.raise_for_status()
    return response.json()

def handle_health_info(phone_number):
    """Handle health information request and send WhatsApp response"""
    message = """Women's Health Information:
    - Maternal Health: [Information...]
    - Reproductive Health: [Information...]"""
    return send_whatsapp_message(phone_number, message)

def handle_appointment(phone_number, user):
    """Handle appointment request and create appointment record"""
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    new_appointment = Appointment(
        user_id=user.id,
        date={new_appointment.date}, 
        time={new_appointment.time},       
        status="Scheduled"
    )
    db.session.add(new_appointment)
    db.session.commit()
    
    return send_whatsapp_message(
        phone_number,
        f"Appointment scheduled for {new_appointment.date} at {new_appointment.time}"
    )

def handle_rating(phone_number, user, rating):
    """Handle user rating submission and create rating record"""
    if not user or not (1 <= rating <= 5):
        return jsonify({"status": "error", "message": "Invalid request"}), 400
    
    new_rating = Rating(
        user_id=user.id,
        rating=rating,
        feedback="Thank you for your review."  
    )
    db.session.add(new_rating)
    db.session.commit()
    
    return send_whatsapp_message(
        phone_number, 
        f"Thank you for your {rating}-star rating!"
    )