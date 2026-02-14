<?php
include("db_connection.php");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$doctor_id = $data["doctor_id"] ?? null;

if (!$doctor_id) {
    echo json_encode(["status" => "error", "message" => "Doctor ID missing"]);
    exit;
}

// Get the user's ID for that doctor
$sql = "SELECT user_id FROM doctors WHERE doctor_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $doctor_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Doctor not found"]);
    exit;
}

$row = $result->fetch_assoc();
$user_id = $row["user_id"];

// Delete user (which will cascade delete doctor)
$del = $conn->prepare("DELETE FROM users WHERE user_id = ?");
$del->bind_param("i", $user_id);

if ($del->execute()) {
    echo json_encode(["status" => "success", "message" => "Doctor deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete doctor"]);
}
?>
