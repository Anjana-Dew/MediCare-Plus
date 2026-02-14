<?php
include 'db_connection.php';
session_start();

// Make sure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "<script>
        alert('Please log in first to book an appointment.');
        window.location.href = '../login.html';
    </script>";
    exit();
}

$user_id = $_SESSION['user_id'];
$doctor_id = $_POST['doctor_id'] ?? '';
$appointment_date = $_POST['appointment_date'] ?? '';
$appointment_time = $_POST['appointment_time'] ?? '';

if (empty($doctor_id) || empty($appointment_date) || empty($appointment_time)) {
    echo "<script>
        alert('All fields are required.');
        window.history.back();
    </script>";
    exit();
}

// Get patient_id linked to user_id
$stmt = $conn->prepare("SELECT patient_id FROM patients WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$patient = $result->fetch_assoc();

if (!$patient) {
    echo "<script>
        alert('No patient record found. Please complete your profile first.');
        window.location.href = '../userHome.html';
    </script>";
    exit();
}

$patient_id = $patient['patient_id'];
$stmt->close();

// Insert appointment
$stmt = $conn->prepare("
    INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
    VALUES (?, ?, ?, ?)
");
$stmt->bind_param("iiss", $patient_id, $doctor_id, $appointment_date, $appointment_time);

if ($stmt->execute()) {
    echo "<script>
        alert('Appointment booked successfully!');
        window.location.href = '../userHome.html';
    </script>";
} else {
    echo "<script>
        alert('Error booking appointment. Please try again.');
        window.history.back();
    </script>";
}

$stmt->close();
$conn->close();
?>

