<?php

require_once '../../includes/config.php';

$sql = "SELECT * FROM subproyectos WHERE estatus_subproyecto != 0";
$query = $pdo->prepare($sql);
$query->execute();
$data = $query->fetchAll(PDO::FETCH_ASSOC);

for($i = 0;$i < count($data);$i++) {
    if($data[$i]['estatus_subproyecto'] == 1) {
        $data[$i]['estatus_subproyecto'] = '<span class="badge badge-success">Activo</span>';
    } else {
        $data[$i]['estatus_subproyecto'] = '<span class="badge badge-danger">Inactivo</span>';
    }

    $data[$i]['options'] = '
            <button class="btn btn-primary btn-sm btnEditSubproyecto" rl="'.$data[$i]['id_subproyecto'].'" title="Editar"><i class="fas fa-pencil-alt"></i></button>
            <button class="btn btn-danger btn-sm btnDelSubproyecto" rl="'.$data[$i]['id_subproyecto'].'" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                    ';
}
echo json_encode($data,JSON_UNESCAPED_UNICODE);
die();