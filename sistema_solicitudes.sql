-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2023 a las 18:17:34
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_solicitudes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula` (
  `aula_id` int(11) NOT NULL,
  `nombre_aula` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargas_academicas`
--

CREATE TABLE `cargas_academicas` (
  `id_carga_academica` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `at_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `at_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `id_carrera` int(11) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estatus_carrera` tinyint(1) NOT NULL DEFAULT 0,
  `at_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`id_carrera`, `codigo`, `nombre`, `estatus_carrera`, `at_created`) VALUES
(3, 'VPDSCP', 'TSU PETROLEO', 1, '2023-04-26 13:34:02'),
(4, 'VPDSPDVSA', 'PETROLEO', 1, '2023-04-26 13:34:02'),
(5, 'VPDSINGINF', 'TSU EN INFORMATICA', 1, '2023-04-26 15:15:17'),
(6, 'VPDSINGIFORT', 'INGENIERIA EN INFORMATICA', 1, '2023-04-26 15:39:54'),
(9, 'VPDSINGIFORTW', 'PROGRAMACION 22', 0, '2023-04-26 16:02:46'),
(14, 'VPDSINGCC', 'INGENIERIA CONSTRUCCION CIVIL', 1, '2023-04-26 16:17:36'),
(20, 'test', 'test', 0, '2023-04-27 02:01:46'),
(21, 'VPDSTCC01', 'TSU CONSTRUCCION CIVIL', 1, '2023-04-27 02:14:11'),
(22, 'TEST9', 'TEST9', 0, '2023-04-27 02:25:36'),
(23, 'TEST99', 'TEST99', 0, '2023-04-27 02:34:32'),
(24, 'TEST23', 'TES23', 0, '2023-04-27 02:34:46'),
(25, 'ASDADAS567', 'TSU EN INFORMATICA 2', 0, '2023-05-23 04:10:55'),
(26, 'TEST24', 'TEST CODE', 0, '2023-05-23 04:37:59'),
(27, 'VPDS', 'Veterinaria', 1, '2023-05-29 23:04:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `curso_id` int(11) NOT NULL,
  `nombre_carrera` varchar(255) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `estatusC` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `indicadores`
--

CREATE TABLE `indicadores` (
  `id_indicador` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estatus_indicador` tinyint(1) NOT NULL,
  `id_item` int(11) NOT NULL,
  `at_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `at_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `indicadores`
--

INSERT INTO `indicadores` (`id_indicador`, `nombre`, `estatus_indicador`, `id_item`, `at_created`, `at_updated`) VALUES
(1, 'Cambio de Turno y/o Sección', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(2, 'Sub-Proyecto Paralelo', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(3, 'Activación y/o Reingreso', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(4, 'Prosecución', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(5, 'Auto-Estudio', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(6, 'Carrera Simultanea', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(7, 'Exceso de unidades de crédito', 1, 1, '2023-04-27 05:40:42', '2023-04-27 05:40:42'),
(8, 'Inscripción Extemporánea', 1, 1, '2023-04-27 05:42:34', '2023-04-27 05:42:34'),
(9, 'Asentamiento de Notas', 1, 1, '2023-04-27 05:42:34', '2023-04-27 05:42:34'),
(10, 'Levantamiento de Prelación', 1, 1, '2023-04-27 05:42:34', '2023-04-27 05:42:34'),
(13, 'Actividades Inscritas', 1, 2, '2023-05-03 04:23:17', '2023-05-03 04:23:17'),
(14, 'Actividades Aprobadas', 1, 2, '2023-05-03 04:23:18', '2023-05-03 04:23:18'),
(15, 'Actividades Rechazadas', 1, 2, '2023-05-03 04:23:18', '2023-05-03 04:23:18'),
(16, 'Actividades Procesadas', 1, 2, '2023-05-03 04:23:18', '2023-05-03 04:23:18'),
(17, 'Ascenso', 1, 3, '2023-05-03 04:26:35', '2023-05-03 04:26:35'),
(18, 'Docentes por Subprograma con', 1, 3, '2023-05-03 04:26:35', '2023-05-03 04:26:35'),
(19, 'Categoría de docente', 1, 3, '2023-05-03 04:26:36', '2023-05-03 04:26:36'),
(20, 'Solicitudes de ubicación al escalafón REA', 1, 3, '2023-05-03 04:26:36', '2023-05-03 04:26:36'),
(21, 'Trabajos Cerrados', 1, 4, '2023-05-03 04:28:28', '2023-05-03 04:28:28'),
(22, 'Trabajos Inscritos', 1, 4, '2023-05-03 04:28:28', '2023-05-03 04:28:28'),
(23, 'Trabajos Retirados', 1, 4, '2023-05-03 04:28:28', '2023-05-03 04:28:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `inscripcion_id` int(11) NOT NULL,
  `alumno_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `turno_id` int(11) NOT NULL,
  `tipo_inscripto` varchar(55) NOT NULL DEFAULT 'ESTUDIANTE',
  `estatusI` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`inscripcion_id`, `alumno_id`, `curso_id`, `turno_id`, `tipo_inscripto`, `estatusI`) VALUES
(66, 23, 14, 1, 'ESTUDIANTE', 1),
(67, 23, 5, 2, 'ESTUDIANTE', 0),
(68, 24, 21, 1, 'ESTUDIANTE', 0),
(69, 24, 14, 1, 'ESTUDIANTE', 1),
(70, 35, 4, 2, 'ESTUDIANTE', 1),
(71, 11, 14, 1, 'ESTUDIANTE', 1),
(72, 29, 27, 1, 'ESTUDIANTE', 1),
(73, 1, 5, 1, 'ESTUDIANTE', 1),
(74, 22, 27, 1, 'ESTUDIANTE', 1),
(75, 21, 3, 1, 'ESTUDIANTE', 1),
(76, 20, 6, 1, 'DOCENTE', 1),
(79, 8, 27, 1, 'DOCENTE', 0),
(80, 8, 21, 1, 'DOCENTE', 1),
(81, 10, 6, 1, 'DOCENTE', 1),
(82, 26, 14, 2, 'DOCENTE', 1),
(83, 27, 27, 1, 'DOCENTE', 1),
(84, 28, 5, 1, 'DOCENTE', 1),
(85, 45, 4, 1, 'DOCENTE', 1),
(86, 28, 4, 1, 'DOCENTE', 1),
(87, 27, 4, 1, 'DOCENTE', 1),
(88, 27, 21, 1, 'DOCENTE', 1),
(89, 10, 21, 1, 'DOCENTE', 1),
(90, 20, 21, 1, 'DOCENTE', 1),
(91, 20, 27, 1, 'DOCENTE', 1),
(92, 11, 21, 1, 'ESTUDIANTE', 1),
(93, 21, 21, 1, 'ESTUDIANTE', 1),
(94, 24, 21, 2, 'ESTUDIANTE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--

CREATE TABLE `items` (
  `id_item` int(11) NOT NULL,
  `nombre_item` varchar(255) NOT NULL,
  `estatus_item` tinyint(1) NOT NULL,
  `at_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `at_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`id_item`, `nombre_item`, `estatus_item`, `at_created`, `at_updated`) VALUES
(1, 'SOLICITUDES DE COMISIÓN ASESORA', 1, '2023-05-03 04:03:18', '2023-05-03 04:03:18'),
(2, 'VINCULACIÓN COMUNITARIA', 1, '2023-05-03 04:03:18', '2023-05-03 04:03:18'),
(3, 'DOCENTES', 1, '2023-05-03 04:03:18', '2023-05-03 04:03:18'),
(4, 'INDICADORES DE INVESTIGACIÓN', 1, '2023-05-03 04:03:18', '2023-05-03 04:03:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `nombre_rol` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Asistente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitantes`
--

CREATE TABLE `solicitantes` (
  `id_solicitante` int(11) NOT NULL,
  `cedula` int(25) NOT NULL,
  `nombres` varchar(155) DEFAULT NULL,
  `apellidos` varchar(155) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(55) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `nivel_estudio` varchar(55) DEFAULT NULL,
  `tipo_solicitante` varchar(55) DEFAULT 'ESTUDIANTE',
  `fecha_nacimiento` varchar(55) DEFAULT NULL,
  `estatus_solicitante` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitantes`
--

INSERT INTO `solicitantes` (`id_solicitante`, `cedula`, `nombres`, `apellidos`, `edad`, `direccion`, `telefono`, `correo`, `nivel_estudio`, `tipo_solicitante`, `fecha_nacimiento`, `estatus_solicitante`, `created_at`, `updated_at`) VALUES
(1, 12345678, 'juan jose', 'perez jimenez', 20, NULL, '04142343432', 'juanjose@gmail.com', NULL, 'ESTUDIANTE', NULL, 0, '2023-05-08 06:05:24', '2023-05-08 06:05:24'),
(2, 1237665, 'juan jose', 'perez jimenez', 20, NULL, NULL, 'juanjose@gmail.com', NULL, 'DOCENTE', NULL, 0, '2023-05-08 06:06:54', '2023-05-08 06:06:54'),
(3, 321678, 'juan jose', 'perez jimenez', 20, NULL, NULL, 'juanjose@gmail.com', NULL, 'ESTUDIANTE', NULL, NULL, '2023-05-08 06:06:54', '2023-05-08 06:06:54'),
(4, 878787, 'juan jose', 'perez jimenez', 20, NULL, NULL, 'juanjose@gmail.com', NULL, 'DOCENTE', NULL, 0, '2023-05-08 06:06:54', '2023-05-08 06:06:54'),
(5, 676767, 'juan jose', 'perez jimenez', 20, NULL, NULL, 'juanjose@gmail.com', NULL, 'ESTUDIANTE', NULL, NULL, '2023-05-08 06:06:54', '2023-05-08 06:06:54'),
(6, 56565643, 'juan jose', 'perez jimenez', 20, NULL, NULL, 'juanjose@gmail.com', NULL, 'DOCENTE', NULL, 0, '2023-05-08 06:06:54', '2023-05-08 06:06:54'),
(7, 600987, 'juan jose', 'perez jimenez', 20, NULL, NULL, 'juanjose@gmail.com', NULL, 'ESTUDIANTE', NULL, 0, '2023-05-08 06:06:54', '2023-05-08 06:06:54'),
(8, 27897654, 'Debora Cristina', 'Nuñez De Osuna', NULL, 'Casa', '04143546578', 'debo@gmail.com', 'Licenciada', 'DOCENTE', NULL, 1, '2023-05-08 06:22:23', '2023-05-08 06:22:23'),
(9, 13243546, 'Yordhis Jose', 'Osuna Aguirre', NULL, 'casa', '0414334444567', 'trqwer@qwer.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-08 06:34:52', '2023-05-08 06:34:52'),
(10, 1234567, 'Pedro Jose', 'Perez Sanches', NULL, 'xasa', '12345', 'asdf@asd.com', 'Ingeniero', 'DOCENTE', NULL, 1, '2023-05-08 06:36:34', '2023-05-08 06:36:34'),
(11, 231231098, 'Luis Daniel', 'Idalgo', 19, 'casa', '414232345434', 'asdas@ssas.com', NULL, 'ESTUDIANTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(20, 24823972, 'Yordhis Jose', 'Osuna Aguirre', NULL, 'Casa2323', '04143635363', 'ldwwhidalgo@gmail.com', 'Ingeniero', 'DOCENTE', NULL, 1, '2023-05-10 01:51:25', '2023-05-10 01:51:25'),
(21, 23123177, 'Reimundo Daniel', 'Hidalgo', 22, 'casa', '414232345434', 'rei@gmail.com', 'Bachiller', 'ESTUDIANTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(22, 8888888, 'Reimundo Juan', 'Hidalgo', 26, 'casa', '414232345434', 'rei2@gmail.com', 'Bachiller', 'ESTUDIANTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(23, 999999, 'Debaro Juan', 'Hidalgo', 26, 'casa', '414232345434', 'debaro@gmail.com', 'Bachiller', 'ESTUDIANTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(24, 111111, 'denis', 'Guerra', 26, 'casa', '414232345434', 'denis@gmail.com', 'Bachiller', 'ESTUDIANTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(25, 12345678, 'juan jose', 'perez jimenez', 20, 'casa', '4142343432', 'juanjose@gmail.com', NULL, 'ESTUDIANTE', '2023-05-10', 1, '2023-05-10 06:19:01', '2023-05-10 06:19:01'),
(26, 9999995, 'Darwin Juan', 'perez', 26, 'casa', '414232345434', 'dar@gmail.com', 'Ingeniero', 'DOCENTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(27, 1232222, 'Frank Juan', 'perez', 26, 'casa', '414232345434', 'frank@gmail.com', 'Ingeniero', 'DOCENTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(28, 124445, 'der Juan', 'perez', 26, 'casa', '414232345434', 'der@gmail.com', 'Ingeniero', 'DOCENTE', '2003-05-08', 1, '2023-05-08 07:02:04', '2023-05-08 07:02:04'),
(29, 24856789, 'Luis Daniel', 'Quintero Molina', 24, 'casa molina', '4147538695', 'molluis@gmail.com', NULL, 'ESTUDIANTE', '1999-05-19', 1, '2023-05-18 20:57:16', '2023-05-18 20:57:16'),
(30, 24856789, 'Luis Daniel', 'Quintero Molina', 24, 'casa molina 22', '4147538695', 'molluis@gmail.com', NULL, 'ESTUDIANTE', '1999-05-19', 0, '2023-05-18 20:57:33', '2023-05-18 20:57:33'),
(31, 23131231, 'test teet', 'test', 12, 'asdas', '12312312', 'trqswer@qwer.com', NULL, 'ESTUDIANTE', '2023-05-24', 0, '2023-05-18 22:18:18', '2023-05-18 22:18:18'),
(32, 88888882, 'test teet', 'rtes', 32, 'casa molina molina 22', '4123452673', 'asdsadas@sssas.com', NULL, 'ESTUDIANTE', '2005-05-17', 0, '2023-05-18 22:22:18', '2023-05-18 22:22:18'),
(33, 12331231, 'test tretett', 'etset ', 123, 'asdasd', '1231231', 'asdsadas@ssas.com', NULL, 'ESTUDIANTE', '2010-05-05', 0, '2023-05-18 22:24:30', '2023-05-18 22:24:30'),
(34, 888888844, 'test2', 'test2', 242, 'casa molina molina 22', '4123452673', 'trqswer@qwer.com', NULL, 'ESTUDIANTE', '2023-05-18', 0, '2023-05-22 15:10:34', '2023-05-22 15:10:34'),
(35, 30897654, 'Yorman Josse', 'Osuna Aguirre', 22, 'Casa2323', '41463474645', 'trqswer@qwer.com', NULL, 'ESTUDIANTE', '2001-05-23', 1, '2023-05-22 17:34:13', '2023-05-22 17:34:13'),
(36, 8888888, 'test teet', 'test', NULL, 'casa', '04123452673', 'asdsadas@sssas.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-22 19:03:39', '2023-05-22 19:03:39'),
(37, 8888888, 'test teet', 'test', NULL, 'casa', '04123452673', 'asdsadas@sssas.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-22 19:03:49', '2023-05-22 19:03:49'),
(38, 8888888, 'test teet', 'test', NULL, 'casa', '04123452673', 'asdsadas@sssas.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-22 19:04:37', '2023-05-22 19:04:37'),
(39, 2147483647, 'test', 'testt', NULL, 'qweq', '04123452673', 'trqswer@qwer.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-22 19:04:57', '2023-05-22 19:04:57'),
(40, 8888888, 'test teet', 'testt', NULL, 'casa molina molina 22', '04123452673', 'trqswer@qwer.com', 'Licenciada', 'DOCENTE', NULL, 0, '2023-05-22 19:08:11', '2023-05-22 19:08:11'),
(41, 8888888, 'test teet', 'testt', NULL, 'qweq', '04123452673', 'asdsadas@sssas.com', 'Licenciada', 'DOCENTE', NULL, 0, '2023-05-22 19:15:28', '2023-05-22 19:15:28'),
(42, 8888888, 'test teet', 'testt', NULL, 'casa molina molina 2212121212', '04123452673', 'trqswer@qwer.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-22 19:16:23', '2023-05-22 19:16:23'),
(43, 8888888, 'test teet', 'test', NULL, 'casa las lomas', '04123452673', 'trqswer@qwer.com', 'Ingeniero', 'DOCENTE', NULL, 0, '2023-05-22 19:17:27', '2023-05-22 19:17:27'),
(44, 22222222, 'Fabian Kose', 'NAverlin Gallego', 22, 'casa de su mama', '41234526732', 'gallego@gmail.com', NULL, 'ESTUDIANTE', '2001-05-24', 1, '2023-05-30 05:19:05', '2023-05-30 05:19:05'),
(45, 77776666, 'Fabian Kose', 'Contreras', NULL, 'casa de su mama', '04123452673', 'gallego@gmail.com', 'Ingeniero', 'DOCENTE', NULL, 1, '2023-05-31 05:46:26', '2023-05-31 05:46:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_ca`
--

CREATE TABLE `solicitudes_ca` (
  `id_solicitud` int(11) NOT NULL,
  `id_solicitante` int(11) NOT NULL,
  `tipo_solicitante` varchar(55) DEFAULT 'ESTUDIANTE',
  `id_subprograma` int(11) DEFAULT NULL,
  `id_item` int(11) DEFAULT NULL,
  `id_indicador` int(11) DEFAULT NULL,
  `extra_info` varchar(255) DEFAULT NULL,
  `estatus_solicitud` varchar(55) NOT NULL DEFAULT 'PENDIENTE',
  `at_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `at_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitudes_ca`
--

INSERT INTO `solicitudes_ca` (`id_solicitud`, `id_solicitante`, `tipo_solicitante`, `id_subprograma`, `id_item`, `id_indicador`, `extra_info`, `estatus_solicitud`, `at_created`, `at_update`) VALUES
(22, 5, 'ESTUDIANTE', 4, 1, 4, '10,20', 'APROBADO', '2023-05-10 04:22:34', '2023-05-10 04:22:34'),
(24, 20, 'DOCENTE', 6, 3, 18, 'Doctorado,', 'APROBADO', '2023-05-10 04:58:56', '2023-05-10 04:58:56'),
(25, 3, 'ESTUDIANTE', 6, 1, 7, '25,', 'PROCESANDO', '2023-05-10 05:29:27', '2023-05-10 05:29:27'),
(26, 11, 'ESTUDIANTE', 4, 1, 6, 'Informatica,', 'APROBADO', '2023-05-10 06:23:26', '2023-05-10 06:23:26'),
(27, 21, 'ESTUDIANTE', 4, 1, 1, 'mañana,', 'APROBADO', '2023-05-10 06:24:16', '2023-05-10 06:24:16'),
(28, 22, 'ESTUDIANTE', 6, 1, 7, '24,', 'PENDIENTE', '2023-05-10 06:25:40', '2023-05-10 06:25:40'),
(29, 23, 'ESTUDIANTE', 14, 1, 10, 'tesis,', 'APROBADO', '2023-05-10 06:26:50', '2023-05-10 06:26:50'),
(31, 1, 'ESTUDIANTE', 21, 1, 4, 'TSU Construcion civil,ING Construcion civil', 'APROBADO', '2023-05-10 06:29:17', '2023-05-10 06:29:17'),
(32, 8, 'DOCENTE', 4, 3, 18, 'Especialización,', 'APROBADO', '2023-05-10 06:30:19', '2023-05-10 06:30:19'),
(33, 10, 'DOCENTE', 6, 4, 22, ',', 'RECHAZADO', '2023-05-10 06:31:05', '2023-05-10 06:31:05'),
(34, 20, 'DOCENTE', 6, 3, 20, 'escalafoneando,', 'APROBADO', '2023-05-10 06:31:47', '2023-05-10 06:31:47'),
(35, 26, 'DOCENTE', 21, 3, 17, ',', 'RECHAZADO', '2023-05-10 06:33:13', '2023-05-10 06:33:13'),
(36, 27, 'DOCENTE', 6, 2, 14, 'Open Free,', 'PENDIENTE', '2023-05-10 06:33:59', '2023-05-10 06:33:59'),
(37, 28, 'DOCENTE', 6, 4, 21, 'comunidad ,', 'APROBADO', '2023-05-10 06:34:46', '2023-05-10 06:34:46'),
(38, 36, 'DOCENTE', 21, 1, 2, 'Calculo 2,', 'RECHAZADO', '2023-05-23 05:42:53', '2023-05-23 05:42:53'),
(39, 23, 'ESTUDIANTE', 4, 1, 8, 'Investigacion social,', 'RECHAZADO', '2023-05-29 23:02:44', '2023-05-29 23:02:44'),
(40, 8, 'DOCENTE', 27, 2, 13, 'rESTAURACIÓN DE AREAS VERDES,', 'APROBADO', '2023-05-30 04:09:30', '2023-05-30 04:09:30'),
(41, 23, 'ESTUDIANTE', 27, 1, 9, '19,', 'APROBADO', '2023-05-30 05:16:25', '2023-05-30 05:16:25'),
(42, 24, 'ESTUDIANTE', 14, 1, 5, 'Investigacion social,', 'APROBADO', '2023-05-30 05:17:13', '2023-05-30 05:17:13'),
(43, 44, 'ESTUDIANTE', 6, 1, 3, ',', 'APROBADO', '2023-05-30 05:19:59', '2023-05-30 05:19:59'),
(44, 23, 'ESTUDIANTE', 27, 1, 4, 'a,b', 'RECHAZADO', '2023-05-30 14:25:28', '2023-05-30 14:25:28'),
(45, 24, 'ESTUDIANTE', 21, 1, 4, 'z,x', 'APROBADO', '2023-05-30 14:26:01', '2023-05-30 14:26:01'),
(46, 29, 'ESTUDIANTE', 6, 1, 4, 'q,w', 'APROBADO', '2023-05-30 14:26:36', '2023-05-30 14:26:36'),
(47, 8, 'DOCENTE', 6, 3, 19, 'TITULAR,', 'APROBADO', '2023-05-31 03:30:25', '2023-05-31 03:30:25'),
(48, 10, 'DOCENTE', 5, 3, 19, 'AGREGADO,', 'APROBADO', '2023-05-31 03:30:51', '2023-05-31 03:30:51'),
(49, 20, 'DOCENTE', 14, 3, 19, 'INSTRUCTOR,', 'APROBADO', '2023-05-31 03:32:15', '2023-05-31 03:32:15'),
(50, 26, 'DOCENTE', 6, 3, 18, 'Especialización,', 'APROBADO', '2023-05-31 03:32:51', '2023-05-31 03:32:51'),
(51, 45, 'DOCENTE', 27, 3, 19, 'ASISTENTE,', 'APROBADO', '2023-05-31 07:35:28', '2023-05-31 07:35:28'),
(52, 28, 'DOCENTE', 6, 3, 19, 'ASOCIADO,', 'APROBADO', '2023-05-31 07:36:20', '2023-05-31 07:36:20'),
(53, 26, 'DOCENTE', 21, 3, 19, 'TITULAR,', 'APROBADO', '2023-05-31 07:54:03', '2023-05-31 07:54:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subproyectos`
--

CREATE TABLE `subproyectos` (
  `id_subproyecto` int(11) NOT NULL,
  `codigo_subproyecto` varchar(75) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `nombre_subproyecto` varchar(155) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `id_semestre` int(11) DEFAULT NULL,
  `estatus_subproyecto` tinyint(1) DEFAULT 1,
  `at_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `at_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `subproyectos`
--

INSERT INTO `subproyectos` (`id_subproyecto`, `codigo_subproyecto`, `nombre_subproyecto`, `id_carrera`, `id_semestre`, `estatus_subproyecto`, `at_created`, `at_update`) VALUES
(1, '0001', 'Introducción a la informática', 1, 1, 1, '2023-05-22 23:04:38', '2023-05-22 23:04:38'),
(2, '0002', 'Calculo 1', 1, 1, 1, '2023-05-22 23:04:38', '2023-05-22 23:04:38'),
(3, '0003', 'Lenguaje y comunicación', 1, 1, 1, '2023-05-22 23:04:38', '2023-05-22 23:04:38'),
(4, '0004', 'Deporte', 1, 1, 2, '2023-05-22 23:04:38', '2023-05-22 23:04:38'),
(5, '0005', 'Ética y desarrollo personal', 1, 1, 0, '2023-05-22 23:04:38', '2023-05-22 23:04:38'),
(6, '0006', 'test teet', NULL, NULL, 0, '2023-05-23 02:59:49', '2023-05-23 02:59:49'),
(7, '0005', 'test', NULL, NULL, 0, '2023-05-23 03:11:00', '2023-05-23 03:11:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `turno_id` int(11) NOT NULL,
  `tipo_turno` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`turno_id`, `tipo_turno`) VALUES
(1, 'mañana'),
(2, 'tarde');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user_id` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  `estatus` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user_id`, `nombre`, `usuario`, `password`, `rol`, `estatus`) VALUES
(24, 'luis', 'luis', '$2y$10$qg2Up7EegqXZqYHU1h3k1uAW9PjMke2.ygc4BmEkwDPlB6PkPKYoi', 2, 1),
(37, 'Leonardo Contreras', 'LeoAdmin', '$2y$10$4.CmeCq5k0uZBAp6OYJfLOR0qlv4e4gm1OPb7VxAbJ8mgShw2/Lj6', 1, 1),
(39, 'Yordhis', 'osuna-dev', '$2y$10$xFjNeqDKtUstCBVCnM28t.wsaEx4xEsBB7.8.m.S697MKI7AXq6MC', 1, 1),
(40, 'admin', 'admin', '$2y$10$GHR5QPPt1Mci28QDcWpvieWyeRudR/C1UV8ggs4ShP7.L4cR7.53O', 1, 1),
(41, 'asistente', 'asistente', '$2y$10$bdsRFLdN5GvZi/Ktj.AKFeXJiIgFpf4lxQEelWv1kvQsfXSQRMySi', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`aula_id`);

--
-- Indices de la tabla `cargas_academicas`
--
ALTER TABLE `cargas_academicas`
  ADD PRIMARY KEY (`id_carga_academica`);

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`curso_id`);

--
-- Indices de la tabla `indicadores`
--
ALTER TABLE `indicadores`
  ADD PRIMARY KEY (`id_indicador`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`inscripcion_id`),
  ADD KEY `turno_id` (`turno_id`),
  ADD KEY `inscripcion_ibfk_1` (`curso_id`),
  ADD KEY `inscripcion_ibfk_2` (`alumno_id`);

--
-- Indices de la tabla `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id_item`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `solicitantes`
--
ALTER TABLE `solicitantes`
  ADD PRIMARY KEY (`id_solicitante`);

--
-- Indices de la tabla `solicitudes_ca`
--
ALTER TABLE `solicitudes_ca`
  ADD PRIMARY KEY (`id_solicitud`);

--
-- Indices de la tabla `subproyectos`
--
ALTER TABLE `subproyectos`
  ADD PRIMARY KEY (`id_subproyecto`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`turno_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aula`
--
ALTER TABLE `aula`
  MODIFY `aula_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargas_academicas`
--
ALTER TABLE `cargas_academicas`
  MODIFY `id_carga_academica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carreras`
--
ALTER TABLE `carreras`
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `curso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `indicadores`
--
ALTER TABLE `indicadores`
  MODIFY `id_indicador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `inscripcion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitantes`
--
ALTER TABLE `solicitantes`
  MODIFY `id_solicitante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `solicitudes_ca`
--
ALTER TABLE `solicitudes_ca`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `subproyectos`
--
ALTER TABLE `subproyectos`
  MODIFY `id_subproyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `turno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
