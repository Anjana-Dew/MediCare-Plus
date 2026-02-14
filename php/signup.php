<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = 'patient'; // default role

    $sql = "INSERT INTO users (user_name, email, password, role) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $email, $password, $role);

    if ($stmt->execute()) {
        echo "<script>alert('Sign-up successful! You can now log in.'); window.location='../login.html';</script>";
    } else {
        echo "<script>alert('Error: Username or Email already exists.'); window.location='../login.html';</script>";
    }

    $stmt->close();
}
$conn->close();
?>

