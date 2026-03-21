-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 17 سبتمبر 2025 الساعة 18:46
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelverse`
--

-- --------------------------------------------------------

--
-- بنية الجدول `activities`
--

CREATE TABLE `activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `booking_link` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `live_guide` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `guide_languages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`guide_languages`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activities`
--

INSERT INTO `activities` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `rate`, `location`, `price`, `booking_link`, `duration`, `type`, `live_guide`, `created_at`, `updated_at`, `guide_languages`) VALUES
(20, '3 Hours Quad Riding, Bedouin Village and Camels in Hurghada', '3 Hours Quad Riding, Bedouin Village and Camels in Hurghada', 'Experience the exhilaration of tearing through the desert on your personal all-terrain vehicle (ATV) during this adrenaline-fueled safari adventure, complete with convenient hotel transfers from Hurghada. Master the essentials and try out your skills with a test drive before following your guide on a thrilling 12-mile (20-kilometer) expedition through the desert to reach a captivating Bedouin village. Rehydrate with refreshing water and Bedouin tea, savor a camel ride, and then journey back through the sand dunes to where you began.', 'Experience the exhilaration of tearing through the desert on your personal all-terrain vehicle (ATV) during this adrenaline-fueled safari adventure, complete with convenient hotel transfers from Hurghada. Master the essentials and try out your skills with a test drive before following your guide on a thrilling 12-mile (20-kilometer) expedition through the desert to reach a captivating Bedouin village. Rehydrate with refreshing water and Bedouin tea, savor a camel ride, and then journey back through the sand dunes to where you began.', 4.9, 'Egypt', 15.00, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d27476022-3_Hours_Quad_Riding_Bedouin_Village_and_Camels_in_Hurghada-Hurghada_Red_Sea_and_Si.html', '3h', 'Recommended for You', 1, '2025-06-29 18:06:30', '2025-06-29 18:06:30', '[\"English\"]'),
(21, 'Cairo Private Day Tours: Discover Islamic and Coptic Cairo', 'Cairo Private Day Tours: Discover Islamic and Coptic Cairo', 'Explore Cairo’s dynamic history on a private day tour. First visit Christian Coptic Cairo—among the most important locations for Christians in Egypt—with stops at churches and a synagogue. Continue to Islamic Cairo, where you’ll have the opportunity to enter three mosques and explore the Khan El-Khalili bazaar. Your package includes round-trip private transfers: Upgrade to add a guide, entry fees, and lunch in a local restaurant or by the Nile.', 'Explore Cairo’s dynamic history on a private day tour. First visit Christian Coptic Cairo—among the most important locations for Christians in Egypt—with stops at churches and a synagogue. Continue to Islamic Cairo, where you’ll have the opportunity to enter three mosques and explore the Khan El-Khalili bazaar. Your package includes round-trip private transfers: Upgrade to add a guide, entry fees, and lunch in a local restaurant or by the Nile.', 4.7, 'Egypt', 69.99, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d11464746-Cairo_Private_Day_Tours_Discover_Islamic_and_Coptic_Cairo-Cairo_Cairo_Governorate.html', '6h', 'Recommended for You', 1, '2025-06-29 18:08:28', '2025-06-29 18:08:28', '[\"Arabic\"]'),
(22, 'Hurghada: ATV Quad Safari& Bedouin Village Tour', 'Hurghada: ATV Quad Safari& Bedouin Village Tour', 'Roar through the sand dunes on an all-terrain vehicle (ATV) on this signature desert adventure, tailored to adrenaline junkies. After a short lesson and a test drive, challenge your driving skills as you race to a Bedouin village to unwind over black tea, discover the local lifestyles, and enjoy a camel ride. For ease, your package includes hotel transfers; upgrade to make the tour private.', 'Roar through the sand dunes on an all-terrain vehicle (ATV) on this signature desert adventure, tailored to adrenaline junkies. After a short lesson and a test drive, challenge your driving skills as you race to a Bedouin village to unwind over black tea, discover the local lifestyles, and enjoy a camel ride. For ease, your package includes hotel transfers; upgrade to make the tour private.', 4.5, 'Egypt', 19.50, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d19369427-Hurghada_ATV_Quad_Safari_Bedouin_Village_Tour-Hurghada_Red_Sea_and_Sinai.html', '3h', 'Recommended for You', 1, '2025-06-29 18:14:13', '2025-06-29 18:14:13', '[\"English\"]'),
(23, 'Hurghada: Safari 4x4 Jeep, Camel Ride, Dinner & Star Watching', 'Hurghada: Safari 4x4 Jeep, Camel Ride, Dinner & Star Watching', 'We are the main supplier company for all international tour operators in all sides of Egypt • professional specialist guides.\r\n• Big Telescopes use during our stargazing explanations.\r\n• Our prices are 100% guaranteed to be the lowest in HURGHADA.\r\n• No hidden costs .Great prices and great value for money.\r\n• Our inspiring stargazing tour for all ages.\r\n• Perfect for families, couples and friends.\r\n• Escape to the great outdoors! Camping Style with fire and candles around.\r\n• AT the heart of the RED SEA DESERT, this Valley offers some of the best conditions on Earth for stargazing.\r\n• You’ll leave our Tour with a new understanding of all the Universe.\r\n• How do I find Saturn? What sorts of objects can be seen with binoculars?\r\n• Helps you to locate the positions of stars on any night of the year.', 'We are the main supplier company for all international tour operators in all sides of Egypt • professional specialist guides.\r\n• Big Telescopes use during our stargazing explanations.\r\n• Our prices are 100% guaranteed to be the lowest in HURGHADA.\r\n• No hidden costs .Great prices and great value for money.\r\n• Our inspiring stargazing tour for all ages.\r\n• Perfect for families, couples and friends.\r\n• Escape to the great outdoors! Camping Style with fire and candles around.\r\n• AT the heart of the RED SEA DESERT, this Valley offers some of the best conditions on Earth for stargazing.\r\n• You’ll leave our Tour with a new understanding of all the Universe.\r\n• How do I find Saturn? What sorts of objects can be seen with binoculars?\r\n• Helps you to locate the positions of stars on any night of the year.', 5.0, 'Egypt', 40.00, 'https://www.tripadvisor.com/AttractionProductReview-g297548-d26655730-Hurghada_Safari_4x4_Jeep_Camel_Ride_Dinner_Star_Watching-El_Gouna_Hurghada_Red_Sea.html', '5h', 'Recommended for You', 0, '2025-06-29 18:31:28', '2025-06-29 18:31:28', NULL),
(24, 'White & Black Desert tour 2 Days 1 night camping from Cairo.', 'White & Black Desert tour 2 Days 1 night camping from Cairo.', 'Experience the surreal, wind-sculpted landscapes of Egypt’s White Desert as well as Crystal Mountain, the Black Desert and the historic Bahariya oasis on this overnight adventure from Cairo. Camp in the desert, swim in hot springs and—if you’re lucky—encounter wildlife such as fennec desert foxes. Your tour includes transfers, camping gear and three meals: a small national park fee is at your own expense.', 'Experience the surreal, wind-sculpted landscapes of Egypt’s White Desert as well as Crystal Mountain, the Black Desert and the historic Bahariya oasis on this overnight adventure from Cairo. Camp in the desert, swim in hot springs and—if you’re lucky—encounter wildlife such as fennec desert foxes. Your tour includes transfers, camping gear and three meals: a small national park fee is at your own expense.', 4.9, 'Egypt', 120.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d22954587-White_Black_Desert_tour_2_Days_1_night_camping_from_Cairo-Cairo_Cairo_Governorate.html', '2 days', 'Multi-day Tours', 1, '2025-06-29 18:35:11', '2025-06-29 18:35:11', '[\"English\"]'),
(25, '4-Day Nile Cruise sails Aswan to Luxor&Abu Simbel.Hot air Balloon', '4-Day Nile Cruise sails Aswan to Luxor&Abu Simbel.Hot air Balloon', 'Follow in the footsteps of the pharaohs as you cruise the River Nile from Aswan to Luxor. Pair the comfort of a modern ship with informative guided tours and door-to-door transfers on this 4-day, 5-star experience. See the highlights of Aswan and Luxor, including Philae Temple and the Valley of the Kings, visit Kom Ombo and the Temple of Edfu, and savor nine meals. Entrance fees extra.', 'Follow in the footsteps of the pharaohs as you cruise the River Nile from Aswan to Luxor. Pair the comfort of a modern ship with informative guided tours and door-to-door transfers on this 4-day, 5-star experience. See the highlights of Aswan and Luxor, including Philae Temple and the Valley of the Kings, visit Kom Ombo and the Temple of Edfu, and savor nine meals. Entrance fees extra.', 4.8, 'Egypt', 288.00, 'https://www.tripadvisor.com/AttractionProductReview-g294204-d16808188-4_Day_Nile_Cruise_sails_Aswan_to_Luxor_Abu_Simbel_Hot_air_Balloon-Aswan_Aswan_Gove.html', '4 days', 'Multi-day Tours', 1, '2025-06-29 18:37:51', '2025-06-29 18:37:51', '[\"Arabic\"]'),
(26, 'White & Black desert camping tour 2 Days 1 night From Cairo', 'White & Black desert camping tour 2 Days 1 night From Cairo', 'Sleep under the stars on a one-night camping adventure from Cairo. Leave logistics to your driver-guide as you enjoy a tailored itinerary which includes 4x4 Jeep rides, a visit to Crystal Mountain, swims in the Bahariya Oasis natural springs, journeys across the Black Desert, and a delicious BBQ dinner. Perfect for adventure-seekers looking for an exciting excursion away from tourist traps.', 'Sleep under the stars on a one-night camping adventure from Cairo. Leave logistics to your driver-guide as you enjoy a tailored itinerary which includes 4x4 Jeep rides, a visit to Crystal Mountain, swims in the Bahariya Oasis natural springs, journeys across the Black Desert, and a delicious BBQ dinner. Perfect for adventure-seekers looking for an exciting excursion away from tourist traps.', 3.9, 'Egypt', 120.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d25236516-White_Black_desert_camping_tour_2_Days_1_night_From_Cairo-Cairo_Cairo_Governorate.html', '2 days', 'Multi-day Tours', 1, '2025-06-29 18:41:00', '2025-06-29 18:41:00', '[\"German\"]'),
(27, '4-Day 3-Night Nile Cruise from Aswan to Luxor&Abu Simbel+Balloon', '4-Day 3-Night Nile Cruise from Aswan to Luxor&Abu Simbel+Balloon', 'Rather than arranging separate day trips to the Nile’s temples, let the sights come to you on a 4-day Aswan-to-Luxor cruise. After viewing Aswan’s sights, absorb the scenery as you sail aboard your well-equipped, 5-star ship. Visit Edfu and Kom Ombo temples en route and the Abu Simbel temple complex before departing. In Luxor, explore Karnak, the Valley of the Kings, and more. Your cruise includes full board, guiding, and a choice of cabin options.', 'Rather than arranging separate day trips to the Nile’s temples, let the sights come to you on a 4-day Aswan-to-Luxor cruise. After viewing Aswan’s sights, absorb the scenery as you sail aboard your well-equipped, 5-star ship. Visit Edfu and Kom Ombo temples en route and the Abu Simbel temple complex before departing. In Luxor, explore Karnak, the Valley of the Kings, and more. Your cruise includes full board, guiding, and a choice of cabin options.', 4.9, 'Egypt', 340.00, 'https://www.tripadvisor.com/AttractionProductReview-g294204-d11478258-4_Day_3_Night_Nile_Cruise_from_Aswan_to_Luxor_Abu_Simbel_Balloon-Aswan_Aswan_Gover.html', '4 days', 'Multi-day Tours', 1, '2025-06-29 18:45:30', '2025-06-29 18:45:30', '[\"French\"]'),
(28, 'Giza Pyramids,Sphinx,Camel Ride,ATV Bike,Shopping, Dinner cruise', 'Giza Pyramids,Sphinx,Camel Ride,ATV Bike,Shopping, Dinner cruise', 'Get a fresh perspective on the Giza Pyramids when you book this private guided tour, which includes a camel ride, a shopping tour, and an all-terrain vehicle (ATV or quad bike) adventure across the desert. Upgrade to include a local lunch and entrance fees, or add lunch, tickets, and a dinner cruise along the Nile featuring live performances of belly dancing and tanoura spinning.', 'Get a fresh perspective on the Giza Pyramids when you book this private guided tour, which includes a camel ride, a shopping tour, and an all-terrain vehicle (ATV or quad bike) adventure across the desert. Upgrade to include a local lunch and entrance fees, or add lunch, tickets, and a dinner cruise along the Nile featuring live performances of belly dancing and tanoura spinning.', 5.0, 'Egypt', 35.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d27708710-Giza_Pyramids_Sphinx_Camel_Ride_ATV_Bike_Shopping_Dinner_cruise-Cairo_Cairo_Govern.html', '8h', 'Full-day Tours', 1, '2025-06-29 18:49:34', '2025-06-29 18:49:34', '[\"Arabic\"]'),
(29, 'Hurghada to Cairo VIP Small Group Tour – Egypt’s Ancient Wonders', 'Hurghada to Cairo VIP Small Group Tour – Egypt’s Ancient Wonders', 'This tour stands out as a seamless blend of history, culture, and comfort, offering an intimate small-group experience guided by a professional Egyptologist. Travel from Hurghada to Cairo in a modern air-conditioned minivan, ensuring a smooth and comfortable journey. Explore the iconic Giza Pyramids, one of the Seven Wonders of the Ancient World, and marvel at the mysterious Sphinx up close. Unlike standard tours, this experience includes a deep dive into ancient Egyptian history with a guided visit to the world-renowned Egyptian Museum, home to thousands of priceless artifacts. With a carefully curated itinerary, skip the hassle of planning and enjoy a well-paced, fully guided exploration of Cairo’s most famous landmarks. A delicious lunch is included, adding to the convenience and relaxation of your day. Finally, travel back stress-free, with our professional team ensuring a comfortable return to your hotel in Hurghada.', 'This tour stands out as a seamless blend of history, culture, and comfort, offering an intimate small-group experience guided by a professional Egyptologist. Travel from Hurghada to Cairo in a modern air-conditioned minivan, ensuring a smooth and comfortable journey. Explore the iconic Giza Pyramids, one of the Seven Wonders of the Ancient World, and marvel at the mysterious Sphinx up close. Unlike standard tours, this experience includes a deep dive into ancient Egyptian history with a guided visit to the world-renowned Egyptian Museum, home to thousands of priceless artifacts. With a carefully curated itinerary, skip the hassle of planning and enjoy a well-paced, fully guided exploration of Cairo’s most famous landmarks. A delicious lunch is included, adding to the convenience and relaxation of your day. Finally, travel back stress-free, with our professional team ensuring a comfortable return to your hotel in Hurghada.', 4.9, 'Egypt', 75.00, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d27979413-Hurghada_to_Cairo_VIP_Small_Group_Tour_Egypt_s_Ancient_Wonders-Hurghada_Red_Sea_an.html', '20h', 'Full-day Tours', 1, '2025-06-29 18:52:10', '2025-06-29 18:52:10', '[\"French\"]'),
(30, 'The Egyptian Museum, the Citadel, Khan Khalil Bazaar & Old Cairo', 'The Egyptian Museum, the Citadel, Khan Khalil Bazaar & Old Cairo', 'Pair the Egyptian Museum’s ancient treasures with the charms of Old Cairo, a UNESCO World Heritage Site, on this action-packed private adventure. Visit the Egyptian Museum, the Khan el-Khalili, the Cairo Citadel, including the Alabaster Mosque, and Coptic Cairo, including the Hanging Church. This is a modular package: Book transportation only, or upgrade to add a guide, a guide and lunch, or a guide, lunch, and tickets.', 'Pair the Egyptian Museum’s ancient treasures with the charms of Old Cairo, a UNESCO World Heritage Site, on this action-packed private adventure. Visit the Egyptian Museum, the Khan el-Khalili, the Cairo Citadel, including the Alabaster Mosque, and Coptic Cairo, including the Hanging Church. This is a modular package: Book transportation only, or upgrade to add a guide, a guide and lunch, or a guide, lunch, and tickets.', 4.8, 'Egypt', 50.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d27959145-The_Egyptian_Museum_the_Citadel_Khan_Khalil_Bazaar_Old_Cairo-Cairo_Cairo_Governora.html', '9h', 'Full-day Tours', 0, '2025-06-29 18:54:29', '2025-06-29 18:54:29', NULL),
(31, 'Sharm El Sheikh: White Island and Ras Mohamed Cruise Adventure', 'Sharm El Sheikh: White Island and Ras Mohamed Cruise Adventure', 'Ras Mohammed National Park offers some of the Red Sea’s most vibrant coral reef. Experience it on this Sharm el Sheikh snorkeling cruise featuring professional guides to help with your gear and point out marine life. As well as lunch on board, enjoy time at the beautiful White Island sandbar. Please note that your package excludes park entrance fees, while snorkeling equipment is available as an upgrade.', 'Ras Mohammed National Park offers some of the Red Sea’s most vibrant coral reef. Experience it on this Sharm el Sheikh snorkeling cruise featuring professional guides to help with your gear and point out marine life. As well as lunch on board, enjoy time at the beautiful White Island sandbar. Please note that your package excludes park entrance fees, while snorkeling equipment is available as an upgrade.', 4.8, 'Egypt', 26.00, 'https://www.tripadvisor.com/AttractionProductReview-g297555-d19794275-Sharm_El_Sheikh_White_Island_and_Ras_Mohamed_Cruise_Adventure-Sharm_El_Sheikh_Sout.html', '7h', 'Full-day Tours', 1, '2025-06-29 18:56:23', '2025-06-29 18:56:23', '[\"French\"]'),
(32, 'Private ViP all-inclusive Giza Pyramids,Sphinx,Inside Pyramid', 'Private ViP all-inclusive Giza Pyramids,Sphinx,Inside Pyramid', 'The Pyramids of Giza are the last surviving Wonder of the Ancient World. Experience them in style, without the haggling, on this private tour from Cairo. Your personal Egyptologist introduces you to the three great pyramids, the mysterious Great Sphinx, and the Valley Temple. Your package includes your guide and round-trip transfers: Upgrade to add entry fees—including entry to explore the inside of the third pyramid—a camel ride, and a restaurant lunch', 'The Pyramids of Giza are the last surviving Wonder of the Ancient World. Experience them in style, without the haggling, on this private tour from Cairo. Your personal Egyptologist introduces you to the three great pyramids, the mysterious Great Sphinx, and the Valley Temple. Your package includes your guide and round-trip transfers: Upgrade to add entry fees—including entry to explore the inside of the third pyramid—a camel ride, and a restaurant lunch', 4.9, 'Egypt', 14.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d11462734-Private_ViP_all_inclusive_Giza_Pyramids_Sphinx_Inside_Pyramid-Cairo_Cairo_Governor.html', '6h', 'Private Sightseeing Tours', 1, '2025-06-29 19:00:13', '2025-06-29 19:00:13', '[\"English\"]'),
(33, '3 Hours EL Gouna Private City Tour & Transfer with Shopping Stops', '3 Hours EL Gouna Private City Tour & Transfer with Shopping Stops', 'Step on board and enjoy a relaxed cruise along boulevards adorned with palm trees, all the while immersing yourself in the breathtaking views of lagoons and the expansive ocean. \r\n\r\nMarvel at the majestic yachts that adorn the marina, and take advantage of numerous chances to capture the beauty of El Gouna through your lens. \r\n\r\nThis experience is perfect for those seeking to explore the city while infusing some physical activity into their adventure.', 'Step on board and enjoy a relaxed cruise along boulevards adorned with palm trees, all the while immersing yourself in the breathtaking views of lagoons and the expansive ocean. \r\n\r\nMarvel at the majestic yachts that adorn the marina, and take advantage of numerous chances to capture the beauty of El Gouna through your lens. \r\n\r\nThis experience is perfect for those seeking to explore the city while infusing some physical activity into their adventure.', 5.0, 'Egypt', 8.96, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d26821262-3_Hours_EL_Gouna_Private_City_Tour_Transfer_with_Shopping_Stops-Hurghada_Red_Sea_a.html', '3h', 'Private Sightseeing Tours', 1, '2025-06-29 19:01:53', '2025-06-29 19:01:53', '[\"English\"]'),
(34, 'Quad Bike ATV Tours in Desert of Giza Pyramids with Egyptian Tea', 'Quad Bike ATV Tours in Desert of Giza Pyramids with Egyptian Tea', 'When you arrive we offer you a welcome drink and explain our tour while providing you with directions on how to safely ride the ATVs. To begin the tour we will pair you with a tour guide to ensure you will safely get to the desert. You will enjoy a fun ride in the desert and will stop for the tour guide to take a serious of fun pictures of you with the Giza pyramids. You will then proceed to a cafe in the desert to enjoy a drink of your choice. After you finish you will have the opportunity to ride around the desert again before returning back.', 'When you arrive we offer you a welcome drink and explain our tour while providing you with directions on how to safely ride the ATVs. To begin the tour we will pair you with a tour guide to ensure you will safely get to the desert. You will enjoy a fun ride in the desert and will stop for the tour guide to take a serious of fun pictures of you with the Giza pyramids. You will then proceed to a cafe in the desert to enjoy a drink of your choice. After you finish you will have the opportunity to ride around the desert again before returning back.', 4.9, 'Egypt', 16.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d25283603-Quad_Bike_ATV_Tours_in_Desert_of_Giza_Pyramids_with_Egyptian_Tea-Cairo_Cairo_Gover.html', '2–3 hours', 'Private Sightseeing Tours', 1, '2025-06-29 19:05:10', '2025-06-29 19:05:10', '[\"English\"]'),
(35, '6- Hours Half Day Tour To Sakkara & Memphis & Dahshur', '6- Hours Half Day Tour To Sakkara & Memphis & Dahshur', 'Explore Egypt’s ancient capital, the pyramids of Dahshur, and the Saqqara necropolis on this private excursion. After convenient pickup at your Cairo hotel, travel by air-conditioned vehicle to Saqqara’s step pyramid, the red and bent pyramids of Dahshur, and Memphis with its massive limestone statue of King Ramses II. This is a modular package. Book a transport-only tour, or upgrade to add a guide, entry fees, and a restaurant lunch.', 'Explore Egypt’s ancient capital, the pyramids of Dahshur, and the Saqqara necropolis on this private excursion. After convenient pickup at your Cairo hotel, travel by air-conditioned vehicle to Saqqara’s step pyramid, the red and bent pyramids of Dahshur, and Memphis with its massive limestone statue of King Ramses II. This is a modular package. Book a transport-only tour, or upgrade to add a guide, entry fees, and a restaurant lunch.', 4.8, 'Egypt', 8.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d13072840-6_Hours_Half_Day_Tour_To_Sakkara_Memphis_Dahshur-Cairo_Cairo_Governorate.html', '5–6 hours', 'Private Sightseeing Tours', 1, '2025-06-29 19:07:45', '2025-06-29 19:07:45', '[\"English\"]'),
(36, 'SPECIAL OFFER Swim with Dolphins, VIP Snorkeling sea trip with Lunch - Hurghada', 'SPECIAL OFFER Swim with Dolphins, VIP Snorkeling sea trip with Lunch - Hurghada', 'While in Hurghada, make the most of your proximity to one of the world’s top snorkeling and diving sites. Head out onto the Red Sea and cruise to Dolphin House where you can explore the underwater world by snorkel. As you continue, there will be more opportunities to jump off board and snorkel and explore. Includes lunch served on board.', 'While in Hurghada, make the most of your proximity to one of the world’s top snorkeling and diving sites. Head out onto the Red Sea and cruise to Dolphin House where you can explore the underwater world by snorkel. As you continue, there will be more opportunities to jump off board and snorkel and explore. Includes lunch served on board.', 4.6, 'Egypt', 8.46, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d16845342-Swim_with_Dolphins_VIP_Snorkeling_sea_trip_with_Lunch_Hurghada-Hurghada_Red_Sea_an.html', '8h', 'Snorkeling', 1, '2025-06-29 19:10:20', '2025-06-29 19:10:20', '[\"German\"]'),
(37, 'Orange Bay Island Snorkeling Trip With Water Sports - Hurghada', 'Orange Bay Island Snorkeling Trip With Water Sports - Hurghada', 'Head out to the waters of the Red Sea on a full-day snorkeling tour from your Hurghada hotel. You’ll travel by boat to Orange Bay Island, enjoying two separate stops to snorkel with marine life (guide and equipment included) plus rides on a banana boat and a tow tube. Lunch is provided on board, but national park admission fees are at your own expense.', 'Head out to the waters of the Red Sea on a full-day snorkeling tour from your Hurghada hotel. You’ll travel by boat to Orange Bay Island, enjoying two separate stops to snorkel with marine life (guide and equipment included) plus rides on a banana boat and a tow tube. Lunch is provided on board, but national park admission fees are at your own expense.', 4.2, 'Egypt', 12.00, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d16823034-Orange_Bay_Island_Snorkeling_Trip_With_Water_Sports_Hurghada-Hurghada_Red_Sea_and_.html', '8h', 'Snorkeling', 1, '2025-06-29 19:14:37', '2025-06-29 19:14:37', '[\"French\"]'),
(38, 'ROYAL Dolphin House & Water Sports Snorkeling Sea Trip - Hurghada', 'ROYAL Dolphin House & Water Sports Snorkeling Sea Trip - Hurghada', 'Set sail from Hurghada for an exciting day at sea, guided by a local skipper. Enjoy swimming with dolphins, water sports, and snorkeling lessons from the pros. Get ready to cruise past coral reefs, vibrant lagoons, and the Dolphin House natural reserve. Plus, enjoy lunch, refreshing beverages, and beautiful coastal views as you unwind on deck or swim in the crystal-clear waters.', 'Set sail from Hurghada for an exciting day at sea, guided by a local skipper. Enjoy swimming with dolphins, water sports, and snorkeling lessons from the pros. Get ready to cruise past coral reefs, vibrant lagoons, and the Dolphin House natural reserve. Plus, enjoy lunch, refreshing beverages, and beautiful coastal views as you unwind on deck or swim in the crystal-clear waters.', 4.9, 'Egypt', 10.00, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d19953917-ROYAL_Dolphin_House_Water_Sports_Snorkeling_Sea_Trip_Hurghada-Hurghada_Red_Sea_and.html', '8h', 'Snorkeling', 1, '2025-06-29 19:15:56', '2025-06-29 19:15:56', '[\"Arabic\"]'),
(39, 'Orange Bay Island', 'Orange Bay Island', 'Experience the clear waters of the Giftun Islands\' Orange Bay with this water sports day trip from Hurghada. Offering round-trip transport to the Red Sea marine reserve plus a boat trip when you\'re there, you have all you need to enjoy the beaches and the underwater sights. Lunch, an umbrella, and water sports equipment are all provided.', 'Experience the clear waters of the Giftun Islands\' Orange Bay with this water sports day trip from Hurghada. Offering round-trip transport to the Red Sea marine reserve plus a boat trip when you\'re there, you have all you need to enjoy the beaches and the underwater sights. Lunch, an umbrella, and water sports equipment are all provided.', 4.7, 'Egypt', 23.89, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d17645420-Orange_Bay_Island-Hurghada_Red_Sea_and_Sinai.html', '7h', 'Snorkeling', 1, '2025-06-29 19:17:30', '2025-06-29 19:17:30', '[\"German\"]'),
(40, 'Sharm El Sheikh: ATV, Camel Ride with BBQ Dinner and Show', 'Sharm El Sheikh: ATV, Camel Ride with BBQ Dinner and Show', 'Head to the Sinai desert for an afternoon and evening of adventure with this small-group tour from Sharm El Sheik. Enjoy pickup from your hotel and transfer to the desert. After instruction on use, go on a quad bike ride, visit Echo Mountain, and sit down to a BBQ dinner with live entertainment at a Bedouin Village.', 'Head to the Sinai desert for an afternoon and evening of adventure with this small-group tour from Sharm El Sheik. Enjoy pickup from your hotel and transfer to the desert. After instruction on use, go on a quad bike ride, visit Echo Mountain, and sit down to a BBQ dinner with live entertainment at a Bedouin Village.', 4.8, 'Egypt', 23.00, 'https://www.tripadvisor.com/AttractionProductReview-g297555-d19794271-Sharm_El_Sheikh_ATV_Camel_Ride_with_BBQ_Dinner_and_Show-Sharm_El_Sheikh_South_Sina.html', '5h', 'Extreme Sports', 1, '2025-06-29 19:19:32', '2025-06-29 19:19:32', '[\"Arabic\"]'),
(41, 'See all Things to Do in Luxor Hot Air Balloons Ride Luxor, Egypt 4.9  Share Review  Save Overview Details Itinerary Operator Reviews from $33.34 Check availability Hot Air Balloons Ride Luxor, Egypt', 'See all Things to Do in Luxor Hot Air Balloons Ride Luxor, Egypt 4.9  Share Review  Save Overview Details Itinerary Operator Reviews from $33.34 Check availability Hot Air Balloons Ride Luxor, Egypt', 'Take in some of the best views of Luxor imaginable with a hot-air balloon flight over the ancient city, complete with on-board narration from your pilot to help keep you oriented. This tour includes not only your flight but also round-trip transportation from your hotel or port and a souvenir flight certificate to commemorate your journey.', 'Take in some of the best views of Luxor imaginable with a hot-air balloon flight over the ancient city, complete with on-board narration from your pilot to help keep you oriented. This tour includes not only your flight but also round-trip transportation from your hotel or port and a souvenir flight certificate to commemorate your journey.', 4.9, 'Egypt', 33.34, 'https://www.tripadvisor.com/AttractionProductReview-g294205-d17617172-Hot_Air_Balloons_Ride_Luxor_Egypt-Luxor_Nile_River_Valley.html', '2h', 'Extreme Sports', 0, '2025-06-29 19:31:52', '2025-06-29 19:31:52', NULL),
(42, 'Hurghada Safari Quad and Camel Ride with Night Show and Dinner', 'Hurghada Safari Quad and Camel Ride with Night Show and Dinner', 'A desert safari is a must when in Hurghada. Experience it to the max on this great-value package featuring an all-terrain vehicle (ATV or quad bike) adventure, a spider car session, and a camel ride, plus a Bedouin feast with tanoura spinning, belly dance, and a fire performance. Your package includes round-trip transfers from central Hurghada hotels but excludes safari entrance fees.', 'A desert safari is a must when in Hurghada. Experience it to the max on this great-value package featuring an all-terrain vehicle (ATV or quad bike) adventure, a spider car session, and a camel ride, plus a Bedouin feast with tanoura spinning, belly dance, and a fire performance. Your package includes round-trip transfers from central Hurghada hotels but excludes safari entrance fees.', 4.9, 'Egypt', 9.90, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d27968334-Hurghada_Safari_Quad_and_Camel_Ride_with_Night_Show_and_Dinner-Hurghada_Red_Sea_an.html', '6h', 'Extreme Sports', 0, '2025-06-29 19:34:01', '2025-06-29 19:34:01', NULL),
(43, 'Desert Safari ATV, Buggy Car, Camel Ride, Bedouin Dinner–Hurghada', 'Desert Safari ATV, Buggy Car, Camel Ride, Bedouin Dinner–Hurghada', 'Venture away from the resort town of Hurghada and head into the Sahara Desert for a day of fun activities. Start off with a thrilling quad bike tour through the desert sands followed by a dune buggy ride. Then, head to a Bedouin village to learn about the local desert culture and take a camel ride. Your day concludes with a traditional barbecue and folklore show.', 'Venture away from the resort town of Hurghada and head into the Sahara Desert for a day of fun activities. Start off with a thrilling quad bike tour through the desert sands followed by a dune buggy ride. Then, head to a Bedouin village to learn about the local desert culture and take a camel ride. Your day concludes with a traditional barbecue and folklore show.', 4.8, 'Egypt', 12.00, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d16823101-Desert_Safari_ATV_Buggy_Car_Camel_Ride_Bedouin_Dinner_Hurghada-Hurghada_Red_Sea_an.html', '7h', 'Extreme Sports', 0, '2025-06-29 19:36:43', '2025-06-29 19:36:43', NULL),
(44, 'See all Things to Do in Giza Sunset & Night Open Air Nile Cruise in Cairo & Giza 4.8  Share Review  Save Overview Details Itinerary Operator Reviews from $35.00 Check availability Sunset & Night Open Air Nile Cruise in Cairo & Giza', 'See all Things to Do in Giza Sunset & Night Open Air Nile Cruise in Cairo & Giza 4.8  Share Review  Save Overview Details Itinerary Operator Reviews from $35.00 Check availability Sunset & Night Open Air Nile Cruise in Cairo & Giza', 'Cairo looks at its best after dark, with the lights of the bridges and skyscrapers reflecting in the Nile. See sights like the Cairo Tower and Sixth of October Bridge from the water on this Nile cruise, available at sunset or well into the night. Your package includes coffee, tea, and soft drinks; food is available for an additional charge.', 'Cairo looks at its best after dark, with the lights of the bridges and skyscrapers reflecting in the Nile. See sights like the Cairo Tower and Sixth of October Bridge from the water on this Nile cruise, available at sunset or well into the night. Your package includes coffee, tea, and soft drinks; food is available for an additional charge.', 3.8, 'Egypt', 35.00, 'https://www.tripadvisor.com/AttractionProductReview-g294202-d26823279-Sunset_Night_Open_Air_Nile_Cruise_in_Cairo_Giza-Giza_Giza_Governorate.html', '2h', 'Sailing', 0, '2025-06-29 19:40:28', '2025-06-29 19:40:28', NULL),
(45, 'ViP Orange Bay Giftun Island Tour By Boat With Lunch in Hurghada', 'ViP Orange Bay Giftun Island Tour By Boat With Lunch in Hurghada', 'This day excursion includes lunch and unlimited soft drinks to the magnificent Giftun Islands National Park. Snorkel on beautiful coral reefs, see dolphins, and relax in clear water.This Orange Bay Island snorkeling tour begins with an easy, stress-free pick-up from Hurghada. When you arrive at your boat, board it for the cruise across the Red Sea to Orange Bay. \r\n\r\nSpend the day snorkeling with all of the equipment provided to make it a simple experience. You can jump off the boat whenever your guide allows and enjoy views of the coral reefs, fish, and other sea life. \r\n\r\nThis tour also includes time to visit Orange Island and a lunch buffet aboard the boat. \r\nOnce your full-day trip is completed, your boat returns to shore and drops you off at your Hurghada hotel.', 'This day excursion includes lunch and unlimited soft drinks to the magnificent Giftun Islands National Park. Snorkel on beautiful coral reefs, see dolphins, and relax in clear water.This Orange Bay Island snorkeling tour begins with an easy, stress-free pick-up from Hurghada. When you arrive at your boat, board it for the cruise across the Red Sea to Orange Bay. \r\n\r\nSpend the day snorkeling with all of the equipment provided to make it a simple experience. You can jump off the boat whenever your guide allows and enjoy views of the coral reefs, fish, and other sea life. \r\n\r\nThis tour also includes time to visit Orange Island and a lunch buffet aboard the boat. \r\nOnce your full-day trip is completed, your boat returns to shore and drops you off at your Hurghada hotel.', 4.6, 'Egypt', 17.40, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d25399946-ViP_Orange_Bay_Giftun_Island_Tour_By_Boat_With_Lunch_in_Hurghada-Hurghada_Red_Sea_.html', '7h', 'Sailing', 0, '2025-06-29 19:42:29', '2025-06-29 19:42:29', NULL),
(46, 'Cairo Private Felucca OnThe Nile River With Pickup and Soft Drink', 'Cairo Private Felucca OnThe Nile River With Pickup and Soft Drink', 'Felucca sailboats have been plying the Nile since time immemorial, and a ride on one is a distinctive Cairo experience. Skip the angst of haggling with captains on the Corniche and enjoy a seamless experience at the time of your choosing when you prebook this private cruise. Your day includes transfers from your Cairo address, a soft drink, and Egyptian music to enhance your sense of place.', 'Felucca sailboats have been plying the Nile since time immemorial, and a ride on one is a distinctive Cairo experience. Skip the angst of haggling with captains on the Corniche and enjoy a seamless experience at the time of your choosing when you prebook this private cruise. Your day includes transfers from your Cairo address, a soft drink, and Egyptian music to enhance your sense of place.', 4.7, 'Egypt', 12.00, 'https://www.tripadvisor.com/AttractionProductReview-g294201-d26789977-Cairo_Private_Felucca_OnThe_Nile_River_With_Pickup_and_Soft_Drink-Cairo_Cairo_Gove.html', '1–3 hours', 'Sailing', 1, '2025-06-29 19:46:41', '2025-06-29 19:46:41', '[\"French\"]'),
(47, 'Parasailing Fly in the Red Sea Sky With Transfers - Hurghada', 'Parasailing Fly in the Red Sea Sky With Transfers - Hurghada', 'Plan an exciting adventure while visiting Egypt and explore the area from the sky during this Hurghada Parasailing Experience. This fun adventure takes you up to 164 feet (50 meters) into the sky as you fly from a speedboat below. Plus, to make your adventure a smooth one, hotel pickup from the Hurghada area is also included.', 'Plan an exciting adventure while visiting Egypt and explore the area from the sky during this Hurghada Parasailing Experience. This fun adventure takes you up to 164 feet (50 meters) into the sky as you fly from a speedboat below. Plus, to make your adventure a smooth one, hotel pickup from the Hurghada area is also included.', 4.6, 'Egypt', 5.00, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d16823103-Parasailing_Fly_in_the_Red_Sea_Sky_With_Transfers_Hurghada-Hurghada_Red_Sea_and_Si.html', '1h 30m', 'Sailing', 0, '2025-06-29 19:49:53', '2025-06-29 19:49:53', NULL),
(48, 'Quad 3 hours VIP safari adventure Hurghada', 'Quad 3 hours VIP safari adventure Hurghada', 'Get your adrenaline pumping on a thrilling quad bike adventure through the Eastern Desert from Hurghada. Zoom through dunes, experiencing an adrenaline rush as you make your way to a Bedouin village. Immerse yourself in Bedouin culture, relax with traditional tea, and enjoy a camel ride. Witness the nomadic lifestyle and hospitality before returning through scenic dunes back to base camp.', 'Get your adrenaline pumping on a thrilling quad bike adventure through the Eastern Desert from Hurghada. Zoom through dunes, experiencing an adrenaline rush as you make your way to a Bedouin village. Immerse yourself in Bedouin culture, relax with traditional tea, and enjoy a camel ride. Witness the nomadic lifestyle and hospitality before returning through scenic dunes back to base camp.', 4.6, 'Egypt', 14.40, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d24039982-Quad_3_hours_VIP_safari_adventure_Hurghada-Hurghada_Red_Sea_and_Sinai.html', '3h 30m', 'Safaris', 0, '2025-06-29 19:51:36', '2025-06-29 19:51:36', NULL),
(49, 'Super Safari ATV, Drive Buggy, Camel Ride, Dinner & Show-Hurghada', 'Super Safari ATV, Drive Buggy, Camel Ride, Dinner & Show-Hurghada', 'Spend an evening exploring the deserts outside of Hurghada when you book this safari tour. Get your adrenaline pumping on a quad bike ride through the dunes before observing the landscapes on a Jeep ride to a Bedouin camp. Take a tour of the camp, ride a camel, and then sit down for a delicious barbecue dinner to conclude your evening.', 'Spend an evening exploring the deserts outside of Hurghada when you book this safari tour. Get your adrenaline pumping on a quad bike ride through the dunes before observing the landscapes on a Jeep ride to a Bedouin camp. Take a tour of the camp, ride a camel, and then sit down for a delicious barbecue dinner to conclude your evening.', 4.8, 'Egypt', 16.92, 'https://www.tripadvisor.com/AttractionProductReview-g297549-d19953816-Super_Safari_ATV_Drive_Buggy_Camel_Ride_Dinner_Show_Hurghada-Hurghada_Red_Sea_and_.html', '7h', 'Safaris', 1, '2025-06-29 19:53:17', '2025-06-29 19:53:17', '[\"German\"]'),
(50, 'Sharm El Sheikh: Jeep Adventure to Blue Hole, Canyon & Dahab', 'Sharm El Sheikh: Jeep Adventure to Blue Hole, Canyon & Dahab', 'Join a day trip from Sharm El Sheikh to the Colored Canyon, Blue Hole, and Dahab. Get ready to marvel at the vibrant rock formations, explore breathtaking coral reefs, and indulge in the beauty of the desert oasis, and enjoy a delicious BBQ lunch in a Bedouin tent This blog post will be your guide to an exhilarating journey that will leave you in awe of nature\'s wonders. So, fasten your seatbelts and prepare for an adventure like no other!', 'Join a day trip from Sharm El Sheikh to the Colored Canyon, Blue Hole, and Dahab. Get ready to marvel at the vibrant rock formations, explore breathtaking coral reefs, and indulge in the beauty of the desert oasis, and enjoy a delicious BBQ lunch in a Bedouin tent This blog post will be your guide to an exhilarating journey that will leave you in awe of nature\'s wonders. So, fasten your seatbelts and prepare for an adventure like no other!', 3.7, 'Egypt', 23.00, 'https://www.tripadvisor.com/AttractionProductReview-g297555-d27183738-Sharm_El_Sheikh_Jeep_Adventure_to_Blue_Hole_Canyon_Dahab-Sharm_El_Sheikh_South_Sin.html', '8h', 'Safaris', 1, '2025-06-29 19:56:02', '2025-06-29 19:56:02', '[\"English\"]'),
(51, '3 Hours Quad Bike with Camel Ride From Sharm El-Sheikh', '3 Hours Quad Bike with Camel Ride From Sharm El-Sheikh', 'An ATV quad tour to the eco mountain from Sharm El Sheikh is a thrilling adventure activity that takes you on a ride through rugged terrain, valleys, sand dunes, and rocky trails all the way to the top of the mountain. You\'ll be rewarded with breathtaking views of the region and the chance to experience traditional Bedouin tea at a Bedouin camp before heading back down. This tour is perfect for those who love off-road sports and eco-tourism', 'An ATV quad tour to the eco mountain from Sharm El Sheikh is a thrilling adventure activity that takes you on a ride through rugged terrain, valleys, sand dunes, and rocky trails all the way to the top of the mountain. You\'ll be rewarded with breathtaking views of the region and the chance to experience traditional Bedouin tea at a Bedouin camp before heading back down. This tour is perfect for those who love off-road sports and eco-tourism', 5.0, 'Egypt', 6.80, 'https://www.tripadvisor.com/AttractionProductReview-g297555-d25984895-3_Hours_Quad_Bike_with_Camel_Ride_From_Sharm_El_Sheikh-Sharm_El_Sheikh_South_Sinai.html', '3h', 'Safaris', 1, '2025-06-29 19:57:48', '2025-06-29 19:57:48', '[\"Spanish\"]');

-- --------------------------------------------------------

--
-- بنية الجدول `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `year` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `location` varchar(255) NOT NULL,
  `seats` int(11) DEFAULT NULL,
  `large_bag` int(11) DEFAULT NULL,
  `small_bag` int(11) DEFAULT NULL,
  `car_specification` text DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `booking_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `type`, `rate`, `year`, `price`, `location`, `seats`, `large_bag`, `small_bag`, `car_specification`, `supplier`, `description_en`, `description_ar`, `booking_link`, `created_at`, `updated_at`) VALUES
(7, 'Supplied by Green Motion', 'Nissan', 'Sunny', 3.2, 1990, 50.00, 'Egypt, Africa', 5, 1, 1, 'air condatioon', 'Automatic transmission', 'null', 'null', 'http://localhost:3000/admin/cars', '2025-06-29 23:05:16', '2025-06-29 23:05:16'),
(8, 'null', 'Hyundai', 'i10', 4.0, 2003, 55.00, 'Egypt, Africa', 4, 1, 1, 'air condatioon', 'Automatic transmission', 'null', 'null', 'http://localhost:3000/admin/cars', '2025-06-29 23:10:09', '2025-06-29 23:10:09'),
(9, 'Supplied by Green Motion', 'Chevrole', 'Aveo', 4.2, 2015, 55.00, 'Egypt, Africa', 5, 1, 1, 'air condatioon', 'Automatic transmission', 'null', 'null', 'http://localhost:3000/admin/cars', '2025-06-29 23:13:01', '2025-06-29 23:13:01'),
(10, 'Supplied by Green Motion', 'Kia Cerato', 'SUV', 3.5, 2019, 59.00, 'Egypt, Africa', 5, 2, 1, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:14:21', '2025-06-29 23:16:19'),
(11, 'Supplied by Green Motion', 'Chevrolet', 'SUV', 4.0, 2018, 60.00, 'Egypt, Africa', 5, 3, 2, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:15:42', '2025-06-29 23:15:42'),
(12, 'Supplied by Green Motion', 'Nissan Sentra', 'medium', 3.4, 2025, 60.00, 'Egypt, Africa', 5, 1, 1, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:17:55', '2025-06-29 23:17:55'),
(13, 'Supplied by Green Motion', 'Nissan Sentra', 'large', 5.0, 2023, 65.00, 'Egypt, Africa', 5, 2, 3, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:19:08', '2025-06-29 23:19:08'),
(14, 'Supplied by Green Motion', 'Nissan Sentra', 'SUV', 4.0, 2020, 65.00, 'Egypt, Africa', 5, 2, 3, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:20:08', '2025-06-29 23:20:08'),
(15, 'Supplied by Green Motion', 'Hyundai Tucson', 'SUV', 5.0, 2025, 97.00, 'Egypt, Africa', 5, 2, 5, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:21:09', '2025-06-29 23:21:09'),
(16, 'Supplied by Green Motion', 'Hyundai Elantra', 'large', 4.0, 2021, 92.00, 'Egypt, Africa', 5, 2, 2, 'air condatioon', 'Automatic transmission', 'n', 'n', 'http://localhost:3000/admin/cars', '2025-06-29 23:22:09', '2025-06-29 23:22:09');

-- --------------------------------------------------------

--
-- بنية الجدول `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `cartable_type` varchar(255) NOT NULL,
  `cartable_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `cartable_type`, `cartable_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 26, 'App\\Models\\Activity', 1, 5, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(2, 27, 'App\\Models\\Activity', 1, 4, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(3, 28, 'App\\Models\\Activity', 1, 2, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(4, 29, 'App\\Models\\Activity', 1, 5, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(5, 30, 'App\\Models\\Activity', 1, 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(6, 31, 'App\\Models\\Activity', 1, 3, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(7, 32, 'App\\Models\\Activity', 1, 4, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(8, 33, 'App\\Models\\Activity', 1, 2, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(9, 34, 'App\\Models\\Activity', 1, 5, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(10, 35, 'App\\Models\\Activity', 1, 5, '2025-06-24 05:59:46', '2025-06-24 05:59:46');

-- --------------------------------------------------------

--
-- بنية الجدول `cruises`
--

CREATE TABLE `cruises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `booking_link` varchar(255) DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `depart_time` time DEFAULT NULL,
  `return_time` time DEFAULT NULL,
  `property_type` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `amenities` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `cruises`
--

INSERT INTO `cruises` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `rate`, `location`, `price`, `booking_link`, `from`, `to`, `depart_time`, `return_time`, `property_type`, `style`, `amenities`, `created_at`, `updated_at`) VALUES
(16, '7 Night Cruise to the Western Mediterranean', '7 Night Cruise to the Western Mediterranean', 'Barcelona, Marseille, Genoa, Naples, Taormina (Messina), Malta (Valletta),', 'Barcelona, Marseille, Genoa, Naples, Taormina (Messina), Malta (Valletta),', 3.0, 'Egypt, Africa', 1022.00, 'https://www.tripadvisor.com/Cruise_Review-d25948296-Reviews-MSC_World_Europa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-30 01:10:17', '2025-06-30 01:10:17'),
(17, '10 Night Cruise to the Western Mediterranean', '10 Night Cruise to the Western Mediterranean', 'Barcelona, Mykonos, Kusadasi (tours to Ephesus), Istanbul, Istanbul, Santorini, Katakolon (Tours to', 'Barcelona, Mykonos, Kusadasi (tours to Ephesus), Istanbul, Istanbul, Santorini, Katakolon (Tours to', 4.0, 'Egypt, Africa', 1619.00, 'https://www.tripadvisor.com/Cruise_Review-d15691375-Reviews-Celebrity_Equinox', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-30 01:12:52', '2025-06-30 01:12:52'),
(18, '11 Night Cruise to the Western Mediterranean', '11 Night Cruise to the Western Mediterranean', 'Ravenna (Bologna), Zadar, Dubrovnik, Split, Kotor, Taormina (Messina), Naples,', 'Ravenna (Bologna), Zadar, Dubrovnik, Split, Kotor, Taormina (Messina), Naples,', 3.5, 'Egypt, Africa', 1168.00, 'https://www.tripadvisor.com/Cruise_Review-d15691370-Reviews-Celebrity_Constellation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-30 01:14:08', '2025-06-30 01:14:08'),
(19, '7 Night Cruise to the Eastern Mediterranean', '7 Night Cruise to the Eastern Mediterranean', 'Rien de grandiose ! Tout vraimenît moyen ,nous ne le recommenderons pas !', 'Rien de grandiose ! Tout vraimenît moyen ,nous ne le recommenderons pas !', 3.0, 'Egypt, Africa', 884.00, 'https://www.tripadvisor.com/Cruise_Review-d15691638-Reviews-MSC_Opera', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-30 01:15:32', '2025-06-30 01:15:32'),
(20, '9 Night Cruise to the Eastern Mediterranean', '9 Night Cruise to the Eastern Mediterranean', 'Istanbul, Corfu, Bari, Trieste, Katakolon (Tours to Olympia), Pireaus (for Athens), Kusadasi (tour', 'Istanbul, Corfu, Bari, Trieste, Katakolon (Tours to Olympia), Pireaus (for Athens), Kusadasi (tour', 3.0, 'Egypt, Africa', 1317.00, 'https://www.tripadvisor.com/Cruise_Review-d15691632-Reviews-MSC_Fantasia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-30 01:16:48', '2025-06-30 01:16:48');

-- --------------------------------------------------------

--
-- بنية الجدول `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `favoritable_type` varchar(255) NOT NULL,
  `favoritable_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `favoritable_type`, `favoritable_id`, `created_at`, `updated_at`) VALUES
(4, 19, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(5, 20, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(6, 21, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(7, 22, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(8, 23, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(9, 24, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(10, 25, 'App\\Models\\Trip', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(21, 38, 'App\\Models\\Hotel', 6, '2025-06-27 07:47:57', '2025-06-27 07:47:57'),
(22, 38, 'App\\Models\\Hotel', 6, '2025-06-27 07:48:00', '2025-06-27 07:48:00'),
(51, 38, 'App\\Models\\Car', 6, '2025-06-28 02:56:12', '2025-06-28 02:56:12'),
(52, 38, 'App\\Models\\Hotel', 9, '2025-06-28 03:01:46', '2025-06-28 03:01:46'),
(53, 38, 'App\\Models\\Cruise', 8, '2025-06-28 07:54:56', '2025-06-28 07:54:56'),
(54, 38, 'App\\Models\\Activity', 8, '2025-06-28 08:00:41', '2025-06-28 08:00:41'),
(55, 38, 'App\\Models\\Activity', 7, '2025-06-28 08:01:39', '2025-06-28 08:01:39'),
(56, 38, 'App\\Models\\Activity', 9, '2025-06-28 08:03:27', '2025-06-28 08:03:27'),
(57, 38, 'App\\Models\\Restaurant', 30, '2025-06-30 06:21:18', '2025-06-30 06:21:18'),
(58, 38, 'App\\Models\\Hotel', 18, '2025-06-30 20:54:28', '2025-06-30 20:54:28'),
(59, 38, 'App\\Models\\Hotel', 27, '2025-06-30 20:54:35', '2025-06-30 20:54:35'),
(60, 38, 'App\\Models\\Restaurant', 24, '2025-06-30 20:54:54', '2025-06-30 20:54:54'),
(61, 38, 'App\\Models\\Activity', 25, '2025-06-30 20:55:10', '2025-06-30 20:55:10'),
(62, 38, 'App\\Models\\Car', 7, '2025-06-30 20:55:18', '2025-06-30 20:55:18');

-- --------------------------------------------------------

--
-- بنية الجدول `flights`
--

CREATE TABLE `flights` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `style` varchar(255) DEFAULT NULL,
  `from_location` varchar(255) NOT NULL,
  `departure_time` datetime NOT NULL,
  `to_location` varchar(255) NOT NULL,
  `arrival_time` datetime NOT NULL,
  `return_from` varchar(255) DEFAULT NULL,
  `return_departure_time` datetime DEFAULT NULL,
  `return_to` varchar(255) DEFAULT NULL,
  `return_arrival_time` datetime DEFAULT NULL,
  `stops_count` int(11) NOT NULL DEFAULT 0,
  `stop_locations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`stop_locations`)),
  `duration` decimal(5,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `booking_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `flights`
--

INSERT INTO `flights` (`id`, `style`, `from_location`, `departure_time`, `to_location`, `arrival_time`, `return_from`, `return_departure_time`, `return_to`, `return_arrival_time`, `stops_count`, `stop_locations`, `duration`, `price`, `rate`, `booking_link`, `created_at`, `updated_at`) VALUES
(12, 'Economy', 'Egypt , cairo', '2025-06-30 17:25:00', 'london', '2025-06-30 20:40:00', 'london', '2025-06-30 09:05:00', 'Egypt', '2025-06-30 16:00:00', 0, '\"[]\"', 4.00, 469.00, 4.0, 'https://www.tripadvisor.com/CheapFlightsSearchResults-g186338-a_airport0.CAI-a_airport1.LON-a_cos.0-a_date0.20250703-a_date1.20250710-a_nearby0.no-a_nearby1.no-a_nonstop.no-a_pax0.a-a_travelers.1-London_England.html', '2025-06-29 23:29:32', '2025-06-29 23:29:32'),
(13, 'Premium Economy', 'Egypt , cairo', '2025-06-30 04:00:00', 'london', '2025-06-30 21:35:00', 'london', '2025-06-30 16:05:00', 'Egypt', '2025-06-30 02:15:00', 2, '\"[\\\"ATH\\\\\\/OSL\\\"]\"', 18.00, 1176.00, 4.0, 'https://www.tripadvisor.com/CheapFlightsSearchResults?geo=186338&cos=3&nonstop=no&pax0=a&travelers=1&airport0=CAI&nearby0=no&airport1=LON&nearby1=no&date0=20250703&date1=20250710&formImp=', '2025-06-29 23:33:07', '2025-06-29 23:33:07'),
(14, 'Business Class', 'Egypt , cairo', '2025-06-30 04:00:00', 'london', '2025-06-30 21:35:00', 'london', '2025-06-30 16:05:00', 'Egypt', '2025-06-30 02:15:00', 2, '\"[\\\"ATH\\\\\\/OSL\\\"]\"', 18.00, 1210.00, 4.3, 'https://www.tripadvisor.com/CheapFlightsSearchResults?geo=186338&cos=3&nonstop=no&pax0=a&travelers=1&airport0=CAI&nearby0=no&airport1=LON&nearby1=no&date0=20250703&date1=20250710&formImp=', '2025-06-29 23:35:11', '2025-06-29 23:35:11'),
(15, 'First Class', 'Egypt , cairo', '2025-06-30 20:55:00', 'london', '2025-06-30 10:00:00', 'london', '2025-06-30 16:45:00', 'Egypt', '2025-06-30 07:59:00', 1, '\"[\\\"KWI\\\"]\"', 14.00, 6911.00, 5.0, 'https://www.tripadvisor.com/CheapFlightsSearchResults?geo=186338&cos=2&nonstop=no&pax0=a&travelers=1&airport0=CAI&nearby0=no&airport1=LON&nearby1=no&date0=20250703&date1=20250710&formImp=', '2025-06-29 23:37:43', '2025-06-29 23:37:43'),
(16, 'First Class', 'Egypt , cairo', '2025-06-30 14:40:00', 'paris', '2025-06-30 19:20:00', 'paris', '2025-06-30 22:00:00', 'Egypt', '2025-06-30 01:15:00', 1, '\"[\\\"AUH\\\"]\"', 28.00, 6428.00, 4.5, 'https://www.tripadvisor.com/CheapFlightsSearchResults-g187147-a_airport0.CAI-a_airport1.PAR-a_cos.2-a_date0.20250703-a_date1.20250710-a_nearby0.no-a_nearby1.no-a_nonstop.no-a_pax0.a-a_travelers.1-Paris_Ile_de_France.html', '2025-06-29 23:40:12', '2025-06-29 23:40:12'),
(17, 'Economy', 'Egypt , cairo', '2025-06-30 03:30:00', 'paris', '2025-06-30 07:05:00', 'paris', '2025-06-30 20:10:00', 'Egypt', '2025-06-30 01:30:00', 0, '\"[]\"', 3.00, 498.00, 4.0, 'https://www.tripadvisor.com/CheapFlightsSearchResults?geo=187147&cos=0&nonstop=no&pax0=a&travelers=1&airport0=CAI&nearby0=no&airport1=PAR&nearby1=no&date0=20250703&date1=20250710&formImp=', '2025-06-29 23:42:36', '2025-06-29 23:42:36'),
(18, 'Economy', 'Egypt , cairo', '2025-06-30 12:05:00', 'Munich (MUC)', '2025-06-30 14:55:00', 'Munich (MUC)', '2025-06-30 15:55:00', 'Egypt', '2025-06-30 20:40:00', 0, '\"[]\"', 5.00, 657.00, 3.0, 'https://www.tripadvisor.com/CheapFlightsSearchResults?geo=187309&cos=0&nonstop=no&pax0=a&travelers=1&airport0=CAI&nearby0=no&airport1=MUC&nearby1=no&date0=20250703&date1=20250710&formImp=', '2025-06-30 00:55:41', '2025-06-30 00:55:41'),
(20, 'Business Class', 'United Arab Emirates', '2025-06-30 16:25:00', 'Egypt , Cairo', '2025-06-30 00:30:00', 'United Arab Emirates', '2025-06-30 06:55:00', 'Egypt', '2025-06-30 15:25:00', 0, '\"[]\"', 2.00, 813.00, 5.0, 'https://www.tripadvisor.com/CheapFlightsSearchResults-g294201-a_airport0.AUH-a_airport1.CAI-a_cos.1-a_date0.20250703-a_date1.20250710-a_nearby0.no-a_nearby1.no-a_nonstop.no-a_pax0.a-a_travelers.1-Cairo_Cairo_Governorate.html', '2025-06-30 01:03:50', '2025-06-30 01:03:50'),
(21, 'Premium Economy', 'London', '2025-06-30 19:45:00', 'Egypt , Cairo', '2025-06-30 02:15:00', 'Egypt', '2025-06-30 04:00:00', 'London', '2025-06-30 17:00:00', 2, '\"[\\\"ATH\\\\\\/ARN\\\"]\"', 14.00, 1288.00, 4.8, 'https://www.tripadvisor.com/CheapFlightsSearchResults?geo=294201&cos=3&nonstop=no&pax0=a&travelers=1&airport0=LON&nearby0=no&airport1=CAI&nearby1=no&date0=20250703&date1=20250710&formImp=', '2025-06-30 01:06:18', '2025-06-30 01:06:18');

-- --------------------------------------------------------

--
-- بنية الجدول `hotels`
--

CREATE TABLE `hotels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `price` decimal(10,2) DEFAULT NULL,
  `old_price` decimal(10,2) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `location` varchar(255) DEFAULT NULL,
  `booking_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `hotels`
--

INSERT INTO `hotels` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `rate`, `price`, `old_price`, `class`, `style`, `amenities`, `location`, `booking_link`, `created_at`, `updated_at`) VALUES
(18, 'Royal Savoy Sharm El Sheikh', 'Royal Savoy Sharm El Sheikh', 'Soho Square, Sharm El Sheikh 46628 Egypt', 'Soho Square, Sharm El Sheikh 46628 Egypt', 4.9, 188.00, 200.00, '5 star', 'Romantic , Ocean View', '[\"Free parking\",\"Pool\",\"Free breakfast\",\"Beach\",\"Diving\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297555-d1215152-Reviews-Royal_Savoy_Sharm_El_Sheikh-Sharm_El_Sheikh_South_Sinai_Red_Sea_and_Sinai.html', '2025-06-29 15:31:22', '2025-06-29 15:31:22'),
(19, 'The New Yorker, A Wyndham Hotel', 'The New Yorker, A Wyndham Hotel', '481 8th Avenue & 34th Street, New York City, NY 10001-1809', '481 8th Avenue & 34th Street, New York City, NY 10001-1809', 3.9, 170.00, 250.00, '4 star', 'Classic', '[\"Free-wifi\",\"Bowling offsite\",\"Air conditioning\",\"Safe\"]', 'New York', 'https://www.tripadvisor.com/Hotel_Review-g60763-d122005-Reviews-The_New_Yorker_A_Wyndham_Hotel-New_York_City_New_York.html', '2025-06-29 15:37:14', '2025-06-29 15:37:14'),
(20, 'Hard Rock Hotel Bali', 'Hard Rock Hotel Bali', 'Jl. Pantai, Banjar Pande Mas Banjar Pande Mas, Kuta 80361 Indonesia', 'Jl. Pantai, Banjar Pande Mas Banjar Pande Mas, Kuta 80361 Indonesia', 4.2, 130.00, 193.00, '4.5', 'Family , Trendy', '[\"Pool\",\"Beach\",\"Air conditioning\",\"Housekeeping\",\"Free breakfast\"]', 'Kuta', 'https://www.tripadvisor.com/Hotel_Review-g297697-d302343-Reviews-Hard_Rock_Hotel_Bali-Kuta_Kuta_District_Bali.html', '2025-06-29 15:40:53', '2025-06-29 15:40:53'),
(21, 'Rio Hotel & Casino', 'Rio Hotel & Casino', '3700 W. Flamingo Rd, Las Vegas, NV 89103', '3700 W. Flamingo Rd, Las Vegas, NV 89103', 3.5, 121.00, 178.00, '4', 'Mountain View , City View', '[\"Free parking\",\"Free High\",\"Speed Internet (WiFi)\",\"Fitness Center with Gym \\/ Workout Room Pool\",\"Bar \\/ lounge\",\"Casino and Gambling\",\"Game room\",\"Children Activities (Kid \\/ Family Friendly)\",\"Air conditioning\",\"Desk\",\"Dining area\",\"Refrigerator\"]', 'Las Vegas', 'https://www.tripadvisor.com/Hotel_Review-g45963-d91673-Reviews-Rio_Hotel_Casino-Las_Vegas_Nevada.html', '2025-06-29 15:44:02', '2025-06-29 15:44:02'),
(23, 'Hotel Riu Touareg', 'Hotel Riu Touareg', 'Urbanizacao Lacacao Lote 13 Praia Lacacao, Santa Monica, Boa Vista Cape Verde', 'Urbanizacao Lacacao Lote 13 Praia Lacacao, Santa Monica, Boa Vista Cape Verde', 4.0, 123.00, 210.00, '5', 'Modern , Family', '[\"Pool\",\"Free breakfast\",\"Beach\"]', 'Santa Monica', 'https://www.tripadvisor.com/Hotel_Review-g3579463-d2135953-Reviews-Hotel_Riu_Touareg-Santa_Monica_Boa_Vista.html', '2025-06-29 15:48:27', '2025-06-29 15:48:27'),
(24, 'Hilton Niagara Falls/Fallsview Hotel & Suites', 'Hilton Niagara Falls/Fallsview Hotel & Suites', '6361 Fallsview Boulevard, Niagara Falls, Ontario L2G 3V9 Canada', '6361 Fallsview Boulevard, Niagara Falls, Ontario L2G 3V9 Canada', 3.8, 115.00, 113.00, '4', 'Luxury , Classic', '[\"Pool\",\"Bar \\/ lounge\"]', 'Niagara Falls', 'https://www.tripadvisor.com/Hotel_Review-g154998-d186907-Reviews-Hilton_Niagara_Falls_Fallsview_Hotel_Suites-Niagara_Falls_Ontario.html', '2025-06-29 15:51:35', '2025-06-29 15:51:35'),
(25, 'Loews Miami Beach Hotel', 'Loews Miami Beach Hotel', '1601 Collins Ave, Miami Beach, FL 33139-3112', '1601 Collins Ave, Miami Beach, FL 33139-3112', 4.2, 414.00, 518.00, '4.5', 'City, View Family', '[\"Wifi\",\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Air conditioning\",\"Bar \\/ lounge\",\"Beach\"]', 'Miami Beach', 'https://www.tripadvisor.com/Hotel_Review-g34439-d256986-Reviews-Loews_Miami_Beach_Hotel-Miami_Beach_Florida.html', '2025-06-29 15:55:33', '2025-06-29 15:55:33'),
(26, 'Hotel Riu Cancun', 'Hotel Riu Cancun', 'Blvd. Kukulcan Mz 50 Lt 5-Km. 9, Cancun 77500 Mexico', 'Blvd. Kukulcan Mz 50 Lt 5-Km. 9, Cancun 77500 Mexico', 4.2, 324.00, 539.00, '4.5', 'Trendy , Modern', '[\"Pool\",\"Bar \\/ lounge\",\"Beach\"]', 'Cancun', 'https://www.tripadvisor.com/Hotel_Review-g150807-d286104-Reviews-Hotel_Riu_Cancun-Cancun_Yucatan_Peninsula.html', '2025-06-29 16:05:53', '2025-06-29 16:05:53'),
(27, 'Savoy Sharm El Sheikh', 'Savoy Sharm El Sheikh', 'Soho Square, Sharm El Sheikh 8765302 Egypt', 'Soho Square, Sharm El Sheikh 8765302 Egypt', 4.7, 152.00, 177.00, '4', 'Family , Centrally Located', '[\"Pool\",\"Free breakfast\",\"Beach\",\"Air conditioning\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297555-d464191-Reviews-Savoy_Sharm_El_Sheikh-Sharm_El_Sheikh_South_Sinai_Red_Sea_and_Sinai.html', '2025-06-29 16:09:54', '2025-06-29 16:09:54'),
(28, 'La Maison Arabe', 'La Maison Arabe', '1 Derb Assehbe Bab Doukkala, Marrakech 40000 Morocco', '1 Derb Assehbe Bab Doukkala, Marrakech 40000 Morocco', 4.9, 347.00, 388.00, '5', 'Value, Historic Hotel', '[\"Air conditioning\",\"Free breakfast\"]', 'Marrakech', 'https://www.tripadvisor.com/Hotel_Review-g293734-d303075-Reviews-La_Maison_Arabe-Marrakech_Marrakech_Safi.html', '2025-06-29 16:12:10', '2025-06-29 16:12:10'),
(29, 'Constance Ephelia', 'Constance Ephelia', 'Port Launay Rd, Mahe Island 2100 Seychelles', 'Port Launay Rd, Mahe Island 2100 Seychelles', 4.6, 484.00, 497.00, '4', 'Quiet , Modern', '[\"Free High Speed Internet (WiFi)\",\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Free breakfast\",\"Beach\",\"Air conditioning\"]', 'Mahe Island', 'https://www.tripadvisor.com/Hotel_Review-g297798-d1675671-Reviews-Constance_Ephelia-Mahe_Island.html', '2025-06-29 16:14:47', '2025-06-29 16:14:47'),
(30, 'Titanic Resort & Aqua Park', 'Titanic Resort & Aqua Park', 'El Geesh - Hurghada Rd, Hurghada 84513 Egypt', 'El Geesh - Hurghada Rd, Hurghada 84513 Egypt', 4.7, 193.00, 200.00, '4', 'Quiet Family', '[\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Free breakfast\",\"Air conditioning\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297549-d1221606-Reviews-Titanic_Resort_Aqua_Park-Hurghada_Red_Sea_and_Sinai.html', '2025-06-29 16:18:03', '2025-06-29 16:18:03'),
(31, 'Le Passage Cairo Hotel & Casino', 'Le Passage Cairo Hotel & Casino', 'Cairo International Airport Road El Horreya-Heliopolis, Cairo 11511 Egypt', 'Cairo International Airport Road El Horreya-Heliopolis, Cairo 11511 Egypt', 4.4, 78.00, 107.00, '5', 'Park View', '[\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Bar \\/ lounge\",\"Air conditioning\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g294201-d301746-Reviews-Le_Passage_Cairo_Hotel_Casino-Cairo_Cairo_Governorate.html', '2025-06-29 16:20:20', '2025-06-29 16:20:20'),
(32, 'SUNRISE Alex Avenue Hotel', 'SUNRISE Alex Avenue Hotel', 'Elkornesh Road Roushdy, Alexandria 99998 Egypt', 'Elkornesh Road Roushdy, Alexandria 99998 Egypt', 4.8, 164.00, 180.00, '5', 'Ocean View', '[\"Pool\",\"Free breakfast\",\"Beach\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g295398-d1200860-Reviews-SUNRISE_Alex_Avenue_Hotel-Alexandria_Alexandria_Governorate.html', '2025-06-29 16:22:27', '2025-06-29 16:22:27'),
(33, 'Meraki Resort Sharm El Sheikh', 'Meraki Resort Sharm El Sheikh', '96A Ras Nasrani, Sharm El Sheikh Egypt', '96A Ras Nasrani, Sharm El Sheikh Egypt', 4.8, 316.00, 350.00, '5', 'Luxury , Romantic', '[\"Fitness\",\"Center with Gym \\/ Workout Room\",\"Pool\",\"Free breakfast\",\"Beach\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297555-d24084498-Reviews-Meraki_Resort_Sharm_El_Sheikh-Sharm_El_Sheikh_South_Sinai_Red_Sea_and_Sinai.html', '2025-06-29 16:25:56', '2025-06-29 16:25:56'),
(34, 'Pickalbatros Jungle Aqua Park Neverland', 'Pickalbatros Jungle Aqua Park Neverland', 'Safaga Road Al Ismaileya, Hurghada 1961510 Egypt', 'Safaga Road Al Ismaileya, Hurghada 1961510 Egypt', 4.6, 230.00, 250.00, '4', 'Quaint, Park View', '[\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Free breakfast\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297549-d1535318-Reviews-Pickalbatros_Jungle_Aqua_Park_Neverland-Hurghada_Red_Sea_and_Sinai.html', '2025-06-29 16:29:13', '2025-06-29 16:29:13'),
(35, 'Savoy Sharm El Sheikh', 'Savoy Sharm El Sheikh', 'Soho Square, Sharm El Sheikh 8765302 Egypt', 'Soho Square, Sharm El Sheikh 8765302 Egypt', 4.7, 115.00, 130.00, '4', 'Family', '[\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Free breakfast\",\"Beach\",\"Air conditioning\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297555-d464191-Reviews-Savoy_Sharm_El_Sheikh-Sharm_El_Sheikh_South_Sinai_Red_Sea_and_Sinai.html', '2025-06-29 16:32:31', '2025-06-29 16:32:31'),
(36, 'Sierra Sharm El Sheikh', 'Sierra Sharm El Sheikh', 'El-Shaikh Zayed St Soho Square, Sharm El Sheikh 8765012 Egypt', 'El-Shaikh Zayed St Soho Square, Sharm El Sheikh 8765012 Egypt', 4.6, 120.00, 140.00, '4', 'Family', '[\"Fitness Center with Gym \\/ Workout Room\",\"Pool\",\"Free breakfast\"]', 'Egypt', 'https://www.tripadvisor.com/Hotel_Review-g297555-d582611-Reviews-Sierra_Sharm_El_Sheikh-Sharm_El_Sheikh_South_Sinai_Red_Sea_and_Sinai.html', '2025-06-29 16:34:43', '2025-06-29 16:34:43');

-- --------------------------------------------------------

--
-- بنية الجدول `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(255) NOT NULL,
  `imageable_type` varchar(255) NOT NULL,
  `imageable_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `images`
--

INSERT INTO `images` (`id`, `url`, `imageable_type`, `imageable_id`, `created_at`, `updated_at`) VALUES
(1, 'https://via.placeholder.com/640x480.png/00ee11?text=reprehenderit', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(2, 'https://via.placeholder.com/640x480.png/0099aa?text=soluta', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(3, 'https://via.placeholder.com/640x480.png/00bb55?text=consequatur', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(4, 'https://via.placeholder.com/640x480.png/00ee99?text=ut', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(5, 'https://via.placeholder.com/640x480.png/00ff33?text=numquam', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(6, 'https://via.placeholder.com/640x480.png/009944?text=quo', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(7, 'https://via.placeholder.com/640x480.png/007711?text=nisi', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(8, 'https://via.placeholder.com/640x480.png/00ddbb?text=sed', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(9, 'https://via.placeholder.com/640x480.png/009944?text=quaerat', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(10, 'https://via.placeholder.com/640x480.png/001177?text=reiciendis', 'App\\Models\\Hotel', 1, '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(11, '/storage/trips/7fVFfphujqRET6r7DDKD4iIpig2koyoe5awd7uGq.jpg', 'App\\Models\\Trip', 6, '2025-06-26 00:33:31', '2025-06-26 00:33:31'),
(12, '/storage/trips/H9zXQi5nTlHkRYdtTPAeHKKx1E2GLsLJJZbVGsht.png', 'App\\Models\\Trip', 7, '2025-06-26 00:54:27', '2025-06-26 00:54:27'),
(13, '/storage/trips/NL37rgq90MWQZKGSqEpZ1xwsULFjf9yLAAPqU31H.png', 'App\\Models\\Trip', 6, '2025-06-26 01:00:27', '2025-06-26 01:00:27'),
(14, '/storage/cars/sygI8x8a3LfaIWLyNW4EkRkSxuPtz88noVUDwdvZ.png', 'App\\Models\\Car', 1, '2025-06-26 06:36:54', '2025-06-26 06:36:54'),
(15, '/storage/cruises/Ntkai6SCrSdfx15HwnDreWYr0UOKPu7uVBLi8VKN.png', 'App\\Models\\Cruise', 13, '2025-06-26 07:42:29', '2025-06-26 07:42:29'),
(16, '/storage/cruises/kFsnJqOIw4OnBSR3txU03C75yPFY9TtZ1nQ8ZPBa.png', 'App\\Models\\Cruise', 14, '2025-06-26 07:44:30', '2025-06-26 07:44:30'),
(17, '/storage/cruises/RE7yCh3mP3txMxBj6sCVFdrdzbe9mFVtbrnVIqFt.png', 'App\\Models\\Cruise', 15, '2025-06-26 07:47:15', '2025-06-26 07:47:15'),
(18, 'https://images.app.goo.gl/cqnJxjH4r9EbXt7s9', 'App\\Models\\Trip', 8, '2025-06-27 00:49:14', '2025-06-27 00:49:14'),
(19, 'https://images.app.goo.gl/cqnJxjH4r9EbXt7s9', 'App\\Models\\Hotel', 17, '2025-06-27 01:12:07', '2025-06-27 01:12:07'),
(20, 'https://images.app.goo.gl/cqnJxjH4r9EbXt7s9', 'App\\Models\\Hotel', 17, '2025-06-27 01:29:37', '2025-06-27 01:29:37'),
(21, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Hotel', 17, '2025-06-27 01:30:14', '2025-06-27 01:30:14'),
(22, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Restaurant', 22, '2025-06-27 01:43:28', '2025-06-27 01:43:28'),
(23, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Restaurant', 19, '2025-06-27 01:44:08', '2025-06-27 01:44:08'),
(24, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Activity', 19, '2025-06-27 03:03:56', '2025-06-27 03:03:56'),
(25, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Car', 6, '2025-06-27 03:23:07', '2025-06-27 03:23:07'),
(26, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Cruise', 10, '2025-06-27 03:30:35', '2025-06-27 03:30:35'),
(27, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Cruise', 15, '2025-06-27 03:32:32', '2025-06-27 03:32:32'),
(28, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Cruise', 15, '2025-06-27 03:32:32', '2025-06-27 03:32:32'),
(29, 'https://media.cdn-jaguarlandrover.com/api/v2/images/56844/w/680.jpg', 'App\\Models\\Cruise', 14, '2025-06-27 03:34:06', '2025-06-27 03:34:06'),
(55, 'http://localhost:8000/storage/avatars/CGpbWxdHStBlfoo5P8roa7o8Flhxnh7yL18YXr9j.png', 'App\\Models\\User', 38, '2025-06-27 05:45:22', '2025-06-27 05:45:22'),
(56, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748985394711/morocco-2349647_inspirationSmall_1748985422457.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(57, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748985711283/Atlas-Mountains-view-(1)_inspirationSmall_1748985811366.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(58, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748986153929/shutterstock-261426134_inspirationSmall_1748986174570.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(59, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748986724118/f783cd0dc03d54d1dfe23eaf8c40549d-jardin-majorelle-(1)_inspirationSmall_1748986737333.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(60, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748985127782/WhatsApp-Image-2024-06-07-at-20.49.26_inspirationSmall_1748985142476.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(61, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748984764963/Morocco--60_inspirationSmall_1748984780619.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(62, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748983072352/shutterstock-520638649_inspirationSmall_1748983094156.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(63, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748983428283/shutterstock-401157610_inspirationSmall_1748983445109.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(64, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748984102444/shutterstock-730630069-_inspirationSmall_1748984123383.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(65, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1748984317892/img-1405_inspirationSmall_1748984336052.jpeg', 'App\\Models\\Trip', 9, '2025-06-29 09:46:37', '2025-06-29 09:46:37'),
(66, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749544327013/raimond-klavins-OqVDmmUt8oc-unsplash_inspirationSmall_1749544342501.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(67, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749543588861/Farmland-Nepal_inspirationSmall_1749543650305.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(68, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749543338312/Pokhara-flight_inspirationSmall_1749543370687.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(69, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1711695351408/Patan-durbar_inspirationSmall_1715280555585.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(70, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1711092981525/124341-651f9f9a39b11_inspirationSmall_1715281190441.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(71, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749544251780/sharad-acharya-ZVfclRaj7Y4-unsplash_inspirationSmall_1749544274237.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(72, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1711614036698/parsanational-park_inspirationSmall_1715281227183.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(73, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749546186904/hongbin-H9C496Nfd7Q-unsplash_inspirationSmall_1749546213226.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(74, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749545711586/Canoe_inspirationSmall_1749545730445.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(75, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749545940244/Screenshot-2025-06-10-at-10.58.52_inspirationSmall_1749545952335.jpeg', 'App\\Models\\Trip', 10, '2025-06-29 09:51:00', '2025-06-29 09:51:00'),
(76, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749036802309/greece-2865368-1920_inspirationSmall_1749036838759.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(77, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749038200076/nature-3279419-1920_inspirationSmall_1749038229122.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(78, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749039008739/monastery-7058779-1920_inspirationSmall_1749039034004.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(79, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749041562212/meteora-2818331-1920_inspirationSmall_1749041592341.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(80, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749040262189/walk-322561-1920_inspirationSmall_1749040286338.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(81, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749040637183/beautiful-landscape-1825878-1920_inspirationSmall_1749040675548.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(82, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1749035743208/coast-6861281_inspirationSmall_1749035777214.jpeg', 'App\\Models\\Trip', 11, '2025-06-29 09:57:02', '2025-06-29 09:57:02'),
(83, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747301280492/58-Forest-of-Resonating-Lamps-One-Stroke-Metropolis-1024x682_inspirationSmall_1747730664065.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(84, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747303064523/Hamarikyu-Garden_inspirationSmall_1747730392826.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(85, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747301417102/Tsukiji_inspirationSmall_1747730819323.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(86, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747301573351/meiji-jingu-shrine-2_inspirationSmall_1747730523209.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(87, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747301672863/main_inspirationSmall_1747730595362.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(88, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747301772128/sensoji-temple-iStock-1083328636-1024x684_inspirationSmall_1747730285763.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(89, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1745399713801/4403090971-9e3f044084-b_inspirationSmall_1747730996879.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(90, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747302060052/c3e996efeef17abb3ca30a14676bae80-900x600_inspirationSmall_1747731131453.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(91, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747302332197/hakone-ropeway-ride-nov_inspirationSmall_1747731081769.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(92, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1747643339563/Owakudani-black-egg-1100x733_inspirationSmall_1747731186790.jpeg', 'App\\Models\\Trip', 12, '2025-06-29 10:00:33', '2025-06-29 10:00:33'),
(93, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732114537608/IMG-20190408-WA0182_inspirationSmall_1732909139036.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(94, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732967792568/kom-ombo-_inspirationSmall_1732967894598.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(95, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732968554305/kom-ombo01_inspirationSmall_1732968660152.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(96, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732968755083/Edfu-(800)-2_inspirationSmall_1732968811626.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(97, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732968993624/faluca-1280_inspirationSmall_1732969018934.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(98, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732117752738/IMG-20190523-WA0039_inspirationSmall_1732909464843.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(99, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732118257222/Collection-Egypt-banner_inspirationSmall_1732811929372.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(100, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731937114980/Airport-Transfer--(18)_inspirationSmall_1732910537485.jpeg', 'App\\Models\\Trip', 13, '2025-06-29 10:04:17', '2025-06-29 10:04:17'),
(101, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731946443313/luxor-temple-(1)_inspirationSmall_1732910142701.jpeg', 'App\\Models\\Trip', 14, '2025-06-29 10:18:14', '2025-06-29 10:18:14'),
(102, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732114537608/IMG-20190408-WA0182_inspirationSmall_1732909139036.jpeg', 'App\\Models\\Trip', 14, '2025-06-29 10:18:14', '2025-06-29 10:18:14'),
(103, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732116846476/IMG-20190408-WA0181_inspirationSmall_1732909542637.jpeg', 'App\\Models\\Trip', 14, '2025-06-29 10:18:14', '2025-06-29 10:18:14'),
(104, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732031213996/luxor-temple-(4)_inspirationSmall_1732910664552.jpeg', 'App\\Models\\Trip', 14, '2025-06-29 10:18:14', '2025-06-29 10:18:14'),
(105, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732984372668/(320)_inspirationSmall_1732984406366.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(106, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732983968877/WhatsApp-Image-2023-12-18-at-12.48.36-PM_inspirationSmall_1732984016092.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(107, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732984182391/shutterstock-378011434.v1-copy_inspirationSmall_1732984238747.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(108, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732984586462/c-fakepath-aswan-_inspirationSmall_1732984748707.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(109, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734215310379/Egypt-2019-579-new_inspirationSmall_1734215360153.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(110, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731945639391/k1om-ombo1-_inspirationSmall_1732909928737.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(111, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732985022292/Karnak-Temple_inspirationSmall_1732985110923.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(112, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732985274371/Valley-of-the-Queens-Nefertari-Egypt-Tours-Portal_inspirationSmall_1732985310166.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(113, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732985565177/b49f8741fb0bf1d10c1d3c190d381d64_inspirationSmall_1732985665208.jpeg', 'App\\Models\\Trip', 15, '2025-06-29 10:21:10', '2025-06-29 10:21:10'),
(114, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732979212878/siwa-(20)_inspirationSmall_1732979248200.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(115, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732979090983/siwa-(23)_inspirationSmall_1732979115988.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(116, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732979506968/12_inspirationSmall_1732979580491.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(117, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732920553465/siwa-800-(15)_inspirationSmall_1732920605876.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(118, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732919305352/Hurghada-Bedouin-Desert-Safari-by-Jeep-copy_inspirationSmall_1732919446334.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(119, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732980263593/WhatsApp-Image-2023-12-27-at-3.07.51-PM_inspirationSmall_1732980377717.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(120, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732980263593/WhatsApp-Image-2023-12-27-at-3.07.51-PM_inspirationSmall_1732980377717.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(121, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732985274371/Valley-of-the-Queens-Nefertari-Egypt-Tours-Portal_inspirationSmall_1732985310166.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(122, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732985565177/b49f8741fb0bf1d10c1d3c190d381d64_inspirationSmall_1732985665208.jpeg', 'App\\Models\\Trip', 16, '2025-06-29 10:23:25', '2025-06-29 10:23:25'),
(123, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732108777259/WhatsApp-Image-2023-11-15-at-3.28.32-PM-(2)_inspirationSmall_1732908833428.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(124, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732102087547/Abu-Simble-(800)-2_inspirationSmall_1732912579285.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(125, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731945131229/Phiale-(800)-1_inspirationSmall_1732810526222.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(126, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732103670704/WhatsApp-Image-2024-01-09-at-18.41.00-d45729a9_inspirationSmall_1732810979455.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(127, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732095534783/IMG-20190519-WA0041_inspirationSmall_1732912584704.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(128, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732109656818/WhatsApp-Image-2023-11-15-at-3.28.32-PM-(4)_inspirationSmall_1732910552237.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(129, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732112097566/WhatsApp-Image-2023-11-15-at-3.28.22-PM_inspirationSmall_1732912425775.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(130, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732112795527/WhatsApp-Image-2023-11-15-at-3.28.32-PM_inspirationSmall_1732908996833.jpeg', 'App\\Models\\Trip', 17, '2025-06-29 10:32:16', '2025-06-29 10:32:16'),
(131, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731927355002/Sakkara-1280%C3%97800-(5)_inspirationSmall_1732811408361.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(132, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734215310379/Egypt-2019-579-new_inspirationSmall_1734215360153.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(133, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731945131229/Phiale-(800)-1_inspirationSmall_1732199015634.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(134, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732117970249/IMG-20190408-WA0189_inspirationSmall_1732909269010.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(135, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732116846476/IMG-20190408-WA0181_inspirationSmall_1732909542637.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(136, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732109656818/WhatsApp-Image-2023-11-15-at-3.28.32-PM-(4)_inspirationSmall_1732910552237.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(137, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732916499188/Diving-(800)-2_inspirationSmall_1732916527355.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:24', '2025-06-29 10:34:24'),
(138, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732117752738/IMG-20190523-WA0039_inspirationSmall_1732909464843.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:25', '2025-06-29 10:34:25'),
(139, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734214309927/a64de262-d417-41d7-9523-f8a4c9c1c551_inspirationSmall_1734214334893.jpeg', 'App\\Models\\Trip', 18, '2025-06-29 10:34:25', '2025-06-29 10:34:25'),
(140, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731927355002/Sakkara-1280%C3%97800-(5)_inspirationSmall_1732811408361.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(141, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734215310379/Egypt-2019-579-new_inspirationSmall_1734215360153.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(142, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1731945131229/Phiale-(800)-1_inspirationSmall_1732199015634.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(143, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732117970249/IMG-20190408-WA0189_inspirationSmall_1732909269010.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(144, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732116846476/IMG-20190408-WA0181_inspirationSmall_1732909542637.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(145, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732109656818/WhatsApp-Image-2023-11-15-at-3.28.32-PM-(4)_inspirationSmall_1732910552237.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(146, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732916499188/Diving-(800)-2_inspirationSmall_1732916527355.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(147, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732117752738/IMG-20190523-WA0039_inspirationSmall_1732909464843.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(148, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734214309927/a64de262-d417-41d7-9523-f8a4c9c1c551_inspirationSmall_1734214334893.jpeg', 'App\\Models\\Trip', 19, '2025-06-29 10:36:04', '2025-06-29 10:36:04'),
(149, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732978028915/dandara-(9)_inspirationSmall_1732978099140.jpeg', 'App\\Models\\Trip', 20, '2025-06-29 10:37:44', '2025-06-29 10:37:44'),
(150, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657569179856/cairo-1980350_inspirationSmall_1657569211092.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(151, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657824642278/sphinx-349550_inspirationSmall_1657824660784.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(152, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657824920502/hatshepsut-4804574-1920_inspirationSmall_1657824938944.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(153, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657825172698/egypt-3316848_inspirationSmall_1657825202282.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(154, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657825369701/egypt-1344318_inspirationSmall_1657825389308.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(155, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657825685836/ramses-ii-4283321_inspirationSmall_1657825707992.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(156, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657570741425/mosque-5321231_inspirationSmall_1657570777596.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(157, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657571177235/plane-3037652_inspirationSmall_1657571209523.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(158, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734214309927/a64de262-d417-41d7-9523-f8a4c9c1c551_inspirationSmall_1734214334893.jpeg', 'App\\Models\\Trip', 21, '2025-06-29 10:39:40', '2025-06-29 10:39:40'),
(159, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657657492980/mosque-3627765_inspirationSmall_1657657513492.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(160, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1659541909414/karnak-temple-egypt-shutterstock-441338173_inspirationSmall_1659541924096.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(161, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657658170572/egypt-4763312-1920_inspirationSmall_1657658191352.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(162, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657658519680/egypt-3306582_inspirationSmall_1657658539138.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(163, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659001643/abu-simbel-temple-2703666_inspirationSmall_1657659025570.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(164, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659412373/philae-4278028_inspirationSmall_1657659452826.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(165, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659579268/egypt-3321124_inspirationSmall_1657659600336.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(166, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657660150281/egypt-1002728-1920_inspirationSmall_1657660165806.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(167, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657660299690/egypt-1002703_inspirationSmall_1657660321769.jpeg', 'App\\Models\\Trip', 22, '2025-06-29 10:41:40', '2025-06-29 10:41:40'),
(168, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657570942410/boats-7259940_inspirationSmall_1657570972010.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:26', '2025-06-29 10:43:26'),
(169, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657826922495/torino-2914056_inspirationSmall_1657826943661.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:26', '2025-06-29 10:43:26'),
(170, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1659541909414/karnak-temple-egypt-shutterstock-441338173_inspirationSmall_1659541924096.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(171, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657823310405/temple-5006316_inspirationSmall_1657823358678.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(172, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659412373/philae-4278028_inspirationSmall_1657659452826.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(173, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657823310405/temple-5006316_inspirationSmall_1657823358678.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(174, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659579268/egypt-3321124_inspirationSmall_1657659600336.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(175, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657660150281/egypt-1002728-1920_inspirationSmall_1657660165806.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(176, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657660299690/egypt-1002703_inspirationSmall_1657660321769.jpeg', 'App\\Models\\Trip', 23, '2025-06-29 10:43:27', '2025-06-29 10:43:27'),
(177, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657826922495/torino-2914056_inspirationSmall_1657826943661.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(178, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657826922495/torino-2914056_inspirationSmall_1657826943661.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(179, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1659541909414/karnak-temple-egypt-shutterstock-441338173_inspirationSmall_1659541924096.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(180, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657823310405/temple-5006316_inspirationSmall_1657823358678.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(181, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659412373/philae-4278028_inspirationSmall_1657659452826.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(182, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657823310405/temple-5006316_inspirationSmall_1657823358678.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(183, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657659579268/egypt-3321124_inspirationSmall_1657659600336.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(184, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657660150281/egypt-1002728-1920_inspirationSmall_1657660165806.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(185, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1657660299690/egypt-1002703_inspirationSmall_1657660321769.jpeg', 'App\\Models\\Trip', 24, '2025-06-29 10:44:50', '2025-06-29 10:44:50'),
(186, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671434377209/gran-via-madrid-shutterstock-629809331_inspirationSmall_1671434393960.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(187, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671434486350/toledo-spain-shutterstock-259923593_inspirationSmall_1671434504416.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(188, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728568066693/Granada,-Spain.-HDR-Panorama_inspirationSmall_1728568115341.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(189, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671436252707/victoriano-izquierdo-HoevDVvxInw-unsplash_inspirationSmall_1671436274377.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(190, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671434048592/seville-plaza-de-espana-shutterstock-546660205_inspirationSmall_1671434066628.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(191, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671435294887/v2f-00H0QIi9j2U-unsplash_inspirationSmall_1671435320712.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(192, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671435675468/mosque-mezquita-cordoba-spain-shutterstock-594222746_inspirationSmall_1671435709957.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(193, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671434176827/cordoba-165370-1920_inspirationSmall_1671434196203.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(194, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1738599064122/1_inspirationSmall_1738599087316.jpeg', 'App\\Models\\Trip', 25, '2025-06-29 10:50:56', '2025-06-29 10:50:56'),
(195, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735278961158/%E9%A9%AC%E5%BE%B7%E9%87%8C_inspirationSmall_1735278997271.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(196, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735279168208/%E5%B7%B4%E5%A1%9E%E7%BD%97%E9%82%A3_inspirationSmall_1735279200361.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(197, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735279362367/%E5%B7%B4%E4%BC%A6%E8%A5%BF%E4%BA%9A_inspirationSmall_1735279395012.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(198, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735279511595/%E6%A0%BC%E6%8B%89%E7%BA%B3%E8%BE%BE_inspirationSmall_1735279545973.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(199, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671434048592/seville-plaza-de-espana-shutterstock-546660205_inspirationSmall_1671434066628.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(200, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735279703794/%E5%A1%9E%E7%BB%B4%E5%88%A9%E4%BA%9A_inspirationSmall_1735279737816.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(201, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735279874750/%E9%87%8C%E6%96%AF%E6%9C%AC%E5%A4%A7%E7%9F%B3%E8%A7%92_inspirationSmall_1735279904988.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(202, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735280134082/%E9%87%8C%E6%96%AF%E6%9C%AC%E8%88%AA%E6%B5%B7%E5%AE%B6%E7%BA%AA%E5%BF%B5%E7%A2%91_inspirationSmall_1735280158593.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(203, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1738599064122/1_inspirationSmall_1738599087316.jpeg', 'App\\Models\\Trip', 26, '2025-06-29 10:54:39', '2025-06-29 10:54:39'),
(204, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728568066693/Granada,-Spain.-HDR-Panorama_inspirationSmall_1728568115341.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(205, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728646675012/convent-granada_inspirationSmall_1728646699804.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(206, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671436252707/victoriano-izquierdo-HoevDVvxInw-unsplash_inspirationSmall_1671436274377.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(207, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735279511595/%E6%A0%BC%E6%8B%89%E7%BA%B3%E8%BE%BE_inspirationSmall_1735279545973.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(208, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728569208909/paisaje_inspirationSmall_1728569600529.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(209, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728642249173/1_inspirationSmall_1728642278927.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(210, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728642812120/1_inspirationSmall_1728642827543.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(211, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1735280134082/%E9%87%8C%E6%96%AF%E6%9C%AC%E8%88%AA%E6%B5%B7%E5%AE%B6%E7%BA%AA%E5%BF%B5%E7%A2%91_inspirationSmall_1735280158593.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(212, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728641889340/1_inspirationSmall_1728641919072.jpeg', 'App\\Models\\Trip', 27, '2025-06-29 10:56:20', '2025-06-29 10:56:20'),
(213, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671433355579/la-rambla-barcelona-spain-shutterstock-735524701_inspirationSmall_1671433378174.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(214, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671433824171/park-guell-barcelona-spain-shutterstock-143770792_inspirationSmall_1671433841774.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(215, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1729596825352/1_inspirationSmall_1729596851050.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(216, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671442336062/barcelona-cable-car-shutterstock-406206403-4_inspirationSmall_1671442365228.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(217, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1729089830487/1_inspirationSmall_1729089869668.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(218, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671442145679/la-rioja-spain-vineyard-shutterstock-402732421_inspirationSmall_1671442189900.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(219, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1729610738820/Cathedral-of-Buen-Pastor-San-Sebastia%CC%81n-(5)_inspirationSmall_1729610772820.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(220, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1671441303116/shutterstock-1067487362-zubizuri-bridge-leads-to-n-bilbao_inspirationSmall_1671441344916.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(221, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728641889340/1_inspirationSmall_1728641919072.jpeg', 'App\\Models\\Trip', 28, '2025-06-29 10:59:00', '2025-06-29 10:59:00'),
(222, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481104087378/shutterstock-224410915_inspirationSmall_1481104104101.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(223, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481033362553/-MG-3698_inspirationSmall_1481033383762.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(224, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481034019675/shutterstock-512711722_inspirationSmall_1481034037764.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(225, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481035107203/shutterstock-362642813_inspirationSmall_1481035135719.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(226, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481038725111/shutterstock-102297748_inspirationSmall_1481038748764.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(227, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481037510055/shutterstock-343940513_inspirationSmall_1481037530204.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(228, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481107230270/Ca%C3%B1%C3%B3n-de-las-Buitreras-02_inspirationSmall_1481107252342.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(229, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1485866433103/shutterstock-245540755_inspirationSmall_1485866455518.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(230, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1728641889340/1_inspirationSmall_1728641919072.jpeg', 'App\\Models\\Trip', 29, '2025-06-29 11:01:16', '2025-06-29 11:01:16'),
(231, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481124327545/shutterstock-166198769_inspirationSmall_1481124342376.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(232, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481121959310/shutterstock-491574703_inspirationSmall_1481121977249.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(233, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481192559545/shutterstock-289075256_inspirationSmall_1481192574334.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(234, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481035107203/shutterstock-362642813_inspirationSmall_1481035135719.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(235, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481123066091/shutterstock-287698379_inspirationSmall_1481123088211.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(236, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481120245392/shutterstock-122683879_inspirationSmall_1481120260639.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(237, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481125664195/shutterstock-369575537_inspirationSmall_1481125684911.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(238, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1485866433103/shutterstock-245540755_inspirationSmall_1485866455518.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(239, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481191969487/shutterstock-519739924_inspirationSmall_1481191987132.jpeg', 'App\\Models\\Trip', 30, '2025-06-29 11:03:07', '2025-06-29 11:03:07'),
(240, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470046481146/shutterstock-101450806_inspirationSmall_1470046511090.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(241, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470045996307/shutterstock-193681757_inspirationSmall_1470046021602.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(242, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481192559545/shutterstock-289075256_inspirationSmall_1481192574334.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(243, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470049465896/-MG-3309_inspirationSmall_1470049501496.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(244, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470058011263/shutterstock-419980120_inspirationSmall_1470058042769.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(245, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470058873632/shutterstock-281599199_inspirationSmall_1470058909286.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(246, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481125664195/shutterstock-369575537_inspirationSmall_1481125684911.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(247, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1485866433103/shutterstock-245540755_inspirationSmall_1485866455518.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(248, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481191969487/shutterstock-519739924_inspirationSmall_1481191987132.jpeg', 'App\\Models\\Trip', 31, '2025-06-29 11:05:59', '2025-06-29 11:05:59'),
(249, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1595429803610/spain-square-573805-1920_inspirationSmall_1595429824286.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(250, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1595430702682/cheese-platter-1867456-1920_inspirationSmall_1595430728384.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(251, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1595435338864/architecture-3338554-1920_inspirationSmall_1595435361055.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(252, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470049465896/-MG-3309_inspirationSmall_1470049501496.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(253, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470058011263/shutterstock-419980120_inspirationSmall_1470058042769.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(254, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470058873632/shutterstock-281599199_inspirationSmall_1470058909286.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(255, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481125664195/shutterstock-369575537_inspirationSmall_1481125684911.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(256, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1485866433103/shutterstock-245540755_inspirationSmall_1485866455518.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(257, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481191969487/shutterstock-519739924_inspirationSmall_1481191987132.jpeg', 'App\\Models\\Trip', 32, '2025-06-29 11:09:26', '2025-06-29 11:09:26'),
(258, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498146723297/shutterstock-561322894_inspirationSmall_1498146753925.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(259, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498141931613/shutterstock-585619988_inspirationSmall_1498141965682.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(260, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498143270790/shutterstock-542425828_inspirationSmall_1498143302675.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(261, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498219453666/shutterstock-58034878_inspirationSmall_1498219487237.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(262, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498221365140/shutterstock-218465665_inspirationSmall_1498221399719.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(263, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470058873632/shutterstock-281599199_inspirationSmall_1470058909286.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(264, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498223410490/shutterstock-336723014_inspirationSmall_1498223437670.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(265, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1485866433103/shutterstock-245540755_inspirationSmall_1485866455518.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(266, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481191969487/shutterstock-519739924_inspirationSmall_1481191987132.jpeg', 'App\\Models\\Trip', 33, '2025-06-29 11:11:14', '2025-06-29 11:11:14'),
(267, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471866148163/shutterstock-125045405_inspirationSmall_1471866166529.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(268, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471863999513/shutterstock-342326009-(1)_inspirationSmall_1471864029971.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(269, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471866855554/shutterstock-18317896_inspirationSmall_1471866882826.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(270, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471871837470/shutterstock-15718084_inspirationSmall_1471871866570.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(271, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471875271724/shutterstock-429903103-(1)_inspirationSmall_1471875291453.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(272, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1470058873632/shutterstock-281599199_inspirationSmall_1470058909286.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(273, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498223410490/shutterstock-336723014_inspirationSmall_1498223437670.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(274, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1485866433103/shutterstock-245540755_inspirationSmall_1485866455518.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(275, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1481191969487/shutterstock-519739924_inspirationSmall_1481191987132.jpeg', 'App\\Models\\Trip', 34, '2025-06-29 11:13:22', '2025-06-29 11:13:22'),
(276, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717380720146/6.Guilin-3_inspirationSmall_1717380779024.jpeg', 'App\\Models\\Trip', 35, '2025-06-29 11:31:37', '2025-06-29 11:31:37'),
(277, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717380920100/7.Guilin---Li-River-(3)_inspirationSmall_1717380981482.jpeg', 'App\\Models\\Trip', 35, '2025-06-29 11:31:37', '2025-06-29 11:31:37'),
(278, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717137914688/5.Terracotta-Warriors_inspirationSmall_1717137969053.jpeg', 'App\\Models\\Trip', 35, '2025-06-29 11:31:37', '2025-06-29 11:31:37'),
(279, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396295434/7.Lijiang-Ancient-Town_inspirationSmall_1717396363413.jpeg', 'App\\Models\\Trip', 35, '2025-06-29 11:31:37', '2025-06-29 11:31:37'),
(280, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396710393/8.Jade-Dragon-Snow-Mountain_inspirationSmall_1717396756196.jpeg', 'App\\Models\\Trip', 35, '2025-06-29 11:31:37', '2025-06-29 11:31:37');
INSERT INTO `images` (`id`, `url`, `imageable_type`, `imageable_id`, `created_at`, `updated_at`) VALUES
(281, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1729738917202/6.tibet_inspirationSmall_1729738971273.jpeg', 'App\\Models\\Trip', 36, '2025-06-29 11:33:11', '2025-06-29 11:33:11'),
(282, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720768830988/5.Lasha-1_inspirationSmall_1720768934598.jpeg', 'App\\Models\\Trip', 36, '2025-06-29 11:33:11', '2025-06-29 11:33:11'),
(283, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720614671574/Day-12.Bhaktpur-Durbar-Square_inspirationSmall_1720614701545.jpeg', 'App\\Models\\Trip', 36, '2025-06-29 11:33:11', '2025-06-29 11:33:11'),
(284, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396295434/7.Lijiang-Ancient-Town_inspirationSmall_1717396363413.jpeg', 'App\\Models\\Trip', 36, '2025-06-29 11:33:11', '2025-06-29 11:33:11'),
(285, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396710393/8.Jade-Dragon-Snow-Mountain_inspirationSmall_1717396756196.jpeg', 'App\\Models\\Trip', 36, '2025-06-29 11:33:11', '2025-06-29 11:33:11'),
(286, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720662379152/8.Shanghai---the-Bund-(4)_inspirationSmall_1720662420416.jpeg', 'App\\Models\\Trip', 37, '2025-06-29 11:34:33', '2025-06-29 11:34:33'),
(287, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1721613439310/2.Jingshan-Park_inspirationSmall_1721613497518.jpeg', 'App\\Models\\Trip', 37, '2025-06-29 11:34:33', '2025-06-29 11:34:33'),
(288, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720667799608/9.suzhou_inspirationSmall_1720667823564.jpeg', 'App\\Models\\Trip', 37, '2025-06-29 11:34:33', '2025-06-29 11:34:33'),
(289, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396295434/7.Lijiang-Ancient-Town_inspirationSmall_1717396363413.jpeg', 'App\\Models\\Trip', 37, '2025-06-29 11:34:33', '2025-06-29 11:34:33'),
(290, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396710393/8.Jade-Dragon-Snow-Mountain_inspirationSmall_1717396756196.jpeg', 'App\\Models\\Trip', 37, '2025-06-29 11:34:33', '2025-06-29 11:34:33'),
(291, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720596978330/3.Temple-of-the-Heaven_inspirationSmall_1720597080750.jpeg', 'App\\Models\\Trip', 38, '2025-06-29 11:36:17', '2025-06-29 11:36:17'),
(292, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720597378176/4.the-great-wall-3_inspirationSmall_1720597439709.jpeg', 'App\\Models\\Trip', 38, '2025-06-29 11:36:17', '2025-06-29 11:36:17'),
(293, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720663102160/5.IMG-0513-1_inspirationSmall_1720663140400.jpeg', 'App\\Models\\Trip', 38, '2025-06-29 11:36:17', '2025-06-29 11:36:17'),
(294, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396295434/7.Lijiang-Ancient-Town_inspirationSmall_1717396363413.jpeg', 'App\\Models\\Trip', 38, '2025-06-29 11:36:17', '2025-06-29 11:36:17'),
(295, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396710393/8.Jade-Dragon-Snow-Mountain_inspirationSmall_1717396756196.jpeg', 'App\\Models\\Trip', 38, '2025-06-29 11:36:17', '2025-06-29 11:36:17'),
(296, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720747022193/6.chengdu_inspirationSmall_1720747139894.jpeg', 'App\\Models\\Trip', 39, '2025-06-29 11:47:07', '2025-06-29 11:47:07'),
(297, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720670361152/5.xi\'an-1_inspirationSmall_1720670419620.jpeg', 'App\\Models\\Trip', 39, '2025-06-29 11:47:08', '2025-06-29 11:47:08'),
(298, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1720663102160/5.IMG-0513-1_inspirationSmall_1720663140400.jpeg', 'App\\Models\\Trip', 39, '2025-06-29 11:47:08', '2025-06-29 11:47:08'),
(299, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396295434/7.Lijiang-Ancient-Town_inspirationSmall_1717396363413.jpeg', 'App\\Models\\Trip', 39, '2025-06-29 11:47:08', '2025-06-29 11:47:08'),
(300, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1717396710393/8.Jade-Dragon-Snow-Mountain_inspirationSmall_1717396756196.jpeg', 'App\\Models\\Trip', 39, '2025-06-29 11:47:08', '2025-06-29 11:47:08'),
(301, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732876882577/amsterdam3_inspirationSmall_1732876921976.jpeg', 'App\\Models\\Trip', 40, '2025-06-29 11:50:40', '2025-06-29 11:50:40'),
(302, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732875805371/paris2_inspirationSmall_1732875862156.jpeg', 'App\\Models\\Trip', 40, '2025-06-29 11:50:40', '2025-06-29 11:50:40'),
(303, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732875991956/moulin-rouge_inspirationSmall_1732876042420.jpeg', 'App\\Models\\Trip', 40, '2025-06-29 11:50:40', '2025-06-29 11:50:40'),
(304, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732877623544/reichstag_inspirationSmall_1732877671241.jpeg', 'App\\Models\\Trip', 40, '2025-06-29 11:50:40', '2025-06-29 11:50:40'),
(305, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1737126421644/dmitry-goykolov-X8Vo9rGVPS8-unsplash_inspirationSmall_1738161419820.jpeg', 'App\\Models\\Trip', 40, '2025-06-29 11:50:40', '2025-06-29 11:50:40'),
(306, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734598329684/%E7%B1%B3%E5%85%B0_inspirationSmall_1735106948936.jpeg', 'App\\Models\\Trip', 41, '2025-06-29 11:53:35', '2025-06-29 11:53:35'),
(307, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734598149713/%E5%8D%A2%E5%A1%9E%E6%81%A9_inspirationSmall_1735106877410.jpeg', 'App\\Models\\Trip', 41, '2025-06-29 11:53:35', '2025-06-29 11:53:35'),
(308, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734598565700/%E7%BD%97%E9%A9%AC%E6%96%97%E5%85%BD%E5%9C%BA_inspirationSmall_1735106819090.jpeg', 'App\\Models\\Trip', 41, '2025-06-29 11:53:35', '2025-06-29 11:53:35'),
(309, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1734599267500/%E6%AF%94%E8%90%A8_inspirationSmall_1735107189309.jpeg', 'App\\Models\\Trip', 41, '2025-06-29 11:53:35', '2025-06-29 11:53:35'),
(310, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1737126421644/dmitry-goykolov-X8Vo9rGVPS8-unsplash_inspirationSmall_1738161419820.jpeg', 'App\\Models\\Trip', 41, '2025-06-29 11:53:35', '2025-06-29 11:53:35'),
(311, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672390507377/lavender-provence-shutterstock-1040013451_inspirationSmall_1672390528865.jpeg', 'App\\Models\\Trip', 42, '2025-06-29 11:55:50', '2025-06-29 11:55:50'),
(312, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672390313152/roelf-bruinsma-Uj2Q0pV0V2w-unsplash_inspirationSmall_1672390331603.jpeg', 'App\\Models\\Trip', 42, '2025-06-29 11:55:50', '2025-06-29 11:55:50'),
(313, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672390418657/lottie-griffiths-vyNIEjn6lbQ-unsplash_inspirationSmall_1672390437996.jpeg', 'App\\Models\\Trip', 42, '2025-06-29 11:55:50', '2025-06-29 11:55:50'),
(314, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672390614882/pont-du-gard-nimes-france-shutterstock-384855916_inspirationSmall_1672390633816.jpeg', 'App\\Models\\Trip', 42, '2025-06-29 11:55:50', '2025-06-29 11:55:50'),
(315, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672390891785/laurence-fusco-a6dicj8uKPk-unsplash_inspirationSmall_1672390915477.jpeg', 'App\\Models\\Trip', 42, '2025-06-29 11:55:50', '2025-06-29 11:55:50'),
(316, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389164137/nice-france-shutterstock-265858196_inspirationSmall_1672389180972.jpeg', 'App\\Models\\Trip', 43, '2025-06-29 11:57:48', '2025-06-29 11:57:48'),
(317, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389339593/8-nice-152366802-e-2_inspirationSmall_1672389359046.jpeg', 'App\\Models\\Trip', 43, '2025-06-29 11:57:48', '2025-06-29 11:57:48'),
(318, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498741424076/shutterstock-370641806_inspirationSmall_1498741462061.jpeg', 'App\\Models\\Trip', 43, '2025-06-29 11:57:48', '2025-06-29 11:57:48'),
(319, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 43, '2025-06-29 11:57:48', '2025-06-29 11:57:48'),
(320, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 43, '2025-06-29 11:57:48', '2025-06-29 11:57:48'),
(321, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498814415093/shutterstock-430548442_inspirationSmall_1498814460224.jpeg', 'App\\Models\\Trip', 44, '2025-06-29 11:59:20', '2025-06-29 11:59:20'),
(322, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498814875261/shutterstock-483131500_inspirationSmall_1498814923743.jpeg', 'App\\Models\\Trip', 44, '2025-06-29 11:59:20', '2025-06-29 11:59:20'),
(323, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498815171758/shutterstock-138945551_inspirationSmall_1498815213637.jpeg', 'App\\Models\\Trip', 44, '2025-06-29 11:59:20', '2025-06-29 11:59:20'),
(324, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 44, '2025-06-29 11:59:20', '2025-06-29 11:59:20'),
(325, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 44, '2025-06-29 11:59:20', '2025-06-29 11:59:20'),
(326, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471614967149/shutterstock-47551900_inspirationSmall_1471614986958.jpeg', 'App\\Models\\Trip', 45, '2025-06-29 12:01:00', '2025-06-29 12:01:00'),
(327, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471851221733/shutterstock-2354836_inspirationSmall_1471851255398.jpeg', 'App\\Models\\Trip', 45, '2025-06-29 12:01:00', '2025-06-29 12:01:00'),
(328, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1471851594084/shutterstock-108524861-(1)_inspirationSmall_1471851625457.jpeg', 'App\\Models\\Trip', 45, '2025-06-29 12:01:00', '2025-06-29 12:01:00'),
(329, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 45, '2025-06-29 12:01:00', '2025-06-29 12:01:00'),
(330, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 45, '2025-06-29 12:01:00', '2025-06-29 12:01:00'),
(331, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586089004398/church-668391-1920_inspirationSmall_1590253142528.jpeg', 'App\\Models\\Trip', 46, '2025-06-29 12:03:00', '2025-06-29 12:03:00'),
(332, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586089964705/france-747193-1920_inspirationSmall_1590253376131.jpeg', 'App\\Models\\Trip', 46, '2025-06-29 12:03:00', '2025-06-29 12:03:00'),
(333, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586091029010/pegasus-bridge-1290512-1920_inspirationSmall_1590253597244.jpeg', 'App\\Models\\Trip', 46, '2025-06-29 12:03:00', '2025-06-29 12:03:00'),
(334, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 46, '2025-06-29 12:03:00', '2025-06-29 12:03:00'),
(335, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 46, '2025-06-29 12:03:00', '2025-06-29 12:03:00'),
(336, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1732875805371/paris2_inspirationSmall_1732875862156.jpeg', 'App\\Models\\Trip', 47, '2025-06-29 14:34:42', '2025-06-29 14:34:42'),
(337, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586089964705/france-747193-1920_inspirationSmall_1590253376131.jpeg', 'App\\Models\\Trip', 47, '2025-06-29 14:34:42', '2025-06-29 14:34:42'),
(338, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586091029010/pegasus-bridge-1290512-1920_inspirationSmall_1590253597244.jpeg', 'App\\Models\\Trip', 47, '2025-06-29 14:34:42', '2025-06-29 14:34:42'),
(339, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 47, '2025-06-29 14:34:42', '2025-06-29 14:34:42'),
(340, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 47, '2025-06-29 14:34:42', '2025-06-29 14:34:42'),
(341, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1738162187019/bath-pixabay-(2)_inspirationSmall_1738162204323.jpeg', 'App\\Models\\Trip', 48, '2025-06-29 14:36:23', '2025-06-29 14:36:23'),
(342, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586089964705/france-747193-1920_inspirationSmall_1590253376131.jpeg', 'App\\Models\\Trip', 48, '2025-06-29 14:36:23', '2025-06-29 14:36:23'),
(343, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586091029010/pegasus-bridge-1290512-1920_inspirationSmall_1590253597244.jpeg', 'App\\Models\\Trip', 48, '2025-06-29 14:36:23', '2025-06-29 14:36:23'),
(344, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 48, '2025-06-29 14:36:23', '2025-06-29 14:36:23'),
(345, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 48, '2025-06-29 14:36:23', '2025-06-29 14:36:23'),
(346, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1738148962658/york-pixabay-(5)_inspirationSmall_1738160962079.jpeg', 'App\\Models\\Trip', 49, '2025-06-29 14:37:47', '2025-06-29 14:37:47'),
(347, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586089964705/france-747193-1920_inspirationSmall_1590253376131.jpeg', 'App\\Models\\Trip', 49, '2025-06-29 14:37:47', '2025-06-29 14:37:47'),
(348, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1586091029010/pegasus-bridge-1290512-1920_inspirationSmall_1590253597244.jpeg', 'App\\Models\\Trip', 49, '2025-06-29 14:37:47', '2025-06-29 14:37:47'),
(349, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 49, '2025-06-29 14:37:47', '2025-06-29 14:37:47'),
(350, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 49, '2025-06-29 14:37:47', '2025-06-29 14:37:47'),
(351, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1590517848921/big-ben-1143631-1920_inspirationSmall_1590517870217.jpeg', 'App\\Models\\Trip', 50, '2025-06-29 14:40:40', '2025-06-29 14:40:40'),
(352, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1590517474580/london-3078109-1920_inspirationSmall_1590517500585.jpeg', 'App\\Models\\Trip', 50, '2025-06-29 14:40:40', '2025-06-29 14:40:40'),
(353, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1590518757838/gloucester-730910-1920_inspirationSmall_1590518780253.jpeg', 'App\\Models\\Trip', 50, '2025-06-29 14:40:40', '2025-06-29 14:40:40'),
(354, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 50, '2025-06-29 14:40:40', '2025-06-29 14:40:40'),
(355, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 50, '2025-06-29 14:40:40', '2025-06-29 14:40:40'),
(356, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1596099929231/sissinghurst-418180-1920_inspirationSmall_1596099958522.jpeg', 'App\\Models\\Trip', 51, '2025-06-29 14:42:13', '2025-06-29 14:42:13'),
(357, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1596223835045/warwick-castle-2484196-1920_inspirationSmall_1596223853702.jpeg', 'App\\Models\\Trip', 51, '2025-06-29 14:42:13', '2025-06-29 14:42:13'),
(358, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1590518757838/gloucester-730910-1920_inspirationSmall_1590518780253.jpeg', 'App\\Models\\Trip', 51, '2025-06-29 14:42:13', '2025-06-29 14:42:13'),
(359, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 51, '2025-06-29 14:42:13', '2025-06-29 14:42:13'),
(360, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 51, '2025-06-29 14:42:13', '2025-06-29 14:42:13'),
(361, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1656561695616/stirling-bridge-1256314-1920_inspirationSmall_1656561711694.jpeg', 'App\\Models\\Trip', 52, '2025-06-29 14:44:14', '2025-06-29 14:44:14'),
(362, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874472659/david-henderson-pqQiSw7utyA-unsplash_inspirationSmall_1642874499252.jpeg', 'App\\Models\\Trip', 52, '2025-06-29 14:44:14', '2025-06-29 14:44:14'),
(363, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 52, '2025-06-29 14:44:14', '2025-06-29 14:44:14'),
(364, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 52, '2025-06-29 14:44:14', '2025-06-29 14:44:14'),
(365, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 52, '2025-06-29 14:44:14', '2025-06-29 14:44:14'),
(366, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1595965332314/bath-5087392-1920_inspirationSmall_1595965360637.jpeg', 'App\\Models\\Trip', 53, '2025-06-29 14:45:45', '2025-06-29 14:45:45'),
(367, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1596015661740/england-1860977-1920_inspirationSmall_1596015681948.jpeg', 'App\\Models\\Trip', 53, '2025-06-29 14:45:45', '2025-06-29 14:45:45'),
(368, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 53, '2025-06-29 14:45:45', '2025-06-29 14:45:45'),
(369, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 53, '2025-06-29 14:45:45', '2025-06-29 14:45:45'),
(370, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 53, '2025-06-29 14:45:45', '2025-06-29 14:45:45'),
(371, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1638727048665/prague-2086967_inspirationSmall_1638727085704.jpeg', 'App\\Models\\Trip', 54, '2025-06-29 14:48:25', '2025-06-29 14:48:25'),
(372, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1639258441953/prague-4925864_inspirationSmall_1639258463396.jpeg', 'App\\Models\\Trip', 54, '2025-06-29 14:48:25', '2025-06-29 14:48:25'),
(373, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 54, '2025-06-29 14:48:25', '2025-06-29 14:48:25'),
(374, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 54, '2025-06-29 14:48:25', '2025-06-29 14:48:25'),
(375, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 54, '2025-06-29 14:48:25', '2025-06-29 14:48:25'),
(376, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1655289775565/semper-opera-house-1216572_inspirationSmall_1655289791765.jpeg', 'App\\Models\\Trip', 55, '2025-06-29 14:49:54', '2025-06-29 14:49:54'),
(377, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1655289887223/dresden-2303818-1920_inspirationSmall_1655289909312.jpeg', 'App\\Models\\Trip', 55, '2025-06-29 14:49:54', '2025-06-29 14:49:54'),
(378, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 55, '2025-06-29 14:49:54', '2025-06-29 14:49:54'),
(379, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 55, '2025-06-29 14:49:54', '2025-06-29 14:49:54'),
(380, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 55, '2025-06-29 14:49:54', '2025-06-29 14:49:54'),
(381, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1638728541650/vienna-1527172-1920_inspirationSmall_1638728579917.jpeg', 'App\\Models\\Trip', 56, '2025-06-29 14:51:30', '2025-06-29 14:51:30'),
(382, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1638728374806/czech-republic-2909179_inspirationSmall_1638728399817.jpeg', 'App\\Models\\Trip', 56, '2025-06-29 14:51:30', '2025-06-29 14:51:30'),
(383, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 56, '2025-06-29 14:51:30', '2025-06-29 14:51:30'),
(384, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 56, '2025-06-29 14:51:30', '2025-06-29 14:51:30'),
(385, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 56, '2025-06-29 14:51:30', '2025-06-29 14:51:30'),
(386, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1655288899087/leipzig-3704342-1920_inspirationSmall_1655288923067.jpeg', 'App\\Models\\Trip', 57, '2025-06-29 14:53:02', '2025-06-29 14:53:02'),
(387, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1655288788252/leipzig-745104-1920_inspirationSmall_1655288808002.jpeg', 'App\\Models\\Trip', 57, '2025-06-29 14:53:02', '2025-06-29 14:53:02'),
(388, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 57, '2025-06-29 14:53:02', '2025-06-29 14:53:02'),
(389, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 57, '2025-06-29 14:53:02', '2025-06-29 14:53:02'),
(390, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 57, '2025-06-29 14:53:02', '2025-06-29 14:53:02'),
(391, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1639256365992/wildseeloder-house-2863748_inspirationSmall_1639256387071.jpeg', 'App\\Models\\Trip', 58, '2025-06-29 14:55:07', '2025-06-29 14:55:07'),
(392, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1639256174117/nature-4916778-1920_inspirationSmall_1639256195109.jpeg', 'App\\Models\\Trip', 58, '2025-06-29 14:55:07', '2025-06-29 14:55:07'),
(393, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1642874341544/london-1900570_inspirationSmall_1642874370299.jpeg', 'App\\Models\\Trip', 58, '2025-06-29 14:55:07', '2025-06-29 14:55:07'),
(394, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 58, '2025-06-29 14:55:07', '2025-06-29 14:55:07'),
(395, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1498743040999/shutterstock-330376070_inspirationSmall_1498743061858.jpeg', 'App\\Models\\Trip', 58, '2025-06-29 14:55:07', '2025-06-29 14:55:07'),
(396, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1502962291765/shutterstock-462138682_inspirationSmall_1502962336531.jpeg', 'App\\Models\\Trip', 59, '2025-06-29 15:14:32', '2025-06-29 15:14:32'),
(397, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1502965489899/shutterstock-132842636_inspirationSmall_1502965528000.jpeg', 'App\\Models\\Trip', 59, '2025-06-29 15:14:32', '2025-06-29 15:14:32'),
(398, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1502963892621/shutterstock-170516222_inspirationSmall_1502963943607.jpeg', 'App\\Models\\Trip', 59, '2025-06-29 15:14:32', '2025-06-29 15:14:32'),
(399, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1672389567574/michael-kroul-XCeF9q1YyAE-unsplash_inspirationSmall_1672389587085.jpeg', 'App\\Models\\Trip', 59, '2025-06-29 15:14:32', '2025-06-29 15:14:32'),
(400, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1502961303091/shutterstock-11002726_inspirationSmall_1502961333961.jpeg', 'App\\Models\\Trip', 59, '2025-06-29 15:14:32', '2025-06-29 15:14:32'),
(401, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1694677017516/vinicius-cainelli-h6CZOMcgkbk-unsplash_inspirationSmall_1694677036399.jpeg', 'App\\Models\\Trip', 60, '2025-06-29 15:16:24', '2025-06-29 15:16:24'),
(402, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1694676917255/jaume-galofre-Rch2D5L1dBc-unsplash_inspirationSmall_1694676936375.jpeg', 'App\\Models\\Trip', 60, '2025-06-29 15:16:24', '2025-06-29 15:16:24'),
(403, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1613075786574/rio-de-janeiro-272052_inspirationSmall_1613075830116.jpeg', 'App\\Models\\Trip', 60, '2025-06-29 15:16:24', '2025-06-29 15:16:24'),
(404, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1613075585909/sugarloaf-mountain-1679285_inspirationSmall_1613075611306.jpeg', 'App\\Models\\Trip', 60, '2025-06-29 15:16:24', '2025-06-29 15:16:24'),
(405, 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1613075244289/rio-de-janeiro-1963744_inspirationSmall_1613075326583.jpeg', 'App\\Models\\Trip', 60, '2025-06-29 15:16:24', '2025-06-29 15:16:24'),
(406, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/28/09/19/rsgeneralviewnightview.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 18, '2025-06-29 15:31:22', '2025-06-29 15:31:22'),
(407, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/83/9a/98/royal-savoy-hotel-and.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 18, '2025-06-29 15:31:22', '2025-06-29 15:31:22'),
(408, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/20/d4/a5/villa-queen-cleopatra.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 18, '2025-06-29 15:31:22', '2025-06-29 15:31:22'),
(409, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/fe/bc/a2/royal-savoy-hotel-and.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 18, '2025-06-29 15:31:22', '2025-06-29 15:31:22'),
(410, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/86/54/cc/exterior.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 19, '2025-06-29 15:37:14', '2025-06-29 15:37:14'),
(411, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/21/a9/d1/photo2jpg.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 19, '2025-06-29 15:37:14', '2025-06-29 15:37:14'),
(412, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/0c/a9/f7/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 19, '2025-06-29 15:37:14', '2025-06-29 15:37:14'),
(413, 'https://media-cdn.tripadvisor.com/media/video-t/2e/d6/49/76/the-new-yorker-a-wyndham-1.jpg', 'App\\Models\\Hotel', 19, '2025-06-29 15:37:14', '2025-06-29 15:37:14'),
(414, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/33/17/96/caption.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 20, '2025-06-29 15:40:53', '2025-06-29 15:40:53'),
(415, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a8/75/f5/photo6jpg.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 20, '2025-06-29 15:40:53', '2025-06-29 15:40:53'),
(416, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/4b/39/ab/cabana-by-the-pool.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 20, '2025-06-29 15:40:53', '2025-06-29 15:40:53'),
(417, 'https://media-cdn.tripadvisor.com/media/video-t/1c/24/2c/6b/hard-rock-hotel-bali-1.jpg', 'App\\Models\\Hotel', 20, '2025-06-29 15:40:53', '2025-06-29 15:40:53'),
(418, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/aa/6d/f0/an-icon-reborn-the-rio.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 21, '2025-06-29 15:44:02', '2025-06-29 15:44:02'),
(419, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/7e/ab/49/renovated-in-fall-2023.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 21, '2025-06-29 15:44:03', '2025-06-29 15:44:03'),
(420, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/aa/6d/f0/an-icon-reborn-the-rio.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 22, '2025-06-29 15:44:03', '2025-06-29 15:44:03'),
(421, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/7e/ab/49/renovated-in-fall-2023.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 22, '2025-06-29 15:44:03', '2025-06-29 15:44:03'),
(422, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/dc/e9/18/hotel-riu-touareg.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 23, '2025-06-29 15:48:27', '2025-06-29 15:48:27'),
(423, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/de/76/b1/photo0jpg.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 23, '2025-06-29 15:48:27', '2025-06-29 15:48:27'),
(424, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/27/9f/2e/hotel-riu-touareg.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 23, '2025-06-29 15:48:27', '2025-06-29 15:48:27'),
(425, 'https://media-cdn.tripadvisor.com/media/video-t/14/c7/2f/66/hotel-riu-touareg-1.jpg', 'App\\Models\\Hotel', 23, '2025-06-29 15:48:27', '2025-06-29 15:48:27'),
(426, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1f/0e/38/caption.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 24, '2025-06-29 15:51:35', '2025-06-29 15:51:35'),
(427, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/87/6a/51/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 24, '2025-06-29 15:51:35', '2025-06-29 15:51:35'),
(428, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/e0/70/5f/view-of-the-horshoe-falls.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 24, '2025-06-29 15:51:35', '2025-06-29 15:51:35'),
(429, 'https://media-cdn.tripadvisor.com/media/video-t/2e/1f/16/ba/fallsview-hotel-suites-1.jpg', 'App\\Models\\Hotel', 24, '2025-06-29 15:51:35', '2025-06-29 15:51:35'),
(430, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/eb/52/da/loews-miami-exterior.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 25, '2025-06-29 15:55:33', '2025-06-29 15:55:33'),
(431, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/f4/7e/ac/photo5jpg.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 25, '2025-06-29 15:55:33', '2025-06-29 15:55:33'),
(432, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/eb/52/db/pool-overhead.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 25, '2025-06-29 15:55:33', '2025-06-29 15:55:33'),
(433, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/28/dd/3f/hotel-riu-cancun.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 26, '2025-06-29 16:05:53', '2025-06-29 16:05:53'),
(434, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/c4/a4/ad/hotel-riu-cancun.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 26, '2025-06-29 16:05:53', '2025-06-29 16:05:53'),
(435, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/28/dd/3f/hotel-riu-cancun.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 26, '2025-06-29 16:05:53', '2025-06-29 16:05:53'),
(436, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/ad/f7/5e/savoy.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 27, '2025-06-29 16:09:54', '2025-06-29 16:09:54'),
(437, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/94/f1/55/savoy-sharm-el-sheikh.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 27, '2025-06-29 16:09:54', '2025-06-29 16:09:54'),
(438, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/02/65/a1/savoy-sharm-el-sheikh.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 27, '2025-06-29 16:09:54', '2025-06-29 16:09:54'),
(439, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/1c/05/26/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 27, '2025-06-29 16:09:54', '2025-06-29 16:09:54'),
(440, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1f/dd/37/exterior.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 28, '2025-06-29 16:12:10', '2025-06-29 16:12:10'),
(441, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/27/e7/cd/room-240.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 28, '2025-06-29 16:12:10', '2025-06-29 16:12:10'),
(442, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/05/de/78/suite.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 28, '2025-06-29 16:12:10', '2025-06-29 16:12:10'),
(443, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/53/6d/50/les-trois-saveurs--v2981103.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 28, '2025-06-29 16:12:10', '2025-06-29 16:12:10'),
(444, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/18/e2/ephelia-seychelles-beach.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 29, '2025-06-29 16:14:47', '2025-06-29 16:14:47'),
(445, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/40/7f/e9/caption.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 29, '2025-06-29 16:14:47', '2025-06-29 16:14:47'),
(446, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/19/17/ephelia-seychelles-aerial.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 29, '2025-06-29 16:14:47', '2025-06-29 16:14:47'),
(447, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/18/f7/ephelia-seychelles-presidentia.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 29, '2025-06-29 16:14:47', '2025-06-29 16:14:47'),
(448, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/ab/24/60/reception-hall.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 30, '2025-06-29 16:18:03', '2025-06-29 16:18:03'),
(449, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/a5/25/2b/titanic-resort-aqua-park.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 30, '2025-06-29 16:18:03', '2025-06-29 16:18:03'),
(450, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/aa/88/f2/titanic-resort-aqua-park.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 30, '2025-06-29 16:18:03', '2025-06-29 16:18:03'),
(451, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/aa/e7/29/main-restaurant-buffet.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 30, '2025-06-29 16:18:03', '2025-06-29 16:18:03'),
(452, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c0/5c/ed/hotel-entry.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 31, '2025-06-29 16:20:20', '2025-06-29 16:20:20'),
(453, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c3/fc/bd/premium-butler-lounge.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 31, '2025-06-29 16:20:20', '2025-06-29 16:20:20'),
(454, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c3/d3/f4/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 31, '2025-06-29 16:20:20', '2025-06-29 16:20:20'),
(455, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3b/40/b3/beach-view.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 32, '2025-06-29 16:22:27', '2025-06-29 16:22:27'),
(456, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/b1/dc/d0/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 32, '2025-06-29 16:22:27', '2025-06-29 16:22:27'),
(457, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/c6/16/63/sunrise-alex-avenue-hotel.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 32, '2025-06-29 16:22:27', '2025-06-29 16:22:27'),
(458, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/1e/b4/f2/hall-of-fame-jacuzzi.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 33, '2025-06-29 16:25:56', '2025-06-29 16:25:56'),
(459, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/e4/6e/38/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 33, '2025-06-29 16:25:56', '2025-06-29 16:25:56'),
(460, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/34/e5/e9/the-party-never-ends.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 33, '2025-06-29 16:25:56', '2025-06-29 16:25:56'),
(461, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/34/db/c8/utopia-beach-club-fusion.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 33, '2025-06-29 16:25:56', '2025-06-29 16:25:56'),
(462, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/f6/ca/20/overview.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 34, '2025-06-29 16:29:13', '2025-06-29 16:29:13'),
(463, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/25/69/a1/caption.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 34, '2025-06-29 16:29:13', '2025-06-29 16:29:13'),
(464, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/25/6a/2e/caption.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 34, '2025-06-29 16:29:13', '2025-06-29 16:29:13'),
(465, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/7c/d2/ea/le-marche-restaurant--v3314955.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 34, '2025-06-29 16:29:13', '2025-06-29 16:29:13'),
(466, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/ad/f7/5e/savoy.jpg?w=900&h=-1&s=1', 'App\\Models\\Hotel', 35, '2025-06-29 16:32:31', '2025-06-29 16:32:31'),
(467, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/94/f1/55/savoy-sharm-el-sheikh.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 35, '2025-06-29 16:32:31', '2025-06-29 16:32:31'),
(468, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/02/65/a1/savoy-sharm-el-sheikh.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 35, '2025-06-29 16:32:31', '2025-06-29 16:32:31'),
(469, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/20/a9/1f/sierra-sharm-el-sheikh.jpg?w=900&h=500&s=1', 'App\\Models\\Hotel', 36, '2025-06-29 16:34:43', '2025-06-29 16:34:43'),
(470, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/f7/9e/15/caption.jpg?w=300&h=-1&s=1', 'App\\Models\\Hotel', 36, '2025-06-29 16:34:43', '2025-06-29 16:34:43'),
(471, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/20/a9/23/sierra-sharm-el-sheikh.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 36, '2025-06-29 16:34:43', '2025-06-29 16:34:43'),
(472, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/20/a5/3e/sierra-sharm-el-sheikh.jpg?w=300&h=200&s=1', 'App\\Models\\Hotel', 36, '2025-06-29 16:34:43', '2025-06-29 16:34:43'),
(473, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/ae/b5/49/al-khal.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 24, '2025-06-29 17:15:20', '2025-06-29 17:15:20'),
(474, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/ff/72/8e/al-khal-egyptian-restaurant.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 24, '2025-06-29 17:15:20', '2025-06-29 17:15:20'),
(475, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/2b/14/2d/bab-el-sharq.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 25, '2025-06-29 17:18:13', '2025-06-29 17:18:13'),
(476, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/66/73/9a/bab-el-sharq.jpg?w=300&h=-1&s=1', 'App\\Models\\Restaurant', 25, '2025-06-29 17:18:13', '2025-06-29 17:18:13'),
(477, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/67/78/34/indoor-space.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 25, '2025-06-29 17:18:13', '2025-06-29 17:18:13'),
(478, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b7/68/7d/la-zisa.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 26, '2025-06-29 17:27:00', '2025-06-29 17:27:00'),
(479, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/0a/73/62/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 26, '2025-06-29 17:27:00', '2025-06-29 17:27:00'),
(480, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f4/65/78/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 26, '2025-06-29 17:27:00', '2025-06-29 17:27:00'),
(481, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/41/93/19/revolving-restauarant.jpg?w=400&h=400&s=1', 'App\\Models\\Restaurant', 27, '2025-06-29 17:30:45', '2025-06-29 17:30:45'),
(482, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/18/dc/72/the-revolving-restaurant.jpg?w=300&h=-1&s=1', 'App\\Models\\Restaurant', 27, '2025-06-29 17:30:45', '2025-06-29 17:30:45'),
(483, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/e0/f4/f4/photo0jpg.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 28, '2025-06-29 17:36:43', '2025-06-29 17:36:43'),
(484, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/84/57/d3/inside-the-restaurant.jpg?w=300&h=-1&s=1', 'App\\Models\\Restaurant', 28, '2025-06-29 17:36:43', '2025-06-29 17:36:43'),
(485, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/90/2e/f4/balbaa-village.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 28, '2025-06-29 17:36:43', '2025-06-29 17:36:43'),
(486, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/83/9d/9c/ginger-asian-restaurant.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 29, '2025-06-29 17:39:42', '2025-06-29 17:39:42'),
(487, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/3e/76/b2/romantic-dinner.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 29, '2025-06-29 17:39:42', '2025-06-29 17:39:42'),
(488, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/99/30/41/salmon-teriyaki.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 29, '2025-06-29 17:39:42', '2025-06-29 17:39:42'),
(489, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/a7/d0/f7/get-your-favorite-drink.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 30, '2025-06-29 17:41:18', '2025-06-29 17:41:18'),
(490, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/79/01/ad/getlstd-property-photo.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 30, '2025-06-29 17:41:18', '2025-06-29 17:41:18'),
(491, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/8f/09/c1/img-20191011-003128-largejpg.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 30, '2025-06-29 17:41:18', '2025-06-29 17:41:18'),
(492, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/8f/29/cd/the-cigar-bar.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 30, '2025-06-29 17:41:18', '2025-06-29 17:41:18'),
(493, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4f/e4/24/fish-market-alexandria.jpg?w=900&h=-1&s=1', 'App\\Models\\Restaurant', 31, '2025-06-29 17:43:43', '2025-06-29 17:43:43'),
(494, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/d0/cf/e3/fish-market.jpg?w=300&h=-1&s=1', 'App\\Models\\Restaurant', 31, '2025-06-29 17:43:43', '2025-06-29 17:43:43'),
(495, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/d0/d1/0e/fish-market.jpg?w=300&h=-1&s=1', 'App\\Models\\Restaurant', 31, '2025-06-29 17:43:43', '2025-06-29 17:43:43'),
(496, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/fd/71/d4/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 31, '2025-06-29 17:43:43', '2025-06-29 17:43:43'),
(497, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/38/bb/33/getlstd-property-photo.jpg?w=900&h=500&s=1', 'App\\Models\\Restaurant', 32, '2025-06-29 17:45:54', '2025-06-29 17:45:54'),
(498, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/38/bb/33/getlstd-property-photo.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 32, '2025-06-29 17:45:54', '2025-06-29 17:45:54'),
(499, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e1/72/98/usa-beef-with-french.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 32, '2025-06-29 17:45:54', '2025-06-29 17:45:54'),
(500, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/40/ea/d1/20190421-183629-largejpg.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 32, '2025-06-29 17:45:54', '2025-06-29 17:45:54'),
(501, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/56/b6/a4/amazing-elegant-and-romantic.jpg?w=800&h=500&s=1', 'App\\Models\\Restaurant', 33, '2025-06-29 17:47:57', '2025-06-29 17:47:57'),
(502, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/7f/d1/2e/caption.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 33, '2025-06-29 17:47:57', '2025-06-29 17:47:57'),
(503, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/8f/ad/45/caption.jpg?w=300&h=-1&s=1', 'App\\Models\\Restaurant', 33, '2025-06-29 17:47:57', '2025-06-29 17:47:57'),
(504, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/19/9d/23/branzino-fish-restaurant.jpg?w=300&h=200&s=1', 'App\\Models\\Restaurant', 33, '2025-06-29 17:47:57', '2025-06-29 17:47:57'),
(505, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/64/bd/e8.jpg', 'App\\Models\\Activity', 20, '2025-06-29 18:06:30', '2025-06-29 18:06:30'),
(506, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/64/bd/e9.jpg', 'App\\Models\\Activity', 20, '2025-06-29 18:06:30', '2025-06-29 18:06:30'),
(507, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/78/f3/7e.jpg', 'App\\Models\\Activity', 21, '2025-06-29 18:08:28', '2025-06-29 18:08:28'),
(508, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/89/f9/7f.jpg', 'App\\Models\\Activity', 21, '2025-06-29 18:08:28', '2025-06-29 18:08:28'),
(509, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/c1/f8/66.jpg', 'App\\Models\\Activity', 21, '2025-06-29 18:08:28', '2025-06-29 18:08:28'),
(510, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/01/e1/ed.jpg', 'App\\Models\\Activity', 22, '2025-06-29 18:14:13', '2025-06-29 18:14:13'),
(511, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/78/86/f5.jpg', 'App\\Models\\Activity', 22, '2025-06-29 18:14:13', '2025-06-29 18:14:13'),
(512, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/f4/2b/d9.jpg', 'App\\Models\\Activity', 23, '2025-06-29 18:31:28', '2025-06-29 18:31:28'),
(513, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/f4/2b/a0.jpg', 'App\\Models\\Activity', 23, '2025-06-29 18:31:28', '2025-06-29 18:31:28'),
(514, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/f4/2b/a1.jpg', 'App\\Models\\Activity', 23, '2025-06-29 18:31:28', '2025-06-29 18:31:28'),
(515, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/82/b6/ba.jpg', 'App\\Models\\Activity', 24, '2025-06-29 18:35:11', '2025-06-29 18:35:11'),
(516, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/82/c5/c3.jpg', 'App\\Models\\Activity', 24, '2025-06-29 18:35:11', '2025-06-29 18:35:11'),
(517, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/82/c5/ca.jpg', 'App\\Models\\Activity', 24, '2025-06-29 18:35:11', '2025-06-29 18:35:11'),
(518, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/e2/a7/c2.jpg', 'App\\Models\\Activity', 25, '2025-06-29 18:37:51', '2025-06-29 18:37:51'),
(519, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/72/2b/ca.jpg', 'App\\Models\\Activity', 25, '2025-06-29 18:37:51', '2025-06-29 18:37:51'),
(520, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/de/b9/e3.jpg', 'App\\Models\\Activity', 25, '2025-06-29 18:37:51', '2025-06-29 18:37:51'),
(521, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/08/a0/93.jpg', 'App\\Models\\Activity', 26, '2025-06-29 18:41:00', '2025-06-29 18:41:00'),
(522, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/08/a3/4c.jpg', 'App\\Models\\Activity', 26, '2025-06-29 18:41:00', '2025-06-29 18:41:00'),
(523, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/08/a3/4f.jpg', 'App\\Models\\Activity', 26, '2025-06-29 18:41:00', '2025-06-29 18:41:00'),
(524, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/6a/ab/1b.jpg', 'App\\Models\\Activity', 27, '2025-06-29 18:45:30', '2025-06-29 18:45:30'),
(525, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/80/9a/c6.jpg', 'App\\Models\\Activity', 27, '2025-06-29 18:45:30', '2025-06-29 18:45:30'),
(526, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/8f/34/dc.jpg', 'App\\Models\\Activity', 27, '2025-06-29 18:45:30', '2025-06-29 18:45:30'),
(527, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/32/c5/39.jpg', 'App\\Models\\Activity', 28, '2025-06-29 18:49:34', '2025-06-29 18:49:34'),
(528, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/3b/25/99.jpg', 'App\\Models\\Activity', 28, '2025-06-29 18:49:34', '2025-06-29 18:49:34'),
(529, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/3b/25/9a.jpg', 'App\\Models\\Activity', 28, '2025-06-29 18:49:34', '2025-06-29 18:49:34'),
(530, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/e2/d9/45.jpg', 'App\\Models\\Activity', 29, '2025-06-29 18:52:10', '2025-06-29 18:52:10'),
(531, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/12/e2/d9/44.jpg', 'App\\Models\\Activity', 29, '2025-06-29 18:52:10', '2025-06-29 18:52:10'),
(532, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/2b/7c/05/caption.jpg?w=900&h=-1&s=1', 'App\\Models\\Activity', 29, '2025-06-29 18:52:10', '2025-06-29 18:52:10'),
(533, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/e5/bd/b8.jpg', 'App\\Models\\Activity', 30, '2025-06-29 18:54:29', '2025-06-29 18:54:29'),
(534, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/c5/0a/37.jpg', 'App\\Models\\Activity', 30, '2025-06-29 18:54:29', '2025-06-29 18:54:29'),
(535, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/13/c5/0a/1a.jpg', 'App\\Models\\Activity', 30, '2025-06-29 18:54:29', '2025-06-29 18:54:29'),
(536, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/a2/da/ad.jpg', 'App\\Models\\Activity', 31, '2025-06-29 18:56:23', '2025-06-29 18:56:23'),
(537, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/a2/dc/85.jpg', 'App\\Models\\Activity', 31, '2025-06-29 18:56:23', '2025-06-29 18:56:23'),
(538, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/90/aa/e6.jpg', 'App\\Models\\Activity', 31, '2025-06-29 18:56:23', '2025-06-29 18:56:23'),
(539, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/1e/74/8f.jpg', 'App\\Models\\Activity', 32, '2025-06-29 19:00:13', '2025-06-29 19:00:13');
INSERT INTO `images` (`id`, `url`, `imageable_type`, `imageable_id`, `created_at`, `updated_at`) VALUES
(540, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/6a/d0/68.jpg', 'App\\Models\\Activity', 32, '2025-06-29 19:00:13', '2025-06-29 19:00:13'),
(541, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/87/00/12.jpg', 'App\\Models\\Activity', 32, '2025-06-29 19:00:13', '2025-06-29 19:00:13'),
(542, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/22/dc/37.jpg', 'App\\Models\\Activity', 33, '2025-06-29 19:01:53', '2025-06-29 19:01:53'),
(543, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/27/d7/e8.jpg', 'App\\Models\\Activity', 33, '2025-06-29 19:01:53', '2025-06-29 19:01:53'),
(544, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/22/dc/3b.jpg', 'App\\Models\\Activity', 33, '2025-06-29 19:01:53', '2025-06-29 19:01:53'),
(545, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/24/68/af.jpg', 'App\\Models\\Activity', 34, '2025-06-29 19:05:10', '2025-06-29 19:05:10'),
(546, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/24/68/b1.jpg', 'App\\Models\\Activity', 34, '2025-06-29 19:05:10', '2025-06-29 19:05:10'),
(547, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/24/68/b2.jpg', 'App\\Models\\Activity', 34, '2025-06-29 19:05:10', '2025-06-29 19:05:10'),
(548, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/88/c4/04.jpg', 'App\\Models\\Activity', 35, '2025-06-29 19:07:45', '2025-06-29 19:07:45'),
(549, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/88/c4/07.jpg', 'App\\Models\\Activity', 35, '2025-06-29 19:07:45', '2025-06-29 19:07:45'),
(550, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/7c/8b/22.jpg', 'App\\Models\\Activity', 35, '2025-06-29 19:07:45', '2025-06-29 19:07:45'),
(551, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/8e/7e/85.jpg', 'App\\Models\\Activity', 36, '2025-06-29 19:10:20', '2025-06-29 19:10:20'),
(552, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/a6/b0/d9.jpg', 'App\\Models\\Activity', 36, '2025-06-29 19:10:20', '2025-06-29 19:10:20'),
(553, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/b8/57/d1.jpg', 'App\\Models\\Activity', 37, '2025-06-29 19:14:37', '2025-06-29 19:14:37'),
(554, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/b8/58/38.jpg', 'App\\Models\\Activity', 37, '2025-06-29 19:14:37', '2025-06-29 19:14:37'),
(555, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/b8/58/2e.jpg', 'App\\Models\\Activity', 37, '2025-06-29 19:14:37', '2025-06-29 19:14:37'),
(556, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0c/1d/2e/a9.jpg', 'App\\Models\\Activity', 38, '2025-06-29 19:15:56', '2025-06-29 19:15:56'),
(557, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0d/07/3c/49.jpg', 'App\\Models\\Activity', 38, '2025-06-29 19:15:56', '2025-06-29 19:15:56'),
(558, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/04/50/b2.jpg', 'App\\Models\\Activity', 38, '2025-06-29 19:15:56', '2025-06-29 19:15:56'),
(559, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/2a/d7/2c.jpg', 'App\\Models\\Activity', 39, '2025-06-29 19:17:30', '2025-06-29 19:17:30'),
(560, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/2a/d7/28.jpg', 'App\\Models\\Activity', 39, '2025-06-29 19:17:30', '2025-06-29 19:17:30'),
(561, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/2a/d7/29.jpg', 'App\\Models\\Activity', 39, '2025-06-29 19:17:30', '2025-06-29 19:17:30'),
(562, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/6e/88/53.jpg', 'App\\Models\\Activity', 40, '2025-06-29 19:19:32', '2025-06-29 19:19:32'),
(563, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/47/8d/5c.jpg', 'App\\Models\\Activity', 40, '2025-06-29 19:19:32', '2025-06-29 19:19:32'),
(564, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/77/7c/26.jpg', 'App\\Models\\Activity', 40, '2025-06-29 19:19:32', '2025-06-29 19:19:32'),
(565, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/80/a0/ed.jpg', 'App\\Models\\Activity', 41, '2025-06-29 19:31:52', '2025-06-29 19:31:52'),
(566, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/49/39/5e.jpg', 'App\\Models\\Activity', 41, '2025-06-29 19:31:52', '2025-06-29 19:31:52'),
(567, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/80/a0/f2.jpg', 'App\\Models\\Activity', 41, '2025-06-29 19:31:52', '2025-06-29 19:31:52'),
(568, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/60/20/48.jpg', 'App\\Models\\Activity', 42, '2025-06-29 19:34:01', '2025-06-29 19:34:01'),
(569, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/60/20/46.jpg', 'App\\Models\\Activity', 42, '2025-06-29 19:34:01', '2025-06-29 19:34:01'),
(570, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/13/18/04/a6.jpg', 'App\\Models\\Activity', 42, '2025-06-29 19:34:01', '2025-06-29 19:34:01'),
(571, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/7b/b1/1b.jpg', 'App\\Models\\Activity', 43, '2025-06-29 19:36:43', '2025-06-29 19:36:43'),
(572, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/bc/f2/34.jpg', 'App\\Models\\Activity', 43, '2025-06-29 19:36:43', '2025-06-29 19:36:43'),
(573, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/bc/f2/3a.jpg', 'App\\Models\\Activity', 43, '2025-06-29 19:36:43', '2025-06-29 19:36:43'),
(574, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/44/e1/7d.jpg', 'App\\Models\\Activity', 44, '2025-06-29 19:40:28', '2025-06-29 19:40:28'),
(575, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/53/2c/50.jpg', 'App\\Models\\Activity', 44, '2025-06-29 19:40:28', '2025-06-29 19:40:28'),
(576, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/53/2c/64.jpg', 'App\\Models\\Activity', 44, '2025-06-29 19:40:28', '2025-06-29 19:40:28'),
(577, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/7b/d0/83.jpg', 'App\\Models\\Activity', 45, '2025-06-29 19:42:29', '2025-06-29 19:42:29'),
(578, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/6e/f0/57.jpg', 'App\\Models\\Activity', 45, '2025-06-29 19:42:29', '2025-06-29 19:42:29'),
(579, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/7b/d0/72.jpg', 'App\\Models\\Activity', 45, '2025-06-29 19:42:29', '2025-06-29 19:42:29'),
(580, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/1b/fb/c8.jpg', 'App\\Models\\Activity', 46, '2025-06-29 19:46:41', '2025-06-29 19:46:41'),
(581, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/b0/9d/63/caption.jpg?w=900&h=-1&s=1', 'App\\Models\\Activity', 46, '2025-06-29 19:46:41', '2025-06-29 19:46:41'),
(582, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/a0/7a/a6/caption.jpg?w=900&h=-1&s=1', 'App\\Models\\Activity', 46, '2025-06-29 19:46:41', '2025-06-29 19:46:41'),
(583, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/bf/5b/32.jpg', 'App\\Models\\Activity', 47, '2025-06-29 19:49:53', '2025-06-29 19:49:53'),
(584, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/bf/5b/33.jpg', 'App\\Models\\Activity', 47, '2025-06-29 19:49:53', '2025-06-29 19:49:53'),
(585, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/bf/5b/34.jpg', 'App\\Models\\Activity', 47, '2025-06-29 19:49:53', '2025-06-29 19:49:53'),
(586, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0e/8f/88/9b.jpg', 'App\\Models\\Activity', 48, '2025-06-29 19:51:36', '2025-06-29 19:51:36'),
(587, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0e/8f/8a/6b.jpg', 'App\\Models\\Activity', 48, '2025-06-29 19:51:36', '2025-06-29 19:51:36'),
(588, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0e/8f/8a/6f.jpg', 'App\\Models\\Activity', 48, '2025-06-29 19:51:36', '2025-06-29 19:51:36'),
(589, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/b0/87/2a.jpg', 'App\\Models\\Activity', 49, '2025-06-29 19:53:17', '2025-06-29 19:53:17'),
(590, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/4e/d5/e8.jpg', 'App\\Models\\Activity', 49, '2025-06-29 19:53:17', '2025-06-29 19:53:17'),
(591, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/b0/87/cb.jpg', 'App\\Models\\Activity', 49, '2025-06-29 19:53:17', '2025-06-29 19:53:17'),
(592, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/14/28/8f/e5.jpg', 'App\\Models\\Activity', 50, '2025-06-29 19:56:02', '2025-06-29 19:56:02'),
(593, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/28/91/39.jpg', 'App\\Models\\Activity', 50, '2025-06-29 19:56:02', '2025-06-29 19:56:02'),
(594, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/13/d0/13/4d.jpg', 'App\\Models\\Activity', 50, '2025-06-29 19:56:02', '2025-06-29 19:56:02'),
(595, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/7a/ba/5f.jpg', 'App\\Models\\Activity', 51, '2025-06-29 19:57:48', '2025-06-29 19:57:48'),
(596, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/aa/1f/dd.jpg', 'App\\Models\\Activity', 51, '2025-06-29 19:57:48', '2025-06-29 19:57:48'),
(597, 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/27/8d/3d.jpg', 'App\\Models\\Activity', 51, '2025-06-29 19:57:48', '2025-06-29 19:57:48'),
(598, 'https://cdn2.rcstatic.com/images/car_images_b/new_images/nissan/versa_lrg.jpg', 'App\\Models\\Car', 7, '2025-06-29 23:05:16', '2025-06-29 23:05:16'),
(599, 'https://cdn2.rcstatic.com/images/car_images_b/new_images/chevrolet/aveo_5door_lrg.jpg', 'App\\Models\\Car', 8, '2025-06-29 23:10:09', '2025-06-29 23:10:09'),
(600, 'https://cdn.rcstatic.com/images/car_images/new_images/chevrolet/aveo_5door_lrg.jpg', 'App\\Models\\Car', 9, '2025-06-29 23:13:01', '2025-06-29 23:13:01'),
(602, 'https://cdn.rcstatic.com/images/car_images/new_images/chevrolet/aveo_5door_lrg.jpg', 'App\\Models\\Car', 11, '2025-06-29 23:15:42', '2025-06-29 23:15:42'),
(603, 'https://cdn.rcstatic.com/images/car_images/web/kia/cerato_lrg.jpg', 'App\\Models\\Car', 10, '2025-06-29 23:16:19', '2025-06-29 23:16:19'),
(604, 'https://cdn.rcstatic.com/images/car_images/web/nissan/sentra_lrg.jpg', 'App\\Models\\Car', 12, '2025-06-29 23:17:55', '2025-06-29 23:17:55'),
(605, 'https://cdn.rcstatic.com/images/car_images/web/nissan/sentra_lrg.jpg', 'App\\Models\\Car', 13, '2025-06-29 23:19:08', '2025-06-29 23:19:08'),
(606, 'https://cdn.rcstatic.com/images/car_images/web/nissan/sentra_lrg.jpg', 'App\\Models\\Car', 14, '2025-06-29 23:20:08', '2025-06-29 23:20:08'),
(607, 'https://cdn.rcstatic.com/images/car_images/web/hyundai/tucson_lrg.jpg', 'App\\Models\\Car', 15, '2025-06-29 23:21:09', '2025-06-29 23:21:09'),
(608, 'https://cdn.rcstatic.com/images/car_images/web/hyundai/elantra_lrg.jpg', 'App\\Models\\Car', 16, '2025-06-29 23:22:09', '2025-06-29 23:22:09'),
(609, 'https://media-cdn.tripadvisor.com/media/photo-w/2b/52/bc/13/caption.jpg', 'App\\Models\\Cruise', 16, '2025-06-30 01:10:17', '2025-06-30 01:10:17'),
(610, 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2b/06/71/68/caption.jpg', 'App\\Models\\Cruise', 16, '2025-06-30 01:10:17', '2025-06-30 01:10:17'),
(611, 'https://media-cdn.tripadvisor.com/media/photo-w/22/2d/3c/6d/we-had-a-port-call-change.jpg', 'App\\Models\\Cruise', 17, '2025-06-30 01:12:52', '2025-06-30 01:12:52'),
(612, 'https://media-cdn.tripadvisor.com/media/photo-m/1280/30/29/4b/ad/caption.jpg', 'App\\Models\\Cruise', 17, '2025-06-30 01:12:52', '2025-06-30 01:12:52'),
(613, 'https://media-cdn.tripadvisor.com/media/photo-w/15/3b/26/3a/celebrity-constellation.jpg', 'App\\Models\\Cruise', 18, '2025-06-30 01:14:08', '2025-06-30 01:14:08'),
(614, 'https://media-cdn.tripadvisor.com/media/photo-w/16/46/03/2d/main-pool-and-hot-tubs.jpg', 'App\\Models\\Cruise', 18, '2025-06-30 01:14:08', '2025-06-30 01:14:08'),
(615, 'https://media-cdn.tripadvisor.com/media/photo-w/15/3b/26/aa/msc-opera-ta-listings.jpg', 'App\\Models\\Cruise', 19, '2025-06-30 01:15:32', '2025-06-30 01:15:32'),
(616, 'https://media-cdn.tripadvisor.com/media/photo-w/15/3b/35/dd/cc-msc-opera-aerial.jpg', 'App\\Models\\Cruise', 19, '2025-06-30 01:15:32', '2025-06-30 01:15:32'),
(617, 'https://media-cdn.tripadvisor.com/media/photo-w/15/3b/26/dc/msc-fantasia-ta-listings.jpg', 'App\\Models\\Cruise', 20, '2025-06-30 01:16:48', '2025-06-30 01:16:48'),
(618, 'https://media-cdn.tripadvisor.com/media/photo-w/15/3b/37/11/cc-msc-fantasia-main.jpg', 'App\\Models\\Cruise', 20, '2025-06-30 01:16:48', '2025-06-30 01:16:48');

-- --------------------------------------------------------

--
-- بنية الجدول `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '2025_06_08_180906_create_trips_table', 1),
(3, '2025_06_09_140918_create_personal_access_tokens_table', 1),
(4, '2025_06_09_144844_create_hotels_table', 1),
(5, '2025_06_09_150442_create_trip_translations_table', 1),
(6, '2025_06_09_151220_create_images_table', 1),
(7, '2025_06_09_152021_create_restaurants_table', 1),
(8, '2025_06_09_152408_create_activities_table', 1),
(9, '2025_06_09_152429_create_cruises_table', 1),
(10, '2025_06_09_152447_create_favorites_table', 1),
(11, '2025_06_09_152528_create_carts_table', 1),
(12, '2025_06_09_182152_create_cache_table', 1),
(13, '2025_06_12_132101_create_cars_table', 1),
(14, '2025_06_12_135344_add_dates_to_trips_table', 1),
(15, '2025_06_12_150527_create_reviews_table', 1),
(16, '2025_06_12_150842_create_reservations_table', 1),
(17, '2025_06_22_000000_create_sessions_table', 1),
(18, '2025_06_24_072635_create_flights_table', 1),
(19, '2025_06_26_025902_update_difficulty_enum_in_trips_table', 2),
(20, '2025_06_27_035426_add_guide_languages_to_activities_table', 3),
(21, '2025_06_27_050324_add_live_guide_to_activities_table', 4);

-- --------------------------------------------------------

--
-- بنية الجدول `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `rate`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 36, 'auth_token', 'c5f58add76b85ef07205e79e186aa33cb66fc78abba8ed94c685168304604430', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 18:31:50', '2025-06-24 18:31:50'),
(2, 'App\\Models\\User', 37, 'auth_token', 'cba1d9a673d080bdac1a5cddbb29ef1ef04e5ae7cd379949dc18d069517e9019', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 18:33:16', '2025-06-24 18:33:16'),
(3, 'App\\Models\\User', 37, 'authToken', '8f45bd35fa1a3532cd859d7fc59c8ce774cf2d0b82a97a5b607c279d1c79be4c', '[\"*\"]', 0.0, '2025-06-24 18:35:17', NULL, '2025-06-24 18:34:05', '2025-06-24 18:35:17'),
(4, 'App\\Models\\User', 37, 'authToken', '0d039a86e5f9859d82e0ef0c88ea3fe305db5930ef5d21aaaff526a10675c689', '[\"*\"]', 0.0, '2025-06-29 17:04:48', NULL, '2025-06-24 18:45:19', '2025-06-29 17:04:48'),
(5, 'App\\Models\\User', 38, 'auth_token', '8abd3ae9beff4f9a2e13883d58dba5d3e1aa0469f912ba992e8b629a7ac56136', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 21:33:45', '2025-06-24 21:33:45'),
(6, 'App\\Models\\User', 38, 'authToken', 'f8f40525bd9204dcfb6afc999cabe8445b20f555f138698f3c04f16630670297', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 21:34:28', '2025-06-24 21:34:28'),
(7, 'App\\Models\\User', 38, 'authToken', '96ce76712505952feb0865d4945c6f953e7d2b87f30363771ece218aca7a7833', '[\"*\"]', 0.0, '2025-06-24 22:06:24', NULL, '2025-06-24 21:34:53', '2025-06-24 22:06:24'),
(8, 'App\\Models\\User', 38, 'authToken', '61db89c02bf06f752d1c0fa97cca3128754dfaaaf1412b59e89a86fc900b1986', '[\"*\"]', 0.0, '2025-06-24 22:18:05', NULL, '2025-06-24 22:15:45', '2025-06-24 22:18:05'),
(9, 'App\\Models\\User', 38, 'authToken', 'ddc97f23ac13deede7a5bb70079ecd2d0ee96d154ab907869f7f19673d8ca015', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 22:18:11', '2025-06-24 22:18:11'),
(10, 'App\\Models\\User', 38, 'authToken', 'efa86dcebfe97a10d0b939c15ce35a3ae6b849464f3f29a0ad29d33c8436c5c8', '[\"*\"]', 0.0, '2025-06-24 22:39:06', NULL, '2025-06-24 22:19:38', '2025-06-24 22:39:06'),
(11, 'App\\Models\\User', 39, 'auth_token', '1f0397aed5a7731f9e4fb4dbcd94408965ace9e54c739ced40bb3165498e39d2', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 22:45:36', '2025-06-24 22:45:36'),
(12, 'App\\Models\\User', 39, 'authToken', '1deb367efcc3d92d6b9e662982f939290a066008f78aeff796da645e7aac188d', '[\"*\"]', 0.0, '2025-06-24 22:50:44', NULL, '2025-06-24 22:46:04', '2025-06-24 22:50:44'),
(13, 'App\\Models\\User', 40, 'auth_token', '8916c24f3fbfd7fc20d265bf2f8a6df077e1a901ba7a9a9faf51fcde87620044', '[\"*\"]', 0.0, NULL, NULL, '2025-06-24 22:54:25', '2025-06-24 22:54:25'),
(14, 'App\\Models\\User', 40, 'authToken', 'c1a792c0c9f7c9199f9fc9bbeb21a0871a6b1f34dea60cc2b67beae7522dc0a2', '[\"*\"]', 0.0, '2025-06-24 23:09:40', NULL, '2025-06-24 22:54:40', '2025-06-24 23:09:40'),
(15, 'App\\Models\\User', 38, 'authToken', 'a2f14e44281c11d4dd9e0fc0f733c09bf9f244146302372fa118c1f59f92a268', '[\"*\"]', 0.0, '2025-06-24 23:21:41', NULL, '2025-06-24 23:21:20', '2025-06-24 23:21:41'),
(16, 'App\\Models\\User', 38, 'authToken', '4d9e99bebebfdce793ac250af553c11ca38ec36f7590009f3cb0f71b4006aff8', '[\"*\"]', 0.0, NULL, NULL, '2025-06-25 01:17:51', '2025-06-25 01:17:51'),
(17, 'App\\Models\\User', 38, 'authToken', '93204be434ebaecee2b91c2f577585d220eda77cb3ecb2b65d6917ea88d7b676', '[\"*\"]', 0.0, '2025-06-25 01:40:08', NULL, '2025-06-25 01:20:44', '2025-06-25 01:40:08'),
(18, 'App\\Models\\User', 38, 'authToken', '1a164613708e475b9f0973a3e59ac6084cb961188edeae0c8f39d4d70464b7bb', '[\"*\"]', 0.0, '2025-06-25 05:54:20', NULL, '2025-06-25 01:40:38', '2025-06-25 05:54:20'),
(19, 'App\\Models\\User', 40, 'authToken', '73a503fc2c39776d4d1ececccca504340d29362acbb6aefa6f6c6eb433936bc3', '[\"*\"]', 0.0, '2025-06-25 17:18:51', NULL, '2025-06-25 05:54:48', '2025-06-25 17:18:52'),
(20, 'App\\Models\\User', 40, 'authToken', '6620a99fed4b3fa84c984a596f6956a4f00662017f38b36dc4e245929cc52782', '[\"*\"]', 0.0, '2025-06-26 00:25:03', NULL, '2025-06-25 20:21:56', '2025-06-26 00:25:03'),
(21, 'App\\Models\\User', 40, 'authToken', '3aa0168f95698d60e4d402affccd986554c1b0fe008022d027c0a618eb71edfe', '[\"*\"]', 0.0, '2025-06-26 00:28:20', NULL, '2025-06-26 00:26:50', '2025-06-26 00:28:20'),
(22, 'App\\Models\\User', 42, 'auth_token', '499c9f7594a747b0eedff09ff5f5254a3bc9e3337f909639cf0fecd972fa011a', '[\"*\"]', 0.0, NULL, NULL, '2025-06-26 00:29:09', '2025-06-26 00:29:09'),
(23, 'App\\Models\\User', 42, 'authToken', '1e8485e77f8250d8eaee30a4b3ab40923db9e501d75d1648713ab54ede408156', '[\"*\"]', 0.0, '2025-06-26 00:29:48', NULL, '2025-06-26 00:29:36', '2025-06-26 00:29:48'),
(24, 'App\\Models\\User', 40, 'authToken', 'db82a9e7c26c1d3b80bd8324f4f78fe33a1b5960de597b26bcbf526ed25d3768', '[\"*\"]', 0.0, '2025-06-27 03:35:01', NULL, '2025-06-26 00:30:08', '2025-06-27 03:35:01'),
(25, 'App\\Models\\User', 38, 'authToken', '83b49875287e474785d044543a774b21e28e1d480cf60c6fd400f290bddaf2b0', '[\"*\"]', 0.0, '2025-06-27 22:07:56', NULL, '2025-06-27 03:35:39', '2025-06-27 22:07:56'),
(26, 'App\\Models\\User', 38, 'authToken', '8833f5acf6694a4379016d8c949f810474a30b5927ec7c0842baf495b2ba3c59', '[\"*\"]', 0.0, '2025-06-28 01:32:46', NULL, '2025-06-27 22:07:24', '2025-06-28 01:32:46'),
(27, 'App\\Models\\User', 40, 'authToken', '46a4465ca23e27d18b9aca743c1a96e7b915bb3f2f1b48922f9670fa3c06f18b', '[\"*\"]', 0.0, '2025-06-28 01:34:17', NULL, '2025-06-28 01:33:32', '2025-06-28 01:34:17'),
(28, 'App\\Models\\User', 40, 'authToken', '2c57beda2dce43a70637c5d85358ce161d72b3e6a8020f3abd01daa2803d0943', '[\"*\"]', 0.0, '2025-06-28 01:35:34', NULL, '2025-06-28 01:35:06', '2025-06-28 01:35:34'),
(29, 'App\\Models\\User', 38, 'authToken', '926ce5580366c4bfdb850a4ad91051490f7d52cfe6bc34e1fba2cc226b771471', '[\"*\"]', 0.0, '2025-06-28 11:27:40', NULL, '2025-06-28 01:35:49', '2025-06-28 11:27:40'),
(30, 'App\\Models\\User', 40, 'authToken', 'ce3ec62162c0206c77c875330322dc750df6e361e51e74fdbdc5c0af272582b1', '[\"*\"]', 0.0, '2025-06-28 11:30:37', NULL, '2025-06-28 11:28:56', '2025-06-28 11:30:37'),
(31, 'App\\Models\\User', 38, 'authToken', '9d56a08cef3f3cb4a6002a109bd7b22ebfa04c941e8dda5e20325c5fefd11f7f', '[\"*\"]', 0.0, '2025-06-29 09:19:55', NULL, '2025-06-28 11:32:19', '2025-06-29 09:19:55'),
(32, 'App\\Models\\User', 40, 'authToken', '8c09cca6e4336db3857a9857f6cb51cc4bcd6a8e26ba8c407f222f33ae8caba0', '[\"*\"]', 0.0, '2025-06-29 10:23:33', NULL, '2025-06-29 09:20:56', '2025-06-29 10:23:33'),
(33, 'App\\Models\\User', 38, 'authToken', 'e30cf1a289c4ced788fa08e971b3f9b0d825edbe0c29e001c043269507c98101', '[\"*\"]', 0.0, '2025-06-29 10:28:08', NULL, '2025-06-29 10:24:10', '2025-06-29 10:28:08'),
(34, 'App\\Models\\User', 40, 'authToken', '75ea0710ff1bef2b4a4c39970c6054270d902f5e71fc5d56b451b13576688cd5', '[\"*\"]', 0.0, '2025-06-30 01:16:49', NULL, '2025-06-29 10:28:16', '2025-06-30 01:16:49'),
(35, 'App\\Models\\User', 38, 'authToken', '886c9e40f379c6d150e8abe17134455e28fd22d8571c0f3cf92ece3742ff8614', '[\"*\"]', 0.0, '2025-06-30 04:42:19', NULL, '2025-06-30 01:17:51', '2025-06-30 04:42:19'),
(36, 'App\\Models\\User', 38, 'authToken', 'a015baaf4dfa313365f8a599475228bfcdc65fb65e1f0075638241e1722bd228', '[\"*\"]', 0.0, '2025-06-30 18:55:09', NULL, '2025-06-30 04:41:32', '2025-06-30 18:55:09'),
(37, 'App\\Models\\User', 38, 'authToken', '9830abbdff9f06d76618868ed7be9498f815952e023f058bee4bbbebf8e866f6', '[\"*\"]', 0.0, '2025-06-30 18:58:44', NULL, '2025-06-30 18:55:07', '2025-06-30 18:58:44'),
(38, 'App\\Models\\User', 40, 'authToken', 'f0f138dbf630fe6fe3f36131b12070abc432a41d409b0211f270e38fc75e96ee', '[\"*\"]', 0.0, '2025-06-30 19:00:13', NULL, '2025-06-30 18:59:10', '2025-06-30 19:00:13'),
(39, 'App\\Models\\User', 38, 'authToken', 'a46714fd1206a8b95f42c6ffe51bfe2e392ea952ffc968ba89c0040f42b1f24d', '[\"*\"]', 0.0, '2025-06-30 20:56:06', NULL, '2025-06-30 20:54:00', '2025-06-30 20:56:06'),
(40, 'App\\Models\\User', 40, 'authToken', 'f91300894e3c7e15b8fd312975518afc8cd6a84838d9518b37fc586121f27ab5', '[\"*\"]', 0.0, '2025-06-30 20:58:06', NULL, '2025-06-30 20:56:16', '2025-06-30 20:58:06'),
(41, 'App\\Models\\User', 38, 'authToken', '9d6efb23b06fe9f83bc3c1b996fdd5d27c4386f58b52e9b4ed14fc864433818b', '[\"*\"]', 0.0, '2025-07-01 02:12:40', NULL, '2025-07-01 01:21:47', '2025-07-01 02:12:40'),
(42, 'App\\Models\\User', 40, 'authToken', '1cac1584a050f0005a647684a7c658da9de16d0e768076b50522a29401c5f5eb', '[\"*\"]', 0.0, '2025-07-01 02:14:08', NULL, '2025-07-01 02:12:55', '2025-07-01 02:14:08'),
(43, 'App\\Models\\User', 38, 'authToken', '89e1c09b5541afa83c1e48ad525652add152141102d39f38f7590cfd6025ffcb', '[\"*\"]', 0.0, '2025-07-01 02:26:10', NULL, '2025-07-01 02:24:36', '2025-07-01 02:26:10'),
(44, 'App\\Models\\User', 40, 'authToken', '09072ebca48e76a7291d6d9fc3b796fbe23c87520f93ebe8bde44faca2b8cdca', '[\"*\"]', 0.0, '2025-07-01 02:27:12', NULL, '2025-07-01 02:26:20', '2025-07-01 02:27:12');

-- --------------------------------------------------------

--
-- بنية الجدول `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `reservable_type` varchar(255) NOT NULL,
  `reservable_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  `is_paid` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `reservable_type`, `reservable_id`, `status`, `is_paid`, `created_at`, `updated_at`) VALUES
(3, 38, 'App\\Models\\Hotel', 6, 'pending', 0, '2025-06-28 03:01:20', '2025-06-28 03:01:20'),
(4, 38, 'App\\Models\\Trip', 6, 'pending', 0, '2025-06-28 03:09:35', '2025-06-28 03:09:35'),
(5, 38, 'App\\Models\\Restaurant', 8, 'pending', 0, '2025-06-28 07:30:21', '2025-06-28 07:30:21'),
(6, 38, 'App\\Models\\Cruise', 8, 'pending', 0, '2025-06-28 07:54:51', '2025-06-28 07:54:51'),
(7, 38, 'App\\Models\\Activity', 6, 'pending', 0, '2025-06-28 07:57:37', '2025-06-28 07:57:37'),
(8, 38, 'App\\Models\\Activity', 6, 'pending', 0, '2025-06-28 08:00:18', '2025-06-28 08:00:18'),
(9, 38, 'App\\Models\\Activity', 9, 'pending', 0, '2025-06-28 08:03:34', '2025-06-28 08:03:34'),
(10, 38, 'App\\Models\\Activity', 8, 'pending', 0, '2025-06-28 08:48:14', '2025-06-28 08:48:14'),
(11, 38, 'App\\Models\\Restaurant', 24, 'pending', 0, '2025-06-30 06:21:26', '2025-06-30 06:21:26'),
(12, 38, 'App\\Models\\Trip', 11, 'pending', 0, '2025-06-30 20:54:12', '2025-06-30 20:54:12');

-- --------------------------------------------------------

--
-- بنية الجدول `restaurants`
--

CREATE TABLE `restaurants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `location` varchar(255) NOT NULL,
  `booking_link` varchar(255) DEFAULT NULL,
  `property_type` varchar(255) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `restaurants`
--

INSERT INTO `restaurants` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `rate`, `location`, `booking_link`, `property_type`, `cuisine`, `features`, `created_at`, `updated_at`) VALUES
(24, 'Al Khal Egyptian Restaurant', 'Al Khal Egyptian Restaurant', 'Throughout the centuries, Egyptian cuisine has been part of the country’s heritage, history and romantic past. At Al Khal, the finest authentic Egyptian dishes and delights are brought to you in a classic setting with a modern twist and traditionally perfect service. Enjoy the tastes and flavours of the ages created for you.ddle Eastern, $$$$', 'Throughout the centuries, Egyptian cuisine has been part of the country’s heritage, history and romantic past. At Al Khal, the finest authentic Egyptian dishes and delights are brought to you in a classic setting with a modern twist and traditionally perfect service. Enjoy the tastes and flavours of the ages created for you.', 4.9, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g294201-d2715802-Reviews-Al_Khal_Egyptian_Restaurant-Cairo_Cairo_Governorate.html', 'Lunch, Dinner, Brunch', 'Barbecue, Middle Eastern, Egyptian, Arabic', '[\"Free Wifi\",\"Full Bar\",\"Reservations\",\"Seating\",\"Validated Parking\",\"Visa\"]', '2025-06-29 17:15:20', '2025-06-29 17:15:20'),
(25, 'Bab El-Sharq', 'Bab El-Sharq', 'Flavors from around the Middle East are brought together at Bab El-Sharq. Set amid lush gardens with a view of the Egyptian Museum, the outdoor restaurant offers a traditional dining experience in the heart of Cairo. Mezze and signature dishes are paired with flavored shisha, live entertainment and broadcasts of major sporting events. Daily due', 'Flavors from around the Middle East are brought together at Bab El-Sharq. Set amid lush gardens with a view of the Egyptian Museum, the outdoor restaurant offers a traditional dining experience in the heart of Cairo. Mezze and signature dishes are paired with flavored shisha, live entertainment and broadcasts of major sporting events. Daily due', 4.8, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g294201-d8754718-Reviews-Bab_El_Sharq-Cairo_Cairo_Governorate.html', 'Dinner', 'Lebanese, Mediterranean, Barbecue, Middle Eastern, Egyptian, Arabic', '[\"Free Wifi\",\"Full Bar\"]', '2025-06-29 17:18:13', '2025-06-29 17:18:13'),
(26, 'La Zisa', 'La Zisa', 'La Zisa is a modern and relaxed dining space that offers authentic Southern Italian cuisine where guests can enjoy their dining experience overlooking bright views of the Nile.', 'La Zisa is a modern and relaxed dining space that offers authentic Southern Italian cuisine where guests can enjoy their dining experience overlooking bright views of the Nile.', 4.9, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g294201-d23199235-Reviews-La_Zisa-Cairo_Cairo_Governorate.html', 'Breakfast, Lunch, Dinner', 'Italian, International', '[\"Reservations\",\"Seating\",\"Validated Parking\",\"Visa\"]', '2025-06-29 17:27:00', '2025-06-29 17:27:00'),
(27, 'Revolving Restaurant', 'Revolving Restaurant', 'The most spectacular restaurant in all of Cairo, the Revolving Restaurant provides diners with a staggering panoramic view of the Nile River, the Pyramids and the ancient cosmopolitan city of Cairo while they savor culinary delights from an international gourmet menu, prepared in the restaurant’s show kitchen. Rotating 360 degrees', 'The most spectacular restaurant in all of Cairo, the Revolving Restaurant provides diners with a staggering panoramic view of the Nile River, the Pyramids and the ancient cosmopolitan city of Cairo while they savor culinary delights from an international gourmet menu, prepared in the restaurant’s show kitchen. Rotating 360 degrees', 4.6, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g294201-d799893-Reviews-Revolving_Restaurant-Cairo_Cairo_Governorate.html', 'Lunch, Dinner, Late Night', 'International, Mediterranean, European, Healthy', '[\"Validated Parking\",\"Visa\"]', '2025-06-29 17:30:45', '2025-06-29 17:30:45'),
(28, 'Balbaa Village', 'Balbaa Village', '34 Al Sagh Mohamed Abd Al Salam, Alexandria 5434033 Egypt', '34 Al Sagh Mohamed Abd Al Salam, Alexandria 5434033 Egypt', 4.2, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g295398-d952986-Reviews-Balbaa_Village-Alexandria_Alexandria_Governorate.html', 'Lunch, Dinner, Late Night', 'Seafood, Mediterranean, Barbecue, Grill, Middle Eastern, Egyptian', '[\"Free Wifi\",\"Full Bar\",\"Reservations\",\"Seating\",\"Validated Parking\",\"Visa\"]', '2025-06-29 17:36:43', '2025-06-29 17:36:43'),
(29, 'Ginger Asian Restaurant', 'Ginger Asian Restaurant', 'Embark on a journey of Southeast Asian cuisine in this warm and friendly venue, open for lunch and dinner. Embrace the casual atmosphere and sample a range of authentic delights from Chinese, Japanese and Thai cuisine.', 'Embark on a journey of Southeast Asian cuisine in this warm and friendly venue, open for lunch and dinner. Embrace the casual atmosphere and sample a range of authentic delights from Chinese, Japanese and Thai cuisine.', 4.9, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g295398-d4916014-Reviews-Ginger_Asian_Restaurant-Alexandria_Alexandria_Governorate.html', 'Breakfast, Lunch, Dinner, Drinks', 'Chinese, Japanese, Seafood, Sushi, Asian, Shanghai, Hong Kong', '[\"Validated Parking\",\"Visa\"]', '2025-06-29 17:39:42', '2025-06-29 17:39:42'),
(30, 'The Cigar Bar', 'The Cigar Bar', 'Cast away your stress and enjoy a drink or favorite cocktail in our Cigar Bar. Our contemporary bar is serving light meals, snacks and refreshments all day. The bar is renowned for the wide selection of famous cigar brands.', 'Cast away your stress and enjoy a drink or favorite cocktail in our Cigar Bar. Our contemporary bar is serving light meals, snacks and refreshments all day. The bar is renowned for the wide selection of famous cigar brands.', 5.0, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g295398-d19106088-Reviews-The_Cigar_Bar-Alexandria_Alexandria_Governorate.html', 'Lunch, Dinner, Late Night, Drinks', 'Bar, International, Mediterranean, Wine Bar', '[\"Free Wifi\",\"Full Bar\",\"Reservations\",\"Seating\",\"Validated Parking\",\"Visa\"]', '2025-06-29 17:41:18', '2025-06-29 17:41:18'),
(31, 'Fish Market', 'Fish Market', 'El Corniche Rd. Beside Scout Club, Alexandria 21511 Egypt', 'El Corniche Rd. Beside Scout Club, Alexandria 21511 Egypt', 4.0, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g295398-d2727171-Reviews-Fish_Market-Alexandria_Alexandria_Governorate.html', 'Lunch, Dinner, Late Night', 'Seafood, Mediterranean, Egyptian', '[\"Seating\",\"Validated Parking\",\"Visa\"]', '2025-06-29 17:43:43', '2025-06-29 17:43:43'),
(32, 'Roberto\'s Italian Restaurant', 'Roberto\'s Italian Restaurant', 'An upscale Italian restaurant with a contemporary elegance and sophistication. Roberto’s spirit carries through the entire dining experience with a core philosophy of being Italian in all possible facets. Working with only the best of Italian products and produce, enables the kitchen to be true to one of the most recognizable aspects', 'An upscale Italian restaurant with a contemporary elegance and sophistication. Roberto’s spirit carries through the entire dining experience with a core philosophy of being Italian in all possible facets. Working with only the best of Italian products and produce, enables the kitchen to be true to one of the most recognizable aspects', 4.8, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g295398-d12442240-Reviews-Roberto_s_Italian_Restaurant-Alexandria_Alexandria_Governorate.html', 'Lunch, Dinner, Drinks', 'Italian, Pizza, Mediterranean, European', '[\"Full Bar\",\"Reservations\"]', '2025-06-29 17:45:54', '2025-06-29 17:45:54'),
(33, 'Branzino Fish Restaurant', 'Branzino Fish Restaurant', 'El Geish Road Casino Alshatby, Alexandria 21599 Egypt', 'El Geish Road Casino Alshatby, Alexandria 21599 Egypt', 4.5, 'Egypt, Africa', 'https://www.tripadvisor.com/Restaurant_Review-g295398-d24081413-Reviews-Branzino_Fish_Restaurant-Alexandria_Alexandria_Governorate.html', 'Lunch, Dinner', 'Seafood, Mediterranean, Healthy, Egyptian', '[\"Free Wifi\",\"Full Bar\",\"Reservations\",\"Seating\",\"Validated Parking\",\"Visa\"]', '2025-06-29 17:47:57', '2025-06-29 17:47:57');

-- --------------------------------------------------------

--
-- بنية الجدول `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `rate` tinyint(3) UNSIGNED NOT NULL,
  `comment` text DEFAULT NULL,
  `reviewable_id` bigint(20) UNSIGNED NOT NULL,
  `reviewable_type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` text NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('k2dUsRruVtxreTDkQEOJZewWPHLCDp52rVxqmu6X', NULL, '127.0.0.1', 'PostmanRuntime/7.44.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiek5WVjZLd3ZjT3BMWmRhQjdFeW9MRVBYOTF5NVRSeWdjd3QzOUF2YSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750798347),
('kYJp9O1bS6o2U8TZGdy2uxIWFfC0Ii2XnJ9e3sCw', NULL, '127.0.0.1', 'PostmanRuntime/7.44.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVThoR1FERG9scnNrMDJYZG5YVnllRjBDaXVSMmlkUk85OExvV1dlWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751070467),
('ZgMeZGzbnWME2kmEhiJwuaRp0hQOj96FqKZWJ5dB', NULL, '127.0.0.1', 'PostmanRuntime/7.44.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQkRpNUplNUlpRVhhWkVRdEltWWNMM2dyMllIUnpGM1g5VEtzaVhtNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751223728);

-- --------------------------------------------------------

--
-- بنية الجدول `trips`
--

CREATE TABLE `trips` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `guide_id` bigint(20) UNSIGNED NOT NULL,
  `rate` decimal(2,1) NOT NULL DEFAULT 0.0,
  `duration` varchar(255) DEFAULT NULL,
  `continent` varchar(255) DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `booking_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `trips`
--

INSERT INTO `trips` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `location`, `price`, `guide_id`, `rate`, `duration`, `continent`, `difficulty`, `created_at`, `updated_at`, `start_date`, `end_date`, `booking_link`) VALUES
(9, 'Moroccan Journey Through Culture and History', 'رحلة مغربية عبر الثقافة والتاريخ', 'Embark on a tour through Morocco starting from Casablanca, designed to showcase the country’s top attractions. Journey through cities like Marrakech, Rabat, Chefchaouen, and Fez, and venture into the stunning Sahara Desert. Explore bustling markets filled with Moroccan treasures.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Abdelaziz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'انطلق في جولة عبر المغرب تبدأ من الدار البيضاء، مصممة لتسليط الضوء على أبرز معالم البلاد. سافر عبر مدن مثل مراكش والرباط وشفشاون وفاس، وانغمس في سحر الصحراء الكبرى. استكشف الأسواق النابضة بالحياة والمليئة بالكنوز المغربية.\n\nهذا البرنامج هو مجرد نقطة انطلاق، فجميع الخدمات قابلة للتخصيص بالكامل لتناسب احتياجاتك ورغباتك في السفر. هل تبحث عن فنادق مختلفة، أو تجارب أخرى، أو مسار بديل؟ تواصل مع عبد العزيز اليوم للحصول على عرض سعر مُخصص. أدخل بياناتك واحصل على عرض سعر يناسب تفضيلاتك.', 'Morocco', 3499.00, 42, 5.0, '12 Day', 'Africa', 'medium', '2025-06-29 09:46:37', '2025-06-29 09:46:37', NULL, NULL, NULL),
(10, 'Luxury & Legacy: A Journey Through Nepal', 'الفخامة والتراث: رحلة عبر نيبال', 'Explore ancient temples in Kathmandu, trek through the Annapurna foothills, visit community projects in Pokhara, and enjoy wildlife safaris in Chitwan. Stay in luxurious eco-lodges, savor Newari cuisine, and return home with unforgettable memories of heritage, nature, and connection.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ajay today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'استكشف المعابد القديمة في كاتماندو، وتجول عبر سفوح جبال أنابورنا، وزُر المشاريع المجتمعية في بوكارا، واستمتع برحلات سفاري لمشاهدة الحياة البرية في تشيتوان. أقم في نُزُل بيئية فاخرة، وتلذذ بمأكولات نيواري، وعد إلى ديارك بذكريات لا تُنسى من التراث والطبيعة والتواصل.\n\nهذا البرنامج السياحي ليس سوى نقطة انطلاق، فجميع الخدمات قابلة للتخصيص بالكامل لتناسب رغباتك واحتياجاتك في السفر. هل تبحث عن فنادق مختلفة، أو تجارب أخرى، أو مسار بديل؟ تواصل مع أجاي اليوم للحصول على عرض سعر مُخصص. أدخل بياناتك واحصل على عرض سعر يُناسب تفضيلاتك.', 'Bhutan, China, Nepal', 3255.00, 42, 0.0, '11 Day', 'Asia', 'easy', '2025-06-29 09:51:00', '2025-06-29 09:51:00', NULL, NULL, NULL),
(11, 'Myth & Mountains: Northern Greece Unveiled', 'الأسطورة والجبال: كشف النقاب عن شمال اليونان', 'Explore Northern Greece on an 8-day custom trip. Start in lively Thessaloniki, then visit the cliff-top monasteries of Meteora. Continue to Ioannina for lake views and Ottoman charm, and end in the stone villages of Zagorochoria, surrounded by mountain beauty and tradition.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Dimitrios today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'استكشف شمال اليونان في رحلة مُصممة خصيصًا لك لمدة 8 أيام. ابدأ من مدينة سالونيك النابضة بالحياة، ثم قم بزيارة أديرة ميتيورا على قمم الجرف. تابع رحلتك إلى يوانينا للاستمتاع بإطلالات البحيرة وسحر الحضارة العثمانية، واختتم رحلتك في قرى زاغوروخوريا الحجرية، المُحاطة بجمال الجبال وتراثها العريق.\n\nهذا البرنامج السياحي هو مجرد نقطة انطلاق، حيث يُمكن تخصيص جميع الخدمات بالكامل لتناسب رغباتك واحتياجاتك في السفر. هل تبحث عن فنادق مختلفة، أو تجارب مُختلفة، أو مسار بديل؟ تواصل مع ديميتريوس اليوم للحصول على عرض سعر مُخصص لك. ما عليك سوى إدخال بياناتك واحصل على عرض سعر مُناسب لتفضيلاتك.', 'Greece, Italy', 4563.00, 42, 1.0, '8 Day', 'Europe', 'easy', '2025-06-29 09:57:01', '2025-06-29 09:57:01', NULL, NULL, NULL),
(12, 'Magical Days in Japan: Exploring Tokyo and surrounding areas', 'أيام سحرية في اليابان: استكشاف طوكيو والمناطق المحيطة بها', 'This 5-day journey offers a balanced mix of fast-paced city life, cultural exploration, and scenic relaxation.', 'تقدم هذه الرحلة التي تستغرق خمسة أيام مزيجًا متوازنًا من حياة المدينة السريعة والاستكشاف الثقافي والاسترخاء وسط المناظر الطبيعية الخلابة.', 'Japan', 2500.00, 42, 3.5, '5 Day', 'Asia', 'hard', '2025-06-29 10:00:33', '2025-06-29 10:00:33', NULL, NULL, NULL),
(13, '7 Days / 6 Nights - Egypt’s Ancient Wonders & Nile Charm: Cairo, Dahabiya from Aswan to Luxor', '7 أيام / 6 ليالي - عجائب مصر القديمة وسحر النيل: القاهرة، الدهبية من أسوان إلى الأقصر', 'Enjoy an immersive 7-day journey through Egypt, beginning in Cairo with the iconic pyramids and Egyptian Museum. Fly to Aswan to board a luxurious Dahabiya for a serene Nile cruise. Visit charming villages, explore ancient temples in Kom Ombo and Edfu, and experience local life.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'استمتع برحلة غامرة لمدة 7 أيام عبر مصر، تبدأ من القاهرة بزيارة الأهرامات الشهيرة والمتحف المصري. سافر إلى أسوان على متن سفينة \"دهبية\" الفاخرة لرحلة نيلية هادئة. زُر قرى ساحرة، واستكشف معابد كوم أمبو وإدفو القديمة، وتعرّف على الحياة المحلية.\n\nهذا البرنامج هو مجرد نقطة انطلاق، فجميع الخدمات قابلة للتخصيص بالكامل لتناسب رغباتك واحتياجاتك في السفر. هل تبحث عن فنادق مختلفة، أو تجارب أخرى، أو مسار بديل؟ تواصل مع \"حبيبة\" اليوم للحصول على عرض سعر مُخصص. أدخل بياناتك واحصل على عرض سعر يُناسب تفضيلاتك.', 'Egypt', 2420.00, 42, 4.0, '7 Day', 'Africa', 'easy', '2025-06-29 10:04:17', '2025-06-29 10:04:17', NULL, NULL, NULL),
(14, 'Enchanting Egypt: From Cairo’s Pyramids to Luxor’s Temples and a Nile Voyage', 'Enchanting Egypt: From Cairo’s Pyramids to Luxor’s Temples and a Nile Voyage', 'A thrilling 7-day adventure from Cairo to Luxor, beginning with the iconic Pyramids of Giza and the Sphinx. Dive into ancient history at the Egyptian Museum before flying to Luxor to start a luxurious Nile cruise.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Youssef today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'A thrilling 7-day adventure from Cairo to Luxor, beginning with the iconic Pyramids of Giza and the Sphinx. Dive into ancient history at the Egyptian Museum before flying to Luxor to start a luxurious Nile cruise.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Youssef today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 187.00, 42, 5.0, '8 Day', 'Africa', 'easy', '2025-06-29 10:18:14', '2025-06-29 10:18:14', NULL, NULL, NULL),
(15, 'From Pyramids to Paradise: 9 Days of Cairo, Nile Cruise & Red Sea Bliss', 'From Pyramids to Paradise: 9 Days of Cairo, Nile Cruise & Red Sea Bliss', '\"Experience the best of Egypt in 9 days, combining history, culture, and relaxation. Start in Cairo with visits to the iconic Pyramids, Egyptian Museum, and Citadel. Escape to the Red Sea for a day at Ain Sokhna\'s serene beaches before flying to Aswan to embark on a luxurious Nile Cruise.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', '\"Experience the best of Egypt in 9 days, combining history, culture, and relaxation. Start in Cairo with visits to the iconic Pyramids, Egyptian Museum, and Citadel. Escape to the Red Sea for a day at Ain Sokhna\'s serene beaches before flying to Aswan to embark on a luxurious Nile Cruise.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 240.00, 42, 4.6, '9 Day', 'Africa', 'easy', '2025-06-29 10:21:10', '2025-06-29 10:21:10', NULL, NULL, NULL),
(16, 'Desert Wonders: A 7-Day Journey Through Siwa, Bahariya, and the White Desert', 'Desert Wonders: A 7-Day Journey Through Siwa, Bahariya, and the White Desert', 'Explore Egypt\'s majestic deserts with our Siwa Oasis, Bahariya, and White Desert tour. Discover ancient temples, explore historic tombs, and marvel at surreal landscapes like the Crystal Mountain.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore Egypt\'s majestic deserts with our Siwa Oasis, Bahariya, and White Desert tour. Discover ancient temples, explore historic tombs, and marvel at surreal landscapes like the Crystal Mountain.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 238.00, 42, 3.0, '7 Day', 'Africa', 'hard', '2025-06-29 10:23:25', '2025-06-29 10:23:25', NULL, NULL, NULL),
(17, 'Empires and Wonders: From Cairo\'s Pyramids to Jordan', 'Empires and Wonders: From Cairo\'s Pyramids to Jordan', 'Embark on a 12-day journey across Egypt and Jordan, visiting historic sites from the Pyramids of Giza to Amman and Petra. Start in Cairo exploring ancient and religious landmarks, and visit Alexandria. In Amman, marvel at Petra and Wadi Rum\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Embark on a 12-day journey across Egypt and Jordan, visiting historic sites from the Pyramids of Giza to Amman and Petra. Start in Cairo exploring ancient and religious landmarks, and visit Alexandria. In Amman, marvel at Petra and Wadi Rum\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 388.00, 42, 5.0, '12 Day', 'Africa', 'easy', '2025-06-29 10:32:16', '2025-06-29 10:32:16', NULL, NULL, NULL),
(18, 'Pharaohs to Beaches: A 12-Day Egyptian Odyssey', 'Pharaohs to Beaches: A 12-Day Egyptian Odyssey', 'Embark on a 12-day, 11-night journey across Egypt, from the ancient pyramids in Cairo to the luxurious resorts of Sharm El Sheikh. Begin your adventure in Cairo with a visit to the iconic pyramids and the Egyptian Museum. Travel by train to Aswan for a Nile cruise, exploring historic temples along\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Youssef today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Embark on a 12-day, 11-night journey across Egypt, from the ancient pyramids in Cairo to the luxurious resorts of Sharm El Sheikh. Begin your adventure in Cairo with a visit to the iconic pyramids and the Egyptian Museum. Travel by train to Aswan for a Nile cruise, exploring historic temples along\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Youssef today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 388.00, 42, 5.0, '12 Day', 'Africa', 'medium', '2025-06-29 10:34:24', '2025-06-29 10:34:24', NULL, NULL, NULL),
(19, 'Siwa Oasis Escape: A 5-Day Cultural and Historical Journey.', 'Siwa Oasis Escape: A 5-Day Cultural and Historical Journey.', 'A fascinating5-day journey from Cairo to Siwa Oasis, exploring World War II sites at Alamein and ancient temples dedicated to Amon and Amun Ra. Unwind at Cleopatra Spring, and take a desert safari to Shiata Lake and Bir Wahid spring. Experience Bedouin culture and the tranquility of Siwan villages.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'A fascinating5-day journey from Cairo to Siwa Oasis, exploring World War II sites at Alamein and ancient temples dedicated to Amon and Amun Ra. Unwind at Cleopatra Spring, and take a desert safari to Shiata Lake and Bir Wahid spring. Experience Bedouin culture and the tranquility of Siwan villages.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 100.00, 42, 3.5, '5 Day', 'Africa', 'easy', '2025-06-29 10:36:04', '2025-06-29 10:36:04', NULL, NULL, NULL),
(20, 'Egypt’s Timeless Treasures: A Cost-Effective 8-Day Tour', 'Egypt’s Timeless Treasures: A Cost-Effective 8-Day Tour', 'Hop on an 8-day budget-friendly journey through Egypt\'s ancient heart, from Cairo\'s lively streets to the timeless Nile shores in Luxor and Aswan. Begin with the iconic Pyramids and Sphinx at Giza, then explore the Nile on a cruise from Luxor.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Hop on an 8-day budget-friendly journey through Egypt\'s ancient heart, from Cairo\'s lively streets to the timeless Nile shores in Luxor and Aswan. Begin with the iconic Pyramids and Sphinx at Giza, then explore the Nile on a cruise from Luxor.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 238.00, 42, 5.0, '8 Day', 'Africa', 'easy', '2025-06-29 10:37:44', '2025-06-29 10:37:44', NULL, NULL, NULL),
(21, 'The Best of Egypt', 'The Best of Egypt', 'Explore the history and culture of Egypt and its ancient rulers on this trip throughout the country. Start and end in Cairo and make your way down to Luxor, Aswan and Abu Simbel. Instead of domestic flights, you will hop on luxurious sleeper trains for your journey.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore the history and culture of Egypt and its ancient rulers on this trip throughout the country. Start and end in Cairo and make your way down to Luxor, Aswan and Abu Simbel. Instead of domestic flights, you will hop on luxurious sleeper trains for your journey.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 190.00, 42, 5.0, '8 Day', 'Africa', 'easy', '2025-06-29 10:39:40', '2025-06-29 10:39:40', NULL, NULL, NULL),
(22, 'Cairo & a luxurious Dahabieh sailing cruise', 'Cairo & a luxurious Dahabieh sailing cruise', 'Explore Egypt at a leisurely pace on board a dahabieh, a traditional sailing ship. In Cairo, visit the Egyptian Museum of Antiquities, and in Giza, the pyramids; cruise to world-renowned sites alongside lesser-known treasures, such as Luxor’s tombs, el Kab and Gebel Silsileh’s Temple of Horemheb.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore Egypt at a leisurely pace on board a dahabieh, a traditional sailing ship. In Cairo, visit the Egyptian Museum of Antiquities, and in Giza, the pyramids; cruise to world-renowned sites alongside lesser-known treasures, such as Luxor’s tombs, el Kab and Gebel Silsileh’s Temple of Horemheb.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 537.00, 42, 4.0, '12 Day', 'Africa', 'easy', '2025-06-29 10:41:40', '2025-06-29 10:41:40', NULL, NULL, NULL),
(23, 'A Nile Cruise in Egypt', 'A Nile Cruise in Egypt', 'Experience Cairo with the pyramids of Giza and the Egyptian museum before flying to Luxor to board your Nile cruise. Highlights include Karnak temple, Valley of Kings, Hatshepsut temple and an optional visit to Abu Simbel. Spend your last night in fascinating Cairo.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Experience Cairo with the pyramids of Giza and the Egyptian museum before flying to Luxor to board your Nile cruise. Highlights include Karnak temple, Valley of Kings, Hatshepsut temple and an optional visit to Abu Simbel. Spend your last night in fascinating Cairo.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 218.00, 42, 2.5, '7 Day', 'Africa', 'medium', '2025-06-29 10:43:26', '2025-06-29 10:43:26', NULL, NULL, NULL),
(24, 'Five Star Egypt', 'Five Star Egypt', 'A tour through the ancient wonders of Giza, Cairo, Luxor, and Aswan. Start and end your trip in beautiful Cairo, exploring the surroundings before heading down to Aswan: you will spend four nights on a luxurious Nile cruise ship, discovering ancient sites such as Abu Simbel.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'A tour through the ancient wonders of Giza, Cairo, Luxor, and Aswan. Start and end your trip in beautiful Cairo, exploring the surroundings before heading down to Aswan: you will spend four nights on a luxurious Nile cruise ship, discovering ancient sites such as Abu Simbel.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Ahmed today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 288.00, 42, 4.0, '8 Day', 'Africa', 'easy', '2025-06-29 10:44:50', '2025-06-29 10:44:50', NULL, NULL, NULL),
(25, 'Southern Spain & Marrakesh', 'Southern Spain & Marrakesh', 'Southern Spain has been a popular tourist destination for many years, as has Marrakesh. This trip discovers the most special areas of Southern Spain and Marrakesh, opting for culture and history and beauty.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Southern Spain has been a popular tourist destination for many years, as has Marrakesh. This trip discovers the most special areas of Southern Spain and Marrakesh, opting for culture and history and beauty.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 118.00, 42, 4.0, '12 Day', 'Europe', 'easy', '2025-06-29 10:50:56', '2025-06-29 10:50:56', NULL, NULL, NULL),
(26, '7-Day Spain & Portugal Tour from Madrid: Barcelona, Granada, Seville, Lisbon', '7-Day Spain & Portugal Tour from Madrid: Barcelona, Granada, Seville, Lisbon', 'Explore Iberian Peninsula\'s rich history and culture on this 7-day tour through Spain and Portugal. Visit iconic cities like Barcelona, Granada, Seville, Lisbon. Experiencing landmarks such as Alhambra Palace, Hemingway’s beloved town – Ronda, Sagrada Família Church, etc.\n\nThis group tour offers a seamless way to explore, with fixed departure dates, accommodations, activities, and transportation, all led by a dedicated guide. While most aspects are pre-set, there may be options to tailor room standards or activity preferences. Click here to request your quote and secure your spot.', 'Explore Iberian Peninsula\'s rich history and culture on this 7-day tour through Spain and Portugal. Visit iconic cities like Barcelona, Granada, Seville, Lisbon. Experiencing landmarks such as Alhambra Palace, Hemingway’s beloved town – Ronda, Sagrada Família Church, etc.\n\nThis group tour offers a seamless way to explore, with fixed departure dates, accommodations, activities, and transportation, all led by a dedicated guide. While most aspects are pre-set, there may be options to tailor room standards or activity preferences. Click here to request your quote and secure your spot.', 'Spain', 810.00, 42, 2.0, '7 Day', 'Europe', 'easy', '2025-06-29 10:54:39', '2025-06-29 10:54:39', NULL, NULL, NULL),
(27, 'Delightful Southern Spain', 'Delightful Southern Spain', 'Experience a week in the vibrant south of Spain, exploring three of its iconic cities. Immerse yourself in local culture with our curated activities, and unwind in centrally located, comfortable hotels. Your unforgettable Spanish adventure awaits!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Experience a week in the vibrant south of Spain, exploring three of its iconic cities. Immerse yourself in local culture with our curated activities, and unwind in centrally located, comfortable hotels. Your unforgettable Spanish adventure awaits!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 850.00, 42, 4.0, '8 Day', 'Europe', 'easy', '2025-06-29 10:56:20', '2025-06-29 10:56:20', NULL, NULL, NULL),
(28, 'Wonders of the North: A Spanish Adventure from Barcelona to Madrid', 'Wonders of the North: A Spanish Adventure from Barcelona to Madrid', 'Start in Barcelona, then journey north to San Sebastián for its beaches and cuisine. Explore Bilbao’s Guggenheim, the stunning Picos de Europa, charming Llanes, and historic León, ending your adventure in the vibrant heart of Madrid.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Start in Barcelona, then journey north to San Sebastián for its beaches and cuisine. Explore Bilbao’s Guggenheim, the stunning Picos de Europa, charming Llanes, and historic León, ending your adventure in the vibrant heart of Madrid.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 106.00, 42, 3.5, '12 Day', 'Europe', 'medium', '2025-06-29 10:59:00', '2025-06-29 10:59:00', NULL, NULL, NULL),
(29, 'Andalucían Road Trip', 'Andalucían Road Trip', 'Think of Spain, and what you\'re probably thinking of is Andalucía: flamenco dancers; sleepy white-washed villages and towns like Ronda, and grand palaces in historical cities such as Seville and Granada. Experience this stunning part of southern Spain on this unique, self-drive tour of Andalucía.', 'Think of Spain, and what you\'re probably thinking of is Andalucía: flamenco dancers; sleepy white-washed villages and towns like Ronda, and grand palaces in historical cities such as Seville and Granada. Experience this stunning part of southern Spain on this unique, self-drive tour of Andalucía.', 'Spain', 337.00, 42, 4.0, '12 Day', 'Europe', 'medium', '2025-06-29 11:01:16', '2025-06-29 11:01:16', NULL, NULL, NULL),
(30, 'Tenerife Explored', 'Tenerife Explored', 'Mount Teide, Spain’s tallest peak, dominates the island of Tenerife. The stunning north coast is packed with sweeping vistas and beautiful beaches. Explore this unique island paradise at your own pace, including a hike through Mount Teide National Park, with this exciting self-drive trip.', 'Mount Teide, Spain’s tallest peak, dominates the island of Tenerife. The stunning north coast is packed with sweeping vistas and beautiful beaches. Explore this unique island paradise at your own pace, including a hike through Mount Teide National Park, with this exciting self-drive trip.', 'Spain', 179.00, 42, 3.5, '8 Day', 'Europe', 'easy', '2025-06-29 11:03:07', '2025-06-29 11:03:07', NULL, NULL, NULL),
(31, 'Andalucía Explored', 'Andalucía Explored', 'Discover the best of Andalucía\'s breathtaking palaces, churches, museums, vineyards, and more, as you travel through spectacular scenery dotted with pueblos blancos and bordered by rugged mountains and coast en route to Granada, Seville, Ronda and Jerez de la Frontera.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Discover the best of Andalucía\'s breathtaking palaces, churches, museums, vineyards, and more, as you travel through spectacular scenery dotted with pueblos blancos and bordered by rugged mountains and coast en route to Granada, Seville, Ronda and Jerez de la Frontera.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 257.00, 42, 3.5, '9 Day', 'Europe', 'medium', '2025-06-29 11:05:59', '2025-06-29 11:05:59', NULL, NULL, NULL),
(32, 'A culinary experience in Seville', 'A culinary experience in Seville', 'Explore the cuisine and surroundings of Seville in Andalucia. From Iberian ham over sherry wines to the production and secrets of olive oil, this tour is an ideal weekend getaway. Decide yourself if you prefer a rental car or a chauffeur-driven car to explore the beauty of Andalucia.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore the cuisine and surroundings of Seville in Andalucia. From Iberian ham over sherry wines to the production and secrets of olive oil, this tour is an ideal weekend getaway. Decide yourself if you prefer a rental car or a chauffeur-driven car to explore the beauty of Andalucia.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 600.00, 42, 4.0, '4 Day', 'Europe', 'easy', '2025-06-29 11:09:26', '2025-06-29 11:09:26', NULL, NULL, NULL),
(33, 'Spanish Honeymoon', 'Spanish Honeymoon', 'Discover Andalusia, starting with the cultural city of Seville, then on to Córdoba and Granada, home of the stunning Alhambra Palace. Next you\'ll visit Granada and the Albayzin Arab quarter, then enjoy a stunning hot-air balloon ride, before ending your trip with a luxury boat trip from Marbella!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Discover Andalusia, starting with the cultural city of Seville, then on to Córdoba and Granada, home of the stunning Alhambra Palace. Next you\'ll visit Granada and the Albayzin Arab quarter, then enjoy a stunning hot-air balloon ride, before ending your trip with a luxury boat trip from Marbella!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 410.00, 42, 3.8, '10 Day', 'Europe', 'medium', '2025-06-29 11:11:14', '2025-06-29 11:11:14', NULL, NULL, NULL),
(34, 'Made for Madrid', 'Made for Madrid', 'Take to the Spanish capital for art, culture and a taste of life in the city, Madrileño-style. Explore age-old churches and pretty plazas, stroll through the lovely Buen Retiro Park and visit captivating Toledo. Then, come sundown, discover the city\'s vibrant barrios and lively nightlife.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Take to the Spanish capital for art, culture and a taste of life in the city, Madrileño-style. Explore age-old churches and pretty plazas, stroll through the lovely Buen Retiro Park and visit captivating Toledo. Then, come sundown, discover the city\'s vibrant barrios and lively nightlife.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Luis today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Spain', 157.00, 42, 4.0, '5 Day', 'Europe', 'easy', '2025-06-29 11:13:22', '2025-06-29 11:13:22', NULL, NULL, NULL),
(35, '11-Day China Highlights Tour with Li River', '11-Day China Highlights Tour with Li River', 'Experience China\'s political heart in Beijing, the ancient capital Xi’an, the laid-back city of Guilin, and the cosmopolitan metropolis of Shanghai. Visit the Forbidden City, the Great Wall, the Terracotta Warriors, the Li River, and the Bund.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Experience China\'s political heart in Beijing, the ancient capital Xi’an, the laid-back city of Guilin, and the cosmopolitan metropolis of Shanghai. Visit the Forbidden City, the Great Wall, the Terracotta Warriors, the Li River, and the Bund.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'China', 110.00, 42, 5.0, '12 Day', 'Asia', 'medium', '2025-06-29 11:31:37', '2025-06-29 11:31:37', NULL, NULL, NULL),
(36, 'Himalaya Adventure from Tibet to Kathmandu', 'Himalaya Adventure from Tibet to Kathmandu', 'Discover Tibet\'s awe-inspiring landscapes and monasteries, including Mount Everest, and then immerse yourself in Nepal\'s rich culture with visits to Kathmandu\'s vibrant markets and sacred temples. An unforgettable adventure through the Himalayas awaits!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Discover Tibet\'s awe-inspiring landscapes and monasteries, including Mount Everest, and then immerse yourself in Nepal\'s rich culture with visits to Kathmandu\'s vibrant markets and sacred temples. An unforgettable adventure through the Himalayas awaits!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'China', 110.00, 42, 4.0, '7 Day', 'Asia', 'easy', '2025-06-29 11:33:11', '2025-06-29 11:33:11', NULL, NULL, NULL),
(37, 'China\'s Skylines to Avatar Wonderland', 'China\'s Skylines to Avatar Wonderland', 'Explore the best of China in 14 days! Wander Shanghai\'s historic Bund, climb the Great Wall, marvel at the Terracotta Warriors, stroll through ancient Pingyao, and be awed by the stunning landscapes of Zhangjiajie. An unforgettable adventure awaits!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore the best of China in 14 days! Wander Shanghai\'s historic Bund, climb the Great Wall, marvel at the Terracotta Warriors, stroll through ancient Pingyao, and be awed by the stunning landscapes of Zhangjiajie. An unforgettable adventure awaits!\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'China', 102.00, 42, 5.0, '12 Day', 'Asia', 'medium', '2025-06-29 11:34:33', '2025-06-29 11:34:33', NULL, NULL, NULL),
(38, 'Ancient Capitals and Water Towns Tour', 'Ancient Capitals and Water Towns Tour', 'Discover the rich heritage of China on a 10-day tour featuring Beijing\'s Forbidden City, the Great Wall, Xi\'an\'s Terracotta Warriors, and Shanghai\'s vibrant Bund and ancient water towns, blending history, culture, and breathtaking landscapes.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Discover the rich heritage of China on a 10-day tour featuring Beijing\'s Forbidden City, the Great Wall, Xi\'an\'s Terracotta Warriors, and Shanghai\'s vibrant Bund and ancient water towns, blending history, culture, and breathtaking landscapes.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'China', 249.00, 42, 5.0, '8 Day', 'Asia', 'easy', '2025-06-29 11:36:17', '2025-06-29 11:36:17', NULL, NULL, NULL),
(39, '14-Day Immersive China Tour with Sichuan Flavors and Pandas', '14-Day Immersive China Tour with Sichuan Flavors and Pandas', 'From the imperial majesty of Beijing to the ancient wonder of Xi\'an, immerse yourself in history and culture. Encounter pandas in Chengdu, cruise the Li River, and explore the vibrant cityscape of Shanghai. This journey promises unforgettable moments and a deep connection to China\'s rich heritage.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'From the imperial majesty of Beijing to the ancient wonder of Xi\'an, immerse yourself in history and culture. Encounter pandas in Chengdu, cruise the Li River, and explore the vibrant cityscape of Shanghai. This journey promises unforgettable moments and a deep connection to China\'s rich heritage.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sherry today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'China', 118.00, 42, 5.0, '8 Day', 'Asia', 'easy', '2025-06-29 11:47:07', '2025-06-29 11:47:07', NULL, NULL, NULL),
(40, '2-Week European Whole Hog - 4* Hotels', '2-Week European Whole Hog - 4* Hotels', 'The Whole Hog is an awesome way to visit as many European cities as possible. Our most popular 2-week interrailing package is a fast-paced adventure taking you from London to Italy, visiting seven of Europe’s most popular destinations and staying in top-rated hotels! 3* and 5* Hotels also available.', 'The Whole Hog is an awesome way to visit as many European cities as possible. Our most popular 2-week interrailing package is a fast-paced adventure taking you from London to Italy, visiting seven of Europe’s most popular destinations and staying in top-rated hotels! 3* and 5* Hotels also available.', 'France', 498.00, 42, 5.0, '7 Day', 'Europe', 'easy', '2025-06-29 11:50:40', '2025-06-29 11:50:40', NULL, NULL, NULL),
(41, '7-Day Southern Adventure from Paris: Italy, Switzerland, France', '7-Day Southern Adventure from Paris: Italy, Switzerland, France', 'Explore Europe\'s rich history and culture on this 7-day tour through Switzerland, Italy, Monaco, and France. Visit iconic cities like Lucerne, Milan, Venice, Rome, and Florence, experiencing landmarks such as St. Peter\'s Basilica and the Leaning Tower of Pisa.\n\nThis group tour offers a seamless way to explore, with fixed departure dates, accommodations, activities, and transportation, all led by a dedicated guide. While most aspects are pre-set, there may be options to tailor room standards or activity preferences. Click here to request your quote and secure your spot.', 'Explore Europe\'s rich history and culture on this 7-day tour through Switzerland, Italy, Monaco, and France. Visit iconic cities like Lucerne, Milan, Venice, Rome, and Florence, experiencing landmarks such as St. Peter\'s Basilica and the Leaning Tower of Pisa.\n\nThis group tour offers a seamless way to explore, with fixed departure dates, accommodations, activities, and transportation, all led by a dedicated guide. While most aspects are pre-set, there may be options to tailor room standards or activity preferences. Click here to request your quote and secure your spot.', 'France', 210.00, 42, 3.0, '12 Day', 'Europe', 'easy', '2025-06-29 11:53:35', '2025-06-29 11:53:35', NULL, NULL, NULL),
(42, 'Colors of Provence', 'Colors of Provence', 'From the famous Chateauneuf-du-Pape wines to the Roman ruins, through the Popes history in Avignon and the lavender fields of Lubéron, let Provence steal your heart and imprint in your eyes the images of a colourful stay. The best time to see the plants in bloom is from end of June to early August.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sabine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'From the famous Chateauneuf-du-Pape wines to the Roman ruins, through the Popes history in Avignon and the lavender fields of Lubéron, let Provence steal your heart and imprint in your eyes the images of a colourful stay. The best time to see the plants in bloom is from end of June to early August.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sabine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'France', 444.00, 42, 3.0, '12 Day', 'Europe', 'easy', '2025-06-29 11:55:50', '2025-06-29 11:55:50', NULL, NULL, NULL),
(43, 'Essential French Riviera', 'Essential French Riviera', 'Southern France is paradise for foodies, history lovers, sun admirers and many more. It combines endless beaches with easy access to hot spots like Antibes, Monaco and Cannes. On this trip, you will explore the coast with a private, bilingual guide to make the most of your time in France.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sabine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Southern France is paradise for foodies, history lovers, sun admirers and many more. It combines endless beaches with easy access to hot spots like Antibes, Monaco and Cannes. On this trip, you will explore the coast with a private, bilingual guide to make the most of your time in France.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sabine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'France', 498.00, 42, 5.0, '7 Day', 'Europe', 'medium', '2025-06-29 11:57:48', '2025-06-29 11:57:48', NULL, NULL, NULL),
(44, 'Relaxation and Romance on the French Riviera', 'Relaxation and Romance on the French Riviera', 'Immerse yourself in the Mediterranean lifestyle with this 5-day trip to the French Riviera. Staying just 2 miles from the charming town of Antibes, you may opt to pass the days soaking up on the sun on the golden sands of the Côte d\'Azur, or by exploring this alluring part of the world.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Simon today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Immerse yourself in the Mediterranean lifestyle with this 5-day trip to the French Riviera. Staying just 2 miles from the charming town of Antibes, you may opt to pass the days soaking up on the sun on the golden sands of the Côte d\'Azur, or by exploring this alluring part of the world.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Simon today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'France', 208.00, 42, 4.0, '7 Day', 'Europe', 'medium', '2025-06-29 11:59:20', '2025-06-29 11:59:20', NULL, NULL, NULL),
(45, 'Northern France Tour: City to Coast', 'Northern France Tour: City to Coast', 'Experience the best of Northern France and spend some quality time in romantic Paris, too. Visit Brittany and Normandy for pretty port towns and sombre historic sights. Discover galleries and gourmet restaurants, and explore the beaches and scenery of the wild Atlantic coastline.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sabine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Experience the best of Northern France and spend some quality time in romantic Paris, too. Visit Brittany and Normandy for pretty port towns and sombre historic sights. Discover galleries and gourmet restaurants, and explore the beaches and scenery of the wild Atlantic coastline.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Sabine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'France', 760.00, 42, 5.0, '7 Day', 'Europe', 'medium', '2025-06-29 12:01:00', '2025-06-29 12:01:00', NULL, NULL, NULL);
INSERT INTO `trips` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `location`, `price`, `guide_id`, `rate`, `duration`, `continent`, `difficulty`, `created_at`, `updated_at`, `start_date`, `end_date`, `booking_link`) VALUES
(46, 'Explore the Liberation Route in France', 'Explore the Liberation Route in France', 'Retrace the steps of the Liberation Route in France. From the Normandy beaches where the US allies landed over museums in Paris to Memorial museums and the concentration camp in Alsace - this itinerary brings the Liberation Route in France to live.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Valentine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Retrace the steps of the Liberation Route in France. From the Normandy beaches where the US allies landed over museums in Paris to Memorial museums and the concentration camp in Alsace - this itinerary brings the Liberation Route in France to live.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Valentine today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'France', 529.00, 42, 4.0, '12 Day', 'Europe', 'medium', '2025-06-29 12:03:00', '2025-06-29 12:03:00', NULL, NULL, NULL),
(47, '2-Week European Whole Hog', '2-Week European Whole Hog', 'The Whole Hog is an awesome way to visit as many European cities as possible. Our most popular 2-week interrailing package is a fast-paced adventure taking you from London to Italy, visiting seven of Europe’s most popular destinations and staying in top-rated hotels! 3', 'The Whole Hog is an awesome way to visit as many European cities as possible. Our most popular 2-week interrailing package is a fast-paced adventure taking you from London to Italy, visiting seven of Europe’s most popular destinations and staying in top-rated hotels! 3', 'England', 508.00, 42, 5.0, '8 Day', 'Europe', 'easy', '2025-06-29 14:34:42', '2025-06-29 14:34:42', NULL, NULL, NULL),
(48, 'England & Scotland in 2 Weeks', 'England & Scotland in 2 Weeks', 'Explore iconic cities, historic landmarks, and breathtaking landscapes. From vibrant urban centers to charming medieval towns and stunning natural scenery, this rail journey offers a perfect blend of culture, history, and unforgettable experiences across the UK. You can also stay in 3* & 5* hotels.\n\nTour Highligh', 'Explore iconic cities, historic landmarks, and breathtaking landscapes. From vibrant urban centers to charming medieval towns and stunning natural scenery, this rail journey offers a perfect blend of culture, history, and unforgettable experiences across the UK. You can also stay in 3* & 5* hotels.\n\nTour Highligh', 'England', 298.00, 42, 4.0, '7 Day', 'Europe', 'easy', '2025-06-29 14:36:23', '2025-06-29 14:36:23', NULL, NULL, NULL),
(49, 'The Best of the UK & Ireland in 3 Weeks!', 'The Best of the UK & Ireland in 3 Weeks!', 'Embark on a captivating rail journey through the United Kingdom and Ireland, immersing yourself in the rich history, stunning landscapes, and vibrant culture of these enchanting islands. Staying hostels, choose from standard, small, female only or private dorms.', 'Embark on a captivating rail journey through the United Kingdom and Ireland, immersing yourself in the rich history, stunning landscapes, and vibrant culture of these enchanting islands. Staying hostels, choose from standard, small, female only or private dorms.', 'England', 249.00, 42, 3.0, '8 Day', 'Europe', 'easy', '2025-06-29 14:37:47', '2025-06-29 14:37:47', NULL, NULL, NULL),
(50, 'The Great British Road Trip', 'The Great British Road Trip', 'Get ready to explore Britain on this unique self-drive road trip. Choose the car of your liking before you hit the road: from the Cotswolds and its picturesque villages over the Beatle\'s favorite hang-out in Liverpool to Scotland\'s capital Edinburgh: this trip includes many highlights to be explored', 'Get ready to explore Britain on this unique self-drive road trip. Choose the car of your liking before you hit the road: from the Cotswolds and its picturesque villages over the Beatle\'s favorite hang-out in Liverpool to Scotland\'s capital Edinburgh: this trip includes many highlights to be explored', 'England', 317.00, 42, 4.0, '20 Day', 'Europe', 'medium', '2025-06-29 14:40:40', '2025-06-29 14:40:40', NULL, NULL, NULL),
(51, 'Refreshing English Countryside Break', 'Refreshing English Countryside Break', 'Outside of London, England is known with a countryside full of history, picturesque villages, patchwork hills, and winding country roads. Explore the countryside with its castles, parks, and historical cities such as Oxford.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Marcela today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Outside of London, England is known with a countryside full of history, picturesque villages, patchwork hills, and winding country roads. Explore the countryside with its castles, parks, and historical cities such as Oxford.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Marcela today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'England', 299.00, 42, 5.0, '7 Day', 'Europe', 'hard', '2025-06-29 14:42:13', '2025-06-29 14:42:13', NULL, NULL, NULL),
(52, 'Walking around vintage England and picturesque Scotland', 'Walking around vintage England and picturesque Scotland', 'Visit two traditional capitals, London and Edinburgh, and enjoy a trek through the Loch Lomond national park. This trip will let you discover peaceful Scottish islands by foot, with several days of detailed walking tours included in the trip.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Jane today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Visit two traditional capitals, London and Edinburgh, and enjoy a trek through the Loch Lomond national park. This trip will let you discover peaceful Scottish islands by foot, with several days of detailed walking tours included in the trip.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Jane today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'England', 353.00, 42, 4.7, '12 Day', 'Europe', 'medium', '2025-06-29 14:44:14', '2025-06-29 14:44:14', NULL, NULL, NULL),
(53, 'England Historical Highlights', 'England Historical Highlights', 'Discover the highlands of England: From busy London and its Buckingham Palace over historical Oxford to the mysterious Stonehenge. England has plenty to offer and this self-drive itinerary allows you the freedom and flexibility to choose activities to your liking.', 'Discover the highlands of England: From busy London and its Buckingham Palace over historical Oxford to the mysterious Stonehenge. England has plenty to offer and this self-drive itinerary allows you the freedom and flexibility to choose activities to your liking.', 'England', 292.00, 42, 4.9, '12 Day', 'Europe', 'medium', '2025-06-29 14:45:45', '2025-06-29 14:45:45', NULL, NULL, NULL),
(54, 'Oktoberfest in Germany & Beer culture in Austria & Czechia', 'Oktoberfest in Germany & Beer culture in Austria & Czechia', 'Oktoberfest is a 2-week festival held in Munich/Germany. The first weekend of October is traditionally the last weekend of the festival, so plan accordingly. Before or after, head to Austria and Czechia for some more insights in to European beer culture.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Oktoberfest is a 2-week festival held in Munich/Germany. The first weekend of October is traditionally the last weekend of the festival, so plan accordingly. Before or after, head to Austria and Czechia for some more insights in to European beer culture.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Germany', 377.00, 42, 3.2, '12 Day', 'Europe', 'medium', '2025-06-29 14:48:25', '2025-06-29 14:48:25', NULL, NULL, NULL),
(55, 'Discover Saxony', 'Discover Saxony', 'Saxony is one of Europe’s most versatile destinations for art and culture. However, it is not just a treasure trove for culture buffs and city breakers but also features stunningly beautiful landscapes for adventures and active breaks in the great outdoors.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Saxony is one of Europe’s most versatile destinations for art and culture. However, it is not just a treasure trove for culture buffs and city breakers but also features stunningly beautiful landscapes for adventures and active breaks in the great outdoors.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Germany', 126.00, 42, 3.8, '7 Day', 'Europe', 'easy', '2025-06-29 14:49:54', '2025-06-29 14:49:54', NULL, NULL, NULL),
(56, 'Exclusive trip to Prague and Austria', 'Exclusive trip to Prague and Austria', 'Explore the main highlights of Central Europe: fascinating Prague & historical Cesky Krumlov, the highlights of Vienna, Salzburg and Innsbruck in Austria and then further on to Germany - get in the Disney spirit at Schloss Neuschwanstein.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore the main highlights of Central Europe: fascinating Prague & historical Cesky Krumlov, the highlights of Vienna, Salzburg and Innsbruck in Austria and then further on to Germany - get in the Disney spirit at Schloss Neuschwanstein.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Germany', 380.00, 42, 4.3, '12 Day', 'Europe', 'easy', '2025-06-29 14:51:30', '2025-06-29 14:51:30', NULL, NULL, NULL),
(57, 'Saxony - a first impression', 'Saxony - a first impression', 'Embark on an exploration tour through Saxony starting in ­Dresden. A 5-day “taster journey” combines cultural highlights and romantic spots in and around the state capital and make your way to Leipzig. The ideal tour for a perfect \"first impression\".\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Embark on an exploration tour through Saxony starting in ­Dresden. A 5-day “taster journey” combines cultural highlights and romantic spots in and around the state capital and make your way to Leipzig. The ideal tour for a perfect \"first impression\".\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Germany', 350.00, 42, 4.2, '7 Day', 'Europe', 'easy', '2025-06-29 14:53:02', '2025-06-29 14:53:02', NULL, NULL, NULL),
(58, 'An active outdoor trip for the whole family in Germany & Austria', 'An active outdoor trip for the whole family in Germany & Austria', 'Discover \'The Sound of Music\' in Salzburg, swim in the lake at Zell am See, go hiking in the mountains of Kitzbühel, and get to know the world\'s most famous castle Neuschwanstein in Bavaria. Start and end to the tour is Munich and you can easily extend your days here.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Discover \'The Sound of Music\' in Salzburg, swim in the lake at Zell am See, go hiking in the mountains of Kitzbühel, and get to know the world\'s most famous castle Neuschwanstein in Bavaria. Start and end to the tour is Munich and you can easily extend your days here.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Tomaz today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Germany', 456.00, 42, 3.8, '7 Day', 'Europe', 'easy', '2025-06-29 14:55:07', '2025-06-29 14:55:07', NULL, NULL, NULL),
(59, 'Brazilian Beaches: Copacabana, Botafogo and more', 'Brazilian Beaches: Copacabana, Botafogo and more', 'Begin at Foz do Iguaçu, where you will stand in awe of the huge Iguaçu Falls. Next up, we\'ll head to the lively city of Rio de Janeiro, home of the legendary Copacabana, Botafogo and Flamengo beaches, and of course, Sugar Loaf Mountain and the iconic Christ the Redeemer statue.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Eric today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Begin at Foz do Iguaçu, where you will stand in awe of the huge Iguaçu Falls. Next up, we\'ll head to the lively city of Rio de Janeiro, home of the legendary Copacabana, Botafogo and Flamengo beaches, and of course, Sugar Loaf Mountain and the iconic Christ the Redeemer statue.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Eric today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Brazil', 231.00, 42, 3.7, '8 Day', 'America', 'medium', '2025-06-29 15:14:32', '2025-06-29 15:14:32', NULL, NULL, NULL),
(60, 'Islands & Waterfalls: Ihla Grande and Iguazu', 'Islands & Waterfalls: Ihla Grande and Iguazu', 'A mesmerizing journey through Brazil and Argentina, starting with the vibrant energy of Rio de Janeiro. Explore the pristine paradise of Ilha Grande, then step back in time in the colonial gem of Paraty. Finally, marvel at the awe-inspiring Iguazu Falls.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Anahi today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'A mesmerizing journey through Brazil and Argentina, starting with the vibrant energy of Rio de Janeiro. Explore the pristine paradise of Ilha Grande, then step back in time in the colonial gem of Paraty. Finally, marvel at the awe-inspiring Iguazu Falls.\n\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Anahi today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Brazil', 150.00, 42, 3.8, '8 Day', 'America', 'medium', '2025-06-29 15:16:24', '2025-06-29 15:16:24', NULL, NULL, NULL),
(61, 'Desert Wonders: A 7-Day Journey Through Siwa, Bahariya, and the White Desert', 'Desert Wonders: A 7-Day Journey Through Siwa, Bahariya, and the White Desert', 'Explore Egypt\'s majestic deserts with our Siwa Oasis, Bahariya, and White Desert tour. Discover ancient temples, explore historic tombs, and marvel at surreal landscapes like the Crystal Mountain.\r\n\r\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Explore Egypt\'s majestic deserts with our Siwa Oasis, Bahariya, and White Desert tour. Discover ancient temples, explore historic tombs, and marvel at surreal landscapes like the Crystal Mountain.\r\n\r\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Habiba today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Egypt, Africa', 238.00, 42, 3.0, '7 Day', 'Africa', 'hard', '2025-06-29 10:23:25', '2025-06-29 10:23:25', NULL, NULL, NULL),
(62, 'Brazilian Beaches: Copacabana, Botafogo and more', 'Brazilian Beaches: Copacabana, Botafogo and more', 'Begin at Foz do Iguaçu, where you will stand in awe of the huge Iguaçu Falls. Next up, we\'ll head to the lively city of Rio de Janeiro, home of the legendary Copacabana, Botafogo and Flamengo beaches, and of course, Sugar Loaf Mountain and the iconic Christ the Redeemer statue.\r\n\r\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Eric today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Begin at Foz do Iguaçu, where you will stand in awe of the huge Iguaçu Falls. Next up, we\'ll head to the lively city of Rio de Janeiro, home of the legendary Copacabana, Botafogo and Flamengo beaches, and of course, Sugar Loaf Mountain and the iconic Christ the Redeemer statue.\r\n\r\nThis itinerary is just a starting point as all services are 100% customisable to suit your travel wants and needs. Looking for different hotels, other experiences or an alternative route? Get in touch with Eric today to receive your personalised quote. Just enter your details and receive a quote based on your preferences.', 'Brazil', 231.00, 42, 3.7, '8 Day', 'America', 'medium', '2025-06-29 15:14:32', '2025-06-29 15:14:32', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `trip_translations`
--

CREATE TABLE `trip_translations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trip_id` bigint(20) UNSIGNED NOT NULL,
  `locale` varchar(5) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('user','tour_guide','admin') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `user_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ahmed Hammes', 'lpagac@example.net', '2025-06-24 05:59:45', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'dzm7G8r5L9', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(19, 'Jessie Nader', 'chase99@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'XJWSDDKRt6', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(20, 'Dr. Orval Simonis Jr.', 'igleichner@example.com', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'aqJ21O8YKS', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(21, 'Carole Corkery', 'roxanne.ratke@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', '93GiYVNcsl', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(22, 'Prof. Kelley Watsica', 'fharvey@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'GR0QjPOZTS', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(23, 'Tate Doyle', 'mayert.jake@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'uFUyc4XF1u', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(24, 'Enrico Bogisich', 'bayer.moises@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'fayqladBrr', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(25, 'Clotilde Schmitt', 'maya37@example.org', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'TCmhYPpokV', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(26, 'Miss Maude Vandervort III', 'bauch.vergie@example.com', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'YOp9THchOm', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(27, 'Dr. Kenyatta Russel', 'angelita.mccullough@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'K7tzHG8Zlw', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(28, 'Dr. Rodolfo Toy', 'ladarius.purdy@example.com', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'zAbCQQVkYw', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(29, 'Beau Wisoky', 'medhurst.doug@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'WhhZrcVl0A', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(30, 'Roscoe Collier', 'hessel.katrina@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'EXGzjjvs0T', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(31, 'Mrs. Yasmine Jacobs', 'torp.everett@example.org', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', '1Haerd91GP', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(32, 'Miss Cassandre Wunsch Jr.', 'kulas.arnaldo@example.net', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'QB7yFKVZkU', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(33, 'Adriel Donnelly', 'everardo.grady@example.com', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'P3psgohaLc', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(34, 'Mr. Guy Anderson Jr.', 'norma39@example.com', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', '6IquHgPHZt', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(35, 'Eleonore Hackett MD', 'stark.lucienne@example.com', '2025-06-24 05:59:46', '$2y$12$Lpa09kmSrWVaBVeWZp1niuhUqxqjeHEIQ3uFhzJvIQsii2IAGv6jC', 'user', 'nhmPvygvOo', '2025-06-24 05:59:46', '2025-06-24 05:59:46'),
(36, 'Test User', 'testuser@example.com', NULL, '$2y$12$933f3y8HzfOO/PQ/UEzAaOOgnZxZ1wCqwisD.v5qykneqcV1/ONce', 'admin', NULL, '2025-06-24 18:31:50', '2025-06-24 18:31:50'),
(37, 'Test User', 'testuser@gmail.com', NULL, '$2y$12$XFmW9ueVfggaUBXZEVzNSOZYlUqlD0m/5tB9qf9kB00I0a2asRSf.', 'admin', NULL, '2025-06-24 18:33:16', '2025-06-24 18:33:16'),
(38, 'Abdullah Younes', '3mranyounes10@gmail.com', NULL, '$2y$12$M9z6x8eFAohW4IeCvW3jgO/mKCFJrMT/L4AEfVvDZngexxf/3cBcC', 'user', 'kqQy9x6hZ2NCaOmsJsK1E69kvWWQIMbcGbbYsvdzRfjYj2Hs1mncJg103sof', '2025-06-24 21:33:44', '2025-06-25 01:40:07'),
(39, 'Abdullah Younes', '3mranyounes11@gmail.com', NULL, '$2y$12$/Csu7so6MC8gnLoh0./t8O8d9FRyg.JzXDtduJH423PtG6wzQDPYG', 'user', NULL, '2025-06-24 22:45:36', '2025-06-24 22:45:36'),
(40, 'Abdullah Younes', '3mranyounes12@gmail.com', NULL, '$2y$12$kId4FFZ2VkSh/pkjPVYLnOFUQb71a5/AhVC1bFTw4TR0zjTuFtiIO', 'admin', NULL, '2025-06-24 22:54:25', '2025-06-24 22:54:25'),
(41, 'ahmed', '3mranyounes13@gmail.com', NULL, '$2y$12$uTZNJqMiImbHnUq/X7N4keupYcuCf6Cz4W5K19zmONMaqgmHLFbG6', 'user', NULL, '2025-06-26 00:28:15', '2025-06-26 00:28:15'),
(42, 'ahmed', '3mranyounes14@gmail.com', NULL, '$2y$12$lbnPNG45tOyiHrbU/nOgAeLVAC3GtSTGPGyg4Eulu344LHwmn1Kia', 'tour_guide', NULL, '2025-06-26 00:29:09', '2025-06-26 00:29:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_cartable_type_cartable_id_index` (`cartable_type`,`cartable_id`);

--
-- Indexes for table `cruises`
--
ALTER TABLE `cruises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`),
  ADD KEY `favorites_favoritable_type_favoritable_id_index` (`favoritable_type`,`favoritable_id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_imageable_type_imageable_id_index` (`imageable_type`,`imageable_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_user_id_foreign` (`user_id`),
  ADD KEY `reservations_reservable_type_reservable_id_index` (`reservable_type`,`reservable_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trips_guide_id_foreign` (`guide_id`);

--
-- Indexes for table `trip_translations`
--
ALTER TABLE `trip_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `trip_translations_trip_id_locale_unique` (`trip_id`,`locale`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cruises`
--
ALTER TABLE `cruises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=619;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `trip_translations`
--
ALTER TABLE `trip_translations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `trips_guide_id_foreign` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `trip_translations`
--
ALTER TABLE `trip_translations`
  ADD CONSTRAINT `trip_translations_trip_id_foreign` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
