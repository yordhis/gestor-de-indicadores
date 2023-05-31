<?php

require_once '../../includes/config.php';

if(!empty($_GET)) {
    $idInscripcion = $_GET['id'];
    //$sql = "SELECT * FROM inscripcion WHERE inscripcion_id = ?";
    $sql = "SELECT 
    I.inscripcion_id,
    I.estatusI,
    C.id_carrera,
    C.nombre as nombre_carrera, 
    A.id_solicitante,
    A.tipo_solicitante,
    A.cedula,
    CONCAT(A.nombres, ' ', A.apellidos, ' CI:', A.cedula) as nombre_solicitante,
    T.turno_id, 
    T.tipo_turno
    FROM inscripcion as I 
    INNER JOIN solicitantes as A ON I.alumno_id = A.id_solicitante
    INNER JOIN turno as T ON T.turno_id = I.turno_id
    INNER JOIN carreras as C ON C.id_carrera = I.curso_id
    WHERE i.inscripcion_id = ?";

    $query = $pdo->prepare($sql);
    $query->execute(array($idInscripcion));
    $data = $query->fetch(PDO::FETCH_ASSOC);
    if(empty($data)) {
        $arrResponse = array('status' => false,'msg' => 'Datos no encontrados');
    } else {
        $arrResponse = array('status' => true,'data' => $data);
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}