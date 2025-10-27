<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$dbname = "php";
$user = "root";
$password = "";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$pdo = new PDO($dsn, $user, $password, $options);

$fullUrl = $_SERVER['REQUEST_URI'];
$scriptName = $_SERVER['SCRIPT_NAME'];

$url = substr($fullUrl, strlen($scriptName));

switch ($url) {
    case '/addUser':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);

            $name = $input['name'];
            $last_name = $input['last_name'];
            $avatar = $input['avatar'];

            $stmt = $pdo->prepare("INSERT INTO users (name, last_name, avatar) VALUES (:name, :last_name, :avatar)");
            $stmt->execute([
                'name' => $name,
                'last_name' => $last_name,
                'avatar' => $avatar
            ]);

            http_response_code(201);
            echo json_encode([
                "success" => true
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "success" => false
            ]);
        }
        break;

    case '/getAllUsers':
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $stmt = $pdo->prepare("SELECT * FROM users");
            $stmt->execute();

            $users = $stmt->fetchAll();

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "users" => $users
            ]);
        }
}