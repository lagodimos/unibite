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
    FOREIGN KEY (admin_id)
        REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE student (
    student_id INT PRIMARY KEY,
    points INT NOT NULL,
    FOREIGN KEY (student_id)
        REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE food_listing (
    listing_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    photo_filename VARCHAR(255),
    original_photo_filename VARCHAR(255),
    notes TEXT,
    total_portions INT NOT NULL,
    creation_datetime DATETIME NOT NULL,
    pickup_datetime DATETIME NOT NULL,
    pickup_point_description TEXT NOT NULL,
    pickup_point_room_number VARCHAR(255),
    pickup_point_latitude DECIMAL(9,6) NOT NULL,
    pickup_point_longitude DECIMAL(9,6) NOT NULL,

    created_by INT,
    FOREIGN KEY (created_by)
        REFERENCES student(student_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE reserves_portion (
    status ENUM('requested', 'approved', 'rejected'),
    requested_by INT,
    listing INT,
    received BOOL,
    rating INT,
    PRIMARY KEY (requested_by, listing)
);

CREATE TABLE allergen (
    allergen_id INT PRIMARY KEY AUTO_INCREMENT,
    allergen_name VARCHAR(255) NOT NULL
);

CREATE TABLE contains_allergen (
    listing INT,
    allergen INT,
    PRIMARY KEY (listing, allergen),
    FOREIGN KEY (listing)
        REFERENCES food_listing(listing_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (allergen)
        REFERENCES allergen(allergen_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO allergen (allergen_id, allergen_name)
VALUES
    (1, "gluten"),
    (2, "eggs"),
    (3, "fish"),
    (4, "peanuts"),
    (5, "soybeans"),
    (6, "milk"),
    (7, "nuts"),
    (8, "celery"),
    (9, "mustard"),
    (10, "sesame"),
    (11, "sulphites"),
    (12, "lupin"),
    (13, "molluscs"),
    (14, "crustaceans");
