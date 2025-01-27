-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2025 a las 11:03:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `manoscerca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carers`
--

CREATE TABLE `carers` (
  `id` int(11) NOT NULL,
  `formation` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `year` int(10) NOT NULL,
  `work_day` varchar(255) DEFAULT NULL,
  `presentation` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carers`
--

INSERT INTO `carers` (`id`, `formation`, `name`, `city`, `address`, `email`, `password`, `year`, `work_day`, `presentation`, `imagen`) VALUES
(19, 'Ayuda a domicilio', 'CuidadorPrueba1', 'Córdoba', 'Calle  la palma nº4', 'cuiador1@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$bO3oBmXY9vndQV6rvHMJWQ$Lyn2IqVORUnXYMWX8aC9HMGGUnWtk2la2i3vlmY8UjI', 1, '', 'Cuidador con 5 años de experiencia en el cuidado de mayores. Soy paciente y dedicado, con habilidades en gestión de medicación y apoyo en actividades diarias.', ''),
(20, 'Ayuda a domicilio', 'CuidadorPrueba2', 'Córdoba', 'Calle  la palma nº4', 'cuiador1@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$DeDZ7FpkNEhvhoo3ILIWeA$taY5PzDxqtE+oSjmCQsnPWzg4QFaVew87RZYGYhd37E', 1, '', 'Cuidador con 5 años de experiencia en el cuidado de mayores. Soy paciente y dedicado, con habilidades en gestión de medicación y apoyo en actividades diarias.', ''),
(21, 'Ayuda a domicilio', 'CuidadorPrueba5', 'Córdoba', 'Calle  la palma nº4', 'cuiador5@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$WVh+D8wE+S2qvkBIa/H9MA$wDDsZJ8TEcorAZram+ma9aF4nvnX4xu5RIRrd+qZPOw', 4, '1', 'Cuidador con 5 años de experiencia en el cuidado de mayores. Soy paciente y dedicado, con habilidades en gestión de medicación y apoyo en actividades diarias.', ''),
(22, 'Ayuda a domicilio', 'CuidadorPrueba4', 'Córdoba', 'Calle  la palma nº4', 'cuiador4@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$d+mHx2gCt5LoybymL9SJ0Q$VPUB642phKeDkGBTDEdgWr1gwhW+1bWgDr92NoRH7AY', 2, '2', 'Cuidador con 5 años de experiencia en el cuidado de mayores. Soy paciente y dedicado, con habilidades en gestión de medicación y apoyo en actividades diarias.', ''),
(25, 'pacas', 'otro', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$jWkszUJGFeDIXzTAplrstg$7bbxHtRatgB0vdHNN6EYIl7e0XiBHygCpIDTW/6/2yE', 1, '1', 'aaaaaaaaaaaaaaaaa', ''),
(28, 'eeeeeeeeeeeeeeeee', 'aaaaaaaaaaaaaaa', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$xQPzAKwyOivqm35/OAmooA$M6FQ2Jd0SVgS4E2B1MbRnyioAd51BiQtdn2Lt5Kamuw', 4, '1', 'aaaaaaaaaaaaaaaaaaaa', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `id_UCarers` int(11) DEFAULT NULL,
  `id_UDependents` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependents`
--

CREATE TABLE `dependents` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(1255) NOT NULL,
  `work_day` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dependents`
--

INSERT INTO `dependents` (`id`, `name`, `city`, `address`, `email`, `password`, `work_day`, `description`, `imagen`) VALUES
(3, 'Herrera', 'Herrera', 'Córdoba-El centro', 'familiaherrera2024@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$d7c1nWON/ZcBb0fraKysMw$SvdsO1BEEIq8AbFJb64bHjkPT6IdDFuZpeNNCEGNfPg', '', '', NULL),
(4, 'Castellón', 'catellón', 'Córdoba', 'castellonherrera2024@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$oZGUMLQyH7U/R7JzIJwy+Q$pO5btwXQR5+1Y6hXGXCPIM9gP7A+3sZg8u4o7tctDUA', '', '', NULL),
(8, 'aaaaaa', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$jmIOaxi9hEnbpmxJDfImhQ$EZwIvSU0OCUlujp4eetl0DNfBLasCkN3+TfqEJ5yAW0', '1', 'ddddddddddddddddddddddddddddddddd', NULL),
(9, 'qqqqqqqqqqqqqqqqqqqqqqqqqq', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$nlZPyiKYR10E0bV9b/4+og$h3nTJ3B7pAIRDBK8df4KN8nhBaI4Gjjl6p5vSskYEas', '1', 'sssssssssssssssssssssssssss', NULL),
(10, 'qqqqqqqqqqqqqqqqqqqqqqqqqq', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$xxS8QnSVwb75HiBQWmh96A$UjbeLT3snxN6gxvTOkzLqIslfHyQOS178/xkei6eKyI', '1', 'sssssssssssssssssssssssssss', NULL),
(11, 'qqqqqqqqqqqqqqqqqqqqqqqqqq', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$ndawk6Jp22LHhotx/6LlHw$p/da+zHhqNsMOeZq7mXP3vtWknpLTlq9cTJnVMI8qbA', '1', 'sssssssssssssssssssssssssss', NULL),
(13, 'Hola1', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$Umtxq+DKEADGiCPX5dxhag$fNjqhtSH8Wi0FwuHVDz5kld9bIVIlOrelot6jC1l+VA', '2', 'Hola111111111111111111111111111111111', NULL),
(14, 'Hola2', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$NMrpXdQ5OH04gATptf+yiQ$HM+nrNzNBSpOnQ8oRjB7eeIZo0Ai6XKWnfbVoZpFNQw', '1', 'Hola Hola', NULL),
(15, 'Hola3', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$QDwfeonF7lf3aShreZ47fQ$dEU1KNhoFNAzCcrLyB9siwR0kCMCNNU2Z0grCU5+79Q', '1', 'Hola Hola Hola', NULL),
(16, 'Hola4', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$snAvE6jplz88T3JbR+CeiQ$ZP+hfvK3o7dH7AS0mUuCXgNRX5beRVRy2Pp2rsy7Hp8', '1', 'Hola Hola Hola Hola', NULL),
(18, 'Hola5', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$xrgOz0aNpcZiDfNg+U+v2A$wPWgDIRKtywf0ylIyHMK9KM+nNjT8qjTWDRyAOwALr0', '1', 'Hola Hola Hola Hola Hola Hola', NULL),
(19, 'Hola6', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$uS5pBBIjf5V7BucyQ6wleA$/m7AoiFGjEk/LuBCEcHeUVfOns7UlBuGxsa9KyS/DpE', '1', 'Hola Hola Hola Hola Hola Hola Hola', NULL),
(20, 'Hola7', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$tC2m38SmWudlFrjLLzo4tg$pNjocbVGU9C67GsOqGbXL/QOlfkRI8rwMtzLGEk34K4', '1', 'Hola7', NULL),
(21, 'Pepe', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$WMbkoH9OA8pzYm51UwiN7A$ybWfedEDJiGWI31QTgyKHyjuRVf2p3XkkFqbDBO6pv8', '1', 'Tareas  que necesita de Pepe', NULL),
(22, 'Juan', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$n5KcTr0TM+o1g01Dk+dlpg$c14fefb0nBsUmZvjQRoMlg1alcFM12rSYfLOjaB/LV0', '1', 'aaaaaaaaaaaaappppppppppppppppppppppppppphhhhhhhhhhhhhhddddddddddddd', NULL),
(23, 'Soy nuevo en esto', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$KgICiAsI/jp0o13JbkWKAQ$hjI/VCNZsLaglctm50FW/CJPWQd23wUZiet30EF2tHI', '1', 'Busco cuidador para mi padre .', NULL),
(24, 'Soy nuevo 2', 'Córdoba', 'Córdoba', 'soynuevo@gamil.com', '$argon2id$v=19$m=65536,t=3,p=4$TQLN4xflNqcF21QvHP+ydQ$BaKk+9OfJjxBXE66nhKFe84kV80FvUL69UFEj/WzR+o', 'Jornada parcial', 'aaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkddddddddddddddddddddddddddddddññññññññññññññññññññññññññññnnnnnnnnnnnnnnnnnnnnnnndddddddddddddddddddddddddddddddddddddddddddddddddddddd', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id_services` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `services`
--

INSERT INTO `services` (`id_services`, `description`) VALUES
(1, 'Preparación de comidas.'),
(2, 'Asistencia en la higiene personal.'),
(3, 'Acompañamiento a citas médicas.'),
(4, 'Compras y recados.'),
(5, 'Organización y limpieza del hogar.'),
(6, 'Apoyo en la rehabilitación física.'),
(7, 'Ayuda con la movilidad (uso de sillas de ruedas, andadores)'),
(8, 'Administración de medicamentos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks_carer`
--

CREATE TABLE `tasks_carer` (
  `id_carers` int(10) NOT NULL,
  `id_services` int(10) NOT NULL,
  `id_tasks_carer` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks_carer`
--

INSERT INTO `tasks_carer` (`id_carers`, `id_services`, `id_tasks_carer`) VALUES
(28, 2, 4),
(28, 5, 5),
(28, 4, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks_dependent`
--

CREATE TABLE `tasks_dependent` (
  `id_dependents` int(10) NOT NULL,
  `id_services` int(10) NOT NULL,
  `id_tasks_dependent` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks_dependent`
--

INSERT INTO `tasks_dependent` (`id_dependents`, `id_services`, `id_tasks_dependent`) VALUES
(21, 6, 1),
(21, 5, 2),
(22, 4, 3),
(22, 5, 4),
(22, 6, 5),
(23, 1, 9),
(24, 8, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carers`
--
ALTER TABLE `carers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_UCarers` (`id_UCarers`),
  ADD KEY `id_UDependents` (`id_UDependents`);

--
-- Indices de la tabla `dependents`
--
ALTER TABLE `dependents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_services`);

--
-- Indices de la tabla `tasks_carer`
--
ALTER TABLE `tasks_carer`
  ADD PRIMARY KEY (`id_tasks_carer`),
  ADD KEY `id_carers` (`id_carers`),
  ADD KEY `id_services` (`id_services`);

--
-- Indices de la tabla `tasks_dependent`
--
ALTER TABLE `tasks_dependent`
  ADD PRIMARY KEY (`id_tasks_dependent`),
  ADD KEY `id_dependents` (`id_dependents`),
  ADD KEY `id_services` (`id_services`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carers`
--
ALTER TABLE `carers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dependents`
--
ALTER TABLE `dependents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id_services` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tasks_carer`
--
ALTER TABLE `tasks_carer`
  MODIFY `id_tasks_carer` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tasks_dependent`
--
ALTER TABLE `tasks_dependent`
  MODIFY `id_tasks_dependent` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_UCarers`) REFERENCES `carers` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_UDependents`) REFERENCES `dependents` (`id`);

--
-- Filtros para la tabla `tasks_carer`
--
ALTER TABLE `tasks_carer`
  ADD CONSTRAINT `tasks_carer_ibfk_1` FOREIGN KEY (`id_services`) REFERENCES `services` (`id_services`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_carer_ibfk_2` FOREIGN KEY (`id_carers`) REFERENCES `carers` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tasks_dependent`
--
ALTER TABLE `tasks_dependent`
  ADD CONSTRAINT `tasks_dependent_ibfk_1` FOREIGN KEY (`id_dependents`) REFERENCES `dependents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_dependent_ibfk_2` FOREIGN KEY (`id_services`) REFERENCES `services` (`id_services`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
