<?php
$servername = "localhost";
$username = "root";
$password = "Dewmi1234";
$dbname = "medicare_plus";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
