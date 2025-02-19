import requests
import os
from flask import current_app

def send_whatsapp_message(phone, message):
    # Get credentials from environment
    phone_id = os.getenv('WHATSAPP_PHONE_ID')  # Should be "609528828907360"
    access_token = os.getenv('WHATSAPP_ACCESS_TOKEN')
    
    # Clean phone number
    cleaned_phone = phone.lstrip('+').replace(' ', '')
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "messaging_product": "whatsapp",
        "to": cleaned_phone,
        "text": {"body": message}
    }
    
    try:
        response = requests.post(
            f"https://graph.facebook.com/v22.0/{phone_id}/messages",
            json=payload,
            headers=headers
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        current_app.logger.error(f"WhatsApp API Error: {str(e)}")
        current_app.logger.error(f"Response content: {response.text}")  # Add this
        return None