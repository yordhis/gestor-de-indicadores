<?php

require_once '../../includes/config.php';

if(!empty($_GET)) {
    $id = $_GET['id'];

    $sql = "SELECT S.id_solicitud, S.id_solicitante, S.id_subprograma, S.id_indicador, S.estatus_solicitud, S.at_created, 
    CONCAT(A.nombres, ' ', A.apellidos) as nombre_solicitante,  A.cedula, A.id_solicitante,
    I.nombre as nombre_indicador, I.id_indicador,
    C.nombre as nombre_subprograma, C.id_carrera
    FROM solicitudes_ca S, solicitantes A, indicadores I, carreras C
    WHERE S.id_solicitud = ? AND  S.id_solicitante = A.id_solicitante AND S.id_indicador = I.id_indicador
    AND S.id_subprograma = C.id_carrera
    ";

    $query = $pdo->prepare($sql);
    $query->execute(array($id));
    $data = $query->fetch(PDO::FETCH_ASSOC);

    if(empty($data)) {
        $arrResponse = array('status' => false,'msg' => 'Datos no encontrados');
    } else {
        $arrResponse = array('status' => true,'data' => $data);
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}