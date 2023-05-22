<?php

require_once '../../includes/config.php';

if($_POST) {
    $idSolicitud = $_POST['idSolicitud'];

    $sql = "SELECT * FROM solicitudes_ca WHERE id_solicitud = $idSolicitud";
    $query = $pdo->prepare($sql);
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($result)) {
        $sql_update = "DELETE FROM solicitudes_ca WHERE id_solicitud = ? ";
        $query_update = $pdo->prepare($sql_update);
        $result = $query_update->execute(array($idSolicitud));

        if($result) {
            $arrResponse = array('status' => true,'msg' => 'Eliminado correctamente');
        } else {
            $arrResponse = array('status' => false,'msg' => 'Error al eliminar');
        }
    } else {
        $arrResponse = array('status' => false,'msg' => 'No se puede eliminar la solicitud asociado a una inscripcion');
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}
