<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Adjust path to your cloned PHPMailer source
require '../assets/vendor/php-email-form/src/Exception.php';
require '../assets/vendor/php-email-form/src/PHPMailer.php';
require '../assets/vendor/php-email-form/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$subject || !$phone || !$message) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$mail = new PHPMailer(true);
try {
    // SMTP Settings
     $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'muhsintp.develop@gmail.com'; // Your Gmail address
        $mail->Password = 'mmuk lrmn hcpp hyyg';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

    // Email Details
    $mail->setFrom('your_email@gmail.com', 'MYN Future Website');
    $mail->addAddress('your_email@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "Contact Form: $subject";
    $mail->Body = "
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Message:</strong><br>$message</p>
    ";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Message sent successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Mailer Error: " . $mail->ErrorInfo]);
}
