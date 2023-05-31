   
    
    <!-- Essential javascripts for application to work-->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/fontawesome.js"></script>
    <!--<script src="https://kit.fontawesome.com/16e860252b.js" crossorigin="anonymous"></script>-->
    <script src="js/main.js"></script>
    <!-- The javascript plugin to display page loading on top-->
    <script src="js/plugins/pace.min.js"></script>
    <script type="text/javascript" src="js/plugins/sweetalert.min.js"></script>

  

    <!-- Data table plugin-->
    <script type="text/javascript" src="js/plugins/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="js/plugins/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="js/plugins/jspdf.min.js"></script>
    


  
    <!-- <script src="js/functions-inscripcion.js"></script> -->
    

    <?php
        $uri = $_SERVER['REQUEST_URI'];
        $categoria = explode('/', $uri);
        
        switch ($categoria[count($categoria) - 1]) {

            case 'lista_solicitudes.php':
                echo '<script src="js/functions-solicitudes.js"></script>';
                break;

            case 'lista_alumnos.php':
                echo '<script src="js/functions-alumnos.js"></script>';
                break;

            case 'lista_carreras.php':
                echo '<script src="js/functions-carreras.js"></script>';
                break;

            case 'lista_subproyectos.php':
                echo '<script src="js/functions-subproyectos.js"></script>';
                break;

            case 'lista_usuarios.php':
                echo '<script src="js/functions-usuarios.js"></script>';
                break;

            case 'lista_profesores.php':
                echo '<script src="js/functions-profesores.js"></script>';
                break;

            case 'lista_inscripciones.php':
                echo '<script src="js/functions-inscripcion.js"></script>';
                break;

            case 'lista_inscripciones_docente.php':
                echo '<script src="js/functions-inscripcion-docente.js"></script>';
                break;
            
            default:
                echo 'Not Found 404';
                break;
        }

    ?>
    
    </body>

    </html>

   