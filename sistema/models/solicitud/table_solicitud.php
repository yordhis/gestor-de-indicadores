<?php

require_once '../../includes/config.php';

$sql = "SELECT 
S.id_solicitud, 
S.id_solicitante, 
S.tipo_solicitante, 
S.id_subprograma, 
S.id_item, 
S.id_indicador, 
S.extra_info, 
S.estatus_solicitud, 
S.at_created, 
CONCAT(A.nombres, ' ', A.apellidos, ' CI:', A.cedula) as nombre_solicitante, 
A.id_solicitante,
I.nombre as nombre_indicador, 
I.id_indicador,
T.nombre_item as nombre_item, 
T.id_item,
C.nombre as nombre_subprograma, 
C.id_carrera
FROM solicitudes_ca S, solicitantes A, indicadores I, carreras C, items T
WHERE 
S.id_solicitante = A.id_solicitante 
AND S.id_indicador = I.id_indicador
AND S.id_subprograma = C.id_carrera 
AND S.id_item = T.id_item
";
$query = $pdo->prepare($sql);
$query->execute();

$data = $query->fetchAll(PDO::FETCH_ASSOC);
// echo $data;
for($i = 0;$i < count($data);$i++) {
    $data[$i]['contador'] = $i+1;

    if($data[$i]['estatus_solicitud'] == "ATENDIDO") {
        $data[$i]['estatus_solicitud'] = '<span class="badge badge-success">ATENDIDO</span>';
    } else if($data[$i]['estatus_solicitud'] == "PROCESANDO") {
        $data[$i]['estatus_solicitud'] = '<span class="badge badge-warning">PROCESANDO</span>';
    }else{
        $data[$i]['estatus_solicitud'] = '<span class="badge badge-danger">PENDIENTE</span>';
    }

    $data[$i]['options'] = '<div class="text-center">
        <button class="btn btn-primary btn-sm btnEditSolicitud" rl="'.$data[$i]['id_solicitud'].'" title="Editar"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn btn-danger btn-sm btnDelSolicitud" rl="'.$data[$i]['id_solicitud'].'" title="Eliminar"><i class="fas fa-trash-alt"></i></button>                   
    </div>';
}

echo json_encode($data,JSON_UNESCAPED_UNICODE);
die();


// <button class="btn btn-info btn-sm btnVerSolicitud" onclick="verSolicitud()" rl="'.$data[$i]['id_solicitud'].'" title="Ver Solicitud"><i class="fas fa-eye"></i></button> 