<?php

    $id= $_GET['id'];
    $conexion=mysqli_connect("localhost","root","","sistema_cursos");
    $consulta= mysqli_query($conexion,"DELETE FROM alumnos WHERE alumno_id= '$id'");

    header('Location: lista_alumnos.php');
    ?>