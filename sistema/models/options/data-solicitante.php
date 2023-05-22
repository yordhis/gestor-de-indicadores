<?php

require_once '../../includes/config.php';

$cedula = $_GET['cedula'];
$tipo = $_GET['tipo'];

    $sqlSolicitante = "SELECT * FROM solicitantes WHERE cedula = ? AND tipo_solicitante= ? ";
    $querySolicitante = $pdo->prepare($sqlSolicitante);
    $querySolicitante->execute([$cedula, $tipo]);
    $data = $querySolicitante->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($data,JSON_UNESCAPED_UNICODE);