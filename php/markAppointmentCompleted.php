<?php
include 'db_connection.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'doctor') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$appointment_id = $_POST['appointment_id'] ?? null;

if (!$appointment_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing appointment ID']);
    exit;
}

$stmt = $conn->prepare("UPDATE appointments SET status = 'Completed' WHERE appointment_id = ?");
$stmt->bind_param("i", $appointment_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Appointment marked as completed']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}

$stmt->close();
$conn->close();
?>
