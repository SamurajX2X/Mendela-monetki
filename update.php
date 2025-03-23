<?php
// update.php
$servername = "localhost";
$username = "root";
$password = "";
$database = "imiona";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$id = $_POST['edit-id'];
$flag = $_POST['edit-flaga'];
$nominal = $_POST['edit-nominal'];
$stupka = $_POST['edit-stupka'];
$rok = $_POST['edit-rok'];
$katalog = $_POST['edit-katalog'];
$country = $_POST['edit-country'];

$sql = "UPDATE dane SET Flaga='$flag', Nominal='$nominal', Katalog='$katalog', Stupka='$stupka', Rok='$rok', Kraj='$country' WHERE ID='$id'";

if (mysqli_query($conn, $sql)) {
    echo "Rekord dzuala";
} else {
    echo "Błąd: " . mysqli_error($conn);
}

mysqli_close($conn);
?>