<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['nombre']) || empty($_POST['codigo']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $id = $_POST['id'];
        $codigo = $_POST['codigo'];
        $nombre = $_POST['nombre'];
        $status = $_POST['listStatus'];

        // CONSULTA PARA ACTUALIZAR
        $sql2 = "SELECT * FROM carreras WHERE codigo = ? AND id_carrera != ?";
        $query2 = $pdo->prepare($sql2);
        $query2->execute(array($codigo,$id));
        $resultUpdate = $query2->fetch(PDO::FETCH_ASSOC);

         /** Validamos si existe para actualizar */
         if($resultUpdate > 0) {
            $arrResponse = array('status' => false,'msg' => 'El código y el nombre existen');
        } else {
            $sql_update = "UPDATE carreras SET codigo = ?, nombre = ?, estatus_carrera = ? WHERE id_carrera = ?";
            $query_update = $pdo->prepare($sql_update);
            $request2 = $query_update->execute(array($codigo,$nombre,$status,$id));
            if($request2) {
                $arrResponse = array('status' => true,'msg' => 'Carrera actualizada correctamente');
            }else {
                $arrResponse = ['status' => false, 'msg'=> 'fallo'];
            }
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}