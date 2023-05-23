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
          <li class="breadcrumb-item"><a href="#">Lista de reporte</a></li>
        </ul>
      </div>
    <section class="section dashboard" >
      <div class="row" id="lista_solicitudes">
          <!-- Llenado automatico desde JS, se espera una lista de tarjetas de todos los item y sus indicadores -->
      </div>

    </section>
    </main>
    

<?php require_once 'includes/footer_reportes.php'; ?>