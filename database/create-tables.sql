DROP DATABASE IF EXISTS unibite;
CREATE DATABASE unibite;

USE unibite;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE admin (
    admin_id INT PRIMARY KEY,
    FOREIGN KEY (admin_id) REFERENCES user(user_id)
);

CREATE TABLE student (
    student_id INT PRIMARY KEY,
    points INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES user(user_id)
);

CREATE TABLE food_listing (
    listing_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    photo_filename VARCHAR(255),
    notes TEXT,
    total_portions INT NOT NULL,
    creation_datetime DATETIME NOT NULL,
    pickup_datetime DATETIME NOT NULL,
    pickup_point_description TEXT NOT NULL,
    pickup_point_room_number INT,
    pickup_point_latitude DECIMAL(9,6) NOT NULL,
    pickup_point_lontitude DECIMAL(9,6) NOT NULL,
    
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES student(student_id)
);

CREATE TABLE reserves_portion (
    status ENUM('REQUESTED', 'APPROVED', 'REJECTED', 'RECEIVED', 'RATED'),
    reserved_by INT,
    listing INT,
    rating INT,
    PRIMARY KEY (reserved_by, listing)
);

CREATE TABLE allergen (
    allergen_id INT PRIMARY KEY,
    allergen_name VARCHAR(255) NOT NULL
);

CREATE TABLE contains_allergen (
    listing INT,
    allergen INT,
    PRIMARY KEY (listing, allergen)
);