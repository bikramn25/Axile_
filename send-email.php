<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$company = $_POST['company'] ?? '';
$industry = $_POST['industry'] ?? '';
$budget = $_POST['budget'] ?? '';
$message = $_POST['message'] ?? '';
$newsletter = $_POST['newsletter'] ?? '';

// Get selected services
$services = $_POST['services'] ?? [];
if (is_array($services)) {
    $servicesText = implode(', ', $services);
} else {
    $servicesText = $services;
}

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($company) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter a valid email address']);
    exit;
}

// Email recipients
$recipients = [
    'admin@axile.net',
    'nepaliamar1998@gmail.com',
    'bikramn25@gmail.com'
];

// Email subject
$subject = 'New Contact Form Submission - Axile Website';

// Email body
$emailBody = "
New contact form submission from Axile website:

Name: {$firstName} {$lastName}
Email: {$email}
Phone: {$phone}
Company: {$company}
Industry: {$industry}
Budget: {$budget}
Services Interested In: {$servicesText}
Newsletter Subscription: " . ($newsletter ? 'Yes' : 'No') . "

Message:
{$message}

---
Submitted on: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = [
    'From: noreply@axile.net',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

$headersString = implode("\r\n", $headers);

// Send email to all recipients
$success = true;
$errors = [];

foreach ($recipients as $recipient) {
    if (!mail($recipient, $subject, $emailBody, $headersString)) {
        $success = false;
        $errors[] = "Failed to send email to {$recipient}";
    }
}

// Send auto-reply to the sender
$autoReplySubject = 'Thank you for contacting Axile - We\'ll be in touch soon!';
$autoReplyBody = "
Dear {$firstName},

Thank you for reaching out to Axile! We've received your message and will get back to you within 24 hours.

Here's a copy of what you submitted:

Company: {$company}
Industry: {$industry}
Budget: {$budget}
Services: {$servicesText}

Message: {$message}

Best regards,
The Axile Team

---
This is an automated response. Please do not reply to this email.
";

$autoReplyHeaders = [
    'From: admin@axile.net',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

mail($email, $autoReplySubject, $autoReplyBody, implode("\r\n", $autoReplyHeaders));

// Return response
if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We\'ll get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'There was an error sending your message. Please try again.',
        'details' => $errors
    ]);
}
?>