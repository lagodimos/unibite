USE unibite;

INSERT INTO user (email, password_hash)
VALUES
('user1@ac.upatras.gr', '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c'), -- passwd: 1111
('user2@ac.upatras.gr', 'edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9'); -- passwd 2222

INSERT INTO admin (email)
VALUES ('user1@ac.upatras.gr');

INSERT INTO student (email, points)
VALUES ('user2@ac.upatras.gr', 5);
