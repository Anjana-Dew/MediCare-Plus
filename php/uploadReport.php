<?php
session_start();
include("db_connection.php");

header('Content-Type: application/json'); // Always respond as JSON
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'doctor') {
    echo json_encode(["status" => "error", "message" => "Unauthorized access."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_SESSION['user_id'];
    $patient_id = $_POST['patient_id'];
    $report_title = trim($_POST['report_title']);
    $file = $_FILES['report_file'];

    //Get doctor_id that matches this user_id
    $doctorQuery = $conn->prepare("SELECT doctor_id FROM doctors WHERE user_id = ?");
    $doctorQuery->bind_param("i", $user_id);
    $doctorQuery->execute();
    $doctorResult = $doctorQuery->get_result();
    $doctorRow = $doctorResult->fetch_assoc();

    if (!$doctorRow) {
        echo json_encode(["status" => "error", "message" => "Doctor not found in database."]);
        exit;
    }

    $doctor_id = $doctorRow['doctor_id'];

    //Validation
    if (empty($patient_id) || empty($report_title) || empty($file['name'])) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    //File upload settings
    $targetDir = "../uploads/reports/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $fileName = time() . "_" . basename($file["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    if ($fileType != "pdf") {
        echo json_encode(["status" => "error", "message" => "Only PDF files allowed."]);
        exit;
    }

    //Move file and save to database
    if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
        $sql = "INSERT INTO medical_reports (patient_id, doctor_id, report_title, report_file) 
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiss", $patient_id, $doctor_id, $report_title, $fileName);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Report uploaded successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>

