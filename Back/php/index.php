<?php

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

    var_dump("asdasd");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <?php
            if ($result) {
                while($row = mysqli_fetch_assoc($result)) {
                    echo
                    '<div class="user-card">' .
                        '<img src="' . $row['avatar'] . '">' .
                        '<span>' . $row['name'] . '</span>' .
                        '<span>'. $row['last_name'] . '</span>' .
                    '</div>';
                }
            }
        ?>
    </main>
</body>
</html>