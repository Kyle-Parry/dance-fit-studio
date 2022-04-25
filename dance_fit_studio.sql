-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2022 at 11:55 AM
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
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`bookingNumber`, `email`, `classID`, `bookingDate`, `cancelDate`) VALUES
(1, 'test@email.com', 1, '2022-04-01 04:30:30', NULL),
(2, 'test02@email.com', 2, '2022-03-31 18:30:30', '2022-04-01 04:30:30');

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`classID`, `classType`, `Description`, `classSchedule`, `classCancelled`, `email`) VALUES
(1, 'yoga', 'this is a test', '1753-01-01 00:00:00', NULL, 'test2@email.com'),
(2, 'dance', 'test test test', '1752-12-31 03:35:44', '2022-04-04 03:35:44', 'test2@email.com'),
(3, 'yoga', 'owaindoawndonawd', '2022-03-01 21:21:21', NULL, 'test@email.com'),
(4, 'testyoga', 'owaindoawndonawd', '2022-03-01 21:21:21', NULL, 'test@email.com');

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
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(50) NOT NULL,
  `sessionID` varchar(100) DEFAULT NULL,
  `method` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`logID`)
) ENGINE=MyISAM AUTO_INCREMENT=266 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logging`
--

INSERT INTO `logging` (`logID`, `timestamp`, `ip`, `sessionID`, `method`, `url`, `email`) VALUES
(1, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(2, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(3, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(4, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(5, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(6, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(7, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(8, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes', NULL),
(9, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes', NULL),
(10, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes', NULL),
(11, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(12, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(13, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(14, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(15, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(16, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(17, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(18, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(19, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(20, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(21, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(22, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(23, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(24, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(25, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(26, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(27, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(28, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(29, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(30, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(31, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(32, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(33, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(34, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(35, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(36, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(37, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(38, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(39, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(40, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(41, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(42, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(43, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(44, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/update', NULL),
(45, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(46, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(47, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/create', NULL),
(48, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(49, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(50, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(51, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(52, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(53, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(54, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(55, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(56, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(57, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/test@email.com', NULL),
(58, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/class', NULL),
(59, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes', NULL),
(60, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(61, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(62, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(63, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(64, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes', NULL),
(65, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes/2', NULL),
(66, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(67, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings', NULL),
(68, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/create', NULL),
(69, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/create', NULL),
(70, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/create', NULL),
(71, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(72, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings/1', NULL),
(73, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(74, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(75, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(76, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(77, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(78, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(79, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/1', NULL),
(80, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/2', NULL),
(81, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(82, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(83, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(84, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(85, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(86, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(87, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(88, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(89, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(90, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(91, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(92, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(93, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(94, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(95, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(96, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(97, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update/1', NULL),
(98, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/1', NULL),
(99, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/1', NULL),
(100, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(101, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(102, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(103, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(104, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(105, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(106, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(107, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(108, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings/2', NULL),
(109, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(110, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/bookings/update', NULL),
(111, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/bookings', NULL),
(112, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(113, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(114, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(115, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/test304@email.com', NULL),
(116, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/test304@email.com', NULL),
(117, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/test304@email.com', NULL),
(118, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(119, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/test304@email.com', NULL),
(120, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/test304@email.com', NULL),
(121, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/delete', NULL),
(122, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/delete', NULL),
(123, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/delete', NULL),
(124, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/delete', NULL),
(125, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/test304@email.com', NULL),
(126, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/', NULL),
(127, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users', NULL),
(128, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(129, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/delete', NULL),
(130, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users/test304@email.com', NULL),
(131, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/delete', NULL),
(132, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/class/2', NULL),
(133, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes/2', NULL),
(134, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes', NULL),
(135, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes/2', NULL),
(136, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/update', NULL),
(137, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/classes/2', NULL),
(138, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(139, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(140, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/login', NULL),
(141, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(142, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(143, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(144, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(145, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(146, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(147, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(148, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(149, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(150, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(151, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(152, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(153, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(154, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(155, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(156, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(157, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(158, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(159, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/update', NULL),
(160, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(161, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(162, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(163, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(164, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(165, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(166, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(167, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(168, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth', NULL),
(169, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(170, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(171, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(172, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(173, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(174, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(175, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(176, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(177, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(178, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(179, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(180, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(181, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(182, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(183, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(184, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(185, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(186, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(187, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(188, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(189, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(190, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(191, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(192, '2022-04-25 19:03:19', '::1', NULL, 'GET', '/users', NULL),
(193, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(194, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(195, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(196, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(197, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(198, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(199, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(200, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(201, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(202, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(203, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(204, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(205, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(206, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(207, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(208, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(209, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/auth/login', NULL),
(210, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(211, '2022-04-25 19:03:19', '::1', NULL, 'B_oZY_QDY2kS6rPftT6fh03vfnmRt1L9', 'POST', NULL),
(212, '2022-04-25 19:03:19', '::1', NULL, '0c51bmHyzWV87ANN8gn14yKI_tA9GlPq', 'POST', NULL),
(213, '2022-04-25 19:03:19', '::1', 'gecNFhaWFRAihdnSlla1sdGoiVBSe7w7', 'POST', '/auth/login', NULL),
(214, '2022-04-25 19:03:19', '::1', 'x_S2_h4VvyopPnx3hq-D7dYerOqqp5xT', 'POST', '/users/create', NULL),
(215, '2022-04-25 19:03:19', '::1', 'Ns6u1ggrSCpyRLE-ET1fneVmCVD0fVzA', 'POST', '/auth/login', NULL),
(216, '2022-04-25 19:03:19', '::1', 'Ns6u1ggrSCpyRLE-ET1fneVmCVD0fVzA', 'POST', '/users/create', NULL),
(217, '2022-04-25 19:03:19', '::1', 'ZqqTrINT8rGPsaJG9edGvwjJHFso2K1_', 'POST', '/users/create', NULL),
(218, '2022-04-25 19:03:19', '::1', '6X8XyREJIUuJAPLUnYu6hnLsmkVqBjdw', 'POST', '/users/create', NULL),
(219, '2022-04-25 19:03:19', '::1', 'bElsbO9QwjHdIfDf8j_1Oc45ULd44Niw', 'POST', '/users/create', NULL),
(220, '2022-04-25 19:03:19', '::1', 'bhBQeLwlMQ87g4VJI4v_eFE1e6uXO-40', 'POST', '/auth/login', NULL),
(221, '2022-04-25 19:03:19', '::1', 'bhBQeLwlMQ87g4VJI4v_eFE1e6uXO-40', 'POST', '/users/create', NULL),
(222, '2022-04-25 19:03:19', '::1', 'ha1n-15ccq9ncfqz3vVTDztzWF7b0FKN', 'POST', '/auth/login', NULL),
(223, '2022-04-25 19:03:19', '::1', 'ha1n-15ccq9ncfqz3vVTDztzWF7b0FKN', 'POST', '/users/create', NULL),
(224, '2022-04-25 19:03:19', '::1', 'dV3RObFQYbQFX_nppDwMwCSEqeK7J__N', 'POST', '/users/create', NULL),
(225, '2022-04-25 19:03:19', '::1', 'BKyRMfLhMchh8-5lADWxC0NuP9TrQDmt', 'POST', '/auth/login', NULL),
(226, '2022-04-25 19:03:19', '::1', 'BKyRMfLhMchh8-5lADWxC0NuP9TrQDmt', 'POST', '/users/create', NULL),
(227, '2022-04-25 19:03:19', '::1', 'AQCzN36XJj-SSDzwfibSq08NEUQZ0gjE', 'POST', '/auth/login', NULL),
(228, '2022-04-25 19:03:19', '::1', 'LWAUO4B5wMiZ8SdEoVxP0LfeDhxJC9IC', 'POST', '/auth/login', NULL),
(229, '2022-04-25 19:03:19', '::1', 'L_Yi9wgnfZsRGbYrhroBtLhkthwcsqBN', 'POST', '/auth/login', NULL),
(230, '2022-04-25 19:03:19', '::1', 'eZ2W31I-0i7rEloqOn8LWDXuoFb-k4wt', 'POST', '/users/create', NULL),
(231, '2022-04-25 19:03:19', '::1', 'hozl1C0ka3XDxWlCEVPXXHF_wDo_7AmF', 'POST', '/users/create', NULL),
(232, '2022-04-25 19:03:19', '::1', 'R08XDLkjzSuG64H7H6oeRpKKto5i51bI', 'POST', '/auth/login', NULL),
(233, '2022-04-25 19:03:19', '::1', 'wJ_gJTx2ChWuCmhpg3I2JDkSCfmse1jG', 'POST', '/auth/login', NULL),
(234, '2022-04-25 19:03:19', '::1', '85VACta_y0jdASvsu7158T8bxTkW60II', 'POST', '/users/create', NULL),
(235, '2022-04-25 19:03:19', '::1', 'uSFd3umSq6MUukXMSpaKTf2DErh4MJPy', 'POST', '/users/create', NULL),
(236, '2022-04-25 19:03:19', '::1', 'jTSbyhK2O33BECAJ1R-YDqH_sVxtqZCP', 'POST', '/users/create', NULL),
(237, '2022-04-25 19:03:19', '::1', 'fZXhnHBc1sCmtTsgdtYmgpMFa4-8ANe2', 'POST', '/users/create', NULL),
(238, '2022-04-25 19:03:19', '::1', 'lRCqdGPbmxZ2QAb344PYrPJPitSyPHcm', 'POST', '/users/create', NULL),
(239, '2022-04-25 19:03:19', '::1', 'uqJkEwy8tS5GL61HMUsZkO6uPaSypwRI', 'POST', '/users/create', NULL),
(240, '2022-04-25 19:03:19', '::1', 'xP74EQpsJSVGAOYg3-hJBAnIU_UQ5GeL', 'POST', '/users/create', NULL),
(241, '2022-04-25 19:03:19', '::1', 'PCRQvikamXy5w6ZR4LgsLb4o2MKQ0iEZ', 'POST', '/classes/create', NULL),
(242, '2022-04-25 19:03:19', '::1', '-6_OaV7D3OGZ4XmPWCGWcJSPHlTguGPc', 'POST', '/classes/create', NULL),
(243, '2022-04-25 19:03:19', '::1', 'G_GsORXczrhwgE-0HyfYm_kqzpz6J7Mq', 'POST', '/users/create', NULL),
(244, '2022-04-25 19:03:19', '::1', 'yQ7fAIwWX6ECXdUwRBX2aSf235_Pk_Bz', 'POST', '/users/create', NULL),
(245, '2022-04-25 19:03:19', '::1', 'mZJArrHjFjTHoeXlAMB3vLEEh-Oc6Rxj', 'POST', '/users/create', NULL),
(246, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(247, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(248, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(249, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/classes/create', NULL),
(250, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(251, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(252, '2022-04-25 19:03:19', '::1', NULL, 'POST', '/users/create', NULL),
(253, '2022-04-25 19:03:19', '::1', NULL, 'wQzaJtHCzHHIIrJNvkbNyrB_EgGE4bK5', 'POST', NULL),
(254, '2022-04-25 19:03:19', '::1', NULL, 'xhiI9yqDnqPhatyxUqFnpXaH5S_5NGdX', 'POST', NULL),
(255, '2022-04-25 19:03:19', '::1', NULL, 'XqHHTo8I-krQUwxWiTM7nWbcto41YDbf', 'POST', NULL),
(256, '2022-04-25 19:03:19', '::1', 'O0Oo1Z3Z-paIHZFfkzkT-k58UgqfpYk8', 'POST', '/auth/login', NULL),
(257, '2022-04-25 19:03:39', '::1', 'kGgDZcCPbmsWKYi0e3AtlA4waP0FWinV', 'POST', '/auth/login', NULL),
(258, '2022-04-25 19:32:59', '::1', 'kBWhyytgME5DXfBeafGlGVyDbm15zEnp', 'POST', '/auth/login', NULL),
(259, '2022-04-25 19:33:21', '::1', 'chFh4N-8FF0gwfk9GVprySWp6kcYgCOI', 'POST', '/auth/login', NULL),
(260, '2022-04-25 19:34:00', '::1', 'yQ8AGZD48wRoAQ0z63rlHvyD6iGS0r3u', 'POST', '/auth/login', NULL),
(261, '2022-04-25 20:43:33', '::1', 'NEAhIlPLheNsZQG2yLtlIvrR9yS8YIQo', 'POST', '/auth/login', NULL),
(262, '2022-04-25 20:44:18', '::1', 'zjtDgFQ6Cuu8bS8YC68AvJ4a8IpyASbv', 'POST', '/auth/login', NULL),
(263, '2022-04-25 20:46:37', '::1', 'IihG0UkriQiQErXAr308aUcHJBrsoBTb', 'POST', '/auth/login', NULL),
(264, '2022-04-25 20:48:54', '::1', '7xcHeAQzDGqK2oNkMp6_dMpNmTQJxLRo', 'POST', '/auth/login', NULL),
(265, '2022-04-25 20:49:02', '::1', 'PbydO6PqX08svKONvXekyk2xaXJxprjQ', 'POST', '/auth/login', NULL);

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
('test10@email.com', '$2b$10$KcC0wlVAOUSGTFuaPk0EA.F097s65EL62QRgUKeGBKvOeeDl1WAvC', 'test2', 'test2', 'admin'),
('fake@email.com', '$2b$10$mDPti.nvQMD3mK6AWwzzyukQW0m7CgvbLm2WLAwJz5fjz6JzsYk5u', 'test', 'test', 'Admin'),
('fake2@email.com', '$2b$10$i0YJ/Sz9am.2IHytcTmU3uPr5gSMxM9v/VlMesvEsWMUngAi5wA52', 'test', 'test', 'Admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
