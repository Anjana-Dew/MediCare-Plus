<?php
include("db_connection.php");
session_start();
header("Content-Type: application/json");

// Only admin can delete
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["status" => "unauthorized", "message" => "Access denied"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$report_id = $data['report_id'] ?? null;

if (!$report_id) {
    echo json_encode(["status" => "error", "message" => "Invalid report ID"]);
    exit;
}

// Optionally delete the actual file if stored locally
$stmt = $conn->prepare("SELECT report_file FROM medical_reports WHERE report_id = ?");
$stmt->bind_param("i", $report_id);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    $filePath = "../uploads/" . $row['report_file'];
    if (file_exists($filePath)) {
        unlink($filePath); // Delete the file
    }
}
$stmt->close();

// Delete report from database
$stmt = $conn->prepare("DELETE FROM medical_reports WHERE report_id = ?");
$stmt->bind_param("i", $report_id);
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Report deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete report"]);
}

$stmt->close();
$conn->close();
?>
