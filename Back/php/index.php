<?php

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$host = "localhost";
$dbname = "php";
$user = "root";
$password = "";

$my_sql_connect = new mysqli($host, $user, $password, $dbname);

if ($my_sql_connect->connect_error) {
    echo "Error";
} else {
    echo "Powłączono" . "</br>";
    echo "Users:" . "</br>";

    $sql = 'SELECT * FROM users';
    $result = $my_sql_connect->query($sql);

    if ($result) {
        while($row = mysqli_fetch_assoc($result)) {
            echo "Id: " . $row['id'] . "</br>";
            echo "Imie: " . $row['name'] . " " . $row['last_name'] . "</br>";
        }
    }
}