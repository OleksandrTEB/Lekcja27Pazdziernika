<?php


header("Content-Type: application/json");


$host = "localhost";
$dbname = "php";
$user = "root";
$password = "";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
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
        } else {
            http_response_code(400);
        }
        break;

    case '/getAllUsers':
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $stmt = $pdo->prepare("SELECT * FROM users");
            $stmt->execute();

            $users = $stmt->fetchAll();

            http_response_code(200);
            echo json_encode([
                "users" => $users
            ]);
        }
        break;

    case '/deleteUser':
        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);

            $id = $input['id'];

            $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
            $stmt->execute([
                "id" => $id
            ]);

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => "Użytkownik został usunięty"
            ]);
        }
        break;

    case '/getUserFromId':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);

            $id = $input['id'];

            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->execute([
                "id" => $id
            ]);

            $user = $stmt->fetch();

            echo json_encode([
                "user" => $user
            ]);

            http_response_code(200);
        }
        break;

    case '/editUser':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);

            $id = $input['id'];
            $name = $input['name'];
            $last_name = $input['last_name'];
            $avatar = $input['avatar'];

            $stmt = $pdo->prepare("UPDATE users SET name = :name, last_name = :last_name, avatar = :avatar WHERE id = :id");
            $stmt->execute([
                "id" => $id,
                "name" => $name,
                "last_name" => $last_name,
                "avatar" => $avatar
            ]);

            http_response_code(200);
        }
        break;
}