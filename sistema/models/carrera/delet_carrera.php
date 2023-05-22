<?php

require_once '../../includes/config.php';

if($_POST) {
    $idCarrera = $_POST['idCarrera'];

    $sql = "SELECT * FROM carreras WHERE id = $idCarrera";
    $query = $pdo->prepare($sql);
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($result)) {
        $sql_update = "UPDATE carreras SET estatus = 0 WHERE id = ?";
        $query_update = $pdo->prepare($sql_update);
        $result = $query_update->execute(array($idCarrera));
        if($result) {
            $arrResponse = array('status' => true,'msg' => 'Eliminado correctamente');
        } else {
            $arrResponse = array('status' => false,'msg' => 'Error al eliminar');
        }
    } else {
        $arrResponse = array('status' => false,'msg' => 'No se puede eliminar un Carrera asociado a una inscripcion');
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}
