-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 16, 2021 at 11:11 AM
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
  `Capacity` int(11) NOT NULL,
  `Division` varchar(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addclass`
--

INSERT INTO `school_addclass` (`ID`, `Class`, `Capacity`, `Division`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, '12', 40, 'A', '2021-12-09 13:22:50', '2021-12-09 07:52:50', NULL),
(2, '12', 40, 'B', '2021-12-10 10:16:49', '2021-12-10 04:46:49', NULL),
(3, '11', 40, 'A', '2021-12-10 10:19:19', '2021-12-10 04:49:19', NULL),
(4, '11', 40, 'B', '2021-12-10 10:19:25', '2021-12-10 04:49:25', NULL),
(5, '10', 40, 'A', '2021-12-10 10:19:31', '2021-12-10 04:49:31', NULL),
(6, '10', 40, 'B', '2021-12-10 10:19:37', '2021-12-10 04:49:37', NULL),
(7, '9', 40, 'A', '2021-12-10 10:19:44', '2021-12-10 04:49:44', NULL),
(8, '9', 40, 'B', '2021-12-10 10:19:49', '2021-12-10 04:49:49', NULL),
(9, '8', 40, 'A', '2021-12-10 10:19:55', '2021-12-10 04:49:55', NULL),
(10, '8', 40, 'B', '2021-12-10 10:20:00', '2021-12-10 04:50:00', NULL),
(11, '7', 50, 'A', '2021-12-10 10:20:14', '2021-12-10 04:50:14', NULL),
(12, '7', 50, 'B', '2021-12-10 10:20:19', '2021-12-10 04:50:19', NULL),
(13, '6', 45, 'A', '2021-12-10 10:20:26', '2021-12-10 04:50:26', NULL),
(14, '6', 45, 'B', '2021-12-10 10:20:46', '2021-12-10 04:50:46', NULL),
(15, '5', 50, 'A', '2021-12-10 10:20:52', '2021-12-10 04:50:52', NULL),
(16, '5', 50, 'B', '2021-12-10 10:20:57', '2021-12-10 04:50:57', NULL),
(17, '4', 40, 'A', '2021-12-10 10:21:02', '2021-12-10 04:51:02', NULL),
(18, '4', 40, 'B', '2021-12-10 10:21:18', '2021-12-10 04:51:18', NULL),
(19, '3', 60, 'A', '2021-12-10 10:21:23', '2021-12-10 04:51:23', NULL),
(20, '3', 60, 'B', '2021-12-10 10:21:29', '2021-12-10 04:51:29', NULL),
(21, '2', 60, 'A', '2021-12-10 10:21:35', '2021-12-10 04:51:35', NULL),
(22, '2', 60, 'B', '2021-12-10 10:21:40', '2021-12-10 04:51:40', NULL),
(23, '1', 60, 'A', '2021-12-10 10:21:45', '2021-12-10 04:51:45', NULL),
(24, '1', 60, 'B', '2021-12-10 10:21:50', '2021-12-10 04:51:50', NULL),
(25, '1', 60, 'B', '2021-12-10 10:21:57', '2021-12-10 04:51:57', NULL),
(26, '1', 60, 'B', '2021-12-10 10:22:06', '2021-12-10 04:52:06', NULL);

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
(2, 'BMH002', 'staff', 'H', 'Dinesh', 'Kumar', 'Hari Harasudhan', 'Mahalakshmi', '1991-06-17', 'male', 'married', '2021-11-18', 'BA', '669274910462', 'non-teaching', 'ABC1234', 'O+', 'dinesh@gmail.com', '6802682906', '6387592064', '20,000', 'NIL', '$2b$12$a0znTZr.deOMFG8973f2kO21vSLFnrx8.SfVH5qT.EwzAglLEdFjO', '2021-11-25 20:11:33', '2021-11-25 14:41:33', NULL),
(3, 'BMH003', 'staff', 'D', 'Ashok', 'Kumar', 'Dharmalingam', 'Muthulakshmi', '1991-09-16', 'male', 'married', '2021-10-19', 'BA', '906392846286', 'teaching', 'ABC12345', 'O+', 'ashokkumar1990@gmail.com', '9836103783', '9852857196', '20,000', 'NIL', '$2b$12$0nXHdYwvnsS49d8yMt0Speo.5N8sAto6JM0a39LJpam/cbKI8IXJy', '2021-11-26 11:08:51', '2021-11-26 05:38:51', NULL),
(4, 'BMH004', 'staff', 'A', 'Kishore', '', 'Ashok', 'Rajalakshmi', '1991-05-24', 'male', 'married', '2021-11-15', 'Bsc', '557024859201', 'teaching', 'ABC1234Z', 'AB+', 'kishore@gmail.com', '6360185293', '9830286346', '20,000', 'NIL', '$2b$12$tGmlTpTcpNnMrk/wNQTYoee9.YAqa2JUx36mTlHT9u8SbRnKT1uBW', '2021-12-10 10:48:46', '2021-12-10 05:18:46', NULL),
(5, 'BMH005', 'staff', 'B', 'Baskar', '', 'Balamurugan', 'Sasi', '1996-12-10', 'male', 'married', '2021-12-16', 'B.A', '557024859203', 'teaching', 'ABC12345Z', 'A+', 'baskar@gmail.com', '8932750212', '9972752532', '20,000', 'NIL', '$2b$12$GhsG5OP7msrdMBEPG0XYZuiQFmBSIpqVIj6dCdxD42P0BoN2EH3tW', '2021-12-10 12:35:08', '2021-12-10 07:05:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_addstudent`
--

DROP TABLE IF EXISTS `school_addstudent`;
CREATE TABLE IF NOT EXISTS `school_addstudent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Stud_ID` varchar(255) NOT NULL,
  `Class` varchar(20) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Middle_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Father_name` varchar(255) NOT NULL,
  `Mother_name` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `Weight` int(11) NOT NULL,
  `Height` int(11) NOT NULL,
  `Emergency_Contact_No` varchar(20) NOT NULL,
  `Religion` varchar(255) NOT NULL,
  `Caste` varchar(255) NOT NULL,
  `Mother_Tongue` varchar(255) NOT NULL,
  `Stud_Aadhar_No` varchar(255) NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `Email_id` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Stud_ID` (`Stud_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_addstudent`
--

INSERT INTO `school_addstudent` (`id`, `Stud_ID`, `Class`, `First_Name`, `Middle_Name`, `Last_Name`, `Father_name`, `Mother_name`, `DOB`, `Weight`, `Height`, `Emergency_Contact_No`, `Religion`, `Caste`, `Mother_Tongue`, `Stud_Aadhar_No`, `Sex`, `Email_id`, `Password`, `Created_at`, `Updated_at`, `Deleted_at`) VALUES
(1, '12BMH001', '12', 'N', 'Sachin', '', 'Narayanan', 'Gayathri', '2005-06-15', 40, 5, '7864563456', 'Hindu', 'BC', 'tamil', '348753056212', 'male', 'sachin@gmail.com', '$2b$12$N.Z48XmPQzTpUH/G8pviMeSKebsg0NF02c/ZdHhc79KHrr5XbG25K', '2021-11-25 20:16:12', '2021-11-25 14:46:12', NULL),
(2, '12BMH002', '12', 'H', 'Rakesh', '', 'Hari Harasudhan', 'Gayathri', '2005-01-10', 44, 5, '6723580263', 'Hindu', 'MBC', 'tamil', '882749172575', 'male', 'rakesh@gmail.com', '$2b$12$V0UhdgupUTsA0LVhjPi4vOpppY.5dvRrfvTgF7etRAx7oKkdwHQCy', '2021-11-29 10:35:16', '2021-11-29 05:05:16', NULL),
(3, '10BMH001', '10', 'V', 'Gowtham', '', 'Vinoth', 'Divya', '2007-06-11', 38, 5, '7864563456', 'Hindu', 'BC', 'tamil', '882749307388', 'male', 'gowtham2012@gmail.com', '$2b$12$KIdOksAlnGOFoexRwVNwJOmnIXL0aFWy0S8QfOFPLHUtvMwO8JB1a', '2021-12-10 10:11:31', '2021-12-10 04:41:31', NULL);

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
-- Table structure for table `school_login`
--

DROP TABLE IF EXISTS `school_login`;
CREATE TABLE IF NOT EXISTS `school_login` (
  `User_Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `Stud_ID` varchar(255) NOT NULL,
  `User_Name` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`User_Name`),
  KEY `Stud_ID` (`Stud_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_studentfee`
--

DROP TABLE IF EXISTS `school_studentfee`;
CREATE TABLE IF NOT EXISTS `school_studentfee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Stud_ID` varchar(255) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Class` varchar(10) NOT NULL,
  `Section` varchar(10) NOT NULL,
  `Actual_fee` varchar(10) NOT NULL,
  `Paying_amt` varchar(10) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `school_studentattendance`
--
ALTER TABLE `school_studentattendance`
  ADD CONSTRAINT `Stud_ID` FOREIGN KEY (`Stud_ID`) REFERENCES `school_addstudent` (`Stud_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
