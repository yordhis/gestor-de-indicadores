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
        $tipoDeSolicitante = 'DOCENTE';
       
     
        $sql_update = "UPDATE solicitantes SET 
        nombres = ?, 
        apellidos = ?, 
        direccion = ?, 
        cedula = ?, 
        telefono = ?, 
        correo = ?, 
        nivel_estudio = ?, 
        estatus_solicitante = ?, 
        tipo_solicitante = ? 
        WHERE id_solicitante = ?";
        $query_update = $pdo->prepare($sql_update);
        $request = $query_update->execute(array(
            $nombre,
            $apellido,
            $direccion,
            $cedula,
            $telefono,
            $email,
            $nivelEst,
            $status,
            $tipoDeSolicitante,
            $idProfesor));
            
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Profesor actualizado correctamente');
            }else {
                $arrResponse = array('status' => false, 'msg'=> 'Falló al actualizar Profesor');
            }
      
    }

    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}