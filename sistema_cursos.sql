-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2023 a las 16:02:02
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
-- Base de datos: `sistema_cursos`
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
(9, 'VPDSINGIFORTW', 'PROGRAMACION 22', 2, '2023-04-26 16:02:46'),
(14, 'VPDSINGCC', 'INGENIERIA CONSTRUCCION CIVIL', 1, '2023-04-26 16:17:36'),
(20, 'test', 'test', 0, '2023-04-27 02:01:46'),
(21, 'VPDSTCC01', 'TSU CONSTRUCCION CIVIL', 1, '2023-04-27 02:14:11'),
(22, 'TEST9', 'TEST9', 0, '2023-04-27 02:25:36'),
(23, 'TEST99', 'TEST99', 0, '2023-04-27 02:34:32'),
(24, 'TEST23', 'TES23', 2, '2023-04-27 02:34:46');

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
(23, 'Trabajos Retirados', 1, 4, '2023-05-03 04:28:28', '2023-05-03 04:28:28'),
(24, 'Matricula o Total de Estudiantes', 1, 1, '2023-05-10 05:42:40', '2023-05-10 05:42:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `inscripcion_id` int(11) NOT NULL,
  `alumno_id` int(11) DEFAULT NULL,
  `curso_id` int(11) DEFAULT NULL,
  `turno_id` int(11) NOT NULL,
  `estatusI` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `materia_id` int(11) NOT NULL,
  `nombre_materia` varchar(255) DEFAULT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `id_semestre` int(11) DEFAULT NULL,
  `estatus` int(11) NOT NULL DEFAULT 1,
  `at_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `at_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`materia_id`, `nombre_materia`, `id_carrera`, `id_semestre`, `estatus`, `at_created`, `at_updated`) VALUES
(1, 'Programacion', NULL, NULL, 1, '2023-05-03 04:34:40', '2023-05-03 04:34:40'),
(11, 'Base de Datos II', NULL, NULL, 1, '2023-05-03 04:34:40', '2023-05-03 04:34:40'),
(13, 'Redes 1', NULL, NULL, 1, '2023-05-03 04:35:01', '2023-05-03 04:35:01'),
(14, 'Desarrollo de aplicaciones 1', NULL, NULL, 1, '2023-05-10 06:05:32', '2023-05-10 06:05:32'),
(15, 'Desarrollo de aplicaciones 2', NULL, NULL, 1, '2023-05-10 06:05:49', '2023-05-10 06:05:49');

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
(32, 88888882, 'test teet', 'rtes', 32, 'casa molina molina 22', '4123452673', 'asdsadas@sssas.com', NULL, 'ESTUDIANTE', '2005-05-17', 1, '2023-05-18 22:22:18', '2023-05-18 22:22:18'),
(33, 12331231, 'test tretett', 'etset ', 123, 'asdasd', '1231231', 'asdsadas@ssas.com', NULL, 'ESTUDIANTE', '2010-05-05', 1, '2023-05-18 22:24:30', '2023-05-18 22:24:30');

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
(22, 5, 'ESTUDIANTE', 4, 1, 4, '10,20', 'PENDIENTE', '2023-05-10 04:22:34', '2023-05-10 04:22:34'),
(24, 20, 'DOCENTE', 6, 3, 18, 'Doctorado,', 'ATENDIDO', '2023-05-10 04:58:56', '2023-05-10 04:58:56'),
(25, 3, 'ESTUDIANTE', 6, 1, 7, '25,', 'PROCESANDO', '2023-05-10 05:29:27', '2023-05-10 05:29:27'),
(26, 11, 'ESTUDIANTE', 4, 1, 6, 'Informatica,', 'PROCESANDO', '2023-05-10 06:23:26', '2023-05-10 06:23:26'),
(27, 21, 'ESTUDIANTE', 4, 1, 1, 'mañana,', 'PENDIENTE', '2023-05-10 06:24:16', '2023-05-10 06:24:16'),
(28, 22, 'ESTUDIANTE', 6, 1, 7, '24,', 'PENDIENTE', '2023-05-10 06:25:40', '2023-05-10 06:25:40'),
(29, 23, 'ESTUDIANTE', 14, 1, 10, 'tesis,', 'PENDIENTE', '2023-05-10 06:26:50', '2023-05-10 06:26:50'),
(31, 1, 'ESTUDIANTE', 21, 1, 4, 'TSU Construcion civil,ING Construcion civil', 'PENDIENTE', '2023-05-10 06:29:17', '2023-05-10 06:29:17'),
(32, 8, 'DOCENTE', 4, 3, 18, 'Especialización,', 'PENDIENTE', '2023-05-10 06:30:19', '2023-05-10 06:30:19'),
(33, 10, 'DOCENTE', 6, 4, 22, 'El internet de las cosas,', 'PENDIENTE', '2023-05-10 06:31:05', '2023-05-10 06:31:05'),
(34, 20, 'DOCENTE', 6, 3, 20, 'escalafoneando,', 'PENDIENTE', '2023-05-10 06:31:47', '2023-05-10 06:31:47'),
(35, 26, 'DOCENTE', 21, 3, 17, 'director,', 'PENDIENTE', '2023-05-10 06:33:13', '2023-05-10 06:33:13'),
(36, 27, 'DOCENTE', 6, 2, 14, 'Open Free,', 'PENDIENTE', '2023-05-10 06:33:59', '2023-05-10 06:33:59'),
(37, 28, 'DOCENTE', 6, 4, 21, 'comunidad ,', 'PENDIENTE', '2023-05-10 06:34:46', '2023-05-10 06:34:46');

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
(1, 'Luis Noguera ', 'admin', '$2y$10$8ZS.FsA1sA4YOYLfDNxMYu29qvSGB01s8WKiSF/3Gc5FkP1.y5tf2', 1, 0),
(24, 'luis', 'luis', '$2y$10$qg2Up7EegqXZqYHU1h3k1uAW9PjMke2.ygc4BmEkwDPlB6PkPKYoi', 2, 1),
(37, 'Leonardo Contreras', 'LeoAdmin', '$2y$10$4.CmeCq5k0uZBAp6OYJfLOR0qlv4e4gm1OPb7VxAbJ8mgShw2/Lj6', 1, 1),
(38, 'test-asistente', 'asistentest', '$2y$10$AgMl1oZhJOacnAgLfX0bsut90YbozX0IPMWalLQ8gFDVCJGEzQxzm', 2, 0),
(39, 'Yordhis', 'osuna-dev', '$2y$10$xFjNeqDKtUstCBVCnM28t.wsaEx4xEsBB7.8.m.S697MKI7AXq6MC', 1, 0);

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
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`materia_id`);

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
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `curso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `indicadores`
--
ALTER TABLE `indicadores`
  MODIFY `id_indicador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `inscripcion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `materia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitantes`
--
ALTER TABLE `solicitantes`
  MODIFY `id_solicitante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `solicitudes_ca`
--
ALTER TABLE `solicitudes_ca`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `turno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
