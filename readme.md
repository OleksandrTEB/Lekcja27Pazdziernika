# Notatka z php

## Powłączenie z bazą
`$my_sql_connect = new mysqli($host, $user, $password, $dbname);`

`$my_sql_connect`Referęcja do połączenia

`new mysqli()` tworzenie klasy mysqlli dla połączenia

`($host, $user, $password, $dbname)` argumenyu dla połączenia

## Wyświetlanie na stronie danych

- `echo`
- `print_r()`
- `var_dump()`

## Typy danych

- Number: 234
- String: "asasd"
- boolean: true, false
- Array: []
- Object: {}
- Float: 1.2

## Warnek

`if(warunek) {} else {}`

## Pętle

- `for ($i = 0, warunek, np inkrementacja: i++) {}`
- `foreach(tablia alias element) {}`
- `while(warunek) {}`

## Pisanie skryptu
`<?php` otwieranie skrryptu do pisania `?>` zamykanie

## Wysyłanie pytań do bazy

Referęcja do powączenia np `$my_sql_connect` i wykożystać metodę `$referęcja->query(skrypt)`

## Tablica asocjecyjna

Która jednocześniej jest tablicą np `$arr = ["imie" => "adam", "age" => "30"]`
Taką tablicę można przeksztawcić w zwykłą przez `array_value(tablica)`

## Uruchamianie

- Np. przez dodawanie plików do `htdosc`
- Albo prostrzy w katalogu uruchomić wbudowany server `php -S 0.0.0.0:port`, wtedy możma odłować się do tego wpisując tylko `localhost:port`

## Pisanie HTML w php

Pidanie html można pisać w nawiasach np.

- ''
- ""