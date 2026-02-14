<?php
include("db_connection.php");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$full_name = $data["full_name"];
$email = $data["email"];
$username = $data["username"];
$password = password_hash($data["password"], PASSWORD_BCRYPT);
$specialization = $data["specialization"];
$qualification = $data["qualification"];
$experience = $data["experience"];
$consultation_fee = $data["consultation_fee"];
$availability = $data["availability"];

//Insert into users table
$user_sql = "INSERT INTO users (user_name, password, role, email) VALUES (?, ?, 'doctor', ?)";
$user_stmt = $conn->prepare($user_sql);
$user_stmt->bind_param("sss", $username, $password, $email);

if ($user_stmt->execute()) {
    $user_id = $conn->insert_id;

    //Insert into doctors table
    $doctor_sql = "INSERT INTO doctors (user_id, full_name, specialization, qualification, experience, consultation_fee, availability)
                   VALUES (?, ?, ?, ?, ?, ?, ?)";
    $doctor_stmt = $conn->prepare($doctor_sql);
    $doctor_stmt->bind_param("isssids", $user_id, $full_name, $specialization, $qualification, $experience, $consultation_fee, $availability);

    if ($doctor_stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Doctor added successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error inserting doctor data: " . $doctor_stmt->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Error creating user: " . $user_stmt->error]);
}
?>
