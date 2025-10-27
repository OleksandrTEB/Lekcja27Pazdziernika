<?php

$host = "localhost";
$dbname = "php";
$user = "root";
$password = "";

$my_sql_connect = new mysqli($host, $user, $password, $dbname);


echo 'INSERT INTO users (name, last_name, avatar) VALUES (' . $_POST['imie']. ',' . $_POST['nazwisko'] . ',' . $_POST['avatar'] . ')';

$sql = 'INSERT INTO users (name, last_name, avatar) VALUES ("'.$_POST['imie'].'" , "'.$_POST['nazwisko'].'" ,"'.$_POST['avatar'].'")';
$result = $my_sql_connect->query($sql);