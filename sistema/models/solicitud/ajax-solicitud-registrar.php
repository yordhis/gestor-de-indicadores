<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['id_solicitante']) || empty($_POST['listSubprogramas']) || empty($_POST['listIndicadores']) || empty($_POST['listEstatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $idSolicitante =  intval($_POST['id_solicitante'], 10);
        $idSubprogramas = intval($_POST['listSubprogramas'], 10);
        $idItem = intval($_POST['listItems'], 10);
        $idIndicadores = intval($_POST['listIndicadores'], 10);
        $estatus_solicitud = $_POST['listEstatus'];
        $extra_info_1 = $_POST['extra_info_1'] ?? '';
        $extra_info_2 = $_POST['extra_info_2'] ?? '';
        $tipo_solicitante = $_POST['tipo_solicitante'];

        
        $extra_info = trim($extra_info_1 . "," . $extra_info_2);

        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM solicitudes_ca WHERE id_solicitante = ? AND id_indicador = ? ";
        $query = $pdo->prepare($sql);
        $query->execute(array($idSolicitante, $idIndicadores));
        $resultDataBase = $query->fetch(PDO::FETCH_ASSOC);

        /** Validamos si ya el codigo existe */
        if($resultDataBase) {
            $arrResponse = array('status' => false,'msg' => 'Usted ya poseé una solicitud del indicador en cuestión.');
        } else {
            // Crear la solicitud
            // $solicitud = `{$arrResponse['status']} Yo, Yordhis Osuna, CI: 24823972 estudiante del subprograma Ing. informatica, 
            // Solicito ante la Comisión Asesora del Programa Ciencias Básicas y aplicadas, 
            // lo siguiente: (Cambio de Turno y/o Sección)`;

            $sql_insert = "INSERT INTO solicitudes_ca (id_solicitante, id_subprograma, id_item, id_indicador, estatus_solicitud, extra_info, tipo_solicitante) VALUES (?,?,?,?,?,?,?)";
            $query_insert = $pdo->prepare($sql_insert);
            $request = $query_insert->execute(array($idSolicitante,$idSubprogramas, $idItem, $idIndicadores, $estatus_solicitud, $extra_info, $tipo_solicitante ));
           
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Solicitud creada correctamente'); 
            }else {
                $arrResponse = ['status' => false, 'msg'=> 'fallo al crear la solicitud'];
            }
        
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}