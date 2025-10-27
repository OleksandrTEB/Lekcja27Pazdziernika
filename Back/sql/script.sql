CREATE DATABASE php;

USE php;


CREATE TABLE users
(
  id       BIGINT AUTO_INCREMENT PRIMARY KEY,
  name varchar(200) NOT NULL,
  last_name varchar(200) NOT NULL,
  avatar text NOT NULL
);