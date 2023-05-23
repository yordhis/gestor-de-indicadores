<div class="modal fade" id="modalFormCarreraX" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Agregar Carrera</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="tile-body">
                <form id="formCarrera" name="formCarrera">
                    <input type="hidden" name="id" id="id" value="">

                    <div class="form-group">
                        <label for="exampleSelect1">Código</label>
                        <input type="text" name="codigo" id="codigo" class="form-control" placeholder="Ingrese código de carrera"  value="">
                    </div>

                    <div class="form-group">
                        <label for="exampleSelect1">Nombre de la carrera</label>
                        <input type="text" name="nombre"  id="nombre" class="form-control" placeholder="Ingrese nombre de la carrera" value="">
                    </div>
     
                    <div class="form-group">
                        <label for="exampleSelect1">Estado</label>
                        <select class="form-control" name="listStatus" id="listStatus" required>
                            <option value="1">Activo</option>
                            <option value="2">Inactivo</option>
                        </select>
                    </div>
                    <div class="tile-footer">
                        <button id="btnActionForm" class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;
                        <button class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</div>
