<?php
$to = "recipient@example.com";
$subject = "Test Email";
$message = "This is a test email sent from PHP.";
$headers = "From: your_email@example.com"; // Set the From header

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed.";
}
?>