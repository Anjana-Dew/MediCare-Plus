<?php
session_start();
include("db_connection.php");

header('Content-Type: application/json');

// Check if the user is logged in and is a patient
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'patient') {
    echo json_encode([
        "status" => "unauthorized",
        "message" => "Please log in to view your reports."
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Get the patient_id for this user
$patientQuery = $conn->prepare("SELECT patient_id FROM patients WHERE user_id = ?");
$patientQuery->bind_param("i", $user_id);
$patientQuery->execute();
$patientResult = $patientQuery->get_result();
$patientRow = $patientResult->fetch_assoc();

if (!$patientRow) {
    echo json_encode(["status" => "error", "message" => "Patient record not found."]);
    exit;
}

$patient_id = $patientRow['patient_id'];

// Fetch reports related to this patient
$sql = "
    SELECT 
        mr.report_id,
        mr.report_title,
        mr.report_file,
        mr.date_uploaded,
        d.full_name AS doctor_name
    FROM medical_reports mr
    LEFT JOIN doctors d ON mr.doctor_id = d.doctor_id
    WHERE mr.patient_id = ?
    ORDER BY mr.date_uploaded DESC
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

echo json_encode($reports);
?>
