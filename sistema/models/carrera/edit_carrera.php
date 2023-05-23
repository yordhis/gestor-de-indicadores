<?php

require_once '../../includes/config.php';

if(!empty($_GET)) {
    $idCarrera = $_GET['id'];
    $sql = "SELECT * FROM carreras WHERE id_carrera = ?";
    $query = $pdo->prepare($sql);
    $query->execute(array($idCarrera));
    $data = $query->fetch(PDO::FETCH_ASSOC);
    if(empty($data)) {
        $arrResponse = array('status' => false,'msg' => 'Datos no encontrados');
    } else {
        $arrResponse = array('status' => true,'data' => $data);
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}