<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['id_solicitante']) || empty($_POST['listSubprogramas']) || empty($_POST['listIndicadores'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $id = $_POST['id'];
        $idSolicitante =  intval($_POST['id_solicitante'], 10);
        $idSubprogramas = intval($_POST['listSubprogramas'], 10);
        $idIndicadores = intval($_POST['listIndicadores'], 10);
        $estatus = $_POST['listEstatus'];
        $extra_info_1 = $_POST['extra_info_1'] ?? '';
        $extra_info_2 = $_POST['extra_info_2'] ?? '';

        
        $extra_info = trim($extra_info_1 . "," . $extra_info_2);

         /** Validamos si existe para actualizar */
     
            $sql_update = "UPDATE solicitudes_ca SET id_solicitante = ?, id_subprograma = ?, id_indicador = ?, estatus_solicitud = ? , extra_info = ?
            WHERE id_solicitud = ? ";
            $query_update = $pdo->prepare($sql_update);
            $request2 = $query_update->execute(array($idSolicitante,$idSubprogramas,$idIndicadores,$estatus,$extra_info, $id));
            if($request2) {
                $arrResponse = array('status' => true,'msg' => 'Solicitud actualizada correctamente');
            }else {
                $arrResponse = ['status' => false, 'msg'=> 'fallo'];
            }
      
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}