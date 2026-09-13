USE unibite;

INSERT INTO user (user_id, email, first_name, last_name, password_hash)
VALUES
(1, 'papadopoulos@ac.upatras.gr', 'Giannis', 'Papadopoulos', '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c'), -- passwd: 1111
(2, 'mixos@ac.upatras.gr', 'Kostas', 'Mixos', 'edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9'), -- passwd 2222
(3, 'pappas@ac.upatras.gr', 'Giorgos', 'Pappas', '318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69'); -- passwd 3333

INSERT INTO admin (admin_id)
VALUES (1);

INSERT INTO student (student_id, points)
VALUES (2, 5),
       (3, 5);

INSERT INTO food_listing (
    listing_id,
    title,
    photo_filename,
    original_photo_filename,
    notes,
    total_portions,
    creation_datetime,
    pickup_datetime,
    pickup_point_description,
    pickup_point_room_number,
    pickup_point_latitude,
    pickup_point_longitude,
    created_by
) VALUES
(
    NULL,    
    'Chicken Sandwich',
    'demo.jpg',
    'demo.jpg',
    'Freshly prepared chicken sandwiches.',
    5,
    NOW(),
    DATE_ADD(NOW(), INTERVAL 16 HOUR),
    'Φοιτητική Εστία Πανεπιστήμιο Πατρών',
    NULL,
    38.2859121,
    21.7890531,
    2
),
(
    NULL,    
    'Souvlakia',
    NULL,
    NULL,
    'Kalamakia kotopoulo',
    5,
    NOW(),
    DATE_ADD(NOW(), INTERVAL 16 HOUR),
    'Φοιτητική Εστία Πανεπιστήμιο Πατρών',
    NULL,
    38.2859121,
    21.7890531,
    3
);

INSERT INTO contains_allergen (
    listing,
    allergen
) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 6),
(2, 7);