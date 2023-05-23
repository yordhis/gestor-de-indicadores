<?php

require_once '../../includes/config.php';

if(!empty($_POST)) {
    if( empty($_POST['txtNombre']) || empty($_POST['txtCodigo'] ) ) {
        $arrResponse = array('status' => false,'msg' => 'Todos los campos son necesarios');
    } else {

        $id_subproyecto = $_POST['idSubproyecto'];
        $codigo_subproyecto = $_POST['txtCodigo'];
        $nombre_subproyecto = $_POST['txtNombre'];
        $estatus_subproyecto = $_POST['listStatus'];
     
       
        $sql_update = "UPDATE subproyectos SET 
        codigo_subproyecto = ?, 
        nombre_subproyecto = ?,
        estatus_subproyecto = ?
        WHERE id_subproyecto = ?";
        $query_update = $pdo->prepare($sql_update);
        $request = $query_update->execute(array(
            $codigo_subproyecto,
            $nombre_subproyecto,
            $estatus_subproyecto,
            $id_subproyecto));
            
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Sub-Proyecto actualizado correctamente');
            }else {
                $arrResponse = array('status' => false, 'msg'=> 'Falló al actualizar Sub-Proyecto');
            }
      
    }

    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}