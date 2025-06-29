<?php
// Enable CORS and JSON output
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include PHPMailer classes
require_once '../assets/vendor/php-email-form/src/PHPMailer.php';
require_once '../assets/vendor/php-email-form/src/SMTP.php';
require_once '../assets/vendor/php-email-form/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if POST fields are set
if (
    isset($_POST['name']) &&
    isset($_POST['email']) &&
    isset($_POST['subject']) &&
    isset($_POST['phone']) &&
    isset($_POST['message'])
) {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $phone   = htmlspecialchars($_POST['phone']);
    $message = nl2br(htmlspecialchars($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        // SMTP server configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'www.mj1999.coder@gmail.com';
        $mail->Password   = 'fkrjqjywtfxnxmnd';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Email setup
        $mail->setFrom('www.mj1999.coder@gmail.com', 'Website Contact Form');
        $mail->addAddress('www.mj1999.coder@gmail.com');
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #f9f9f9;'>
        <div style='text-align: center; padding-bottom: 20px;'>
            <h2 style='color: #0066cc;'>Myn Future</h2>
            <p style='color: #888;'>New Contact Form Submission</p>
        </div>
        <table style='width: 100%; border-collapse: collapse;'>
            <tr>
                <td style='padding: 8px; font-weight: bold;'>Name:</td>
                <td style='padding: 8px;'>$name</td>
            </tr>
            <tr style='background-color: #f0f0f0;'>
                <td style='padding: 8px; font-weight: bold;'>Email:</td>
                <td style='padding: 8px;'>$email</td>
            </tr>
            <tr>
                <td style='padding: 8px; font-weight: bold;'>Phone:</td>
                <td style='padding: 8px;'>$phone</td>
            </tr>
            <tr style='background-color: #f0f0f0;'>
                <td style='padding: 8px; font-weight: bold; vertical-align: top;'>Message:</td>
                <td style='padding: 8px;'>$message</td>
            </tr>
        </table>
        <div style='margin-top: 30px; text-align: center; font-size: 12px; color: #999;'>
            This message was sent from the Myn Future website.
        </div>
    </div>
";


        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Incomplete form data.']);
}
