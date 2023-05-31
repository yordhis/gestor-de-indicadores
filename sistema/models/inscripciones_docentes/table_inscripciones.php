<?php

require_once '../../includes/config.php';

$sql = "SELECT 
I.inscripcion_id,
I.estatusI,
C.id_carrera,
C.nombre as nombre_carrera, 
A.id_solicitante,
CONCAT(A.nombres, ' ', A.apellidos, ' CI:', A.cedula) as nombre_solicitante,
T.turno_id, 
T.tipo_turno
FROM inscripcion as I 
INNER JOIN solicitantes as A ON I.alumno_id = A.id_solicitante
INNER JOIN turno as T ON T.turno_id = I.turno_id
INNER JOIN carreras as C ON C.id_carrera = I.curso_id
WHERE I.estatusI != 0 AND tipo_inscripto = ?
";
$query = $pdo->prepare($sql);
$query->execute(array('DOCENTE'));
$data = $query->fetchAll(PDO::FETCH_ASSOC);

for($i = 0;$i < count($data);$i++) {

    $data[$i]['contador'] = $i + 1;

    if($data[$i]['estatusI'] == 1) {
        $data[$i]['estatusI'] = '<span class="badge badge-success">Activo</span>';
    } else {
        $data[$i]['estatusI'] = '<span class="badge badge-danger">Inactivo</span>';
    }

    $data[$i]['options'] = '<div class="text-center">
            <button class="btn btn-primary btn-sm btnEditInscripcion" rl="'.$data[$i]['inscripcion_id'].'" title="Editar"><i class="fas fa-pencil-alt"></i></button>
            <button class="btn btn-danger btn-sm btnDelInscripcion" rl="'.$data[$i]['inscripcion_id'].'" title="Eliminar"><i class="fas fa-trash-alt"></i></button>                   
                           </div>';
}
echo json_encode($data,JSON_UNESCAPED_UNICODE);
die();



// SELECT COUNT(alumno_id) AS cantidad, curso_id FROM inscripcion GROUP BY curso_id
