<?php
include 'db_connection.php';
session_start();
header('Content-Type: application/json');

// Ensure only admins can access
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];
$roleCheck = $conn->prepare("SELECT role FROM users WHERE user_id = ?");
$roleCheck->bind_param("i", $user_id);
$roleCheck->execute();
$role = $roleCheck->get_result()->fetch_assoc()['role'];
if ($role !== 'admin') {
    echo json_encode(['status' => 'error', 'message' => 'Access denied']);
    exit;
}

$stats = [];

// Total doctors
$stats['total_doctors'] = $conn->query("SELECT COUNT(*) AS c FROM doctors")->fetch_assoc()['c'];

// Total admins
$stats['total_admins'] = $conn->query("SELECT COUNT(*) AS c FROM users WHERE role='admin'")->fetch_assoc()['c'];

// Total patients
$stats['total_patients'] = $conn->query("SELECT COUNT(*) AS c FROM users WHERE role='patient'")->fetch_assoc()['c'];

// Total appointments
$stats['total_appointments'] = $conn->query("SELECT COUNT(*) AS c FROM appointments")->fetch_assoc()['c'];

// Completed appointments
$stats['completed_appointments'] = $conn->query("SELECT COUNT(*) AS c FROM appointments WHERE status='Completed'")->fetch_assoc()['c'];

// Total feedbacks
$stats['total_feedback'] = $conn->query("SELECT COUNT(*) AS c FROM feedback")->fetch_assoc()['c'];

// Average doctor rating
$stats['avg_rating'] = $conn->query("SELECT ROUND(AVG(rating),2) AS avg FROM feedback")->fetch_assoc()['avg'] ?? 0;

echo json_encode(['status' => 'success', 'data' => $stats]);
$conn->close();
?>
