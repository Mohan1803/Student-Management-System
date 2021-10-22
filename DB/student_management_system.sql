-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 22, 2021 at 06:42 AM
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
  `Class` varchar(20) NOT NULL,
  `Division` varchar(10) NOT NULL,
  `Academic_Year` varchar(30) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_addstaff`
--

DROP TABLE IF EXISTS `school_addstaff`;
CREATE TABLE IF NOT EXISTS `school_addstaff` (
  `Staff_id` varchar(255) NOT NULL,
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
  `Staff_Account_No` varchar(20) NOT NULL,
  `Blood_Group` varchar(10) NOT NULL,
  `Email_ID` varchar(255) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Emergency_Contact_No` varchar(15) NOT NULL,
  `Basic_Pay` varchar(10) NOT NULL,
  `Pre_Institute_Name` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`Staff_id`),
  KEY `Staff_Account_No` (`Staff_Account_No`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_addstudent`
--

DROP TABLE IF EXISTS `school_addstudent`;
CREATE TABLE IF NOT EXISTS `school_addstudent` (
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
  `Rel_ID` int(11) NOT NULL,
  `Rel_Name` varchar(255) NOT NULL,
  `Caste` varchar(255) NOT NULL,
  `Mother_Tongue` varchar(255) NOT NULL,
  `Stud_Aadhar_No` varchar(255) NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `Disease` varchar(255) NOT NULL,
  `Email_id` varchar(255) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`Stud_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_addsubjects`
--

DROP TABLE IF EXISTS `school_addsubjects`;
CREATE TABLE IF NOT EXISTS `school_addsubjects` (
  `Sub_ID` varchar(255) NOT NULL,
  `Sub_Name` varchar(255) NOT NULL,
  `Marks` int(10) NOT NULL,
  `Pass_Marks` int(10) NOT NULL,
  `Academic_Year` varchar(10) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL
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
  `Adate` date NOT NULL,
  `Astatus` varchar(255) NOT NULL,
  `User_Name` varchar(255) NOT NULL,
  `Academic_Year` varchar(255) NOT NULL,
  `Class` varchar(20) NOT NULL,
  `Division` varchar(20) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` timestamp NOT NULL,
  `Deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`User_Name`),
  KEY `Stud_ID` (`Stud_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `school_staffattendance`
--
ALTER TABLE `school_staffattendance`
  ADD CONSTRAINT `Staff_ID` FOREIGN KEY (`Staff_ID`) REFERENCES `school_addstaff` (`Staff_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `username` FOREIGN KEY (`User_Name`) REFERENCES `school_studentattendance` (`User_Name`);

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
