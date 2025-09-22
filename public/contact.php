<?php
// Simple PHP mail handler for Hostinger
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method Not Allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
  // Fallback to form-encoded
  $data = $_POST;
}

$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ?? '');
$email = trim($data['email'] ?? '');
$company = trim($data['company'] ?? '');
$message = trim($data['message'] ?? '');
$page = trim($data['page'] ?? '');

if ($firstName === '' || $lastName === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid email']);
  exit;
}

$to = getenv('CONTACT_TO') ?: 'lukasz.adms@gmail.com';
$from = getenv('CONTACT_FROM');
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
if (!$from) {
  $from = 'no-reply@' . preg_replace('/^www\./', '', $host);
}
$subject = 'Neue Kontaktanfrage von ' . $firstName . ' ' . $lastName;

$body = "Name: {$firstName} {$lastName}\n" .
        "E-Mail: {$email}\n" .
        "Unternehmen: {$company}\n" .
        "Seite: {$page}\n\n" .
        "Nachricht:\n{$message}\n";

$headers = [];
$headers[] = 'From: Website <' . $from . '>';
$headers[] = 'Reply-To: ' . $firstName . ' ' . $lastName . ' <' . $email . '>';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$success = @mail($to, $subject, $body, implode("\r\n", $headers), '-f ' . $from);

if ($success) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Mail send failed']);
}
