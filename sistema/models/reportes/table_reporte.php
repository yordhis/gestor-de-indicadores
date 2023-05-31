<?php

require_once '../../includes/config.php';

$data;

// Obtenemos el total de DOCENTES
$sqlDocentes = " SELECT 
id_solicitante
FROM solicitantes 
WHERE tipo_solicitante = ? 
AND estatus_solicitante != 0 ";
    $queryDocentes = $pdo->prepare($sqlDocentes);
    $queryDocentes->execute(array('DOCENTE'));
    $docentes = $queryDocentes->fetchAll();

// Obtenemos el total de subprogramas o carreras
$sqlSubprogramas = " SELECT * FROM carreras WHERE estatus_carrera != 0";
    $querySubprogramas = $pdo->prepare($sqlSubprogramas);
    $querySubprogramas->execute();
    $subprogramas = $querySubprogramas->fetchAll();

// Obtenemos Todos los items
    $sqlItems = " SELECT * FROM items WHERE estatus_item != 0 ";
    $queryItems = $pdo->prepare($sqlItems);
    $queryItems->execute();
    $items = $queryItems->fetchAll(PDO::FETCH_ASSOC);

// Obtenemos el total de estudiantes o matricula por subprograma
    $totalGeneralMatricula = 0;
    $totalGeneralMatriculaDocente = 0;
    foreach ($subprogramas as $key => $value) {
        $sqlMatricula = " SELECT COUNT(curso_id) 
        FROM inscripcion 
        WHERE curso_id = ?  
        AND tipo_inscripto = ? 
        AND estatusI != 0";
        $queryMatricula = $pdo->prepare($sqlMatricula);
        $queryMatricula->execute(array($value['id_carrera'], 'ESTUDIANTE'));
        $matricula = $queryMatricula->fetch();

        $sqlMatriculaDocente = " SELECT COUNT(curso_id) 
        FROM inscripcion 
        WHERE curso_id = ?  
        AND tipo_inscripto = ? 
        AND estatusI != 0";
        $queryMatriculaDocente = $pdo->prepare($sqlMatriculaDocente);
        $queryMatriculaDocente->execute(array($value['id_carrera'], 'DOCENTE'));
        $matriculaDocente = $queryMatriculaDocente->fetch();

        //asignamos el total de matricula a los subprogrmas
        $subprogramas[$key]['total_matricula'] = $matricula[0];
        $subprogramas[$key]['total_docentes'] = $matriculaDocente[0];

        // Acumulamos el total general de matricula inscripta de todos los subprogramas
        $totalGeneralMatricula = $totalGeneralMatricula + $matricula[0];
        $totalGeneralMatriculaDocente = $totalGeneralMatriculaDocente + $matriculaDocente[0];
    }
    // print_r($subprogramas);
    // print_r($totalGeneralMatricula);
    // print_r(count($subprogramas));
    // return; 

$sql = " SELECT 
I.id_indicador, 
I.nombre as nombre_indicador, 
estatus_indicador, 
I.id_item,
T.id_item, 
T.nombre_item, 
T.estatus_item
FROM indicadores I, items T 
WHERE I.id_item = T.id_item
";
$query = $pdo->prepare($sql);
$query->execute();
$indicadores = $query->fetchAll(PDO::FETCH_ASSOC);


$totalGeneral =0;
for($i = 0;$i < count($indicadores);$i++) {
    // Se obtiene el total de solicitudes por indicador
    $sqlSolicitudes = " SELECT COUNT(id_indicador) FROM solicitudes_ca WHERE id_indicador = ?";
    $querySolicitud = $pdo->prepare($sqlSolicitudes);
    $querySolicitud->execute(array($indicadores[$i]['id_indicador']));
    $totalSolicitudesIndicadores = $querySolicitud->fetch();

    // Se obtiene el total de solicitudes Aprobados por indicador
    $sqlSolicitudesAprobadas = " SELECT COUNT(id_indicador) FROM solicitudes_ca
    WHERE id_indicador = ? AND estatus_solicitud = ?";
    $querySolicitudAprobadas = $pdo->prepare($sqlSolicitudesAprobadas);
    $querySolicitudAprobadas->execute(array($indicadores[$i]['id_indicador'], 'APROBADO'));
    $totalSolicitudesIndicadoresAprobadas = $querySolicitudAprobadas->fetch();

    // Se obtiene el total de solicitudes Reprobadas por indicador
    $sqlSolicitudesRechazado = " SELECT COUNT(id_indicador) FROM solicitudes_ca
    WHERE id_indicador = ? AND estatus_solicitud = ?";
    $querySolicitudRechazado = $pdo->prepare($sqlSolicitudesRechazado);
    $querySolicitudRechazado->execute(array($indicadores[$i]['id_indicador'], 'RECHAZADO'));
    $totalSolicitudesIndicadoresRechazado = $querySolicitudRechazado->fetch();

    $indicadores[$i]['totalSolicitudesAprobadas'] = intval($totalSolicitudesIndicadoresAprobadas[0]);
    $indicadores[$i]['porcentajeAprobadas'] = ($totalSolicitudesIndicadoresAprobadas[0] * $totalSolicitudesIndicadores[0]) / 100;
    $indicadores[$i]['totalSolicitudesRechazadas'] = intval($totalSolicitudesIndicadoresRechazado[0]);
    $indicadores[$i]['porecentajeRechazadas'] = ($totalSolicitudesIndicadoresRechazado[0] * $totalSolicitudesIndicadores[0]) / 100;
    $indicadores[$i]['totalSolicitudes'] = intval($totalSolicitudesIndicadores[0]);

    // Esto es todas las solicitudes de todos los indicadores y subprogrmas 
    // Seria el total bruto
    $totalGeneral = $totalSolicitudesIndicadores[0] + $totalGeneral;
}

for ($i=0; $i < count($items); $i++) { 
    $sqlSolicitudesItem = " SELECT COUNT(id_item) FROM solicitudes_ca WHERE id_item = ?";
    $querySolicitudItem = $pdo->prepare($sqlSolicitudesItem);
    $querySolicitudItem->execute(array($items[$i]['id_item']));
    $totalSolicitudesItem = $querySolicitudItem->fetch();
    $items[$i]['totalSolicitudes'] = $totalSolicitudesItem[0];
}

/** Estadisticas de docentes con respecto a su categoria */
$arrayCategoriaDeDocentes = [ 
    'agregados' => 'AGREGADO,', 
    'asistentes' => 'ASISTENTE,', 
    'instructores' => 'INSTRUCTOR,', 
    'asociados' => 'ASOCIADO,', 
    'titulares' => 'TITULAR,' 
];

foreach ($arrayCategoriaDeDocentes as $key => $value) {
    $sqlCategoriaDocente = " SELECT COUNT(extra_info) FROM solicitudes_ca WHERE extra_info = ?";
    $queryCategoriaDocente = $pdo->prepare($sqlCategoriaDocente);
    $queryCategoriaDocente->execute(array($value));
    $totalCategoriaDocente = $queryCategoriaDocente->fetch();
    $data['docentes'][$key] = $totalCategoriaDocente[0];
}

// Toda la data de los indicadores con su total de solicitudes por indicador
$data['indicadores'] = $indicadores;

// Toda la data de los items con su total de solicitudes por item
$data['items'] = $items;

// Aqui tenemos toda la data de los subprogramas
// Las matriculas totales por subprograma
// y la matricula general de todos los subprogramas
$data['subprogramas']['data'] = $subprogramas;
$data['subprogramas']['totalGeneralMatricula'] = $totalGeneralMatricula;
$data['subprogramas']['totalGeneralMatriculaDocente'] = $totalGeneralMatriculaDocente;

// Total bruto de todas las solicitudes recibidas en el sistema
$data['totalGeneralSolicitudes'] =  $totalGeneral;

// Data Docentes
// $data['docentes'] = $docentes;
$data['docentes']['totalDocentes'] = count($docentes);

// print_r($data['subprogramas']);
// return;
echo json_encode($data,JSON_UNESCAPED_UNICODE);

die();
