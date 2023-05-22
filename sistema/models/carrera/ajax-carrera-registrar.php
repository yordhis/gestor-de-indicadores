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

        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM carreras WHERE codigo = ? ";
        $query = $pdo->prepare($sql);
        $query->execute(array($codigo));
        $resultDataBase = $query->fetch(PDO::FETCH_ASSOC);

        /** Validamos si ya el codigo existe */
        if($resultDataBase) {
            $arrResponse = array('status' => false,'msg' => 'El código de la carrera ya existe');
        } else {
            
            $sql_insert = "INSERT INTO carreras (codigo, nombre, estatus_carrera) VALUES (?,?,?)";
            $query_insert = $pdo->prepare($sql_insert);
            $request = $query_insert->execute(array($codigo,$nombre,$status));
           
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Carrera creada correctamente'); 
            }else {
                $arrResponse = ['status' => false, 'msg'=> 'fallo'];
            }
        
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}