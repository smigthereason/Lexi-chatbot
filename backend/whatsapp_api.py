from flask import jsonify
from models import db, User, Appointment, Rating
import requests

WHATSAPP_API_URL = "https://graph.facebook.com/v22.0/609528828907360/messages"
ACCESS_TOKEN = "EAAIg9YscvZCUBO5bmiV5T7wjgsyj52IgBH5UVrae7tUgthjFKSnZBjoErWEWZAP31EHHNrBNd4bSwNIwRh2LFip9pmd80v21HZB3FxRSzBOq9ywO3l9oBS3HZCfwv9THZBoaGfdaqUeuivZAMtfkvXLFHfc7c1MTnTERtx6qiicgKiZAyCMq7tC99Kv9rsbpZAgQJi46DqRBto5jUZC8GJICZBVZCr8uSjB3AZCvxBdEZD"

def send_whatsapp_message(phone_number, message):
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": phone_number,
        "type": "text",
        "text": {"body": message}
    }
    response = requests.post(WHATSAPP_API_URL, headers=headers, json=payload)
    return response.json()

def handle_health_info(phone_number):
    message = """Women's Health Information:
    - Maternal Health: [Information...]
    - Reproductive Health: [Information...]"""
    return send_whatsapp_message(phone_number, message)

def handle_appointment(phone_number, user):
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    new_appointment = Appointment(
        user_id=user.id,
        date="2023-12-25",  # Replace with actual date input
        time="10:00",       # Replace with actual time input
        status="Scheduled"
    )
    db.session.add(new_appointment)
    db.session.commit()
    
    return send_whatsapp_message(
        phone_number,
        f"Appointment scheduled for {new_appointment.date} at {new_appointment.time}"
    )

def handle_rating(phone_number, user, rating):
    if not user or not (1 <= rating <=5):
        return jsonify({"status": "error", "message": "Invalid request"}), 400
    
    new_rating = Rating(
        user_id=user.id,
        rating=rating,
        feedback="Sample feedback"  # Replace with actual feedback input
    )
    db.session.add(new_rating)
    db.session.commit()
    
    return send_whatsapp_message(phone_number, "Thank you for your rating!")