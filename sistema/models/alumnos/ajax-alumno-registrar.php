<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['txtNombre']) || empty($_POST['txtApellido']) || empty($_POST['edad']) || empty($_POST['txtDireccion']) || empty($_POST['cedula']) || empty($_POST['telefono']) || empty($_POST['email']) || empty($_POST['fechaNac']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {

        $nombre = $_POST['txtNombre'];
        $apellido = $_POST['txtApellido'];
        $edad = $_POST['edad'];
        $direccion = $_POST['txtDireccion'];
        $cedula = intval($_POST['cedula']);
        $telefono = intval($_POST['telefono']);
        $email = $_POST['email'];
        $fechaNac = $_POST['fechaNac'];
        $status = $_POST['listStatus'];
        $tipoSolicitante = 'ESTUDIANTE';


        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM solicitantes WHERE (cedula = ? AND tipo_solicitante = ?)";
        $query = $pdo->prepare($sql);
        $query->execute(array($cedula,$tipoSolicitante));
        $resultDataBase = $query->fetch(PDO::FETCH_ASSOC);

        /** Validamos si ya el codigo existe */
        if($resultDataBase) {
            $arrResponse = array('status' => false,'msg' => 'Cedula ya registrada');
        } else {
        
            // Insertamos al nuevo solicitante
            $sql_insert = "INSERT INTO solicitantes (nombres, apellidos, edad, direccion, cedula, telefono, correo, fecha_nacimiento, estatus_solicitante, tipo_solicitante) 
                            VALUES (?,?,?,?,?,?,?,?,?,?)";
                $query_insert = $pdo->prepare($sql_insert);
                $request = $query_insert->execute(array($nombre,$apellido,$edad,$direccion,$cedula,$telefono,$email,$fechaNac,$status, $tipoSolicitante));
           
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'ALumno creado correctamente'); 
            }else {
                $arrResponse = array('status' => false, 'msg'=> 'fallo al registrar ALumno');
            }
        
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}