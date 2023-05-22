<?php

require_once '../../includes/config.php';

$id_item = $_GET['id_item'];

$sqlIndicadores = "SELECT * FROM indicadores WHERE id_item = ? ";
$queryIndicadores = $pdo->prepare($sqlIndicadores);
$queryIndicadores->execute(array($id_item));
$data = $queryIndicadores->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);