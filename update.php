<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "imiona";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$id = $_POST['id'];
$flag = $_POST['flaga'];
$nominal = $_POST['nominal'];
$stupka = $_POST['stupka'];
$rok = $_POST['rok'];
$katalog = $_POST['katalog'];
$country = $_POST['country'];

$sql = "UPDATE dane SET Flaga='$flag', Nominal='$nominal', Katalog='$katalog', Stupka='$stupka', Rok='$rok', Kraj='$country' WHERE ID='$id'";

if (mysqli_query($conn, $sql)) {
    echo "Rekord dzuala";
} else {
    echo "Błąd: " . mysqli_error($conn);
}

mysqli_close($conn);
?>