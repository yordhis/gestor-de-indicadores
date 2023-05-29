<div class="modal fade" id="modalFormInscripcion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Inscripción</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="tile-body">
                    <form id="formInscripcion" name="formInscripcion">
                        
                        <div class="form-group">
                            
                            <div class="row">
                                
                                
                                
                                <div class="col-6">
                                    <!-- Id de la incripcion -->
                                    <input type="hidden" name="idInscripcion" id="idInscripcion" value="">
                                    
                                    <label for="exampleSelect1">Cédula del solicitante</label>
                                    <input type="text" name="cedula_solicitante" id="cedula_solicitante" class="form-control"
                                    placeholder="Ingrese Cédula" onchange="inputCedulaSolicitante()" disabled>
                                </div>
                               
                                <div class="col-6">
                                    <label for="exampleSelect1">Tipo de solicitante</label>
                                    <select class="form-control" name="tipo_solicitante" id="tipo_solicitante" >
                                        <option value="">Selecciones un tipo</option>
                                        <option value="ESTUDIANTE">Estudiante</option>
                                        <option value="DOCENTE">Docente</option>
                                    </select>
                                </div>
                            </div>

                            <input type="hidden" name="id_solicitante" id="id_solicitante" value="">

                            <div id="data_solicitante" class="invisible"></div>
                        </div>

                        <div class="form-group">
                            <label for="exampleSelect1">Seleccione Carrera</label>
                            <select class="form-control" name="listCarreras" id="listCarreras" required>
                                <!-- CONTENIDO AJAX -->
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="exampleSelect1">Seleccione Turno</label>
                            <select class="form-control" name="listTurno" id="listTurno" required>
                                <!-- CONTENIDO AJAX -->
                            </select>
                        </div>

                       
                        <div class="form-group invisible" id="inputs_extras">
                           
                        </div>

                        <div class="form-group">
                            <label for="exampleSelect1">Estado</label>
                            <select class="form-control" name="listStatus" id="listStatus" required>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </div>
                       

                        <div class="tile-footer">
                            <button id="btnActionForm" class="btn btn-primary" type="submit"><i
                                    class="fa fa-fw fa-lg fa-check-circle"></i><span
                                    id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-secondary" data-dismiss="modal"><i
                                    class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>

                                    <i class="invisibles" id="preloadIndicador"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>