<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['txtNombre']) || empty($_POST['txtApellido']) || empty($_POST['txtDireccion']) || empty($_POST['cedula']) || empty($_POST['telefono']) || empty($_POST['email']) || empty($_POST['nivelEst']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {

        $idProfesor = $_POST['idProfesor'];
        $nombres = $_POST['txtNombre'];
        $apellidos = $_POST['txtApellido'];
        $direccion = $_POST['txtDireccion'];
        $cedula = intval($_POST['cedula']);
        $telefono = $_POST['telefono'];
        $correo = $_POST['email'];
        $nivel_estudio = $_POST['nivelEst'];
        $estatus_solicitante = intval($_POST['listStatus']);
        $tipo_solicitante = 'DOCENTE';

        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM solicitantes WHERE (cedula = ? AND tipo_solicitante = ?)";
        $query = $pdo->prepare($sql);
        $query->execute(array($cedula,$tipo_solicitante));
        $resultDataBase = $query->fetch(PDO::FETCH_ASSOC);

        /** Validamos si ya el codigo existe */
        if($resultDataBase) {
            $arrResponse = array('status' => false,'msg' => 'Cedula ya registrada');
        } else {
        
            // Insertamos al nuevo solicitante
            $sql_insert = "INSERT INTO solicitantes (
                nombres,
                apellidos,
                direccion,
                cedula,
                telefono,
                correo,
                nivel_estudio,
                estatus_solicitante,
                tipo_solicitante
                ) 
                VALUES (?,?,?,?,?,?,?,?,?)";
            $query_insert = $pdo->prepare($sql_insert);
            $request = $query_insert->execute(array(
                $nombres,
                $apellidos,
                $direccion,
                $cedula,
                $telefono,
                $correo,
                $nivel_estudio,
                $estatus_solicitante,
                $tipo_solicitante
            ));
           
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Profesor creado correctamente'); 
            }else {
                $arrResponse = array('status' => false, 'msg'=> 'fallo al registrar Profesor');
            }
        
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}