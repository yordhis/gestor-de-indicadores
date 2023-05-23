<?php

require_once '../../includes/config.php';

if($_POST) {
    $idSubproyecto = $_POST['idSubproyecto'];

    // $sql_materia = "SELECT * FROM carreras WHERE materia_id = $idSubproyecto AND estatusC != 0";
    // $query_materia = $pdo->prepare($sql_materia);
    // $query_materia->execute();
    // $result_materia = $query_materia->fetchAll(PDO::FETCH_ASSOC);

    if(true) {
        $sql = "UPDATE subproyectos SET estatus_subproyecto = 0 WHERE id_subproyecto = ?";
        $query = $pdo->prepare($sql);
        $result = $query->execute(array($idSubproyecto));

        if($result) {
            $arrResponse = array('status' => true,'msg' => 'Sub-Proyecto eliminado correctamente');
        } else {
            $arrResponse = array('status' => false,'msg' => 'Error al eliminar');
        }
    } else {
        // no esta habilitada esta respuesta
        $arrResponse = array('status' => false,'msg' => 'No se puede eliminar una materia asociada a un curso');
    }    
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}
