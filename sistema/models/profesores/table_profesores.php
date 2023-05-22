<?php

require_once '../../includes/config.php';

$sql = "SELECT * FROM solicitantes WHERE estatus_solicitante != 0 AND tipo_solicitante = 'DOCENTE' ";
$query = $pdo->prepare($sql);
$query->execute();
$data = $query->fetchAll(PDO::FETCH_ASSOC);

for($i = 0;$i < count($data);$i++) {
    $data[$i]['contador'] = $i+1;
    if($data[$i]['estatus_solicitante'] == 1) {
        $data[$i]['estatus_solicitante'] = '<span class="badge badge-success">Activo</span>';
    } else {
        $data[$i]['estatus_solicitante'] = '<span class="badge badge-danger">Inactivo</span>';
    }

    $data[$i]['options'] = '
            <button class="btn btn-primary btn-sm btnEditProfesor" rl="'.$data[$i]['id_solicitante'].'" title="Editar"><i class="fas fa-pencil-alt"></i></button>
            <button class="btn btn-danger btn-sm btnDelProfesor" rl="'.$data[$i]['id_solicitante'].'" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                            ';
}

echo json_encode($data,JSON_UNESCAPED_UNICODE);
die();