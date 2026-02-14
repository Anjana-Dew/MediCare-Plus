<?php
include("db_connection.php");
header('Content-Type: application/json');

$sql = "SELECT doctor_id, full_name, specialization FROM doctors ORDER BY full_name ASC";
$result = $conn->query($sql);

$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

echo json_encode(["status" => "success", "doctors" => $doctors]);
?>
