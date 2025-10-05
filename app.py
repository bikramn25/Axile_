from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Email configuration (you'll need to configure these with your SMTP settings)
SMTP_SERVER = 'smtp.gmail.com'  # Change this to your SMTP server
SMTP_PORT = 587
SMTP_USERNAME = 'your-email@gmail.com'  # Change this to your email
SMTP_PASSWORD = 'your-app-password'  # Change this to your app password

# Recipients
RECIPIENTS = [
    'admin@axile.net',
    'nepaliamar1998@gmail.com',
    'bikramn25@gmail.com'
]

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Get form data
        first_name = request.form.get('firstName', '')
        last_name = request.form.get('lastName', '')
        email = request.form.get('email', '')
        phone = request.form.get('phone', '')
        company = request.form.get('company', '')
        industry = request.form.get('industry', '')
        budget = request.form.get('budget', '')
        message = request.form.get('message', '')
        newsletter = request.form.get('newsletter', '')
        
        # Get selected services
        services = request.form.getlist('services')
        services_text = ', '.join(services) if services else 'None specified'
        
        # Validate required fields
        if not all([first_name, last_name, email, company, message]):
            return jsonify({'error': 'Please fill in all required fields'}), 400
        
        # Create email content
        subject = 'New Contact Form Submission - Axile Website'
        
        email_body = f"""
New contact form submission from Axile website:

Name: {first_name} {last_name}
Email: {email}
Phone: {phone}
Company: {company}
Industry: {industry}
Budget: {budget}
Services Interested In: {services_text}
Newsletter Subscription: {'Yes' if newsletter else 'No'}

Message:
{message}

---
Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
IP Address: {request.remote_addr}
"""
        
        # For demonstration purposes, we'll just log the email content
        # In production, you would configure SMTP settings and send actual emails
        print("=" * 50)
        print("NEW CONTACT FORM SUBMISSION")
        print("=" * 50)
        print(f"To: {', '.join(RECIPIENTS)}")
        print(f"Subject: {subject}")
        print(email_body)
        print("=" * 50)
        
        # Simulate successful email sending
        # In production, uncomment and configure the SMTP code below:
        
        """
        # Create message
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['Subject'] = subject
        msg.attach(MIMEText(email_body, 'plain'))
        
        # Send to all recipients
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        
        for recipient in RECIPIENTS:
            msg['To'] = recipient
            server.send_message(msg)
            del msg['To']
        
        # Send auto-reply
        auto_reply_subject = "Thank you for contacting Axile - We'll be in touch soon!"
        auto_reply_body = f'''
Dear {first_name},

Thank you for reaching out to Axile! We've received your message and will get back to you within 24 hours.

Here's a copy of what you submitted:

Company: {company}
Industry: {industry}
Budget: {budget}
Services: {services_text}

Message: {message}

Best regards,
The Axile Team

---
This is an automated response. Please do not reply to this email.
'''
        
        auto_reply_msg = MIMEText(auto_reply_body, 'plain')
        auto_reply_msg['From'] = SMTP_USERNAME
        auto_reply_msg['To'] = email
        auto_reply_msg['Subject'] = auto_reply_subject
        
        server.send_message(auto_reply_msg)
        server.quit()
        """
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! We\'ll get back to you within 24 hours.'
        })
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({
            'error': 'There was an error sending your message. Please try again.',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)