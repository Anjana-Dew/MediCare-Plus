<?php
session_start();
include("db_connection.php");
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'patient') {
    echo json_encode(["status" => "error", "message" => "Please log in to submit feedback."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $patient_user_id = $_SESSION['user_id'];

    $stmt = $conn->prepare("SELECT patient_id FROM patients WHERE user_id = ?");
    $stmt->bind_param("i", $patient_user_id);
    $stmt->execute();
    $stmt->bind_result($patient_id);
    $stmt->fetch();
    $stmt->close();

    if (!$patient_id) {
        echo json_encode(["status" => "error", "message" => "Patient record not found."]);
        exit;
    }

    $doctor_id = $_POST['doctor_id'];
    $rating = $_POST['rating'];
    $comment = trim($_POST['comment']);

    if (empty($doctor_id) || empty($rating) || empty($comment)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    // Insert feedback
    $stmt = $conn->prepare("INSERT INTO feedback (patient_id, doctor_id, rating, comment) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $patient_id, $doctor_id, $rating, $comment);

    if ($stmt->execute()) {
        // Update doctor average rating
        $avgQuery = "UPDATE doctors d 
                     SET d.rating = (
                         SELECT ROUND(AVG(f.rating), 2)
                         FROM feedback f
                         WHERE f.doctor_id = d.doctor_id
                     )
                     WHERE d.doctor_id = ?";
        $avgStmt = $conn->prepare($avgQuery);
        $avgStmt->bind_param("i", $doctor_id);
        $avgStmt->execute();
        $avgStmt->close();

        echo json_encode(["status" => "success", "message" => "Thank you for your feedback!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
