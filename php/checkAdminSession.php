<?php
session_start();

if(!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["stuatus" => "error", "message" => "Unauthorized"]);
    exit;
}
echo json_encode(["status" => "success","user_id" => $_SESSION['user_id']]);

?>