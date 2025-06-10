-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2025 at 05:58 PM
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
-- Database: `manoscerca`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `expires_at` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carers`
--

CREATE TABLE `carers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `formation` varchar(255) DEFAULT NULL,
  `year` int(10) NOT NULL,
  `presentation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carers`
--

INSERT INTO `carers` (`id`, `user_id`, `formation`, `year`, `presentation`) VALUES
(148, 190, 'Cursos de Especialización en cuidados básicos de geriatría', 2, 'Cuidador con excelentes habilidades de comunicación para establecer una relación de confianza con la persona cuidada y su familia. Mi prioridad es brindar un cuidado humano y respetuoso, fomentando la autonomía y el bienestar emocional.'),
(149, 196, 'Promoción de la autonomía personal y atención a personas en situación de dependencia.', 2, 'Cuidador con excelentes habilidades de comunicación para establecer una relación de confianza con la persona cuidada y su familia. Mi prioridad es brindar un cuidado humano y respetuoso, fomentando la autonomía y el bienestar emocional.'),
(150, 197, 'Cursos de Especialización en cuidados básicos de geriatría', 4, 'Profesional  con experiencia. Me adapto a las necesidades individuales de cada persona, ofreciendo un apoyo personalizado y atento. Busco un empleo donde pueda utilizar mis conocimientos para mejorar la calidad de vida de alguien.'),
(151, 198, 'Cursos de Especialización, Apoyo psicosocial y comunicación con personas mayores', 2, 'Cuidador con excelentes habilidades de comunicación para establecer una relación de confianza con la persona cuidada y su familia. Mi prioridad es brindar un cuidado humano y respetuoso, fomentando la autonomía y el bienestar emocional.\n'),
(152, 199, 'Promoción de la autonomía personal y atención a personas en situación de dependencia', 1, 'Profesional  con experiencia. Me adapto a las necesidades individuales de cada persona, ofreciendo un apoyo personalizado y atento. Busco un empleo donde pueda utilizar mis conocimientos para mejorar la calidad de vida de alguien.');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `id_carers` int(11) DEFAULT NULL,
  `id_dependents` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rating` tinyint(10) NOT NULL,
  `receiver` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id_comment`, `id_carers`, `id_dependents`, `date`, `description`, `name`, `rating`, `receiver`) VALUES
(126, 148, 50, '2025-06-01', 'Valoramos mucho su paciencia y amabilidad con mi madre. Sin embargo, hubo un par de ocasiones en las que la puntualidad no fue la esperada', 'Familia Pérez Romero', 5, 148),
(127, 152, 54, '2025-06-01', 'Tuve una experiencia muy buena cuidando de su familiar en Córdoba. Familia organizada, comunicativa y agradecida. ¡Los recomiendo sin dudarlo.', '(Usuario Cuidador)Sofía Sánchez', 5, 54),
(128, 152, 56, '2025-06-01', 'Tuve una experiencia muy buena cuidando de su familiar en Córdoba. Familia organizada, comunicativa y agradecida. ¡Los recomiendo sin dudarlo.', '(Usuario Cuidador)Sofía Sánchez', 4, 56),
(130, 148, 56, '2025-06-05', 'Valoramos mucho su paciencia y amabilidad con mi madre. Sin embargo, hubo un par de ocasiones en las que la puntualidad no fue la esperada.', '(Usuario Familia) Martínez Gómez', 4, 148),
(131, 149, 56, '2025-06-05', 'Valoramos mucho su paciencia y amabilidad con mi madre. Sin embargo, hubo un par de ocasiones en las que la puntualidad no fue la esperada.', '(Usuario Familia) Martínez Gómez', 4, 149),
(132, 152, 56, '2025-06-05', 'Fue un alivio contar con su apoyo y dedicación. Siempre mostró buena actitud, aunque la comunicación sobre algunos detalles del día a día podría haber sido más constante y detallada.', '(Usuario Familia) Martínez Gómez', 5, 152),
(133, 150, 56, '2025-06-05', 'Valoramos mucho su paciencia y amabilidad con mi madre. Sin embargo, hubo un par de ocasiones en las que la puntualidad no fue la esperada.', '(Usuario Familia) Martínez Gómez', 4, 150);

-- --------------------------------------------------------

--
-- Table structure for table `dependents`
--

CREATE TABLE `dependents` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dependents`
--

INSERT INTO `dependents` (`id`, `user_id`, `description`) VALUES
(50, 189, 'Se busca cuidador/a con experiencia para familiar dependiente persona cariñosa y responsable para cuidado integral, tareas domésticas ligeras, compras y recados. Se valorará flexibilidad horaria y se requiere experiencia. Mas información por privado.'),
(52, 192, 'Familia en Córdoba capital busca cuidador/a de confianza y responsable para atender a familiar dependiente. Se requiere experiencia en asistencia personal, mantenimiento del hogar y gestión de compras, Mas información por privado.'),
(53, 193, 'se necesita cuidador/a para familiar dependiente. Imprescindible experiencia y disposición para asistencia personal, tareas domésticas y compras. Se ofrece contrato y salario según valía.'),
(54, 194, 'Se busca cuidador/a con experiencia para familiar dependiente persona cariñosa y responsable para cuidado integral, tareas domésticas ligeras, compras y recados. Se valorará flexibilidad horaria y se requiere experiencia. Mas información por privado.'),
(55, 195, 'Se necesita cuidadora con referencias para atención personalizada a persona dependiente. Funciones incluyen apoyo en movilidad, aseo personal y gestión de compras. Se ofrece contrato estable. Contactar para más información.'),
(56, 200, 'Familia en Córdoba capital busca cuidador/a de confianza y responsable para atender a familiar dependiente. Se requiere experiencia en asistencia personal, mantenimiento del hogar y gestión de compras, Mas información por privado.');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id_services` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id_services`, `description`) VALUES
(9, 'Preparación de comidas.'),
(10, 'Asistencia en la higiene personal'),
(11, 'Acompañamiento a citas médicas.'),
(12, 'Compras y recados.'),
(13, 'Acompañamiento a citas médicas.'),
(14, 'Compras y recados.'),
(15, 'Organización y limpieza del hogar.'),
(16, 'Apoyo en la rehabilitación física.'),
(17, 'Ayuda con la movilidad.'),
(18, 'Administración de medicamentos.');

-- --------------------------------------------------------

--
-- Table structure for table `tasks_carers`
--

CREATE TABLE `tasks_carers` (
  `id_carers` int(10) NOT NULL,
  `id_services` int(10) NOT NULL,
  `id_tasks_carers` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks_carers`
--

INSERT INTO `tasks_carers` (`id_carers`, `id_services`, `id_tasks_carers`) VALUES
(148, 10, 346),
(148, 9, 347),
(151, 10, 354),
(151, 12, 355),
(151, 11, 356),
(149, 9, 366),
(149, 10, 367),
(149, 11, 368),
(150, 10, 369),
(150, 11, 370),
(150, 12, 371),
(152, 10, 378),
(152, 14, 379),
(152, 15, 380);

-- --------------------------------------------------------

--
-- Table structure for table `tasks_dependents`
--

CREATE TABLE `tasks_dependents` (
  `id_dependents` int(10) NOT NULL,
  `id_services` int(10) NOT NULL,
  `id_tasks_dependents` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks_dependents`
--

INSERT INTO `tasks_dependents` (`id_dependents`, `id_services`, `id_tasks_dependents`) VALUES
(53, 10, 235),
(53, 12, 236),
(54, 10, 237),
(54, 12, 238),
(54, 13, 239),
(52, 9, 247),
(52, 10, 248),
(52, 11, 249),
(52, 12, 250),
(55, 10, 255),
(55, 13, 256),
(55, 12, 257),
(55, 11, 258),
(50, 9, 262),
(50, 10, 263),
(56, 9, 288),
(56, 11, 289),
(56, 10, 290);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `name` varchar(255) NOT NULL,
  `id` int(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `work_day` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `id`, `password`, `role`, `city`, `email`, `address`, `work_day`, `image`) VALUES
('superadmin', 1, '$argon2id$v=19$m=65536,t=3,p=4$QA8afUkn2TDJNPKIDsvCsQ$rjfksw3qQ9oPh1SKzL8i7YfsJxPkOJDj/JGHhS1eWEA', 'superadmin', 'Córdoba', 'infomanoscerca@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', '', 'default-profile.jpg'),
('Carranza López', 189, '$argon2id$v=19$m=65536,t=3,p=4$BDMBJnpgTTD+8NOFqvnvAA$zEs60OElpa8bh6aYXa7tXiH4Dozz05Pwt0213ufMXHQ', 'dependent', 'Córdoba- España', 'carranza230@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', 'Jornada parcial', '1748371417600.jpg'),
('Fernanda  López Carranza (Usuario cuidador)', 190, '$argon2id$v=19$m=65536,t=3,p=4$WoKndV9UxlRB4JngitQHNw$p/PZzWQyR7vE4qzJfrVbzGs4+Q5vifrzCdUwJNHbOUA', 'carer', 'Córdoba', 'fernandacarranza40@gmail.com', 'C. Poeta Valdelomar Pineda, 7, Nte. Sierra, 14012 Córdoba', 'Jornada completa', '1748347421346.jpg'),
(' Juan González Pérez', 192, '$argon2id$v=19$m=65536,t=3,p=4$032JiJDsVW4hjhpd1Q7yUw$AUxP/+81PA7Tr5i8j5kDqC0nWoV93zXDOUcI6tOgMNs', 'dependent', 'Córdoba - España', 'juangp@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', 'Jornada parcial', 'default-profile.jpg'),
('Sánchez  Martín', 193, '$argon2id$v=19$m=65536,t=3,p=4$9sE6KUAl1mAJKSZjrjRmGg$MbSJhQljvEsNTcQepoBF3F1R5Si0JgydbR6KcquCZik', 'dependent', 'Sevilla', 'mw4clnlu@gmail.com', 'C. Poeta Valdelomar Pineda, 7, Nte. Sierra, 14012 Córdoba', 'Jornada completa', '1748801316107.jpg'),
('Ángel Domínguez Ramos', 194, '$argon2id$v=19$m=65536,t=3,p=4$6Nt7pLhPJ5+xq15wnpseYQ$BXyZfFPjxSwD3hTk0C75SH41Jr4zdu57y8AfoPWwS20', 'dependent', 'Madrid', 'soynuevo@gmail.com', 'Córdoba, Calle Don Lope de Sosa, 7 14005', 'Jornada parcial', '1748801448641.jpg'),
('Sanz Castillo Iglesias', 195, '$argon2id$v=19$m=65536,t=3,p=4$FmkxUv8OjoydKX+rt3F3kA$IzDGUopx9oqzR+oUysvTwAf+s99GJLXvUortJC827no', 'dependent', 'Málaga', 'sanz2025@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', 'Jornada completa', '1748801697431.jpg'),
('Alejandra   Gutiérrez', 196, '$argon2id$v=19$m=65536,t=3,p=4$XeaSpZV2hZ6GJN7Zp/tp9g$+OT4sKLCgD97aHGAE22Dabjytu7Aj5Vns5nfW7mEUn0', 'carer', 'Huelva - España', 'gutierrez2025@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', 'Jornada completa', '1748804471520.jpg'),
('Gonzalo Herrera', 197, '$argon2id$v=19$m=65536,t=3,p=4$ZLpnOTb8xO+tv5Uuq6luKQ$vVQO4uwCUxaUcIJx2eMxYNsq4nV4BNbs7fY9kCRoZfU', 'carer', 'Sevilla', 'mw4clnlu@gmail.com', 'C. Poeta Valdelomar Pineda, 7, Nte. Sierra, 14012 Córdoba', 'Jornada parcial', '1748804760970.jpg'),
('Laura Fernández', 198, '$argon2id$v=19$m=65536,t=3,p=4$MEsmQRwKBmy6tK87G3gAgw$ehjQsP/sYRDEeqFB9X65QBOZSg80atCL1T3K32JRgqs', 'carer', 'Málaga', 'laura2025@gmail.com', 'C. Madres Escolapias, 19, Nte. Sierra, 14012 Córdoba', 'Jornada parcial', 'default-profile.jpg'),
('(Usuario Cuidador)Sofía Sánchez', 199, '$argon2id$v=19$m=65536,t=3,p=4$7VJd0H0hm0Nvc2mlWGQg8g$0z+k/303lf2yUCApcxVLvueTa7CRScFibBaqOqyqIbo', 'carer', 'Córdoba - España', 'usuariocuidador40@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', 'Jornada parcial', NULL),
('(Usuario Familia) Martínez Gómez', 200, '$argon2id$v=19$m=65536,t=3,p=4$dBG018s8knCw+0AiQeBRcQ$F9NMzpbEOw1ETOs+BGmkTNAfcRx1ahoPHJRa6YjnaKM', 'dependent', 'Córdoba - España', 'usuariof230@gmail.com', 'Calle Dr. José Altolaguirre, 19, Poniente Sur, 14004 Córdoba', 'Jornada completa', '1748808675582.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `carers`
--
ALTER TABLE `carers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_UCarers` (`id_carers`),
  ADD KEY `id_UDependents` (`id_dependents`);

--
-- Indexes for table `dependents`
--
ALTER TABLE `dependents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_services`);

--
-- Indexes for table `tasks_carers`
--
ALTER TABLE `tasks_carers`
  ADD PRIMARY KEY (`id_tasks_carers`),
  ADD KEY `id_carers` (`id_carers`),
  ADD KEY `id_services` (`id_services`);

--
-- Indexes for table `tasks_dependents`
--
ALTER TABLE `tasks_dependents`
  ADD PRIMARY KEY (`id_tasks_dependents`),
  ADD KEY `id_dependents` (`id_dependents`),
  ADD KEY `id_services` (`id_services`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345;

--
-- AUTO_INCREMENT for table `carers`
--
ALTER TABLE `carers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `dependents`
--
ALTER TABLE `dependents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id_services` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tasks_carers`
--
ALTER TABLE `tasks_carers`
  MODIFY `id_tasks_carers` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=381;

--
-- AUTO_INCREMENT for table `tasks_dependents`
--
ALTER TABLE `tasks_dependents`
  MODIFY `id_tasks_dependents` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=291;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `carers`
--
ALTER TABLE `carers`
  ADD CONSTRAINT `carers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_carers`) REFERENCES `carers` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_dependents`) REFERENCES `dependents` (`id`);

--
-- Constraints for table `dependents`
--
ALTER TABLE `dependents`
  ADD CONSTRAINT `dependents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks_carers`
--
ALTER TABLE `tasks_carers`
  ADD CONSTRAINT `tasks_carers_ibfk_1` FOREIGN KEY (`id_services`) REFERENCES `services` (`id_services`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_carers_ibfk_2` FOREIGN KEY (`id_carers`) REFERENCES `carers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks_dependents`
--
ALTER TABLE `tasks_dependents`
  ADD CONSTRAINT `tasks_dependents_ibfk_1` FOREIGN KEY (`id_dependents`) REFERENCES `dependents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_dependents_ibfk_2` FOREIGN KEY (`id_services`) REFERENCES `services` (`id_services`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
