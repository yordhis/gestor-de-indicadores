<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['txtNombre']) || empty($_POST['txtApellido']) || empty($_POST['edad']) || empty($_POST['txtDireccion']) || empty($_POST['cedula']) || empty($_POST['telefono']) || empty($_POST['email']) || empty($_POST['fechaNac']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {

        $idAlumno = $_POST['idAlumno'];
        $nombres = $_POST['txtNombre'];
        $apellidos = $_POST['txtApellido'];
        $edad = $_POST['edad'];
        $direccion = $_POST['txtDireccion'];
        $cedula = intval($_POST['cedula']);
        $telefono = intval($_POST['telefono']);
        $correo = $_POST['email'];
        $fechaNac = $_POST['fechaNac'];
        $status = intval($_POST['listStatus']);
        $tipoSolicitante = 'ESTUDIANTE';

       
     
            $sql_update = "UPDATE solicitantes SET 
            nombres = ?,
            apellidos = ?,
            edad = ?,
            direccion = ?,
            cedula = ?,
            telefono = ?,
            correo = ?,
            fecha_nacimiento = ?,
            estatus_solicitante = ?,
            tipo_solicitante = ?
            WHERE id_solicitante = ?";
         $query_update = $pdo->prepare($sql_update);
         $request = $query_update->execute( 
            array(
            $nombres,
            $apellidos,
            $edad,
            $direccion,
            $cedula,
            $telefono,
            $correo,
            $fechaNac,
            $status, 
            $tipoSolicitante,
            $idAlumno) );
            
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Alumno actualizado correctamente');
            }else {
                $arrResponse = array('status' => false, 'msg'=> 'Falló al actualizar alumno');
            }
      
    }

    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}