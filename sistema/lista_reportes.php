<?php
session_start();
if(empty($_SESSION['active'])) {
  header("Location: ../");
}
require_once 'includes/session.php';
require_once 'includes/header_reportes.php';
// require_once 'includes/Modals/modal_reporte.php';
// require_once 'includes/Modals/modal_ver_solicitud.php';
?>

<main class="app-content">
      <div class="app-title">
        <div>
          <h1>
              <i class="fas fa-user-tag"></i> Estadisticas
              <button class="btn btn-primary" type="button" onclick="openModalSolicitud()">Generar Reporte</button>
          </h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="#">Reporte</a></li>
        </ul>
      </div>
      
    <section class="section dashboard" >

      <div class="row" id="tarjetas_informativas">
      </div>

      <div class="col-sm-12">
          <h1>Items</h1>
      </div>

      <div class="row" >
            <div class="col-lg-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Promedio total de solicitudes recibidas</h5>

                  <!-- Pie Chart -->
                  <div id="pieChartItems"></div>
                  <!-- End Pie Chart -->

                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Promedio de Docentes por categoria</h5>

                  <!-- Pie Chart -->
                  <div id="barChartDocente"></div>
                  <!-- End Pie Chart -->

                </div>
              </div>
            </div>
      </div>
      
      <div class="col-sm-12">
        <h1>Promedio de solicitudes por Indicadores</h1>
      </div>

      <div class="row" id="barraDeEstadisticas">
          <!-- Barra de estadisticas por item -->
      </div>

    </section>
    </main>
    

<?php require_once 'includes/footer_reportes.php'; ?>