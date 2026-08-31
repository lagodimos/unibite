USE unibite;

INSERT INTO user (user_id, email, first_name, last_name, password_hash)
VALUES
(1, 'papadopoulos@ac.upatras.gr', 'Giannis', 'Papadopoulos', '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c'), -- passwd: 1111
(2, 'mixos@ac.upatras.gr', 'Kostas', 'Mixos', 'edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9'); -- passwd 2222

INSERT INTO admin (admin_id)
VALUES (1);

INSERT INTO student (student_id, points)
VALUES (2, 5);
