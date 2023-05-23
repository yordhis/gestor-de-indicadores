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

        // CONSULTA PARA INSERTAR
        $sql = "SELECT * FROM subproyectos WHERE ( codigo_subproyecto = ? AND estatus_subproyecto != 0 )";
        $query = $pdo->prepare( $sql );
        $query->execute( array( $codigo_subproyecto ) );
        $resultDataBase = $query->fetch(PDO::FETCH_ASSOC);

        /** Validamos si ya el codigo existe */
        if($resultDataBase) {
            $arrResponse = array('status' => false,'msg' => 'El código del subproyecto ya esta registrado');
        } else {
        
            // Insertamos el nuevo subproyecto
            $sql_insert = "INSERT INTO subproyectos (
                codigo_subproyecto,
                nombre_subproyecto
                ) 
                VALUES (?,?)";
            $query_insert = $pdo->prepare($sql_insert);
            $request = $query_insert->execute(array(
                $codigo_subproyecto,
                $nombre_subproyecto
            ));
           
            if($request) {
                $arrResponse = array('status' => true,'msg' => 'Sub-Proyecto creado correctamente'); 
            }else {
                $arrResponse = array('status' => false, 'msg'=> 'fallo al registrar Sub-Proyecto');
            }
        
        }
    }
    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
}