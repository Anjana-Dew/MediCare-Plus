<?php
include 'db_connection.php';
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'doctor') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$user_id = $_SESSION['user_id'];

// ✅ Get doctor_id using user_id
$docQuery = $conn->prepare("SELECT doctor_id FROM doctors WHERE user_id = ?");
$docQuery->bind_param("i", $user_id);
$docQuery->execute();
$res = $docQuery->get_result();
if ($res->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Doctor not found']);
    exit;
}
$doctor_id = $res->fetch_assoc()['doctor_id'];

// 🩺 Appointments Today
$todayQuery = $conn->prepare("
    SELECT COUNT(*) AS total_today 
    FROM appointments 
    WHERE doctor_id = ? AND appointment_date = CURDATE()
");
$todayQuery->bind_param("i", $doctor_id);
$todayQuery->execute();
$todayResult = $todayQuery->get_result()->fetch_assoc();
$appointments_today = $todayResult['total_today'] ?? 0;

// 👥 Total Patients (distinct)
$totalPatientsQuery = $conn->prepare("
    SELECT COUNT(DISTINCT patient_id) AS total_patients 
    FROM appointments 
    WHERE doctor_id = ?
");
$totalPatientsQuery->bind_param("i", $doctor_id);
$totalPatientsQuery->execute();
$totalPatientsResult = $totalPatientsQuery->get_result()->fetch_assoc();
$total_patients = $totalPatientsResult['total_patients'] ?? 0;

// 💬 New Feedback (within 7 days)
$newFeedbackQuery = $conn->prepare("
    SELECT COUNT(*) AS total_feedback 
    FROM feedback 
    WHERE doctor_id = ? AND feedback_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
");
$newFeedbackQuery->bind_param("i", $doctor_id);
$newFeedbackQuery->execute();
$newFeedbackResult = $newFeedbackQuery->get_result()->fetch_assoc();
$new_feedback = $newFeedbackResult['total_feedback'] ?? 0;

// 🗓️ Today’s Appointments List
$todayAppointmentsQuery = $conn->prepare("
    SELECT a.appointment_time, p.full_name 
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    WHERE a.doctor_id = ? AND a.appointment_date = CURDATE()
    ORDER BY a.appointment_time ASC
");
$todayAppointmentsQuery->bind_param("i", $doctor_id);
$todayAppointmentsQuery->execute();
$todayAppointmentsResult = $todayAppointmentsQuery->get_result();
$todays_appointments = [];
while ($row = $todayAppointmentsResult->fetch_assoc()) {
    $todays_appointments[] = $row;
}

// 📝 Recent Feedbacks (limit 2)
$recentFeedbackQuery = $conn->prepare("
    SELECT f.comment, f.rating, p.full_name 
    FROM feedback f
    JOIN patients p ON f.patient_id = p.patient_id
    WHERE f.doctor_id = ?
    ORDER BY f.feedback_date DESC
    LIMIT 2
");
$recentFeedbackQuery->bind_param("i", $doctor_id);
$recentFeedbackQuery->execute();
$recentFeedbackResult = $recentFeedbackQuery->get_result();
$recent_feedback = [];
while ($row = $recentFeedbackResult->fetch_assoc()) {
    $recent_feedback[] = $row;
}

// ✅ Return everything as JSON
echo json_encode([
    'status' => 'success',
    'appointments_today' => $appointments_today,
    'total_patients' => $total_patients,
    'new_feedback' => $new_feedback,
    'todays_appointments' => $todays_appointments,
    'recent_feedback' => $recent_feedback
]);

$conn->close();
?>
