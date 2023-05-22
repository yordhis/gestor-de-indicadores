<?php

require_once '../../includes/config.php';

if($_POST) {
    $idInscripcion = $_POST['idInscripcion'];

        $sql_update = "UPDATE inscripcion SET estatusI = 0 WHERE inscripcion_id = ?";
        $query_update = $pdo->prepare($sql_update);
        $result = $query_update->execute(array($idInscripcion));
        if($result) {
            $arrResponse = array('status' => true,'msg' => 'Eliminado correctamente');
        } else {
            $arrResponse = array('status' => false,'msg' => 'Error al eliminar');
        }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}