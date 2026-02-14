<?php
include 'db_connection.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'doctor') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$user_id = $_SESSION['user_id'];

// ✅ Get the actual doctor_id from the doctors table using user_id
$doctorQuery = $conn->prepare("SELECT doctor_id FROM doctors WHERE user_id = ?");
$doctorQuery->bind_param("i", $user_id);
$doctorQuery->execute();
$doctorResult = $doctorQuery->get_result();

if ($doctorResult->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Doctor not found']);
    exit;
}

$doctorRow = $doctorResult->fetch_assoc();
$doctor_id = $doctorRow['doctor_id'];

$sql = "SELECT f.feedback_id, f.patient_id, f.rating, f.comment, f.feedback_date, 
               p.full_name AS patient_name
        FROM feedback f
        JOIN patients p ON f.patient_id = p.patient_id
        WHERE f.doctor_id = ?
        ORDER BY f.feedback_date DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();

$feedbacks = [];
while ($row = $result->fetch_assoc()) {
    $feedbacks[] = $row;
}

echo json_encode([
    'status' => 'success',
    'feedback' => $feedbacks
]);

$stmt->close();
$conn->close();
?>
