<?php
include 'db_connection.php';
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'doctor') {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Step 1: Get the logged-in doctor's doctor_id using their user_id
$user_id = $_SESSION['user_id'];

$doctorQuery = $conn->prepare("SELECT doctor_id FROM doctors WHERE user_id = ?");
$doctorQuery->bind_param("i", $user_id);
$doctorQuery->execute();
$doctorResult = $doctorQuery->get_result();

if ($doctorResult->num_rows === 0) {
    echo json_encode(['error' => 'Doctor record not found']);
    exit;
}

$doctorRow = $doctorResult->fetch_assoc();
$doctor_id = $doctorRow['doctor_id'];

// Step 2: Fetch the appointments linked to this doctor_id
$query = "
    SELECT 
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        p.full_name AS patient_name,
        u.email AS patient_email
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN users u ON p.user_id = u.user_id
    WHERE a.doctor_id = ?
    ORDER BY a.appointment_date ASC, a.appointment_time ASC
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

header('Content-Type: application/json');
echo json_encode($appointments);
?>

