<?php 
session_start(); 
header('Content-Type: application/json'); 

if (isset($_SESSION['user_name']) && isset($_SESSION['user_id'])) { 
    echo json_encode([ 
    'loggedIn' => true,
    'username' => $_SESSION['user_name'], 
    'user_id' => $_SESSION['user_id'],
    'role' => $_SESSION['role'] ?? null 
]); 
} else { echo json_encode(['loggedIn' => false]); } 
    
?>
