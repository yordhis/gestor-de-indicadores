<?php

require_once '../../includes/config.php';

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
$data = $query->fetchAll(PDO::FETCH_ASSOC);



for($i = 0;$i < count($data);$i++) {
    $data[$i]['contador'] = $i+1;
    
    $sqlSolicitudes = " SELECT COUNT(id_indicador) as 'total_solicitudes' FROM solicitudes_ca WHERE id_indicador = ?";
    $querySolicitud = $pdo->prepare($sqlSolicitudes);
    $querySolicitud->execute(array($data[$i]['id_indicador']));
    $dataSol = $querySolicitud->fetch();
    // echo "Total de solicitudes de algo: " . $dataSol['total'];
    $data[$i]['total_solicitudes'] = $dataSol['total_solicitudes'];

    
}

// print_r($subprogramas);

echo json_encode($data,JSON_UNESCAPED_UNICODE);
// print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
die();


// <button class="btn btn-info btn-sm btnVerSolicitud" onclick="verSolicitud()" rl="'.$data[$i]['id_solicitud'].'" title="Ver Solicitud"><i class="fas fa-eye"></i></button> 