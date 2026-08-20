DROP DATABASE IF EXISTS unibite;
CREATE DATABASE unibite;

USE unibite;

CREATE TABLE user (
    email VARCHAR(255) PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE admin (
    email VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (email) REFERENCES user(email)
);

CREATE TABLE student (
    email VARCHAR(255) PRIMARY KEY,
    points INT NOT NULL,
    FOREIGN KEY (email) REFERENCES user(email)
);