<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Database configuration
$host = 'localhost';
$db = 'layali-contact';
$user = 'layali-contact';
$pass = 'layali-contact';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $key = $_POST['key'] ?? '';

    if ($key === 'contact-form') {
        // Contact form processing
        $firstName = $_POST['firstName'] ?? '';
        $lastName = $_POST['lastName'] ?? '';
        $email = $_POST['email'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $message = $_POST['message'] ?? '';

        // Validate required fields
        if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($message)) {
            echo json_encode(["error" => "All fields are required"]);
            exit;
        }

        // Check if email already exists
        $checkEmailStmt = $conn->prepare("SELECT id FROM contacts WHERE email = ?");
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $checkEmailStmt->store_result();

        if ($checkEmailStmt->num_rows > 0) {
            echo json_encode(["error" => "Email already exists"]);
            $checkEmailStmt->close();
            exit;
        }
        $checkEmailStmt->close();

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO contacts (first_name, last_name, email, phone, message, date) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("sssss", $firstName, $lastName, $email, $phone, $message);

        // Execute and respond
        if ($stmt->execute()) {
            echo json_encode(["message" => "Contact form submitted successfully"]);
        } else {
            echo json_encode(["error" => "Failed to submit form"]);
        }

        $stmt->close();
    } elseif ($key === 'subscribe') {
        // Subscription form processing
        $email = $_POST['email'] ?? '';

        // Validate email
        if (empty($email)) {
            echo json_encode(["error" => "Email is required"]);
            exit;
        }

        // Check if email already exists in subscribers table
        $checkEmailStmt = $conn->prepare("SELECT id FROM subscribers WHERE email = ?");
        $checkEmailStmt->bind_param("s", $email);
        $checkEmailStmt->execute();
        $checkEmailStmt->store_result();

        if ($checkEmailStmt->num_rows > 0) {
            echo json_encode(["error" => "Email already subscribed"]);
            $checkEmailStmt->close();
            exit;
        }
        $checkEmailStmt->close();

        // Insert into subscribers table
        $stmt = $conn->prepare("INSERT INTO subscribers (email, date_subscribed) VALUES (?, NOW())");
        $stmt->bind_param("s", $email);

        // Execute and respond
        if ($stmt->execute()) {
            echo json_encode(["message" => "Subscribed successfully"]);
        } else {
            echo json_encode(["error" => "Failed to subscribe"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid key"]);
    }
}

$conn->close();
?>
