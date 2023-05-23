<div class="modal fade" id="modalFormSubproyecto" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nueva Sub-Proyecto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="tile-body">
                <form id="formSubproyecto" name="formSubproyecto">
                    <input type="hidden" name="idSubproyecto" id="idSubproyecto" value="">
                    <div class="form-group">
                    <label class="control-label">Código del subproyecto</label>
                    <input class="form-control" id="txtCodigo" name="txtCodigo" type="text" placeholder="Ingrese el código" required>
                    </div>
                    <div class="form-group">
                    <label class="control-label">Nombre de la Subproyecto</label>
                    <input class="form-control" id="txtNombre" name="txtNombre" type="text" placeholder="Nombre del Sub-Proyecto" required>
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