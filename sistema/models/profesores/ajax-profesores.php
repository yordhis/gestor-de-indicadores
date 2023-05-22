<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['txtNombre']) || empty($_POST['txtApellido']) || empty($_POST['txtDireccion']) || empty($_POST['cedula']) || empty($_POST['telefono']) || empty($_POST['email']) || empty($_POST['nivelEst']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $idProfesor = $_POST['idProfesor'];
        $nombre = $_POST['txtNombre'];
        $apellido = $_POST['txtApellido'];
        $direccion = $_POST['txtDireccion'];
        $cedula = $_POST['cedula'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];
        $nivelEst = $_POST['nivelEst'];
        $status = $_POST['listStatus'];

        $sql = "SELECT * FROM solicitantes WHERE (cedula = ? AND tipo_solicitante != ?)";
        $query = $pdo->prepare($sql);
        $query->execute(array($cedula,$idProfesor));
        $result = $query->fetch(PDO::FETCH_ASSOC);

        if($result > 0) {
            $arrResponse = array('status' => false,'msg' => 'Cedula ya registrada');
        } else {
            if($idProfesor == 0) {
                $sql_insert = "INSERT INTO solicitantes (nombres, apellidos, direccion, cedula, telefono, correo, nivel_estudio, estatus_solicitante, tipo_solicitante) VALUES (?,?,?,?,?,?,?,?,?)";
                $query_insert = $pdo->prepare($sql_insert);
                $request = $query_insert->execute(array($nombre,$apellido,$direccion,$cedula,$telefono,$email,$nivelEst,$status, 'DOCENTE'));
                $option = 1;
            } else {
                $sql_update = "UPDATE solicitantes SET nombres = ?, apellidos = ?, direccion = ?, cedula = ?, telefono = ?, correo = ?, nivel_estudio = ?, estatus_solicitante = ?, tipo_solicitante = ? WHERE id_solicitante = ?";
                $query_update = $pdo->prepare($sql_update);
                $request = $query_update->execute(array($nombre,$apellido,$direccion,$cedula,$telefono,$email,$nivelEst,$status,'DOCENTE',$idProfesor));
                $option = 2;
            }
            
            if($request > 0) {
                if($option == 1) {
                   $arrResponse = array('status' => true,'msg' => 'Profesor creado correctamente'); 
                } else {
                   $arrResponse = array('status' => true,'msg' => 'Profesor actualizado correctamente');
                }
            } 
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}