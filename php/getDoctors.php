<?php
include("db_connection.php");
header("Content-Type: application/json");

$sql = "SELECT d.doctor_id, d.full_name, d.specialization, u.email 
        FROM doctors d
        JOIN users u ON d.user_id = u.user_id
        ORDER BY d.doctor_id ASC";

$result = $conn->query($sql);
$doctors = [];

while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

echo json_encode($doctors);
?>
