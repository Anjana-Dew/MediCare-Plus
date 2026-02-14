<?php
include("db_connection.php");
session_start();
header("Content-Type: application/json");

// Only admin should access
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["status" => "unauthorized", "message" => "Access denied"]);
    exit;
}

$sql = "SELECT 
            mr.report_id,
            mr.report_title,
            mr.report_file,
            mr.date_uploaded,
            p.full_name AS patient_name,
            d.full_name AS doctor_name
        FROM medical_reports mr
        LEFT JOIN patients p ON mr.patient_id = p.patient_id
        LEFT JOIN doctors d ON mr.doctor_id = d.doctor_id
        ORDER BY mr.date_uploaded DESC";

$result = $conn->query($sql);
$reports = [];

while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

echo json_encode(["status" => "success", "data" => $reports]);
$conn->close();
?>
