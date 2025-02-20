# import requests
# import os
# from flask import current_app
# from datetime import datetime, timedelta

# class WhatsAppBusinessAPI:
#     def __init__(self):
#         self.base_url = "https://graph.facebook.com/v22.0"
#         self.phone_id = os.getenv('WHATSAPP_PHONE_ID')
#         self.access_token = os.getenv('WHATSAPP_ACCESS_TOKEN')
        
#     def verify_business_account(self):
#         """Verify if the WhatsApp Business Account is properly set up"""
#         if not self.phone_id or not self.access_token:
#             raise ValueError("Missing WhatsApp credentials")
            
#         headers = {
#             "Authorization": f"Bearer {self.access_token}",
#             "Content-Type": "application/json"
#         }
        
#         try:
#             # First verify the business account status
#             response = requests.get(
#                 f"{self.base_url}/{self.phone_id}/whatsapp_business_account",
#                 headers=headers
#             )
#             response.raise_for_status()
            
#             # Then verify if the phone number is registered
#             phone_response = requests.get(
#                 f"{self.base_url}/{self.phone_id}",
#                 headers=headers
#             )
#             phone_response.raise_for_status()
            
#             return True
#         except requests.exceptions.HTTPError as e:
#             if e.response.status_code == 400:
#                 current_app.logger.error(
#                     "WhatsApp Business Account not properly configured. "
#                     "Please verify your setup in the Meta Business Manager."
#                 )
#             raise
        
#     def send_message(self, to_phone, message):
#         """Send WhatsApp message using verified business account"""
#         self.verify_business_account()
        
#         # Clean and format the phone number
#         cleaned_phone = to_phone.lstrip('+').replace(' ', '')
#         if not cleaned_phone.isdigit():
#             raise ValueError("Invalid phone number format")
            
#         headers = {
#             "Authorization": f"Bearer {self.access_token}",
#             "Content-Type": "application/json"
#         }
        
#         payload = {
#             "messaging_product": "whatsapp",
#             "recipient_type": "individual",
#             "to": cleaned_phone,
#             "type": "text",
#             "text": {"preview_url": False, "body": message}
#         }
        
#         try:
#             response = requests.post(
#                 f"{self.base_url}/{self.phone_id}/messages",
#                 json=payload,
#                 headers=headers
#             )
#             response.raise_for_status()
#             return response.json()
#         except requests.exceptions.HTTPError as e:
#             error_msg = e.response.json().get('error', {}).get('message', str(e))
#             current_app.logger.error(f"WhatsApp API Error: {error_msg}")
#             raise

# # Initialize the WhatsApp Business API client
# whatsapp_client = WhatsAppBusinessAPI()

# def send_whatsapp_message(phone, message):
#     """Wrapper function for sending WhatsApp messages"""
#     try:
#         return whatsapp_client.send_message(phone, message)
#     except Exception as e:
#         current_app.logger.error(f"WhatsApp message error: {str(e)}")
#         raise

import requests
import os
from flask import current_app

def clean_phone_number(phone):
    """
    Clean and validate phone number format.
    Returns number in format: "254XXXXXXXXX" (no plus, no spaces)
    """
    # Remove any whitespace, +, or other characters
    cleaned = ''.join(filter(str.isdigit, phone))
    
    # Ensure number starts with country code
    if cleaned.startswith('0'):
        cleaned = '254' + cleaned[1:]
    elif not cleaned.startswith('254'):
        cleaned = '254' + cleaned
        
    return cleaned

def send_whatsapp_message(phone, message):
    """
    Send a WhatsApp message to the specified phone number.
    """
    phone_id = os.getenv('WHATSAPP_PHONE_ID')
    access_token = os.getenv('WHATSAPP_ACCESS_TOKEN')
    
    if not phone_id or not access_token:
        raise ValueError("WhatsApp credentials not configured")
    
    # Clean and format phone number
    cleaned_phone = clean_phone_number(phone)
    
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
    
    try:
        response = requests.post(
            f"https://graph.facebook.com/v22.0/{phone_id}/messages",
            json=payload,
            headers=headers
        )
        
        # Log the full response for debugging
        if response.status_code != 200:
            current_app.logger.error(f"WhatsApp API Error Response: {response.text}")
            error_data = response.json()
            if 'error' in error_data:
                error_msg = error_data['error'].get('message', 'Unknown error')
                if 'not in allowed list' in error_msg.lower():
                    raise Exception(
                        f"Phone number {cleaned_phone} not in WhatsApp test numbers list. "
                        "Please add it in Meta Developer Portal > Getting Started."
                    )
                raise Exception(error_msg)
            
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        error_msg = str(e)
        if hasattr(e, 'response') and e.response is not None:
            try:
                error_data = e.response.json()
                error_msg = error_data.get('error', {}).get('message', str(e))
            except:
                pass
        current_app.logger.error(f"WhatsApp API Error: {error_msg}")
        raise Exception(f"WhatsApp message error: {error_msg}")