from flask import current_app
import requests
import os
from datetime import datetime

class WhatsAppAuthDiagnostic:
    def __init__(self):
        self.base_url = "https://graph.facebook.com/v17.0"
        self.phone_id = os.getenv('WHATSAPP_PHONE_ID')
        self.access_token = os.getenv('WHATSAPP_ACCESS_TOKEN')
        self.results = []
    
    def log_result(self, test_name, success, message):
        self.results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })

    def check_environment_variables(self):
        try:
            if not self.phone_id:
                self.log_result('Environment Variables', False, 'WHATSAPP_PHONE_ID is missing')
                return False
            if not self.access_token:
                self.log_result('Environment Variables', False, 'WHATSAPP_ACCESS_TOKEN is missing')
                return False
            
            self.log_result('Environment Variables', True, 'All required environment variables are present')
            return True
        except Exception as e:
            self.log_result('Environment Variables', False, f'Error checking environment variables: {str(e)}')
            return False

    def verify_access_token(self):
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(
                f"{self.base_url}/debug_token?input_token={self.access_token}",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                self.log_result('Access Token', True, 'Access token is valid')
                return True
            else:
                self.log_result('Access Token', False, f'Access token validation failed: {response.text}')
                return False
        except Exception as e:
            self.log_result('Access Token', False, f'Error verifying access token: {str(e)}')
            return False

    def verify_phone_id(self):
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(
                f"{self.base_url}/{self.phone_id}",
                headers=headers
            )
            
            if response.status_code == 200:
                self.log_result('Phone ID', True, 'Phone ID is valid and accessible')
                return True
            else:
                self.log_result('Phone ID', False, f'Phone ID verification failed: {response.text}')
                return False
        except Exception as e:
            self.log_result('Phone ID', False, f'Error verifying phone ID: {str(e)}')
            return False

    def verify_business_account(self):
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
        
        # Try verifying through the phone number endpoint instead
            response = requests.get(
                f"{self.base_url}/{self.phone_id}",
                headers=headers
            )
        
            if response.status_code == 200:
                # Check if we can access the messaging capability
                msg_response = requests.get(
                    f"{self.base_url}/{self.phone_id}/messages?limit=1",
                    headers=headers
                )
            if msg_response.status_code in [200, 401]:
                return True
                
            return False
        except Exception as e:
            current_app.logger.error(f"Business verification error: {str(e)}")
            raise
        
    def verify_business_account(self):
    # """Verify if the WhatsApp Business Account is properly set up"""
        if not self.phone_id or not self.access_token:
            raise ValueError("Missing WhatsApp credentials")
        
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
    
        try:
        # Verify the phone number directly
            phone_response = requests.get(
                f"{self.base_url}/{self.phone_id}",
                headers=headers
            )
            phone_response.raise_for_status()
        
            return True
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 400:
                current_app.logger.error(
                "WhatsApp phone number not properly configured. "
                "Please verify your setup in the Meta Business Manager."
            )
        raise

    def run_diagnostics(self):
        print("Starting WhatsApp Authentication Diagnostics...")
        
        env_check = self.check_environment_variables()
        if not env_check:
            print("❌ Environment variables check failed. Please fix before continuing.")
            return self.results
            
        self.verify_access_token()
        self.verify_phone_id()
        self.verify_business_account()
        
        return self.results

def main():
    diagnostic = WhatsAppAuthDiagnostic()
    results = diagnostic.run_diagnostics()
    
    print("\nDiagnostic Results:")
    print("=" * 50)
    for result in results:
        status = "✅" if result['success'] else "❌"
        print(f"\n{status} {result['test']}:")
        print(f"   Message: {result['message']}")
        print(f"   Time: {result['timestamp']}")

if __name__ == "__main__":
    main()