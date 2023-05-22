<div class="modal fade" id="modalVerSolicitud" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Ver Solicitud</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="tile-body" id="textoDeSolicitud">
                    texto aqui pdf gen
                    <!-- <h1>Datos</h1>
                    <p> Yo, <u id="nombre_apellido"></u>, CI: <u id="cedula"></u> Estudiante del Sub-Programa <u id="nombre_subprograma"></u>, 
                    Solicito ante la Comisión Asesora del Programa Ciencias Básicas y aplicadas, 
                    lo siguiente: <u id="nombre_indicador"></u></p> -->
                   
                </div>
            </div>

             <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info" data-dismiss="modal" onclick="generarPdfDeSolicitud(jsPDF)" ><i class="fas fa-print"></i> Imprimir</button>
            </div>
        </div>
    </div>
</div>