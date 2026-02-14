<?php
include("db_connection.php");
header("Content-Type: application/json");


$sql = "SELECT patient_id, full_name, gender, contact_number, address 
        FROM patients
        ORDER BY full_name ASC";
$result = $conn->query($sql);

$patients = [];
while ($row = $result->fetch_assoc()) {
    $patients[] = $row;
}

echo json_encode($patients);
?>
