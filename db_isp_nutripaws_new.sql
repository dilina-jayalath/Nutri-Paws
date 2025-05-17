-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2025 at 08:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_isp_nutripaws_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `created_at`, `updated_at`, `customer_id`) VALUES
(2, '2025-04-20 14:06:46', '2025-04-20 08:36:46', 15),
(4, '2025-04-20 17:04:37', '2025-04-20 11:34:37', 22),
(5, '2025-05-14 08:48:42', '2025-05-14 03:18:42', 23);

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `cart_item_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `quantity` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cart_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_item`
--

INSERT INTO `cart_item` (`cart_item_id`, `created_at`, `quantity`, `updated_at`, `cart_id`, `item_id`, `status`) VALUES
(108, '2025-04-27 18:35:03', 1, '2025-04-28 19:47:35', 2, 9, 'Inactive'),
(114, '2025-04-29 01:17:11', 3, '2025-04-28 19:47:36', 2, 8, 'Inactive'),
(115, '2025-04-29 01:18:31', 1, '2025-04-28 19:48:58', 2, 9, 'Inactive'),
(118, '2025-04-29 01:18:50', 4, '2025-04-28 19:48:58', 2, 8, 'Inactive'),
(122, '2025-05-13 20:35:38', 6, '2025-05-13 15:06:18', 2, 9, 'Inactive'),
(130, '2025-05-15 12:22:51', 1, '2025-05-15 06:53:32', 2, 47, 'Inactive'),
(131, '2025-05-15 12:26:43', 2, '2025-05-15 06:57:15', 2, 46, 'Inactive'),
(132, '2025-05-15 22:50:59', 1, '2025-05-16 10:16:36', 2, 46, 'Inactive'),
(133, '2025-05-16 14:15:44', 3, '2025-05-16 08:46:47', 5, 9, 'Inactive'),
(134, '2025-05-16 14:15:47', 1, '2025-05-16 08:46:47', 5, 47, 'Inactive'),
(135, '2025-05-16 14:15:51', 4, '2025-05-16 08:46:47', 5, 51, 'Inactive'),
(136, '2025-05-16 14:15:55', 1, '2025-05-16 08:46:47', 5, 9, 'Inactive'),
(137, '2025-05-16 14:15:59', 3, '2025-05-16 08:46:47', 5, 53, 'Inactive'),
(138, '2025-05-16 14:16:03', 2, '2025-05-16 08:46:47', 5, 55, 'Inactive'),
(139, '2025-05-16 14:17:06', 1, '2025-05-16 08:47:38', 5, 47, 'Inactive'),
(140, '2025-05-16 14:17:43', 3, '2025-05-16 08:48:20', 5, 8, 'Inactive'),
(141, '2025-05-16 15:40:16', 2, '2025-05-16 10:16:36', 2, 46, 'Inactive'),
(142, '2025-05-16 15:44:26', 2, '2025-05-16 10:16:36', 2, 9, 'Inactive'),
(143, '2025-05-16 15:51:19', 95, '2025-05-16 10:22:13', 2, 46, 'Inactive');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `created_at`, `name`, `updated_at`) VALUES
(2, '2025-03-13 06:46:53', 'Cat Food', '2025-03-13 01:16:53'),
(5, '2025-04-21 01:14:11', 'Dog Food', '2025-04-20 19:44:11');

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `copyright_text` varchar(255) DEFAULT NULL,
  `social_media_links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`social_media_links`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`id`, `company_name`, `address`, `phone`, `email`, `copyright_text`, `social_media_links`) VALUES
(1, 'NutriPaws', 'NutriPaws, Malabe', '0768734561', 'contact@NutriPaws.com', '© 2025. All rights reserved.', '{\"facebook\": \"https://facebook.com/NutriPaws\", \"twitter\": \"https://twitter.com/NutriPaws\", \"linkedin\": \"https://linkedin.com/company/NutriPaws\"}');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_no` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `address`, `contact_no`, `created_at`, `updated_at`, `user_id`) VALUES
(15, 'Godakawela', '0762058225', '2025-03-18 22:07:04', '2025-05-15 03:30:46', 9),
(22, 'NutriPaws, Malabe', '0768734561', '2025-04-20 17:02:14', '2025-05-15 03:29:04', 18),
(23, 'Trinco', '1234567890', '2025-05-14 08:47:57', '2025-05-15 03:30:28', 24);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `description` varchar(255) DEFAULT NULL,
  `emg_url` varchar(255) DEFAULT NULL,
  `item_name` varchar(150) NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `created_at`, `description`, `emg_url`, `item_name`, `price`, `stock`, `updated_at`) VALUES
(8, '2025-03-13 06:52:20', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image1.jpg', 'Oreo', 1000, 197, '2025-05-16 08:48:20'),
(9, '2025-03-13 06:52:20', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image2.jpg', 'Chops', 1500, 288, '2025-05-16 10:16:36'),
(46, '2025-05-14 15:03:33', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image3.jpg', 'Cookie', 800, 0, '2025-05-16 10:22:13'),
(47, '2025-05-14 18:34:06', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image4.jpg', 'Junk', 800, 37, '2025-05-16 08:47:38'),
(48, '2025-05-14 18:34:52', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image5.jpg', 'Victor', 2000, 500, '2025-05-14 13:09:12'),
(49, '2025-05-14 18:35:31', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image3.jpg', 'Lizii', 2500, 500, '2025-05-14 13:09:17'),
(50, '2025-05-14 18:35:51', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image1.jpg', 'Acana', 3500, 600, '2025-05-14 13:05:51'),
(51, '2025-05-14 18:36:14', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image4.jpg', 'Kibbles Bite', 3200, 56, '2025-05-16 08:46:47'),
(52, '2025-05-14 18:36:54', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image2.jpg', 'Dog chow', 1200, 200, '2025-05-14 13:09:32'),
(53, '2025-05-14 18:37:19', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image5.jpg', 'Tiki cat', 3000, 399, '2025-05-16 08:46:47'),
(54, '2025-05-14 18:37:57', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image4.jpg', 'Meow Mix', 2400, 150, '2025-05-14 13:09:43'),
(55, '2025-05-14 18:38:28', 'Is specially formulated to provide the essential nutrients dogs need for their overall health, energy, and well-being. It comes in various forms, including dry kibble, wet (canned) food, raw diets, and freeze-dried options.', '/assets/uploads/image3.jpg', 'Purina', 1000, 398, '2025-05-16 08:46:47'),
(56, '2025-05-16 16:09:29', 'test test', '/assets/uploads/image1.jpg', 'test item 2', 2000, 400, '2025-05-16 10:41:01');

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE `item_category` (
  `category_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`category_id`, `item_id`) VALUES
(2, 8),
(2, 9),
(2, 51),
(2, 53),
(2, 54),
(2, 55),
(2, 56),
(5, 46),
(5, 47),
(5, 48),
(5, 49),
(5, 50),
(5, 52);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `item_count` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `status` enum('Place','Accept','Ready','Shipped','Local','Delivered','Returnd') DEFAULT 'Place',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `price`, `item_count`, `address`, `mobile_no`, `status`, `created_at`) VALUES
(16, 15, 3500, 1, 'Eheliyagoda', '0715746038', 'Place', '2025-01-20 09:49:36'),
(18, 15, 5500, 4, 'Bandarawela', '0987654321', 'Place', '2025-04-27 11:32:21'),
(19, 15, 5500, 4, 'Koswaththa', '1234567890', 'Accept', '2025-05-27 11:32:21'),
(20, 15, 5500, 4, 'Galle', '6666777788', 'Accept', '2025-04-27 11:32:22'),
(21, 15, 5500, 4, 'Wattala', '0000006666', 'Returnd', '2025-04-27 11:32:22'),
(22, 15, 16526, 12, 'Gampaha', '0715746038', 'Place', '2025-04-28 19:47:34'),
(23, 15, 15000, 4, 'Matara', '0715746038', 'Delivered', '2025-04-28 19:48:58'),
(24, 15, 506, 1, 'Malabe', '0762058225', 'Delivered', '2025-05-08 16:27:29'),
(25, 15, 560, 1, 'Pelmadulla', '0762058225', 'Returnd', '2025-05-08 16:33:33'),
(26, 15, 9000, 1, 'Homagama', '3333333333', 'Returnd', '2025-05-13 15:06:18'),
(28, 15, 3504, 2, 'Rathnapura', '0762058225', 'Delivered', '2025-05-14 07:49:15'),
(29, 15, 3504, 2, 'Colombo-07', '0757585626', 'Returnd', '2025-05-14 08:56:31'),
(30, 15, 1300, 1, 'Wadduwa', '0987654321', 'Place', '2025-05-15 06:53:32'),
(31, 15, 2100, 1, 'Deraniyagala', '3425167890', 'Place', '2025-05-15 06:57:15'),
(32, 23, 30600, 6, 'Kegalle', '6789059876', 'Delivered', '2025-05-16 08:46:47'),
(33, 23, 1300, 1, 'Dambulla', '1234234563', 'Delivered', '2025-05-16 08:47:38'),
(34, 23, 3500, 1, 'Matara', '1278390876', 'Place', '2025-05-16 08:48:20'),
(35, 15, 5400, 3, 'Malabe', '0701325426', 'Place', '2025-05-16 10:16:35'),
(36, 15, 76000, 1, 'Malabe', '1234567891', 'Place', '2025-05-16 10:22:12');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `qty` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `price`, `qty`, `item_id`, `created_at`) VALUES
(24, 16, 3000, 3, 5, '2025-04-20 09:49:36'),
(26, 18, 1000, 1, 4, '2025-04-27 11:32:21'),
(27, 18, 1500, 1, 8, '2025-04-27 11:32:21'),
(28, 18, 1500, 1, 9, '2025-04-27 11:32:21'),
(29, 19, 1000, 1, 4, '2025-04-27 11:32:22'),
(30, 20, 1000, 1, 4, '2025-04-27 11:32:22'),
(31, 18, 1000, 1, 5, '2025-04-27 11:32:22'),
(32, 19, 1500, 1, 8, '2025-04-27 11:32:22'),
(33, 21, 1000, 1, 4, '2025-04-27 11:32:22'),
(34, 20, 1500, 1, 8, '2025-04-27 11:32:22'),
(35, 19, 1500, 1, 9, '2025-04-27 11:32:22'),
(36, 21, 1500, 1, 8, '2025-04-27 11:32:22'),
(37, 20, 1500, 1, 9, '2025-04-27 11:32:22'),
(38, 19, 1000, 1, 5, '2025-04-27 11:32:22'),
(39, 20, 1000, 1, 5, '2025-04-27 11:32:22'),
(40, 21, 1500, 1, 9, '2025-04-27 11:32:22'),
(41, 21, 1000, 1, 5, '2025-04-27 11:32:22'),
(42, 22, 1500, 1, 11, '2025-04-28 19:47:34'),
(43, 22, 1500, 1, 15, '2025-04-28 19:47:34'),
(44, 22, 12, 1, 44, '2025-04-28 19:47:34'),
(45, 22, 1500, 1, 13, '2025-04-28 19:47:35'),
(46, 22, 1500, 1, 12, '2025-04-28 19:47:35'),
(47, 22, 1500, 1, 9, '2025-04-28 19:47:35'),
(48, 22, 12, 1, 44, '2025-04-28 19:47:35'),
(49, 22, 2, 1, 43, '2025-04-28 19:47:35'),
(50, 22, 1500, 1, 15, '2025-04-28 19:47:35'),
(51, 22, 1500, 1, 14, '2025-04-28 19:47:35'),
(52, 22, 1500, 1, 13, '2025-04-28 19:47:36'),
(53, 22, 4500, 3, 8, '2025-04-28 19:47:36'),
(54, 23, 1500, 1, 9, '2025-04-28 19:48:58'),
(55, 23, 3000, 2, 10, '2025-04-28 19:48:58'),
(56, 23, 4500, 3, 11, '2025-04-28 19:48:58'),
(57, 23, 6000, 4, 8, '2025-04-28 19:48:58'),
(58, 24, 6, 3, 43, '2025-05-08 16:27:29'),
(59, 25, 60, 5, 44, '2025-05-08 16:33:33'),
(60, 26, 9000, 6, 9, '2025-05-13 15:06:18'),
(61, 27, 4500, 3, 11, '2025-05-14 03:19:14'),
(62, 27, 4, 2, 43, '2025-05-14 03:19:15'),
(63, 28, 3000, 2, 11, '2025-05-14 07:49:15'),
(64, 28, 4, 2, 43, '2025-05-14 07:49:15'),
(65, 29, 3000, 2, 11, '2025-05-14 08:56:31'),
(66, 29, 4, 2, 43, '2025-05-14 08:56:32'),
(67, 30, 800, 1, 47, '2025-05-15 06:53:32'),
(68, 31, 1600, 2, 46, '2025-05-15 06:57:15'),
(69, 32, 4500, 3, 9, '2025-05-16 08:46:47'),
(70, 32, 800, 1, 47, '2025-05-16 08:46:47'),
(71, 32, 12800, 4, 51, '2025-05-16 08:46:47'),
(72, 32, 1500, 1, 9, '2025-05-16 08:46:47'),
(73, 32, 9000, 3, 53, '2025-05-16 08:46:47'),
(74, 32, 2000, 2, 55, '2025-05-16 08:46:47'),
(75, 33, 800, 1, 47, '2025-05-16 08:47:38'),
(76, 34, 3000, 3, 8, '2025-05-16 08:48:20'),
(77, 35, 800, 1, 46, '2025-05-16 10:16:36'),
(78, 35, 1600, 2, 46, '2025-05-16 10:16:36'),
(79, 35, 3000, 2, 9, '2025-05-16 10:16:36'),
(80, 36, 76000, 95, 46, '2025-05-16 10:22:13');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `status` enum('Paid','Withdrow') NOT NULL,
  `type` enum('CustomerOrder','SupplierOrder') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `order_id`, `price`, `status`, `type`) VALUES
(1, 24, 506, 'Paid', 'CustomerOrder'),
(2, 25, 560, 'Paid', 'CustomerOrder'),
(4, 26, 9000, 'Paid', 'CustomerOrder'),
(7, 6, 1500, 'Paid', 'SupplierOrder'),
(8, 7, 6000, 'Paid', 'SupplierOrder'),
(10, 28, 3504, 'Paid', 'CustomerOrder'),
(11, 8, 10000, 'Paid', 'SupplierOrder'),
(12, 9, 1600, 'Paid', 'SupplierOrder'),
(13, 10, 4000, 'Paid', 'SupplierOrder'),
(14, 11, 2000, 'Paid', 'SupplierOrder'),
(15, 29, 3504, 'Paid', 'CustomerOrder'),
(16, 12, 12000, 'Paid', 'SupplierOrder'),
(17, 13, 9000, 'Paid', 'SupplierOrder'),
(18, 14, 12000, 'Paid', 'SupplierOrder'),
(19, 30, 1300, 'Paid', 'CustomerOrder'),
(20, 31, 2100, 'Paid', 'CustomerOrder'),
(21, 15, 12000, 'Paid', 'SupplierOrder'),
(22, 16, 9000, 'Paid', 'SupplierOrder'),
(23, 17, 10000, 'Paid', 'SupplierOrder'),
(24, 18, 14000, 'Paid', 'SupplierOrder'),
(25, 19, 2000, 'Paid', 'SupplierOrder'),
(26, 32, 30600, 'Paid', 'CustomerOrder'),
(27, 33, 1300, 'Paid', 'CustomerOrder'),
(28, 34, 3500, 'Paid', 'CustomerOrder'),
(29, 20, 4000, 'Paid', 'SupplierOrder'),
(30, 21, 9000, 'Paid', 'SupplierOrder'),
(31, 35, 5400, 'Paid', 'CustomerOrder'),
(32, 36, 76000, 'Paid', 'CustomerOrder'),
(33, 22, 6000, 'Paid', 'SupplierOrder');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `role_name` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `created_at`, `role_name`, `updated_at`) VALUES
(1, '2025-03-10 20:38:25', 'Customer', '2025-03-10 15:08:25'),
(2, '2025-03-10 20:38:25', 'Store', '2025-03-10 15:08:25'),
(3, '2025-03-13 09:09:44', 'Admin', '2025-03-13 03:39:44'),
(4, '2025-03-13 09:59:32', 'Supplier', '2025-03-13 04:29:32');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `contact_no` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `email` varchar(50) DEFAULT NULL,
  `f_name` varchar(50) DEFAULT NULL,
  `l_name` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `address`, `company_name`, `contact_no`, `created_at`, `email`, `f_name`, `l_name`, `updated_at`, `user_id`) VALUES
(8, 'Erepola, Eheliyagoda', 'Senuri En', '0715746038', '2025-04-22 08:24:43', NULL, 'Pabasara', 'Dasanayaka', '2025-05-16 10:51:29', 20),
(11, 'Rathnapura', 'hiru', '1234567890', '2025-05-15 19:04:32', 'hiruni@gmailcom', 'hiruni', 'hansika', '2025-05-15 13:34:32', 28),
(12, 'malabe', 'hiruni', '012334567899', '2025-05-16 16:17:11', 'hiru@gmail.com', 'hiruni', 'perera', '2025-05-16 10:47:11', 32);

-- --------------------------------------------------------

--
-- Table structure for table `supplier_item`
--

CREATE TABLE `supplier_item` (
  `supplier_item_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `description` varchar(255) DEFAULT NULL,
  `emg_url` varchar(255) DEFAULT NULL,
  `item_name` varchar(150) NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  `stock` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `sup_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_item`
--

INSERT INTO `supplier_item` (`supplier_item_id`, `created_at`, `description`, `emg_url`, `item_name`, `price`, `stock`, `updated_at`, `sup_id`, `category_id`) VALUES
(24, '2025-05-14 13:34:50', 'This is a very healthy food.', '/assets/uploads/image1.jpg', 'Piyora', 5000, 4, '2025-05-16 10:50:15', 20, 5),
(25, '2025-05-14 13:35:40', 'Gain health', '/assets/uploads/image4.jpg', 'Anora', 7000, 300, '2025-05-14 09:23:04', 20, 2),
(26, '2025-05-14 13:36:30', 'Fresh, Healthy', '/assets/uploads/image3.jpg', 'Saga', 2000, 50, '2025-05-14 09:23:09', 20, 2),
(27, '2025-05-14 13:37:48', 'Muscle Gain food ', '/assets/uploads/image5.jpg', 'Lizii', 1000, 100, '2025-05-14 09:23:14', 20, 5),
(28, '2025-05-14 13:38:34', 'Vitamin rich food', '/assets/uploads/image2.jpg', 'Aqua', 1000, 100, '2025-05-14 09:23:20', 20, 2),
(29, '2025-05-14 13:54:42', 'Full of nutrition\'s', '/assets/uploads/image4.jpg', 'Junk', 800, 100, '2025-05-14 09:23:24', 20, 5),
(30, '2025-05-14 18:23:40', 'The foundation of every meal.', '/assets/uploads/image3.jpg', 'Acana', 3500, 200, '2025-05-15 03:12:16', 20, 5),
(31, '2025-05-14 18:24:41', 'Natural adult chicken and rice formula', '/assets/uploads/image1.jpg', 'Purina', 1350, 60, '2025-05-14 12:54:41', 20, 5),
(32, '2025-05-14 18:25:42', 'Classical professional formula', '/assets/uploads/image4.jpg', 'Victor', 2000, 400, '2025-05-15 03:12:25', 20, 5),
(33, '2025-05-14 18:28:50', 'Savory, beef &chicken flavors', '/assets/uploads/image2.jpg', 'Kibbles Bite', 2300, 300, '2025-05-15 03:12:31', 20, 5),
(34, '2025-05-14 18:29:47', 'Complete adult with real chicken', '/assets/uploads/image1.jpg', 'Dog chow', 4300, 30, '2025-05-14 12:59:47', 20, 5),
(35, '2025-05-14 18:30:42', 'Wet cat food', '/assets/uploads/image3.jpg', 'Tiki cat', 3000, 500, '2025-05-15 03:12:39', 20, 2),
(36, '2025-05-14 18:31:38', 'Tiny tiger pate salmon canned cat food', '/assets/uploads/image5.jpg', 'Meow Mix', 2000, 60, '2025-05-15 03:12:46', 20, 2),
(42, '2025-05-16 16:19:52', 'ghhhhh', '/assets/uploads/image1.jpg', 'ruby', 2000, 11, '2025-05-16 10:49:52', 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `supplier_item_category`
--

CREATE TABLE `supplier_item_category` (
  `category_id` int(11) NOT NULL,
  `supplier_item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier_orders`
--

CREATE TABLE `supplier_orders` (
  `order_id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `item_count` int(11) NOT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `status` enum('Accept','Delivered','Local','Place','Ready','Returnd','Shipped') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_orders`
--

INSERT INTO `supplier_orders` (`order_id`, `address`, `created_at`, `item_count`, `mobile_no`, `price`, `status`) VALUES
(6, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 08:37:10', 5, '011 254 4587', 1500, 'Accept'),
(7, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 08:37:31', 2, '011 254 4587', 6000, 'Accept'),
(8, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 13:49:02', 2, '011 254 4587', 10000, 'Delivered'),
(9, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 13:56:32', 2, '011 254 4587', 1600, 'Delivered'),
(10, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 13:56:58', 4, '011 254 4587', 4000, 'Returnd'),
(11, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 13:57:26', 2, '011 254 4587', 2000, 'Returnd'),
(12, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 18:49:44', 6, '011 254 4587', 12000, 'Delivered'),
(13, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 18:53:17', 3, '011 254 4587', 9000, 'Returnd'),
(14, 'NutriPaws , Malabe , Sri Lanka', '2025-05-14 18:59:37', 3, '011 254 4587', 12000, 'Delivered'),
(15, 'NutriPaws , Malabe , Sri Lanka', '2025-05-15 19:07:20', 4, '011 254 4587', 12000, 'Accept'),
(16, 'NutriPaws , Malabe , Sri Lanka', '2025-05-15 19:07:53', 3, '011 254 4587', 9000, 'Accept'),
(17, 'NutriPaws , Malabe , Sri Lanka', '2025-05-16 08:16:06', 2, '011 254 4587', 10000, 'Delivered'),
(18, 'NutriPaws , Malabe , Sri Lanka', '2025-05-16 08:16:50', 2, '011 254 4587', 14000, 'Returnd'),
(19, 'NutriPaws , Malabe , Sri Lanka', '2025-05-16 08:30:44', 2, '011 254 4587', 2000, 'Delivered'),
(20, 'NutriPaws , Malabe , Sri Lanka', '2025-05-16 14:57:24', 2, '011 254 4587', 4000, 'Place'),
(21, 'NutriPaws , Malabe , Sri Lanka', '2025-05-16 14:57:57', 3, '011 254 4587', 9000, 'Place'),
(22, 'NutriPaws , Malabe , Sri Lanka', '2025-05-16 16:02:58', 3, '011 254 4587', 6000, 'Place');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_order_items`
--

CREATE TABLE `supplier_order_items` (
  `order_item_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `qty` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_order_items`
--

INSERT INTO `supplier_order_items` (`order_item_id`, `created_at`, `item_id`, `order_id`, `price`, `qty`, `supplier_id`) VALUES
(1, '2025-05-02 21:15:53', 1, 1, 12, 122, 1),
(2, '2025-05-02 21:15:53', 2, 1, 122, 122, 1),
(3, '2025-05-03 23:24:37', 3, 2, 10, 50, 2),
(4, '2025-05-08 22:38:49', 9, 3, 6000, 6, 1),
(5, '2025-05-13 20:45:09', 4, 4, 3000, 3, 1),
(6, '2025-05-13 20:46:13', 21, 5, 300, 1, 21),
(7, '2025-05-14 08:37:10', 22, 6, 1500, 5, 20),
(8, '2025-05-14 08:37:31', 23, 7, 6000, 2, 20),
(9, '2025-05-14 13:49:02', 24, 8, 10000, 2, 20),
(10, '2025-05-14 13:56:32', 29, 9, 1600, 2, 20),
(11, '2025-05-14 13:56:58', 28, 10, 4000, 4, 20),
(12, '2025-05-14 13:57:26', 27, 11, 2000, 2, 20),
(13, '2025-05-14 18:49:44', 37, 12, 12000, 6, 26),
(14, '2025-05-14 18:53:17', 38, 13, 9000, 3, 26),
(15, '2025-05-14 18:59:37', 39, 14, 12000, 3, 26),
(16, '2025-05-15 19:07:20', 40, 15, 12000, 4, 28),
(17, '2025-05-15 19:07:53', 41, 16, 9000, 3, 28),
(18, '2025-05-16 08:16:06', 24, 17, 10000, 2, 20),
(19, '2025-05-16 08:16:50', 25, 18, 14000, 2, 20),
(20, '2025-05-16 08:30:44', 27, 19, 2000, 2, 20),
(21, '2025-05-16 14:57:24', 36, 20, 4000, 2, 20),
(22, '2025-05-16 14:57:57', 35, 21, 9000, 3, 20),
(23, '2025-05-16 16:02:58', 36, 22, 6000, 3, 20);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_name` varchar(50) NOT NULL,
  `user_role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `created_at`, `email`, `password`, `updated_at`, `user_name`, `user_role_id`) VALUES
(2, '2025-03-11 09:33:01', 'saki@gmail.com', '1234567', '2025-05-14 07:44:02', 'Sakithma', 2),
(9, '2025-03-11 09:33:01', 'dula@gmail.com', '1234567@', '2025-05-16 10:13:08', '123', 1),
(18, '2025-04-20 17:02:08', 'pamu@gmail.com', '1234567', '2025-05-14 07:44:43', 'Pamudi', 3),
(20, '2025-04-22 08:24:43', 'senuri@gmail.com', '1234567', '2025-05-14 08:23:48', 'Senu', 4),
(24, '2025-05-14 08:47:57', 'sanduni@gmail.com', '1234567', '2025-05-15 03:26:32', 'Sanduni', 1),
(31, '2025-05-16 16:00:50', 'sadun@gmail.com', 'asdfgh1@', '2025-05-16 10:30:50', 'Sadun', 3),
(32, '2025-05-16 16:17:11', 'hiru@gmail.com', 'hiruni1234!', '2025-05-16 10:47:11', 'hiru', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `fk_customerId` (`customer_id`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `fk_cartId` (`cart_id`),
  ADD KEY `fk_itemId` (`item_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `UKj7ja2xvrxudhvssosd4nu1o92` (`user_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `item_category`
--
ALTER TABLE `item_category`
  ADD PRIMARY KEY (`category_id`,`item_id`),
  ADD KEY `FKjlvge1dms1hf66yi8dkard983` (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `UK716hgxp60ym1lifrdgp67xt5k` (`role_name`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`),
  ADD UNIQUE KEY `UKafxol104prrysgdv6xe8nmt56` (`user_id`);

--
-- Indexes for table `supplier_item`
--
ALTER TABLE `supplier_item`
  ADD PRIMARY KEY (`supplier_item_id`);

--
-- Indexes for table `supplier_item_category`
--
ALTER TABLE `supplier_item_category`
  ADD PRIMARY KEY (`category_id`,`supplier_item_id`),
  ADD KEY `FK5ygwoqxguksqjg7eu0l1kmsuh` (`supplier_item_id`);

--
-- Indexes for table `supplier_orders`
--
ALTER TABLE `supplier_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `supplier_order_items`
--
ALTER TABLE `supplier_order_items`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD UNIQUE KEY `UKlqjrcobrh9jc8wpcar64q1bfh` (`user_name`),
  ADD KEY `fk_roleId` (`user_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `supplier_item`
--
ALTER TABLE `supplier_item`
  MODIFY `supplier_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `supplier_orders`
--
ALTER TABLE `supplier_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `supplier_order_items`
--
ALTER TABLE `supplier_order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_customerId` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `fk_cartId` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_itemId` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item_category`
--
ALTER TABLE `item_category`
  ADD CONSTRAINT `FKjlvge1dms1hf66yi8dkard983` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKpikirirfdxnbcpd4lod4ig34c` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supplier_item_category`
--
ALTER TABLE `supplier_item_category`
  ADD CONSTRAINT `FK1ey86q7fmmr1uy866hrq26e7j` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `FK5ygwoqxguksqjg7eu0l1kmsuh` FOREIGN KEY (`supplier_item_id`) REFERENCES `supplier_item` (`supplier_item_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_roleId` FOREIGN KEY (`user_role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
