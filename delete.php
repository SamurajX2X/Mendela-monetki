<?php
// delete.php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$database = "imiona";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$id = $_GET['id'];
$sql = "DELETE FROM dane WHERE ID='$id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => mysqli_error($conn)]);
}

mysqli_close($conn);
?>