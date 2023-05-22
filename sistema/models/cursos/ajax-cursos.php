<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if(empty($_POST['nameCarrera']) || empty($_POST['codigo']) || empty($_POST['listStatus'])) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {
        $idCurso = $_POST['idCurso'];
        $nameCarrera = $_POST['nombreCarrera'];
        $codigo = $_POST['codigo'];
        $status = $_POST['listStatus'];

        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM curso WHERE nombre_carrera = ? AND codigo = ? AND estatusC != 0";
        $query = $pdo->prepare($sql);
        $query->execute(array($nameCarrera,$codigo));
        $resultInsert = $query->fetch(PDO::FETCH_ASSOC);
        
        // CONSULTA PARA ACTUALIZAR
        $sql2 = "SELECT * FROM curso WHERE nombre_carrera = ? AND codigo = ? AND estatusC != 0 AND curso_id != ?";
        $query2 = $pdo->prepare($sql2);
        $query2->execute(array($nameCarrera,$codigo,$idCurso));
        $resultUpdate = $query2->fetch(PDO::FETCH_ASSOC);

        if($resultInsert > 0) {
            $arrResponse = array('status' => false,'msg' => 'La materia y el profesor ya existen, seleccione otro');
        } else {
            if($idCurso == 0) {
                $sql_insert = "INSERT INTO curso (nombre_carrera,codigo,estatusC) VALUES (?,?,?)";
                $query_insert = $pdo->prepare($sql_insert);
                $request = $query_insert->execute(array($nameCarrera,$codigo,$status));
                if($request) {
                    $arrResponse = array('status' => true,'msg' => 'Curso creado correctamente'); 
                }
            }  
        }
        if($resultUpdate > 0) {
            $arrResponse = array('status' => false,'msg' => 'La materia y el profesor ya existen, seleccione otro');
        } else {
            if($idCurso > 0) {
                $sql_update = "UPDATE curso SET nombre_carrera = ?,codigo = ?,estatusC = ? WHERE curso_id = ?";
                $query_update = $pdo->prepare($sql_update);
                $request2 = $query_update->execute(array($nameCarrera,$codigo,$status,$idCurso));
                if($request2) {
                    $arrResponse = array('status' => true,'msg' => 'Curso actualizado correctamente');
                }
             }
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}