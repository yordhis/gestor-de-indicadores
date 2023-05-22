<?php

require_once '../../includes/config.php';

if(!empty($_GET)) {
    $id = $_GET['id'];

        $sql = 'SELECT 
        id_solicitud, 
        S.id_solicitante,
        id_subprograma,
        S.tipo_solicitante,
        id_item, 
        id_indicador, 
        estatus_solicitud, 
        extra_info, 
        T.id_solicitante, 
        T.cedula
        FROM solicitudes_ca S, solicitantes T
        WHERE id_solicitud = ? AND  S.id_solicitante = T.id_solicitante';
    

    $query = $pdo->prepare($sql);
    $query->execute(array($id));
    $data = $query->fetch(PDO::FETCH_ASSOC);

    $data['extra_info_1'] = explode(',', $data['extra_info'])[0] ?? '';
    $data['extra_info_2'] = explode(',', $data['extra_info'])[1] ?? '';


    if(empty($data)) {
        $arrResponse = array('status' => false,'msg' => 'Datos no encontrados');
    } else {
        $arrResponse = array('status' => true,'data' => $data);
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}