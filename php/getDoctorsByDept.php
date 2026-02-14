<?php
include 'db_connection.php';
header('Content-Type: application/json');

$department = $_GET['department'] ?? '';

if(!$department){
    echo json_encode([]);
    exit();
}

$stmt = $conn->prepare("SELECT doctor_id, full_name AS name, consultation_fee 
                        FROM doctors 
                        WHERE specialization = ?");
$stmt->bind_param("s", $department);
$stmt->execute();
$result = $stmt->get_result();

$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}
echo json_encode($doctors);
$stmt->close();
$conn->close();
?>
