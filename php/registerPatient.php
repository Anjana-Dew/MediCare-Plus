<?php
session_start();
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST['user_id'] ?? null;
    $full_name = $_POST['full_name'];
    $gender = $_POST['gender'];
    $dob = $_POST['date_of_birth'];
    $contact = $_POST['contact_number'];
    $address = $_POST['address'];

    if ($user_id) {
        $sql = "INSERT INTO patients (user_id, full_name, gender, date_of_birth, contact_number, address)
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssss", $user_id, $full_name, $gender, $dob, $contact, $address);

        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "User not logged in!";
    }
}
$conn->close();
?>