<?php
session_start();
if(empty($_SESSION['active'])) {
  header("Location: ../");
}
require_once 'includes/session.php';
require_once 'includes/header.php';
require_once 'includes/Modals/modal_inscripcion.php';
?>

<main class="app-content">
      <div class="app-title">
        <div>
          <h1>
              <i class="fas fa-user-tag"></i> Lista de Docentes Asignados
              <button class="btn btn-primary" type="button" onclick="openModalInscripcion()">Nueva Asignación</button>
          </h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="#">Asignar Docentes</a></li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tableInscripciones">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Docentes</th>
                      <th>Sub-Programa</th>
                      <th>Turno</th>
                      <th>Estatus</th>
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