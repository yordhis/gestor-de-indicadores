<?php

require_once '../../includes/config.php';

$sql = "SELECT * FROM carreras";
$query = $pdo->prepare($sql);
$query->execute();

$data = $query->fetchAll(PDO::FETCH_ASSOC);
// echo $data;
for($i = 0;$i < count($data);$i++) {
    $data[$i]['contador'] = $i+1;

    if($data[$i]['estatus_carrera'] == 1) {
        $data[$i]['estatus_carrera'] = '<span class="badge badge-success">Activo</span>';
    } else {
        $data[$i]['estatus_carrera'] = '<span class="badge badge-danger">Inactivo</span>';
    }

    $data[$i]['options'] = '<div class="text-center">
        <button class="btn btn-primary btn-sm btnEditCarrera" rl="'.$data[$i]['id_carrera'].'" title="Editar"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn btn-danger btn-sm btnDelCarrera" rl="'.$data[$i]['id_carrera'].'" title="Eliminar"><i class="fas fa-trash-alt"></i></button>                   
                               </div>';
}

echo json_encode($data,JSON_UNESCAPED_UNICODE);
die();
