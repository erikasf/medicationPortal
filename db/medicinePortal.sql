-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: memoreX
-- ------------------------------------------------------
-- Server version	5.5.32-0ubuntu0.12.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adherence`
--

DROP TABLE IF EXISTS `adherence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adherence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `drug_id` int(11) DEFAULT NULL,
  `scheduled_time` datetime DEFAULT NULL,
  `completed_time` datetime DEFAULT NULL,
  `failure_reason` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adherence`
--

LOCK TABLES `adherence` WRITE;
/*!40000 ALTER TABLE `adherence` DISABLE KEYS */;
INSERT INTO `adherence` VALUES (1,1,1,'2013-10-02 09:00:00','2013-10-02 09:08:21',NULL),(2,1,1,'2013-10-03 09:00:00','2013-10-03 09:12:22',NULL),(3,1,1,'2013-10-04 09:00:00','2013-10-03 09:08:01',NULL),(4,1,2,'2013-10-02 19:00:00','2013-10-02 19:15:00',NULL),(5,1,2,'2013-10-03 19:00:00',NULL,NULL),(6,1,2,'2013-10-04 19:00:00',NULL,NULL),(7,1,3,'2013-10-02 09:00:00','2013-10-02 09:09:21',NULL),(8,1,3,'2013-10-03 09:00:00','2013-10-03 09:13:26',NULL),(9,1,3,'2013-10-04 09:00:00','2013-10-03 09:16:40',NULL),(10,1,4,'2013-10-02 19:00:00','2013-10-02 19:16:00',NULL),(11,1,4,'2013-10-03 19:00:00',NULL,NULL),(12,1,4,'2013-10-04 19:00:00','2013-10-02 19:12:00',NULL);
/*!40000 ALTER TABLE `adherence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug`
--

DROP TABLE IF EXISTS `drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug` (
  `drug_id` int(11) NOT NULL AUTO_INCREMENT,
  `physical_description` text,
  `generic_name` varchar(45) DEFAULT NULL,
  `trade_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug`
--

LOCK TABLES `drug` WRITE;
/*!40000 ALTER TABLE `drug` DISABLE KEYS */;
INSERT INTO `drug` VALUES (1,'Red Capsule','Amoxicillin','Amoxil'),(2,'White Oval','Atorvastatin','Lipitor'),(3,'White Circular','Acetylsalicylic Acid','Aspirin'),(4,'Yellow Round','Spironolactone','Aldactone');
/*!40000 ALTER TABLE `drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_schedule`
--

DROP TABLE IF EXISTS `drug_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `drug_id` int(11) DEFAULT NULL,
  `day_of_week` varchar(3) DEFAULT NULL,
  `time_of_day` time DEFAULT NULL,
  `num_of_pills_per_dose` int(4) DEFAULT NULL,
  `dosage_mass_mg` decimal(5,5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_schedule`
--

LOCK TABLES `drug_schedule` WRITE;
/*!40000 ALTER TABLE `drug_schedule` DISABLE KEYS */;
INSERT INTO `drug_schedule` VALUES (1,1,1,'1','09:00:00',1,NULL),(2,1,2,'1','19:00:00',1,NULL),(3,1,3,'1','09:00:00',1,NULL),(4,1,4,'1','19:00:00',1,NULL),(5,1,1,'2','09:00:00',1,NULL),(6,1,2,'2','19:00:00',1,NULL),(7,1,3,'2','09:00:00',1,NULL),(8,1,4,'2','19:00:00',1,NULL),(9,1,1,'3','09:00:00',1,NULL),(10,1,1,'4','09:00:00',1,NULL),(11,1,1,'5','09:00:00',1,NULL),(12,1,2,'3','19:00:00',1,NULL),(13,1,2,'4','19:00:00',1,NULL),(14,1,2,'5','19:00:00',1,NULL),(15,1,3,'3','09:00:00',1,NULL),(16,1,3,'4','09:00:00',1,NULL),(17,1,3,'5','09:00:00',1,NULL),(18,1,4,'3','19:00:00',1,NULL),(19,1,4,'4','19:00:00',1,NULL),(20,1,4,'5','19:00:00',1,NULL);
/*!40000 ALTER TABLE `drug_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `treatment_start_date` datetime DEFAULT NULL,
  `patient_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'2013-09-01 00:00:00','John Smith');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-10-06 23:32:42
