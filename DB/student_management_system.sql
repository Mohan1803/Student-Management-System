-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 27, 2021 at 12:53 PM
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
  `Actual_fee` varchar(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_addstaff`
--

DROP TABLE IF EXISTS `school_addstaff`;
CREATE TABLE IF NOT EXISTS `school_addstaff` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
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
  `DOB` date NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addstudent`
--

INSERT INTO `school_addstudent` (`ID`, `Stud_ID`, `First_Name`, `Middle_Name`, `Last_Name`, `Father_name`, `Mother_name`, `DOB`, `Emergency_Contact_No`, `Religion`, `Caste`, `Mother_Tongue`, `Stud_Aadhar_No`, `Sex`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(2, 1, 'B', 'Kishore', '', 'Balamurugan', 'Mother name', '2005-04-13', '7864563456', 'Hindu', 'BC', 'tamil', '882749307388', 'male', '2021-12-27 16:24:38', '2021-12-27 10:54:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addsubjects`
--

DROP TABLE IF EXISTS `school_addsubjects`;
CREATE TABLE IF NOT EXISTS `school_addsubjects` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `subject_id` int(10) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `actual_mark` int(10) NOT NULL,
  `pass_mark` int(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_initialaddstudent`
--

DROP TABLE IF EXISTS `school_initialaddstudent`;
CREATE TABLE IF NOT EXISTS `school_initialaddstudent` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Stud_ID` varchar(255) NOT NULL,
  `class` int(10) NOT NULL,
  `section` varchar(20) NOT NULL,
  `DOB` date NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_initialaddstudent`
--

INSERT INTO `school_initialaddstudent` (`ID`, `Stud_ID`, `class`, `section`, `DOB`, `email_id`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '12BMH001', 12, 'A', '2005-04-13', 'mohannraj.s@koinnovation.com', '$2b$12$9n2LbdDZqhadEH6eoWYtIubkci40lA/UzpM9I9BU8uGnPlolLuo4i', '2021-12-27 16:24:03', '2021-12-27 10:54:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_staffattendance`
--

DROP TABLE IF EXISTS `school_staffattendance`;
CREATE TABLE IF NOT EXISTS `school_staffattendance` (
  `Staff_ID` varchar(255) NOT NULL,
  `Adate` date NOT NULL,
  `Astatus` varchar(255) NOT NULL,
  `User_Name` varchar(255) NOT NULL,
  `Academic_Year` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`Staff_ID`),
  KEY `User_Name` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_staffsalary`
--

DROP TABLE IF EXISTS `school_staffsalary`;
CREATE TABLE IF NOT EXISTS `school_staffsalary` (
  `Staff_id` varchar(255) NOT NULL,
  `User_Name` varchar(255) NOT NULL,
  `Staff_Account_No` varchar(20) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`Staff_id`),
  KEY `acc no` (`Staff_Account_No`),
  KEY `staff salary` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_studentattendance`
--

DROP TABLE IF EXISTS `school_studentattendance`;
CREATE TABLE IF NOT EXISTS `school_studentattendance` (
  `ID` int(10) NOT NULL,
  `Stud_ID` int(10) NOT NULL,
  `User_Name` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_studentfee`
--

DROP TABLE IF EXISTS `school_studentfee`;
CREATE TABLE IF NOT EXISTS `school_studentfee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Stud_ID` int(10) NOT NULL,
  `Actual_fee` varchar(10) NOT NULL,
  `Paying_amt` varchar(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Stud_ID` (`Stud_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Constraints for table `school_staffattendance`
--
ALTER TABLE `school_staffattendance`
  ADD CONSTRAINT `Staff_ID` FOREIGN KEY (`Staff_ID`) REFERENCES `school_addstaff` (`Staff_id`) ON DELETE CASCADE;

--
-- Constraints for table `school_staffsalary`
--
ALTER TABLE `school_staffsalary`
  ADD CONSTRAINT `acc no` FOREIGN KEY (`Staff_Account_No`) REFERENCES `school_addstaff` (`Staff_Account_No`),
  ADD CONSTRAINT `staff salary` FOREIGN KEY (`User_Name`) REFERENCES `school_staffattendance` (`User_Name`);

--
-- Constraints for table `school_studentfee`
--
ALTER TABLE `school_studentfee`
  ADD CONSTRAINT `stud_id link` FOREIGN KEY (`Stud_ID`) REFERENCES `school_initialaddstudent` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
