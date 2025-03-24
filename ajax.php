<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$database = "imiona";
// mysqli bo prosty projekt i wiadomo z basic mysql wiec PDO raczej nie jest potrzebne 

// do wszsytkich stosowane

$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}


$sql = "SELECT ID, Flaga, Nominal, Katalog, Stupka, Rok, Kraj FROM dane";
$result = mysqli_query($conn, $sql);

$flag_sql = "SELECT Flaga FROM flagi";
$result_flag = mysqli_query($conn, $flag_sql);

$currency_sql = "SELECT Stupki FROM Stupki";
$currency_result = mysqli_query($conn, $currency_sql);


//  wszystkie flagi i stupki z bazy
$flags = [];
$stopy = [];
$data = [];


while ($row = mysqli_fetch_assoc($result_flag)) {
    $flags[] = $row["Flaga"];
}

while ($row = mysqli_fetch_assoc($currency_result)) {
    $stopy[] = $row["Stupki"];
}

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
        // $flags[] = $row['Flaga'];
        // $stopy[] = $row['Stupka'];
    }
}

mysqli_close($conn);

$response = [
    'dane' => $data,
    'Flagi' => $flags,
    'Stopy' => $stopy
];

echo json_encode($response);
?>