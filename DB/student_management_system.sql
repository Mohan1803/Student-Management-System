-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 02, 2022 at 11:28 AM
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
(1, 1, 'First Name', 'Gowtham', '', 'Father Name', 'Mother Name', '7864563456', 'Hindu', 'BC', 'tamil', '882749307388', 'male', '2022-01-04 17:21:03', '2022-01-04 11:51:03', NULL),
(2, 2, 'First Name', 'Baskar', '', 'Father Name', 'Mother Name', '7864563443', 'Hindu', 'BC', 'tamil', '567890234567', 'male', '2022-01-04 17:30:58', '2022-01-04 12:00:58', NULL),
(3, 3, 'K', 'Gowtham', '', 'Kanagaraj', 'Rajalakshmi', '7864563443', 'Hindu', 'BC', 'tamil', '882749172575', 'male', '2022-01-05 16:46:30', '2022-01-05 11:16:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addsubjects`
--

DROP TABLE IF EXISTS `school_addsubjects`;
CREATE TABLE IF NOT EXISTS `school_addsubjects` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  `actual_mark` int(10) NOT NULL,
  `pass_mark` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addsubjects`
--

INSERT INTO `school_addsubjects` (`ID`, `subject_name`, `actual_mark`, `pass_mark`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 'Tamil', 100, 35, '2022-01-11 15:04:56', '2022-01-11 09:34:56', NULL),
(2, 'English', 100, 35, '2022-01-11 15:05:07', '2022-01-11 09:35:07', NULL),
(3, 'Maths', 100, 35, '2022-01-11 15:06:02', '2022-01-11 09:36:02', NULL),
(4, 'Science', 100, 35, '2022-01-11 15:06:16', '2022-01-11 09:36:16', NULL),
(5, 'Social Science', 100, 35, '2022-01-11 15:06:30', '2022-01-11 09:36:30', NULL),
(6, 'Botany', 100, 35, '2022-01-11 15:06:46', '2022-01-11 09:36:46', NULL),
(7, 'Zoology', 100, 35, '2022-01-11 15:06:57', '2022-01-11 09:36:57', NULL),
(8, 'History', 100, 35, '2022-01-11 15:07:12', '2022-01-11 09:37:12', NULL),
(9, 'Geography', 100, 35, '2022-01-11 15:07:22', '2022-01-11 09:37:22', NULL),
(10, 'General Knowledge', 100, 35, '2022-01-11 15:07:42', '2022-01-11 09:37:42', NULL),
(11, 'Moral Science', 100, 35, '2022-01-11 15:07:56', '2022-01-11 09:37:56', NULL),
(12, 'Computer Science', 200, 70, '2022-01-11 15:08:34', '2022-01-11 09:38:34', NULL),
(13, 'Biology', 200, 70, '2022-01-11 15:08:49', '2022-01-11 09:38:49', NULL),
(14, 'Mathematics', 200, 70, '2022-01-11 15:09:08', '2022-01-11 09:39:08', NULL),
(15, 'Accounts', 200, 70, '2022-01-11 15:15:41', '2022-01-11 09:45:41', NULL),
(16, 'Statistics', 200, 70, '2022-01-11 15:16:53', '2022-01-11 09:46:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_initialaddstudent`
--

DROP TABLE IF EXISTS `school_initialaddstudent`;
CREATE TABLE IF NOT EXISTS `school_initialaddstudent` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Stud_ID` varchar(255) NOT NULL,
  `section` int(10) NOT NULL,
  `DOB` date NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `section_link` (`section`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_initialaddstudent`
--

INSERT INTO `school_initialaddstudent` (`ID`, `Stud_ID`, `section`, `DOB`, `email_id`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BMH21001', 1, '2022-01-05', 'mohannraj.s@koinnovation.com', '$2b$12$kiftUrbb01sfo5k5g7iNReNAIDZ9ghRzy88xJT8lsgDiTxjW4.L2W', '2022-01-04 17:19:49', '2022-01-04 11:49:49', NULL),
(2, 'BMH21002', 1, '2022-01-02', 'kishore@gmail.com', '$2b$12$806goHlv1k4wrcFVRGhKx.RgkXkPbMoPzgStmtBseC8eam6hF7alC', '2022-01-04 17:30:20', '2022-01-04 12:00:20', NULL),
(3, 'BMH21003', 1, '2005-06-14', 'kishore@gmail.com', '$2b$12$cJA6JDCfqI0QnF/vcFT80.x8ikLwIYlJdlBtUE4YssR9vVdMcQXBO', '2022-01-05 16:42:57', '2022-01-05 11:12:57', NULL);

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
  `Actual_fee` int(10) NOT NULL,
  `Initial_Paying_amt` int(10) NOT NULL,
  `Pending_due` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `stud_id link admission` (`Stud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_studentadmission`
--

INSERT INTO `school_studentadmission` (`ID`, `Stud_id`, `Actual_fee`, `Initial_Paying_amt`, `Pending_due`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 1, 20000, 20000, 0, '2022-01-07 15:40:11', '2022-01-07 10:10:11', NULL),
(2, 2, 20000, 9000, 11000, '2022-01-07 15:52:29', '2022-01-07 10:22:29', NULL),
(3, 3, 20000, 17000, 3000, '2022-01-10 17:01:35', '2022-01-10 11:31:35', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_studentattendance`
--

INSERT INTO `school_studentattendance` (`ID`, `Stud_ID`, `class_section`, `period_no`, `date`, `status`, `marked_by`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 2, 1, 4, '2022-02-02', 'Absent', 3, '2022-02-02 14:57:15', '2022-02-02 09:27:15', NULL),
(2, 1, 1, 4, '2022-02-02', 'Present', 3, '2022-02-02 14:57:15', '2022-02-02 09:27:15', NULL),
(3, 3, 1, 4, '2022-02-02', 'Present', 3, '2022-02-02 14:57:15', '2022-02-02 09:27:15', NULL),
(4, 1, 1, 3, '2022-02-02', 'Absent', 3, '2022-02-02 15:36:42', '2022-02-02 10:06:42', NULL),
(5, 2, 1, 3, '2022-02-02', 'Present', 3, '2022-02-02 15:36:42', '2022-02-02 10:06:42', NULL),
(6, 3, 1, 3, '2022-02-02', 'Present', 3, '2022-02-02 15:36:42', '2022-02-02 10:06:42', NULL),
(7, 2, 1, 1, '2022-02-02', 'Absent', 2, '2022-02-02 15:37:15', '2022-02-02 10:07:15', NULL),
(8, 1, 1, 1, '2022-02-02', 'Present', 2, '2022-02-02 15:37:15', '2022-02-02 10:07:15', NULL),
(9, 3, 1, 1, '2022-02-02', 'Present', 2, '2022-02-02 15:37:15', '2022-02-02 10:07:15', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_student_due_collection`
--

INSERT INTO `school_student_due_collection` (`ID`, `Stud_ID`, `Actual_fee`, `Paying_amt`, `Payment_mode`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, 3, 20000, 10000, 'Cash', '2022-01-10 17:01:58', '2022-01-10 11:31:58', NULL),
(2, 3, 20000, 6000, 'Cheque', '2022-01-11 12:18:00', '2022-01-11 06:48:00', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

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
(11, 3, 12, 1, '2022-01-28 16:35:32', '2022-01-28 11:05:32', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

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
(16, 'Wednesday', 5, 1, 8, 2, 3, '2022-01-27 14:55:22', '2022-01-27 09:25:22', NULL);

--
-- Constraints for dumped tables
--

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
-- Constraints for table `school_initialaddstudent`
--
ALTER TABLE `school_initialaddstudent`
  ADD CONSTRAINT `section_link` FOREIGN KEY (`section`) REFERENCES `school_addsection` (`ID`);

--
-- Constraints for table `school_studentadmission`
--
ALTER TABLE `school_studentadmission`
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
