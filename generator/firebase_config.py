import os
import json

def configure_firebase(output_dir):
    service_account = {
        "type": "service_account",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "",
        "universe_domain": "googleapis.com"
    }

    firebase_config_file = os.path.join(output_dir, "service_account.json")
    with open(firebase_config_file, "w") as json_file:
        json.dump(service_account, json_file)
