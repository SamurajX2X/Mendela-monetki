<?php
// ad
$servername = "localhost";
$username = "root";
$password = "";
$database = "imiona";

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$flag = $_POST['flags'];
$nominal = $_POST['nominal'];
$stupka = $_POST['stupka'];
$rok = $_POST['rok'];
$katalog = $_POST['katalog'];
$country = $_POST['country'];

$sql = "INSERT INTO dane (Flaga, Nominal, Katalog, Stupka, Rok, Kraj) VALUES ('$flag', '$nominal', '$katalog', '$stupka', '$rok', '$country')";

if (mysqli_query($conn, $sql)) {
    echo "Rekord został dodany pomyślnie";
} else {
    echo "Błąd: " . mysqli_error($conn);
}

mysqli_close($conn);
?>