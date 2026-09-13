/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.20-12.3.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: unibite
-- ------------------------------------------------------
-- Server version	12.3.3-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `unibite`
--

/*!40000 DROP DATABASE IF EXISTS `unibite`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `unibite` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

USE `unibite`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `1` FOREIGN KEY (`admin_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES
(1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `allergen`
--

DROP TABLE IF EXISTS `allergen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergen` (
  `allergen_id` int(11) NOT NULL AUTO_INCREMENT,
  `allergen_name` varchar(255) NOT NULL,
  PRIMARY KEY (`allergen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergen`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `allergen` WRITE;
/*!40000 ALTER TABLE `allergen` DISABLE KEYS */;
INSERT INTO `allergen` VALUES
(1,'gluten'),
(2,'eggs'),
(3,'fish'),
(4,'peanuts'),
(5,'soybeans'),
(6,'milk'),
(7,'nuts'),
(8,'celery'),
(9,'mustard'),
(10,'sesame'),
(11,'sulphites'),
(12,'lupin'),
(13,'molluscs'),
(14,'crustaceans');
/*!40000 ALTER TABLE `allergen` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `contains_allergen`
--

DROP TABLE IF EXISTS `contains_allergen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contains_allergen` (
  `listing` int(11) NOT NULL,
  `allergen` int(11) NOT NULL,
  PRIMARY KEY (`listing`,`allergen`),
  KEY `allergen` (`allergen`),
  CONSTRAINT `1` FOREIGN KEY (`listing`) REFERENCES `food_listing` (`listing_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `2` FOREIGN KEY (`allergen`) REFERENCES `allergen` (`allergen_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contains_allergen`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `contains_allergen` WRITE;
/*!40000 ALTER TABLE `contains_allergen` DISABLE KEYS */;
INSERT INTO `contains_allergen` VALUES
(1,1),
(2,1),
(4,1),
(5,1),
(6,1),
(7,1),
(5,2),
(7,2),
(1,6),
(2,6),
(3,6),
(5,6),
(6,6),
(7,6),
(3,8),
(9,8);
/*!40000 ALTER TABLE `contains_allergen` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `food_listing`
--

DROP TABLE IF EXISTS `food_listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_listing` (
  `listing_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `photo_filename` varchar(255) DEFAULT NULL,
  `original_photo_filename` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `total_portions` int(11) NOT NULL,
  `creation_datetime` datetime NOT NULL,
  `pickup_datetime` datetime NOT NULL,
  `pickup_point_description` text NOT NULL,
  `pickup_point_room_number` varchar(255) DEFAULT NULL,
  `pickup_point_latitude` decimal(9,6) NOT NULL,
  `pickup_point_longitude` decimal(9,6) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`listing_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `1` FOREIGN KEY (`created_by`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_listing`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `food_listing` WRITE;
/*!40000 ALTER TABLE `food_listing` DISABLE KEYS */;
INSERT INTO `food_listing` VALUES
(1,'Σουβλάκι με πίτα','souvlaki.jpg','souvlaki.jpg','Έφτιαξα παραπάνω για τους συγκάτοικους. Τυλιχτά με τζατζίκι και πατάτες.',5,'2026-09-13 13:50:24','2026-09-13 21:50:24','Φοιτητική Εστία Πανεπιστημίου Πατρών','B212',38.285912,21.789053,2),
(2,'Μουσακάς','moussaka.jpg','moussaka.jpg','Ταψί μουσακά που δεν θα φάμε ποτέ μόνοι μας. Περισσεύουν 4 μερίδες.',4,'2026-09-13 10:50:24','2026-09-14 12:50:24','Τμήμα Μηχανικών Η/Υ και Πληροφορικής',NULL,38.290197,21.795019,3),
(3,'Χωριάτικη σαλάτα με τζατζίκι','greek_salad.jpg','greek_salad.jpg','Φρέσκια, φτιαγμένη το πρωί. Ιδανική για μεσημέρι στη σχολή.',3,'2026-09-13 14:50:24','2026-09-13 19:50:24','Πρυτανεία',NULL,38.286237,21.787149,4),
(4,'Ντολμαδάκια','gemista.jpg','gemista.jpg','Σπιτικά ντολμαδάκια από τη γιαγιά. Μόνο 2 μερίδες, όποιος προλάβει.',2,'2026-09-13 06:50:24','2026-09-13 18:50:24','Φοιτητική Εστία Πανεπιστημίου Πατρών','A104',38.285912,21.789053,2),
(5,'Παστίτσιο','pastitsio.jpg','pastitsio.jpg','Μαγείρεψα για όλη την εβδομάδα και περίσσεψε. Ζεσταίνεται εύκολα.',6,'2026-09-12 14:50:24','2026-09-13 14:50:24','Τμήμα Πολιτικών Μηχανικών',NULL,38.288937,21.790249,5),
(6,'Σπανακόπιτα','spanakopita.jpg','spanakopita.jpg','Χωριάτικη σπανακόπιτα, κομμένη σε μερίδες.',4,'2026-09-12 10:50:24','2026-09-13 10:50:24','Τμήμα Ηλεκτρολόγων Μηχανικών και Τεχνολογίας Υπολογιστών',NULL,38.288221,21.789280,3),
(7,'Τυρόπιτα','tiropita.jpg','tiropita.jpg','Ζεστή τυρόπιτα από τον φούρνο της εστίας.',3,'2026-09-13 12:50:24','2026-09-14 00:50:24','Τμήμα Αρχιτεκτόνων Μηχανικών',NULL,38.285974,21.783653,5),
(8,'Μπριάμ','briam.jpg','briam.jpg','Λαδερό με εποχιακά λαχανικά. Νηστίσιμο και vegan.',4,'2026-09-13 08:50:24','2026-09-14 18:50:24','Τμήμα Μηχανολόγων και Αεροναυπηγών Μηχανικών',NULL,38.289325,21.784034,2),
(9,'Φασολάδα','fasolada.jpg','fasolada.jpg','Μεγάλη κατσαρόλα φασολάδα, περίσσεψε αρκετή.',5,'2026-09-10 16:50:24','2026-09-11 14:50:24','Φοιτητική Εστία Πανεπιστημίου Πατρών','Γ018',38.285912,21.789053,4);
/*!40000 ALTER TABLE `food_listing` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `reserves_portion`
--

DROP TABLE IF EXISTS `reserves_portion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserves_portion` (
  `status` enum('requested','approved','rejected') DEFAULT NULL,
  `requested_by` int(11) NOT NULL,
  `listing` int(11) NOT NULL,
  `received` tinyint(1) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `rating_penalty_applied` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`requested_by`,`listing`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserves_portion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `reserves_portion` WRITE;
/*!40000 ALTER TABLE `reserves_portion` DISABLE KEYS */;
INSERT INTO `reserves_portion` VALUES
('approved',2,2,1,NULL,0),
('approved',2,5,1,5,0),
('approved',2,6,1,5,0),
('requested',2,7,NULL,NULL,0),
('requested',3,1,NULL,NULL,0),
('approved',3,4,NULL,NULL,0),
('approved',3,5,1,4,0),
('requested',3,8,NULL,NULL,0),
('requested',4,1,NULL,NULL,0),
('requested',4,2,NULL,NULL,0),
('approved',4,4,NULL,NULL,0),
('approved',4,6,1,3,0),
('approved',4,9,0,NULL,0),
('approved',5,1,NULL,NULL,0),
('rejected',5,4,NULL,NULL,0),
('approved',5,9,1,4,0);
/*!40000 ALTER TABLE `reserves_portion` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `1` FOREIGN KEY (`student_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES
(2,7),
(3,6),
(4,4),
(5,8);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'panagiotis@ac.upatras.gr','Παναγιώτης','Αντωνίου','0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c'),
(2,'eleni@ac.upatras.gr','Ελένη','Καραγιάννη','edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9'),
(3,'nikos@ac.upatras.gr','Νίκος','Δημητρίου','318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69'),
(4,'maria@ac.upatras.gr','Μαρία','Σταθοπούλου','79f06f8fde333461739f220090a23cb2a79f6d714bee100d0e4b4af249294619'),
(5,'kostas@ac.upatras.gr','Κώστας','Βλάχος','c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-09-13 18:38:43
