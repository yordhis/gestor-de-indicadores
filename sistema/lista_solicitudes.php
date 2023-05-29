<?php
session_start();
if(empty($_SESSION['active'])) {
  header("Location: ../");
}
require_once 'includes/session.php';
require_once 'includes/header.php';
require_once 'includes/Modals/modal_solicitudes.php';
// require_once 'includes/Modals/modal_ver_solicitud.php';
?>

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1>
              <i class="fas fa-user-tag"></i> Lista de solicitudes
              <button class="btn btn-primary" type="button" onclick="openModalSolicitud()">Generar solicitud</button>
          </h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="#">Lista de Solicitudes</a></li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tableSolicitud">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Solicitante</th>
                      <th>Sub-Programa</th>
                      <th>Item</th>
                      <th>Indicador</th>
                      <th>Estatus</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

   
<?php require_once 'includes/footer.php'; ?>