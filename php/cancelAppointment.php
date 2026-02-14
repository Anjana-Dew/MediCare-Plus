<?php
include 'db_connection.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'patient') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$appointment_id = $data['appointment_id'] ?? null;

if (!$appointment_id) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid appointment ID']);
    exit;
}

$sql = "UPDATE appointments a
        JOIN patients p ON a.patient_id = p.patient_id
        SET a.status = 'Cancelled'
        WHERE a.appointment_id = ? AND p.user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $appointment_id, $_SESSION['user_id']);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['status' => 'success', 'message' => 'Appointment cancelled successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Unable to cancel appointment.']);
}

$stmt->close();
$conn->close();
?>
