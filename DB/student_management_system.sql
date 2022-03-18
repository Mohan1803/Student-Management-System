-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 18, 2022 at 10:50 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `school_addclass`
--

DROP TABLE IF EXISTS `school_addclass`;
CREATE TABLE IF NOT EXISTS `school_addclass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Class` varchar(20) NOT NULL,
  `Actual_fee` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addclass`
--

INSERT INTO `school_addclass` (`ID`, `Class`, `Actual_fee`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, '12', 20000, '2022-01-04 15:36:48', '2022-01-04 10:06:48', NULL),
(2, '11', 19000, '2022-01-04 15:36:55', '2022-01-04 10:06:55', NULL),
(3, '10', 18000, '2022-01-04 15:37:02', '2022-01-04 10:07:02', NULL),
(4, '9', 17000, '2022-01-04 15:37:09', '2022-01-04 10:07:09', NULL),
(5, '8', 16000, '2022-01-04 15:37:20', '2022-01-04 10:07:20', NULL),
(6, '7', 15000, '2022-01-04 15:37:33', '2022-01-04 10:07:33', NULL),
(7, '6', 14000, '2022-01-04 15:37:42', '2022-01-04 10:07:42', NULL),
(8, '5', 13000, '2022-01-04 15:37:47', '2022-01-04 10:07:47', NULL),
(9, '4', 12000, '2022-01-04 15:37:53', '2022-01-04 10:07:53', NULL),
(10, '3', 11000, '2022-01-04 15:38:15', '2022-01-04 10:08:15', NULL),
(11, '2', 10000, '2022-01-04 15:38:21', '2022-01-04 10:08:21', NULL),
(12, '1', 9000, '2022-01-04 15:38:25', '2022-01-04 10:08:25', NULL),
(13, 'UKG', 8000, '2022-01-11 15:21:55', '2022-01-11 09:51:55', NULL),
(14, 'LKG', 7000, '2022-01-11 15:22:00', '2022-01-11 09:52:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addexam`
--

DROP TABLE IF EXISTS `school_addexam`;
CREATE TABLE IF NOT EXISTS `school_addexam` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(255) NOT NULL,
  `exam_master` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `section_id` int(10) NOT NULL,
  `Subject_id` int(10) NOT NULL,
  `actual_mark` int(10) NOT NULL,
  `pass_mark` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `section_link exam` (`section_id`),
  KEY `subject link exam` (`Subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addexam`
--

INSERT INTO `school_addexam` (`ID`, `exam_name`, `exam_master`, `date`, `section_id`, `Subject_id`, `actual_mark`, `pass_mark`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 'Annual Exam 2022', 'Annual', '2022-03-21 12:00:00', 3, 1, 200, 70, '2022-03-17 15:54:30', '2022-03-17 15:54:30', NULL),
(2, 'Annual Exam 2022', 'Annual', '2022-03-22 12:00:00', 3, 2, 200, 70, '2022-03-17 15:54:30', '2022-03-17 15:54:30', NULL),
(3, 'Annual Exam 2022', 'Annual', '2022-03-23 12:00:00', 3, 3, 200, 70, '2022-03-17 15:54:30', '2022-03-17 15:54:30', NULL),
(4, 'Annual Exam 2022', 'Annual', '2022-03-24 12:00:00', 3, 4, 200, 70, '2022-03-17 15:54:30', '2022-03-17 15:54:30', NULL),
(5, 'Annual Exam 2022', 'Annual', '2022-03-25 12:00:00', 3, 5, 200, 70, '2022-03-17 15:54:30', '2022-03-17 15:54:30', NULL),
(6, 'Annual Exam 2022', 'Annual', '2022-03-28 12:00:00', 5, 1, 100, 35, '2022-03-18 12:48:33', '2022-03-18 12:48:33', NULL),
(7, 'Annual Exam 2022', 'Annual', '2022-03-29 12:00:00', 5, 2, 100, 35, '2022-03-18 12:48:33', '2022-03-18 12:48:33', NULL),
(8, 'Annual Exam 2022', 'Annual', '2022-03-30 12:00:00', 5, 3, 100, 35, '2022-03-18 12:48:33', '2022-03-18 12:48:33', NULL),
(9, 'Annual Exam 2022', 'Annual', '2022-03-31 12:00:00', 5, 4, 100, 35, '2022-03-18 12:48:33', '2022-03-18 12:48:33', NULL),
(10, 'Annual Exam 2022', 'Annual', '2022-04-01 12:00:00', 5, 8, 100, 35, '2022-03-18 12:48:33', '2022-03-18 12:48:33', NULL),
(11, 'Annual Exam 2022', 'Annual', '2022-03-21 12:00:00', 1, 1, 200, 70, '2022-03-18 15:15:24', '2022-03-18 15:15:24', NULL),
(12, 'Annual Exam 2022', 'Annual', '2022-03-22 12:00:00', 1, 2, 200, 70, '2022-03-18 15:15:24', '2022-03-18 15:15:24', NULL),
(13, 'Annual Exam 2022', 'Annual', '2022-03-23 12:00:00', 1, 14, 200, 70, '2022-03-18 15:15:24', '2022-03-18 15:15:24', NULL),
(14, 'Annual Exam 2022', 'Annual', '2022-03-24 12:00:00', 1, 12, 200, 70, '2022-03-18 15:15:24', '2022-03-18 15:15:24', NULL),
(15, 'Annual Exam 2022', 'Annual', '2022-03-25 12:00:00', 1, 8, 200, 70, '2022-03-18 15:15:24', '2022-03-18 15:15:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addsection`
--

DROP TABLE IF EXISTS `school_addsection`;
CREATE TABLE IF NOT EXISTS `school_addsection` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `class_id` int(10) NOT NULL,
  `section` varchar(20) NOT NULL,
  `capacity` int(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `daleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `class_id link` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addsection`
--

INSERT INTO `school_addsection` (`ID`, `class_id`, `section`, `capacity`, `created_at`, `updated_at`, `daleted_at`) VALUES
(1, 1, 'A', 50, '2022-01-04 15:38:45', '2022-01-04 10:08:45', NULL),
(2, 1, 'B', 50, '2022-01-04 15:38:51', '2022-01-04 10:08:51', NULL),
(3, 2, 'A', 50, '2022-01-04 15:38:56', '2022-01-04 10:08:56', NULL),
(4, 2, 'B', 50, '2022-01-04 15:39:00', '2022-01-04 10:09:00', NULL),
(5, 3, 'A', 60, '2022-01-04 15:39:06', '2022-01-04 10:09:06', NULL),
(6, 3, 'B', 60, '2022-01-04 15:39:14', '2022-01-04 10:09:14', NULL),
(7, 4, 'A', 60, '2022-01-04 15:39:20', '2022-01-04 10:09:20', NULL),
(8, 4, 'B', 60, '2022-01-04 15:39:28', '2022-01-04 10:09:28', NULL),
(9, 5, 'A', 60, '2022-01-04 15:39:34', '2022-01-04 10:09:34', NULL),
(10, 5, 'B', 60, '2022-01-04 15:39:40', '2022-01-04 10:09:40', NULL),
(11, 5, 'C', 60, '2022-01-04 15:39:47', '2022-01-04 10:09:47', NULL),
(12, 6, 'A', 60, '2022-01-04 15:40:01', '2022-01-04 10:10:01', NULL),
(13, 6, 'B', 60, '2022-01-04 15:40:06', '2022-01-04 10:10:06', NULL),
(14, 6, 'C', 60, '2022-01-04 15:40:11', '2022-01-04 10:10:11', NULL),
(15, 7, 'A', 70, '2022-01-04 15:40:18', '2022-01-04 10:10:18', NULL),
(16, 7, 'B', 70, '2022-01-04 15:40:25', '2022-01-04 10:10:25', NULL),
(17, 7, 'C', 70, '2022-01-04 15:40:34', '2022-01-04 10:10:34', NULL),
(18, 8, 'A', 60, '2022-01-04 15:40:40', '2022-01-04 10:10:40', NULL),
(19, 8, 'B', 60, '2022-01-04 15:40:47', '2022-01-04 10:10:47', NULL),
(20, 8, 'C', 60, '2022-01-04 15:40:53', '2022-01-04 10:10:53', NULL),
(21, 9, 'A', 70, '2022-01-04 15:41:05', '2022-01-04 10:11:05', NULL),
(22, 9, 'B', 70, '2022-01-04 15:41:14', '2022-01-04 10:11:14', NULL),
(23, 9, 'C', 70, '2022-01-04 15:41:23', '2022-01-04 10:11:23', NULL),
(24, 10, 'A', 60, '2022-01-04 15:41:42', '2022-01-04 10:11:42', NULL),
(25, 10, 'B', 60, '2022-01-04 15:41:49', '2022-01-04 10:11:49', NULL),
(26, 11, 'A', 60, '2022-01-04 15:41:57', '2022-01-04 10:11:57', NULL),
(27, 11, 'B', 60, '2022-01-04 15:42:02', '2022-01-04 10:12:02', NULL),
(28, 12, 'A', 70, '2022-01-04 15:42:10', '2022-01-04 10:12:10', NULL),
(29, 12, 'B', 70, '2022-01-04 15:42:16', '2022-01-04 10:12:16', NULL),
(30, 13, 'A', 70, '2022-01-11 15:23:16', '2022-01-11 09:53:16', NULL),
(31, 14, 'A', 70, '2022-01-11 15:23:32', '2022-01-11 09:53:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addstaff`
--

DROP TABLE IF EXISTS `school_addstaff`;
CREATE TABLE IF NOT EXISTS `school_addstaff` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Staff_id` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Middle_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Father_Name` varchar(255) NOT NULL,
  `Mother_name` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `Martial_Status` varchar(15) NOT NULL,
  `Joining_Date` date NOT NULL,
  `Qualification` varchar(255) NOT NULL,
  `Aadhar_No` varchar(255) NOT NULL,
  `Staff_type` varchar(255) NOT NULL,
  `Staff_Account_No` varchar(20) NOT NULL,
  `Blood_Group` varchar(10) NOT NULL,
  `Email_ID` varchar(255) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Emergency_Contact_No` varchar(15) NOT NULL,
  `Basic_Pay` varchar(10) NOT NULL,
  `Pre_Institute_Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Staff_id` (`Staff_id`) USING BTREE,
  KEY `Staff_Account_No` (`Staff_Account_No`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addstaff`
--

INSERT INTO `school_addstaff` (`ID`, `Staff_id`, `Role`, `First_Name`, `Middle_Name`, `Last_Name`, `Father_Name`, `Mother_name`, `DOB`, `Sex`, `Martial_Status`, `Joining_Date`, `Qualification`, `Aadhar_No`, `Staff_type`, `Staff_Account_No`, `Blood_Group`, `Email_ID`, `Phone_Number`, `Emergency_Contact_No`, `Basic_Pay`, `Pre_Institute_Name`, `Password`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 'BMH001', 'admin', 'D', 'Ram', 'Kumar', 'Dharmalingam', 'Mahalakshmi', '1989-10-24', 'male', 'married', '2016-10-06', 'Phd', '808923727534', 'non-teaching', 'ABC123', 'O+', 'ram@gmail.com', '6802682906', '6387592064', '40,000', 'NIL', '$2b$12$dHlcyRbzjXRcHzf28pNykeKsTMhzUmupY8noXL0kiPyblMCL0mFri', '2021-11-25 20:05:27', '2021-11-25 14:35:27', NULL),
(2, 'BMH002', 'staff', 'H', 'Dinesh', 'Kumar', 'Hari Harasudhan', 'Mahalakshmi', '1991-06-17', 'male', 'married', '2021-11-18', 'BA', '669274910462', 'non-teaching', 'ABC1234', 'O+', 'dinesh@gmail.com', '6802682906', '6387592064', '20,000', 'NIL', '$2b$12$R/z74Op2wb9teio8DtHbaejT.7ixmuH6cpqeuAeI6wAElsA1e1ymm', '2021-11-25 20:11:33', '2021-11-25 14:41:33', NULL),
(3, 'BMH003', 'staff', 'D', 'Ashok', 'Kumar', 'Dharmalingam', 'Muthulakshmi', '1991-09-16', 'male', 'married', '2021-10-19', 'BA', '906392846286', 'teaching', 'ABC12345', 'O+', 'ashokkumar1990@gmail.com', '9836103783', '9852857196', '20,000', 'NIL', '$2b$12$0nXHdYwvnsS49d8yMt0Speo.5N8sAto6JM0a39LJpam/cbKI8IXJy', '2021-11-26 11:08:51', '2021-11-26 05:38:51', NULL),
(4, 'BMH004', 'staff', 'A', 'Kishore', '', 'Ashok', 'Rajalakshmi', '1991-05-24', 'male', 'married', '2021-11-15', 'Bsc', '557024859201', 'teaching', 'ABC1234Z', 'AB+', 'kishore@gmail.com', '6360185293', '9830286346', '20,000', 'NIL', '$2b$12$tGmlTpTcpNnMrk/wNQTYoee9.YAqa2JUx36mTlHT9u8SbRnKT1uBW', '2021-12-10 10:48:46', '2021-12-10 05:18:46', NULL),
(5, 'BMH005', 'staff', 'B', 'Baskar', '', 'Father Name', 'Mother Name', '1993-06-15', 'male', 'married', '2021-12-16', 'B.A', '557024859203', 'teaching', 'ABC12345Z', 'A+', 'baskar@gmail.com', '8932750212', '9972752532', '20,000', 'NIL', '$2b$12$akBgglK6vvbK87VkWpJQKuzS/2iYNQlPZvzVGUNu.M2zRUzh8Poj.', '2021-12-22 14:43:33', '2021-12-22 09:13:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addstudent`
--

DROP TABLE IF EXISTS `school_addstudent`;
CREATE TABLE IF NOT EXISTS `school_addstudent` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Stud_ID` int(10) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Middle_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Father_name` varchar(255) NOT NULL,
  `Mother_name` varchar(255) NOT NULL,
  `Emergency_Contact_No` varchar(20) NOT NULL,
  `Religion` varchar(255) NOT NULL,
  `Caste` varchar(255) NOT NULL,
  `Mother_Tongue` varchar(255) NOT NULL,
  `Stud_Aadhar_No` varchar(255) NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `Created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `id` (`ID`),
  KEY `student_id link` (`Stud_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addstudent`
--

INSERT INTO `school_addstudent` (`ID`, `Stud_ID`, `First_Name`, `Middle_Name`, `Last_Name`, `Father_name`, `Mother_name`, `Emergency_Contact_No`, `Religion`, `Caste`, `Mother_Tongue`, `Stud_Aadhar_No`, `Sex`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 1, 'First Name', 'Gowtham', '', 'Father Name', 'Mother Name', '7864563456', 'Hindu', 'BC', 'tamil', '882749307388', 'male', '2022-03-18 12:25:21', '2022-03-18 06:55:21', NULL),
(2, 2, 'First Name', 'Baskar', '', 'Father Name', 'Mother name', '7864563443', 'Hindu', 'BC', 'tamil', '544345678901', 'male', '2022-03-18 12:26:25', '2022-03-18 06:56:25', NULL),
(3, 3, 'First Name', 'Kishore', '', 'Father Name', 'Mother name', '7864563456', 'Hindu', 'BC', 'tamil', '333333333333', 'male', '2022-03-18 12:30:05', '2022-03-18 07:00:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addsubjects`
--

DROP TABLE IF EXISTS `school_addsubjects`;
CREATE TABLE IF NOT EXISTS `school_addsubjects` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addsubjects`
--

INSERT INTO `school_addsubjects` (`ID`, `subject_name`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 'Tamil', '2022-01-11 15:04:56', '2022-01-11 09:34:56', NULL),
(2, 'English', '2022-01-11 15:05:07', '2022-01-11 09:35:07', NULL),
(3, 'Maths', '2022-01-11 15:06:02', '2022-01-11 09:36:02', NULL),
(4, 'Science', '2022-01-11 15:06:16', '2022-01-11 09:36:16', NULL),
(5, 'Social Science', '2022-01-11 15:06:30', '2022-01-11 09:36:30', NULL),
(6, 'Botany', '2022-01-11 15:06:46', '2022-01-11 09:36:46', NULL),
(7, 'Zoology', '2022-01-11 15:06:57', '2022-01-11 09:36:57', NULL),
(8, 'History', '2022-01-11 15:07:12', '2022-01-11 09:37:12', NULL),
(9, 'Geography', '2022-01-11 15:07:22', '2022-01-11 09:37:22', NULL),
(10, 'General Knowledge', '2022-01-11 15:07:42', '2022-01-11 09:37:42', NULL),
(11, 'Moral Science', '2022-01-11 15:07:56', '2022-01-11 09:37:56', NULL),
(12, 'Computer Science', '2022-01-11 15:08:34', '2022-01-11 09:38:34', NULL),
(13, 'Biology', '2022-01-11 15:08:49', '2022-01-11 09:38:49', NULL),
(14, 'Mathematics', '2022-01-11 15:09:08', '2022-01-11 09:39:08', NULL),
(15, 'Accounts', '2022-01-11 15:15:41', '2022-01-11 09:45:41', NULL),
(16, 'Statistics', '2022-01-11 15:16:53', '2022-01-11 09:46:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_initialaddstudent`
--

DROP TABLE IF EXISTS `school_initialaddstudent`;
CREATE TABLE IF NOT EXISTS `school_initialaddstudent` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Stud_ID` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_initialaddstudent`
--

INSERT INTO `school_initialaddstudent` (`ID`, `Stud_ID`, `DOB`, `email_id`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BMH21001', '2005-06-14', 'kishore@gmail.com', '$2b$12$sMEJgKRpya6JgoOreXorNOcspPBXKhbXCDmaRFzIZNdd9WDxiJfmG', '2022-03-18 12:23:59', '2022-03-18 06:53:59', NULL),
(2, 'BMH21002', '2005-06-14', 'kishore@gmail.com', '$2b$12$V.HbXf8QsR5OU4LJA9QOWeQfr9r4E0ziNaoat.S/0csyYMB6hjokK', '2022-03-18 12:24:26', '2022-03-18 06:54:26', NULL),
(3, 'BMH21003', '2022-03-16', 'kishore@gmail.com', '$2b$12$zZGp10TsH6INGBAwEXUjsOiOXJ1qdWreGDgPvw4Sko.B4pyEtsSTu', '2022-03-18 12:29:22', '2022-03-18 06:59:22', '2022-03-18 15:33:44');

-- --------------------------------------------------------

--
-- Table structure for table `school_scheduleplan`
--

DROP TABLE IF EXISTS `school_scheduleplan`;
CREATE TABLE IF NOT EXISTS `school_scheduleplan` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `schedule_name` varchar(255) NOT NULL,
  `no_of_periods` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `daleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_scheduleplan`
--

INSERT INTO `school_scheduleplan` (`ID`, `schedule_name`, `no_of_periods`, `created_at`, `updated_at`, `daleted_at`) VALUES
(1, 'Week Days', 8, '2022-01-18 14:47:04', '2022-01-18 09:17:04', NULL),
(2, 'Half Day', 4, '2022-01-18 14:48:28', '2022-01-18 09:18:28', NULL),
(3, 'Function', 0, '2022-01-18 14:53:38', '2022-01-18 09:23:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_staffattendance`
--

DROP TABLE IF EXISTS `school_staffattendance`;
CREATE TABLE IF NOT EXISTS `school_staffattendance` (
  `ID` int(10) NOT NULL,
  `Staff_ID` varchar(255) NOT NULL,
  `Adate` date NOT NULL,
  `Astatus` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`Staff_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_staffsalary`
--

DROP TABLE IF EXISTS `school_staffsalary`;
CREATE TABLE IF NOT EXISTS `school_staffsalary` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Staff_id` varchar(255) NOT NULL,
  `Staff_Account_No` varchar(20) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_studentadmission`
--

DROP TABLE IF EXISTS `school_studentadmission`;
CREATE TABLE IF NOT EXISTS `school_studentadmission` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Stud_id` int(10) NOT NULL,
  `Section` int(10) NOT NULL,
  `Actual_fee` int(10) NOT NULL,
  `Initial_Paying_amt` int(10) NOT NULL,
  `Pending_due` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Stud_id` (`Stud_id`,`Section`),
  KEY `section_id link admission` (`Section`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_studentadmission`
--

INSERT INTO `school_studentadmission` (`ID`, `Stud_id`, `Section`, `Actual_fee`, `Initial_Paying_amt`, `Pending_due`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 1, 5, 18000, 18000, 0, '2022-03-18 12:24:10', '2022-03-18 06:54:10', '2022-03-18 12:50:58'),
(2, 2, 5, 18000, 18000, 0, '2022-03-18 12:24:48', '2022-03-18 06:54:48', '2022-03-18 12:51:05'),
(3, 3, 3, 19000, 29000, -10000, '2022-03-18 12:29:33', '2022-03-18 06:59:33', '2022-03-18 12:44:56'),
(4, 3, 1, 20000, 20000, 0, '2022-03-18 12:44:56', '2022-03-18 07:14:56', '2022-03-18 15:33:44'),
(5, 1, 3, 19000, 0, 19000, '2022-03-18 12:50:58', '2022-03-18 07:20:58', NULL),
(6, 2, 3, 19000, 0, 19000, '2022-03-18 12:51:05', '2022-03-18 07:21:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_studentattendance`
--

DROP TABLE IF EXISTS `school_studentattendance`;
CREATE TABLE IF NOT EXISTS `school_studentattendance` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Stud_ID` int(10) NOT NULL,
  `class_section` int(10) NOT NULL,
  `period_no` int(10) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `marked_by` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `stud_id link attendance` (`Stud_ID`),
  KEY `section_id link attendance` (`class_section`),
  KEY `staff_id link to marked_by attendance` (`marked_by`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_student_due_collection`
--

DROP TABLE IF EXISTS `school_student_due_collection`;
CREATE TABLE IF NOT EXISTS `school_student_due_collection` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Stud_ID` int(10) NOT NULL,
  `Actual_fee` int(10) NOT NULL,
  `Paying_amt` int(10) NOT NULL,
  `Payment_mode` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Stud_ID` (`Stud_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_student_due_collection`
--

INSERT INTO `school_student_due_collection` (`ID`, `Stud_ID`, `Actual_fee`, `Paying_amt`, `Payment_mode`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 1, 18000, 5000, 'Online Payment', '2022-03-18 12:25:34', '2022-03-18 06:55:34', NULL),
(2, 2, 18000, 14000, 'Cash', '2022-03-18 12:26:42', '2022-03-18 06:56:42', NULL),
(3, 1, 18000, 8000, 'Cash', '2022-03-18 12:26:51', '2022-03-18 06:56:51', NULL),
(4, 3, 19000, 1000, 'Cash', '2022-03-18 12:30:27', '2022-03-18 07:00:27', NULL),
(5, 3, 19000, 1000, 'Cheque', '2022-03-18 12:31:30', '2022-03-18 07:01:30', NULL),
(6, 3, 19000, 1000, 'Cash', '2022-03-18 12:32:43', '2022-03-18 07:02:43', NULL),
(7, 3, 19000, 1000, 'Cash', '2022-03-18 12:34:24', '2022-03-18 07:04:24', NULL),
(8, 3, 19000, 5000, 'Cheque', '2022-03-18 12:35:43', '2022-03-18 07:05:43', NULL),
(9, 3, 20000, 10000, 'Cash', '2022-03-18 15:29:09', '2022-03-18 09:59:09', NULL),
(10, 3, 20000, 1000, 'Cash', '2022-03-18 15:31:01', '2022-03-18 10:01:01', NULL),
(11, 3, 20000, 5000, 'Cash', '2022-03-18 15:32:07', '2022-03-18 10:02:07', NULL),
(12, 3, 20000, 4000, 'Cash', '2022-03-18 15:32:21', '2022-03-18 10:02:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_studexam_mark`
--

DROP TABLE IF EXISTS `school_studexam_mark`;
CREATE TABLE IF NOT EXISTS `school_studexam_mark` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(50) NOT NULL,
  `stud_id` int(10) NOT NULL,
  `Section_id` int(10) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `marks_scored` int(10) NOT NULL,
  `result` varchar(50) NOT NULL,
  `entered_by` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `stud_id link mark` (`stud_id`),
  KEY `subject link mark` (`subject_id`),
  KEY `staff_id link mark` (`entered_by`),
  KEY `section link mark` (`Section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_studexam_mark`
--

INSERT INTO `school_studexam_mark` (`ID`, `exam_name`, `stud_id`, `Section_id`, `subject_id`, `marks_scored`, `result`, `entered_by`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 'Annual', 3, 3, 1, 189, 'Pass', 2, '2022-03-18 12:36:39', '2022-03-18 07:06:39', '2022-03-18 12:44:56'),
(2, 'Annual', 3, 3, 3, 189, 'Pass', 3, '2022-03-18 12:37:09', '2022-03-18 07:07:09', '2022-03-18 12:44:56'),
(3, 'Annual', 3, 3, 4, 178, 'Pass', 4, '2022-03-18 12:37:29', '2022-03-18 07:07:29', '2022-03-18 12:44:56'),
(4, 'Annual', 3, 3, 5, 177, 'Pass', 5, '2022-03-18 12:37:48', '2022-03-18 07:07:48', '2022-03-18 12:44:56'),
(5, 'Annual', 3, 3, 2, 177, 'Pass', 2, '2022-03-18 12:41:07', '2022-03-18 07:11:07', '2022-03-18 12:44:56'),
(6, 'Annual', 1, 5, 1, 78, 'Pass', 2, '2022-03-18 12:49:02', '2022-03-18 07:19:02', '2022-03-18 12:50:58'),
(7, 'Annual', 2, 5, 1, 89, 'Pass', 2, '2022-03-18 12:49:02', '2022-03-18 07:19:02', '2022-03-18 12:51:05'),
(8, 'Annual', 1, 5, 8, 88, 'Pass', 2, '2022-03-18 12:49:13', '2022-03-18 07:19:13', '2022-03-18 12:50:58'),
(9, 'Annual', 2, 5, 8, 78, 'Pass', 2, '2022-03-18 12:49:13', '2022-03-18 07:19:13', '2022-03-18 12:51:05'),
(10, 'Annual', 1, 5, 2, 88, 'Pass', 3, '2022-03-18 12:49:36', '2022-03-18 07:19:36', '2022-03-18 12:50:58'),
(11, 'Annual', 2, 5, 2, 89, 'Pass', 3, '2022-03-18 12:49:36', '2022-03-18 07:19:36', '2022-03-18 12:51:05'),
(12, 'Annual', 1, 5, 3, 88, 'Pass', 4, '2022-03-18 12:49:58', '2022-03-18 07:19:58', '2022-03-18 12:50:58'),
(13, 'Annual', 2, 5, 3, 90, 'Pass', 4, '2022-03-18 12:49:58', '2022-03-18 07:19:58', '2022-03-18 12:51:05'),
(14, 'Annual', 1, 5, 4, 88, 'Pass', 5, '2022-03-18 12:50:19', '2022-03-18 07:20:19', '2022-03-18 12:50:58'),
(15, 'Annual', 2, 5, 4, 89, 'Pass', 5, '2022-03-18 12:50:19', '2022-03-18 07:20:19', '2022-03-18 12:51:05'),
(16, 'Annual', 3, 1, 1, 178, 'Pass', 2, '2022-03-18 15:15:48', '2022-03-18 09:45:48', NULL),
(17, 'Annual', 3, 1, 8, 178, 'Pass', 2, '2022-03-18 15:16:07', '2022-03-18 09:46:07', NULL),
(18, 'Annual', 3, 1, 2, 188, 'Pass', 3, '2022-03-18 15:16:26', '2022-03-18 09:46:26', NULL),
(19, 'Annual', 3, 1, 14, 190, 'Pass', 4, '2022-03-18 15:16:44', '2022-03-18 09:46:44', NULL),
(20, 'Annual', 3, 1, 12, 190, 'Pass', 5, '2022-03-18 15:17:00', '2022-03-18 09:47:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_subjectclass_mapping`
--

DROP TABLE IF EXISTS `school_subjectclass_mapping`;
CREATE TABLE IF NOT EXISTS `school_subjectclass_mapping` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Staff_ID` int(10) NOT NULL,
  `Section_id` int(10) NOT NULL,
  `Subject_id` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Staff_ID link mapping` (`Staff_ID`),
  KEY `subject link` (`Subject_id`),
  KEY `section_id link mapping` (`Section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_subjectclass_mapping`
--

INSERT INTO `school_subjectclass_mapping` (`ID`, `Staff_ID`, `Section_id`, `Subject_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 1, 1, '2022-01-27 14:52:54', '2022-01-27 09:22:54', NULL),
(2, 3, 1, 2, '2022-01-27 14:53:01', '2022-01-27 09:23:01', NULL),
(3, 4, 1, 14, '2022-01-27 14:53:07', '2022-01-27 09:23:07', NULL),
(4, 5, 1, 12, '2022-01-27 14:53:14', '2022-01-27 09:23:14', NULL),
(5, 2, 1, 8, '2022-01-27 14:53:23', '2022-01-27 09:23:23', NULL),
(6, 2, 5, 1, '2022-01-27 14:53:33', '2022-01-27 09:23:33', NULL),
(7, 3, 5, 2, '2022-01-27 14:53:45', '2022-01-27 09:23:45', NULL),
(8, 4, 5, 3, '2022-01-27 14:53:54', '2022-01-27 09:23:54', NULL),
(9, 5, 5, 4, '2022-01-27 14:54:02', '2022-01-27 09:24:02', NULL),
(10, 2, 5, 8, '2022-01-27 14:54:13', '2022-01-27 09:24:13', NULL),
(11, 3, 12, 1, '2022-01-28 16:35:32', '2022-01-28 11:05:32', NULL),
(12, 4, 12, 2, '2022-03-17 15:41:34', '2022-03-17 10:11:34', NULL),
(13, 2, 3, 1, '2022-03-17 15:52:46', '2022-03-17 10:22:46', NULL),
(14, 2, 3, 2, '2022-03-17 15:52:55', '2022-03-17 10:22:55', NULL),
(15, 3, 3, 3, '2022-03-17 15:53:05', '2022-03-17 10:23:05', NULL),
(16, 4, 3, 4, '2022-03-17 15:53:12', '2022-03-17 10:23:12', NULL),
(17, 5, 3, 5, '2022-03-17 15:53:19', '2022-03-17 10:23:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_weekschedule`
--

DROP TABLE IF EXISTS `school_weekschedule`;
CREATE TABLE IF NOT EXISTS `school_weekschedule` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `day` varchar(255) NOT NULL,
  `section_id` int(10) NOT NULL,
  `schedule_id` int(10) NOT NULL,
  `period_no` int(10) DEFAULT NULL,
  `subject_id` int(10) DEFAULT NULL,
  `staff_id` int(10) DEFAULT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `section_id link week schedule` (`section_id`),
  KEY `schedule id link week schedule` (`schedule_id`),
  KEY `subject id link week schedule` (`subject_id`),
  KEY `staff id link week schedule` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_weekschedule`
--

INSERT INTO `school_weekschedule` (`ID`, `day`, `section_id`, `schedule_id`, `period_no`, `subject_id`, `staff_id`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 'Monday', 1, 1, 1, 1, 2, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(2, 'Monday', 1, 1, 2, 1, 2, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(3, 'Monday', 1, 1, 3, 2, 3, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(4, 'Monday', 1, 1, 4, 2, 3, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(5, 'Monday', 1, 1, 5, 12, 5, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(6, 'Monday', 1, 1, 6, 12, 5, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(7, 'Monday', 1, 1, 7, 14, 4, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(8, 'Monday', 1, 1, 8, 8, 2, '2022-01-27 14:54:54', '2022-01-27 09:24:54', NULL),
(9, 'Wednesday', 5, 1, 1, 2, 3, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(10, 'Wednesday', 5, 1, 2, 4, 5, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(11, 'Wednesday', 5, 1, 3, 3, 4, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(12, 'Wednesday', 5, 1, 4, 8, 2, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(13, 'Wednesday', 5, 1, 5, 4, 5, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(14, 'Wednesday', 5, 1, 6, 1, 2, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(15, 'Wednesday', 5, 1, 7, 3, 4, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(16, 'Wednesday', 5, 1, 8, 2, 3, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL),
(17, 'Saturday', 1, 2, 1, 2, 3, '2022-02-16 14:32:52', '2022-02-16 09:02:52', NULL),
(18, 'Saturday', 1, 2, 2, 1, 2, '2022-02-16 14:32:52', '2022-02-16 09:02:52', NULL),
(19, 'Saturday', 1, 2, 3, 14, 4, '2022-02-16 14:32:52', '2022-02-16 09:02:52', NULL),
(20, 'Saturday', 1, 2, 4, 14, 4, '2022-02-16 14:32:52', '2022-02-16 09:02:52', NULL),
(21, 'Saturday', 1, 2, 0, 0, 0, '2022-02-16 14:32:52', '2022-02-16 09:02:52', '2022-02-16 14:58:31'),
(22, 'Saturday', 1, 2, 0, 0, 0, '2022-02-16 14:32:52', '2022-02-16 09:02:52', '2022-02-16 14:58:31'),
(23, 'Saturday', 1, 2, 0, 0, 0, '2022-02-16 14:32:52', '2022-02-16 09:02:52', '2022-02-16 14:58:31'),
(24, 'Saturday', 1, 2, 0, 0, 0, '2022-02-16 14:32:52', '2022-02-16 09:02:52', '2022-02-16 14:58:31'),
(25, 'Friday', 5, 2, 1, 2, 3, '2022-02-16 14:58:31', '2022-02-16 09:28:31', NULL),
(26, 'Friday', 5, 2, 2, 3, 4, '2022-02-16 14:58:31', '2022-02-16 09:28:31', NULL),
(27, 'Friday', 5, 2, 3, 1, 2, '2022-02-16 14:58:31', '2022-02-16 09:28:31', NULL),
(28, 'Friday', 5, 2, 4, 4, 5, '2022-02-16 14:58:31', '2022-02-16 09:28:31', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `school_addexam`
--
ALTER TABLE `school_addexam`
  ADD CONSTRAINT `section_link exam` FOREIGN KEY (`section_id`) REFERENCES `school_addsection` (`ID`);

--
-- Constraints for table `school_addsection`
--
ALTER TABLE `school_addsection`
  ADD CONSTRAINT `class_id link` FOREIGN KEY (`class_id`) REFERENCES `school_addclass` (`ID`);

--
-- Constraints for table `school_addstudent`
--
ALTER TABLE `school_addstudent`
  ADD CONSTRAINT `student_id link` FOREIGN KEY (`Stud_ID`) REFERENCES `school_initialaddstudent` (`ID`);

--
-- Constraints for table `school_studentadmission`
--
ALTER TABLE `school_studentadmission`
  ADD CONSTRAINT `section_id link admission` FOREIGN KEY (`Section`) REFERENCES `school_addsection` (`ID`),
  ADD CONSTRAINT `stud_id link admission` FOREIGN KEY (`Stud_id`) REFERENCES `school_initialaddstudent` (`ID`);

--
-- Constraints for table `school_studentattendance`
--
ALTER TABLE `school_studentattendance`
  ADD CONSTRAINT `section_id link attendance` FOREIGN KEY (`class_section`) REFERENCES `school_addsection` (`ID`),
  ADD CONSTRAINT `staff_id link to marked_by attendance` FOREIGN KEY (`marked_by`) REFERENCES `school_addstaff` (`ID`),
  ADD CONSTRAINT `stud_id link attendance` FOREIGN KEY (`Stud_ID`) REFERENCES `school_initialaddstudent` (`ID`);

--
-- Constraints for table `school_student_due_collection`
--
ALTER TABLE `school_student_due_collection`
  ADD CONSTRAINT `stud_id link` FOREIGN KEY (`Stud_ID`) REFERENCES `school_initialaddstudent` (`ID`);

--
-- Constraints for table `school_studexam_mark`
--
ALTER TABLE `school_studexam_mark`
  ADD CONSTRAINT `section link mark` FOREIGN KEY (`Section_id`) REFERENCES `school_addsection` (`ID`),
  ADD CONSTRAINT `staff_id link mark` FOREIGN KEY (`entered_by`) REFERENCES `school_addstaff` (`ID`),
  ADD CONSTRAINT `stud_id link mark` FOREIGN KEY (`stud_id`) REFERENCES `school_initialaddstudent` (`ID`),
  ADD CONSTRAINT `subject link mark` FOREIGN KEY (`subject_id`) REFERENCES `school_addsubjects` (`ID`);

--
-- Constraints for table `school_subjectclass_mapping`
--
ALTER TABLE `school_subjectclass_mapping`
  ADD CONSTRAINT `Staff_ID link mapping` FOREIGN KEY (`Staff_ID`) REFERENCES `school_addstaff` (`ID`),
  ADD CONSTRAINT `section_id link mapping` FOREIGN KEY (`Section_id`) REFERENCES `school_addsection` (`ID`),
  ADD CONSTRAINT `subject link` FOREIGN KEY (`Subject_id`) REFERENCES `school_addsubjects` (`ID`);

--
-- Constraints for table `school_weekschedule`
--
ALTER TABLE `school_weekschedule`
  ADD CONSTRAINT `schedule id link week schedule` FOREIGN KEY (`schedule_id`) REFERENCES `school_scheduleplan` (`ID`),
  ADD CONSTRAINT `section_id link week schedule` FOREIGN KEY (`section_id`) REFERENCES `school_addsection` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
