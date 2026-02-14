<?php
include 'db_connection.php';
session_start();

$action = $_REQUEST['action'] ?? '';

if ($action === 'sendMessage') {
    $user_id = $_POST['user_id']; 
    $message_text = $_POST['message_text'];


    $doctorQuery = $conn->query("SELECT user_id FROM users WHERE role='doctor'");

    while ($doc = $doctorQuery->fetch_assoc()) {
        $doctor_id = $doc['user_id'];

        $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $user_id, $doctor_id, $message_text);
        $stmt->execute();
    }

    echo json_encode(['success' => true]);
    exit;
}


if ($action === 'getMessages') {
    $user_id = $_GET['user_id'];
    $result = $conn->query("
        SELECT sender_id, message_text, MIN(sent_at) as sent_at
        FROM messages
        WHERE sender_id = $user_id OR receiver_id = $user_id
        GROUP BY sender_id, message_text
        ORDER BY sent_at ASC
    ");
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode($messages);
    exit;
}


if ($action === 'getDoctorChats') {
    $doctor_id = $_GET['doctor_id'];

    $result = $conn->query("
        SELECT DISTINCT 
            CASE 
                WHEN sender_id = $doctor_id THEN receiver_id
                ELSE sender_id
            END AS patient_id
        FROM messages
        WHERE sender_id = $doctor_id OR receiver_id = $doctor_id
    ");

    $chats = [];
    while ($row = $result->fetch_assoc()) {
        $chats[] = $row;
    }
    echo json_encode($chats);
    exit;
}


if ($action === 'getConversation') {
    $doctor_id = $_GET['doctor_id'];
    $patient_id = $_GET['patient_id'];
    $result = $conn->query("SELECT * FROM messages WHERE 
        (sender_id = $patient_id AND receiver_id = $doctor_id)
        OR (sender_id = $doctor_id AND receiver_id = $patient_id)
        ORDER BY sent_at ASC");
    $conversation = [];
    while ($row = $result->fetch_assoc()) {
        $conversation[] = $row;
    }
    echo json_encode($conversation);
    exit;
}

if ($action === 'sendReply') {
    $doctor_id = $_POST['doctor_id'];
    $patient_id = $_POST['patient_id'];
    $message_text = $_POST['message_text'];

    $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $doctor_id, $patient_id, $message_text);
    $stmt->execute();

    echo json_encode(['success' => true]);
    exit;
}
?>

