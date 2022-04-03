-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 03, 2022 at 07:34 AM
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
-- Database: `dance_fit_studio`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE IF NOT EXISTS `bookings` (
  `bookingNumber` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `classID` int(11) NOT NULL,
  `bookingDate` datetime NOT NULL,
  `cancelDate` datetime DEFAULT NULL,
  PRIMARY KEY (`bookingNumber`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `classType` varchar(50) NOT NULL,
  `Description` text,
  `classSchedule` datetime NOT NULL,
  `classCancelled` datetime DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`classID`),
  KEY `classType` (`classType`),
  KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`classID`, `classType`, `Description`, `classSchedule`, `classCancelled`, `email`) VALUES
(1, 'yoga', 'this is a test', '1753-01-01 00:00:00', NULL, 'test2@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `classtype`
--

DROP TABLE IF EXISTS `classtype`;
CREATE TABLE IF NOT EXISTS `classtype` (
  `classType` varchar(50) NOT NULL,
  PRIMARY KEY (`classType`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logging`
--

DROP TABLE IF EXISTS `logging`;
CREATE TABLE IF NOT EXISTS `logging` (
  `logID` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `sessionID` varchar(100) DEFAULT NULL,
  `method` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`logID`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logging`
--

INSERT INTO `logging` (`logID`, `ip`, `sessionID`, `method`, `url`, `email`) VALUES
(1, '::1', NULL, 'GET', '/users', NULL),
(2, '::1', NULL, 'GET', '/users', NULL),
(3, '::1', NULL, 'GET', '/users', NULL),
(4, '::1', NULL, 'GET', '/users', NULL),
(5, '::1', NULL, 'GET', '/bookings', NULL),
(6, '::1', NULL, 'GET', '/bookings', NULL),
(7, '::1', NULL, 'GET', '/bookings', NULL),
(8, '::1', NULL, 'GET', '/classes', NULL),
(9, '::1', NULL, 'GET', '/classes', NULL),
(10, '::1', NULL, 'GET', '/classes', NULL),
(11, '::1', NULL, 'GET', '/users', NULL),
(12, '::1', NULL, 'GET', '/users', NULL),
(13, '::1', NULL, 'GET', '/users', NULL),
(14, '::1', NULL, 'GET', '/users', NULL),
(15, '::1', NULL, 'GET', '/users', NULL),
(16, '::1', NULL, 'GET', '/users', NULL),
(17, '::1', NULL, 'GET', '/users', NULL),
(18, '::1', NULL, 'GET', '/users', NULL),
(19, '::1', NULL, 'GET', '/users', NULL),
(20, '::1', NULL, 'GET', '/users', NULL),
(21, '::1', NULL, 'GET', '/users', NULL),
(22, '::1', NULL, 'GET', '/users', NULL),
(23, '::1', NULL, 'GET', '/users', NULL),
(24, '::1', NULL, 'GET', '/users', NULL),
(25, '::1', NULL, 'GET', '/users', NULL),
(26, '::1', NULL, 'GET', '/users', NULL),
(27, '::1', NULL, 'GET', '/users', NULL),
(28, '::1', NULL, 'GET', '/users', NULL),
(29, '::1', NULL, 'GET', '/users', NULL),
(30, '::1', NULL, 'GET', '/users', NULL),
(31, '::1', NULL, 'GET', '/users', NULL),
(32, '::1', NULL, 'GET', '/users', NULL),
(33, '::1', NULL, 'GET', '/users', NULL),
(34, '::1', NULL, 'GET', '/users', NULL),
(35, '::1', NULL, 'GET', '/users', NULL),
(36, '::1', NULL, 'POST', '/classes/create', NULL),
(37, '::1', NULL, 'POST', '/classes/create', NULL),
(38, '::1', NULL, 'POST', '/classes/create', NULL),
(39, '::1', NULL, 'POST', '/users/create', NULL),
(40, '::1', NULL, 'GET', '/users', NULL),
(41, '::1', NULL, 'GET', '/users', NULL),
(42, '::1', NULL, 'POST', '/users/create', NULL),
(43, '::1', NULL, 'GET', '/users', NULL),
(44, '::1', NULL, 'GET', '/users/update', NULL),
(45, '::1', NULL, 'POST', '/users/update', NULL),
(46, '::1', NULL, 'GET', '/users', NULL),
(47, '::1', NULL, 'GET', '/users/create', NULL),
(48, '::1', NULL, 'POST', '/users/create', NULL),
(49, '::1', NULL, 'POST', '/users/create', NULL),
(50, '::1', NULL, 'POST', '/users/create', NULL),
(51, '::1', NULL, 'GET', '/users', NULL),
(52, '::1', NULL, 'POST', '/users/create', NULL),
(53, '::1', NULL, 'POST', '/users/create', NULL),
(54, '::1', NULL, 'POST', '/users/create', NULL),
(55, '::1', NULL, 'POST', '/users/create', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userlevel`
--

DROP TABLE IF EXISTS `userlevel`;
CREATE TABLE IF NOT EXISTS `userlevel` (
  `accountLevel` varchar(25) NOT NULL,
  PRIMARY KEY (`accountLevel`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `accountLevel` varchar(25) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `password`, `firstName`, `lastName`, `accountLevel`) VALUES
('', '', '', '', ''),
('test@email.com', '$2b$10$.hVQPTZjuqOnd9J1vRl5seIVNMWfQiY.gx0/RAhIlnv.ZNHaveQD6', 'test2', 'test2', 'admin'),
('test2@email.com', '123', 'test', 'test', 'admin'),
('test3@email.com', '123', 'test', 'test', 'admin'),
('test4@email.com', '123', 'test', 'test', 'admin'),
('test5@email.com', '1233', 'test', 'test', 'admin'),
('test8@email.com', '12334', 'test2', 'test2', 'admin'),
('test18@email.com', '$2b$10$BKmJC9o6wsB840khiTA9KeOxinI2YtloJ//riFAVWzRUW9eMLbeVm', 'test2', 'test2', 'admin'),
('test10@email.com', '$2b$10$KcC0wlVAOUSGTFuaPk0EA.F097s65EL62QRgUKeGBKvOeeDl1WAvC', 'test2', 'test2', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
