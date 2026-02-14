<?php
include 'db_connection.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE user_name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['password']) || $password === $row['password']) {
            $_SESSION['user_name'] = $row['user_name'];
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['role'] = $row['role'];

            if ($row['role'] === 'patient') {
                header("Location: ../userHome.html");
            } elseif ($row['role'] === 'doctor') {
                header("Location: ../doctorHome.html");
            } elseif ($row['role'] === 'admin') {
                header("Location: ../adminHome.html");
            } else {
                header("Location: ../login.html");
            }
            exit();
        } else {
            echo "<script>alert('Invalid password'); window.location='../login.html';</script>";
        }
    } else {
        echo "<script>alert('User not found'); window.location='../login.html';</script>";
    }

    $stmt->close();
}

$conn->close();
?>



