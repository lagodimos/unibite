USE unibite;

-- Demo users. Passwords are the 4-digit codes in the trailing comments.
INSERT INTO user (user_id, email, first_name, last_name, password_hash)
VALUES
(1, 'panagiotis@ac.upatras.gr', 'Παναγιώτης', 'Αντωνίου',    '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c'), -- passwd: 1111
(2, 'eleni@ac.upatras.gr',      'Ελένη',      'Καραγιάννη',  'edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9'), -- passwd: 2222
(3, 'nikos@ac.upatras.gr',      'Νίκος',      'Δημητρίου',   '318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69'), -- passwd: 3333
(4, 'maria@ac.upatras.gr',      'Μαρία',      'Σταθοπούλου', '79f06f8fde333461739f220090a23cb2a79f6d714bee100d0e4b4af249294619'), -- passwd: 4444
(5, 'kostas@ac.upatras.gr',     'Κώστας',     'Βλάχος',      'c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525'); -- passwd: 5555

INSERT INTO admin (admin_id)
VALUES (1);

INSERT INTO student (student_id, points)
VALUES (2, 7),
       (3, 6),
       (4, 4),
       (5, 8);

-- Listings.
-- Ενεργή    : < 48h old, portions still available
-- Ανενεργή  : < 48h old, every portion taken
-- Διεγραμμένη: > 48h old, kept in the database for statistics
INSERT INTO food_listing (
    listing_id, title, photo_filename, original_photo_filename, notes,
    total_portions, creation_datetime, pickup_datetime,
    pickup_point_description, pickup_point_room_number,
    pickup_point_latitude, pickup_point_longitude, created_by
) VALUES
(1, 'Σουβλάκι με πίτα', 'souvlaki.jpg', 'souvlaki.jpg',
 'Έφτιαξα παραπάνω για τους συγκάτοικους. Τυλιχτά με τζατζίκι και πατάτες.',
 5, NOW() - INTERVAL 3 HOUR, NOW() + INTERVAL 5 HOUR,
 'Φοιτητική Εστία Πανεπιστημίου Πατρών', 'B212', 38.2859121, 21.7890531, 2),

(2, 'Μουσακάς', 'moussaka.jpg', 'moussaka.jpg',
 'Ταψί μουσακά που δεν θα φάμε ποτέ μόνοι μας. Περισσεύουν 4 μερίδες.',
 4, NOW() - INTERVAL 6 HOUR, NOW() + INTERVAL 20 HOUR,
 'Τμήμα Μηχανικών Η/Υ και Πληροφορικής', NULL, 38.2901969, 21.7950186, 3),

(3, 'Χωριάτικη σαλάτα με τζατζίκι', 'greek_salad.jpg', 'greek_salad.jpg',
 'Φρέσκια, φτιαγμένη το πρωί. Ιδανική για μεσημέρι στη σχολή.',
 3, NOW() - INTERVAL 2 HOUR, NOW() + INTERVAL 3 HOUR,
 'Πρυτανεία', NULL, 38.2862367, 21.7871492, 4),

(4, 'Ντολμαδάκια', 'gemista.jpg', 'gemista.jpg',
 'Σπιτικά ντολμαδάκια από τη γιαγιά. Μόνο 2 μερίδες, όποιος προλάβει.',
 2, NOW() - INTERVAL 10 HOUR, NOW() + INTERVAL 2 HOUR,
 'Φοιτητική Εστία Πανεπιστημίου Πατρών', 'A104', 38.2859121, 21.7890531, 2),

(5, 'Παστίτσιο', 'pastitsio.jpg', 'pastitsio.jpg',
 'Μαγείρεψα για όλη την εβδομάδα και περίσσεψε. Ζεσταίνεται εύκολα.',
 6, NOW() - INTERVAL 26 HOUR, NOW() - INTERVAL 2 HOUR,
 'Τμήμα Πολιτικών Μηχανικών', NULL, 38.2889372, 21.7902486, 5),

(6, 'Σπανακόπιτα', 'spanakopita.jpg', 'spanakopita.jpg',
 'Χωριάτικη σπανακόπιτα, κομμένη σε μερίδες.',
 4, NOW() - INTERVAL 30 HOUR, NOW() - INTERVAL 6 HOUR,
 'Τμήμα Ηλεκτρολόγων Μηχανικών και Τεχνολογίας Υπολογιστών', NULL, 38.2882207, 21.7892796, 3),

(7, 'Τυρόπιτα', 'tiropita.jpg', 'tiropita.jpg',
 'Ζεστή τυρόπιτα από τον φούρνο της εστίας.',
 3, NOW() - INTERVAL 4 HOUR, NOW() + INTERVAL 8 HOUR,
 'Τμήμα Αρχιτεκτόνων Μηχανικών', NULL, 38.2859735, 21.7836532, 5),

(8, 'Μπριάμ', 'briam.jpg', 'briam.jpg',
 'Λαδερό με εποχιακά λαχανικά. Νηστίσιμο και vegan.',
 4, NOW() - INTERVAL 8 HOUR, NOW() + INTERVAL 26 HOUR,
 'Τμήμα Μηχανολόγων και Αεροναυπηγών Μηχανικών', NULL, 38.2893245, 21.7840343, 2),

-- Διεγραμμένη: older than 48 hours, hidden from the feed but kept for statistics
(9, 'Φασολάδα', 'fasolada.jpg', 'fasolada.jpg',
 'Μεγάλη κατσαρόλα φασολάδα, περίσσεψε αρκετή.',
 5, NOW() - INTERVAL 72 HOUR, NOW() - INTERVAL 50 HOUR,
 'Φοιτητική Εστία Πανεπιστημίου Πατρών', 'Γ018', 38.2859121, 21.7890531, 4);

INSERT INTO contains_allergen (listing, allergen)
VALUES
(1, 1), (1, 6),                 -- σουβλάκι: gluten, milk
(2, 6), (2, 1),                 -- μουσακάς: milk, gluten
(3, 6), (3, 8),                 -- σαλάτα: milk, celery
(4, 1),                         -- ντολμαδάκια: gluten
(5, 1), (5, 2), (5, 6),         -- παστίτσιο: gluten, eggs, milk
(6, 1), (6, 6),                 -- σπανακόπιτα: gluten, milk
(7, 1), (7, 6), (7, 2),         -- τυρόπιτα: gluten, milk, eggs
(9, 8);                         -- φασολάδα: celery

-- Reservations covering every status the application can produce.
INSERT INTO reserves_portion (requested_by, listing, status, received, rating, rating_penalty_applied)
VALUES
-- Ενεργή αγγελία με εκκρεμή αιτήματα (Σουβλάκι, Ελένη)
(3, 1, 'requested', NULL, NULL, FALSE),
(4, 1, 'requested', NULL, NULL, FALSE),
(5, 1, 'approved',  NULL, NULL, FALSE),

-- Ανενεργή: και οι 2 μερίδες δεσμευμένες, το τρίτο αίτημα απορρίφθηκε
(3, 4, 'approved',  NULL, NULL, FALSE),
(4, 4, 'approved',  NULL, NULL, FALSE),
(5, 4, 'rejected',  NULL, NULL, FALSE),

-- Ολοκληρωμένοι κύκλοι: παραλήφθηκαν και βαθμολογήθηκαν
(2, 5, 'approved',  TRUE, 5, FALSE),
(3, 5, 'approved',  TRUE, 4, FALSE),
(2, 6, 'approved',  TRUE, 5, FALSE),
(4, 6, 'approved',  TRUE, 3, FALSE),
(5, 9, 'approved',  TRUE, 4, FALSE),

-- Παραλήφθηκε αλλά δεν βαθμολογήθηκε ακόμη
(2, 2, 'approved',  TRUE, NULL, FALSE),

-- Δεν παραλήφθηκε: ο μάγειρας το σημείωσε, ο χρήστης έχασε έναν πόντο
(4, 9, 'approved',  FALSE, NULL, FALSE),

-- Εκκρεμή αιτήματα σε άλλες ενεργές αγγελίες
(2, 7, 'requested', NULL, NULL, FALSE),
(3, 8, 'requested', NULL, NULL, FALSE),
(4, 2, 'requested', NULL, NULL, FALSE);
