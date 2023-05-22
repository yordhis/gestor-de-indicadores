<?php

require_once '../../includes/config.php';
// las carreras hacen referencia a los subprogramas
$sqlCurso = "SELECT * FROM carreras ";
$queryCurso = $pdo->prepare($sqlCurso);
$queryCurso->execute();
$data = $queryCurso->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);