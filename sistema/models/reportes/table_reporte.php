<?php

require_once '../../includes/config.php';

// SELECT COUNT(cedula) as 'total_matricula' FROM solicitantes WHERE tipo_solicitante = 'estudiante';

$sqlMatricula = " SELECT COUNT(cedula) as 'total_matricula' FROM solicitantes WHERE tipo_solicitante = 'ESTUDIANTE' ";
    $queryMatricula = $pdo->prepare($sqlMatricula);
    $queryMatricula->execute();
    $matricula = $queryMatricula->fetch();

$sqlSubprogramas = " SELECT COUNT(*) as 'total_subprogramas' FROM carreras ";
    $querySubprogramas = $pdo->prepare($sqlSubprogramas);
    $querySubprogramas->execute();
    $subprogramas = $querySubprogramas->fetch();


$sql = " SELECT I.id_indicador, I.nombre as nombre_indicador, estatus_indicador, I.id_item,
        T.id_item, T.nombre_item, T.estatus_item
FROM indicadores I, items T 
WHERE I.id_item = T.id_item
";
$query = $pdo->prepare($sql);
$query->execute();
$dataSql = $query->fetchAll(PDO::FETCH_ASSOC);



for($i = 0;$i < count($dataSql);$i++) {

    $data['data'][$i] = $dataSql[$i];

    $sqlSolicitudes = " SELECT COUNT(id_indicador) as 'total_solicitudes' FROM solicitudes_ca WHERE id_indicador = ?";
    $querySolicitud = $pdo->prepare($sqlSolicitudes);
    $querySolicitud->execute(array($dataSql[$i]['id_indicador']));
    $dataSol = $querySolicitud->fetch();
    $data['data'][$i]['total_solicitudes'] = $dataSol['total_solicitudes'];
    
    
}
$data['total_matricula'] =  $matricula['total_matricula'];


echo json_encode($data,JSON_UNESCAPED_UNICODE);

die();
