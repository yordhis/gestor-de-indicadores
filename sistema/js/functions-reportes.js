

$('#tableReporte').DataTable();
var tableReporte;
/** Listar carreras */
document.addEventListener('DOMContentLoaded',function(){
    tableReporte = $('#tableReporte').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/reportes/table_reporte.php",
            "dataSrc": ""
        },
        "columns": [
            {"data":"contador"},
            {"data":"nombre_item"},
            {"data":"nombre_indicador"},
            {"data":"total_solicitudes"}
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 100,
        "order": [[0,"asc"]]
    });



    // Generar reporte 
    var formCarrera = document.querySelector('#formCarrera');
    formCarrera.onsubmit = function(e) {
        e.preventDefault();
        var id = document.querySelector('#id').value;
        var codigo = document.querySelector('#codigo').value;
        var nombre = document.querySelector('#nombre').value;
        var status = document.querySelector('#listStatus').value;
        let accion = document.querySelector('#btnText').textContent;
        console.log(accion);
        if(codigo == '' || nombre == ''|| status == '') {
            swal('Atencion','Todos los campos son necesarios','error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = accion === "Guardar" ? './models/carrera/ajax-carrera-registrar.php'
                                           : './models/carrera/ajax-carrera-editar.php';
        request.open('POST',ajaxUrl,true);
        var strData = new FormData(formCarrera);
        request.send(strData);
        console.log(strData)
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                console.log(request.responseText)
        
                var objData = JSON.parse(request.responseText);
                if(objData.status) {
                    $('#modalFormCarrera').modal('hide');
                    formCarrera.reset();
                    swal('Crear Carrera',objData.msg,'success');
                    tableCarrera.ajax.reload(function(){
                       delCarrera();
                       editCarrera();
                    })
                } else {
                    swal('Atencion',objData.msg,'error');
                }
            }
        }
    }
});

/** Carga de modulos automaticos */
window.addEventListener('load',function(){
    getSolicitudesCard();
    // delCarrera();
    // editCarrera();
},false);

// let previous = document.querySelector("#tableCarrera_previous");
// let next = document.querySelector("#tableCarrera_next");


function getSolicitudesCard() {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/reportes/table_reporte.php';

    
    request.open('GET', ajaxUrl, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var solicitudes = JSON.parse(request.responseText);
            console.log(solicitudes);
            let listCard = '';
            solicitudes.data.forEach(item =>{
                if (item.nombre_indicador == 'Matricula o Total de Estudiantes') {
                    listCard += `
                    <!-- solicitudes Card -->
                    <div class="col-xxl-4 col-md-6" >
                        <div class="card info-card sales-card bg-dark ">
          
                          <div class="card-body ">
                            <h5 class="card-title text-white">${item.nombre_indicador} <span>| ${item.nombre_item}</span></h5>
          
                            <div class="d-flex align-items-center">
                              <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i class="bi bi-badge-tm text-black"></i>
                              </div>
                              <div class="ps-3">
                                <h6 id="total_solicitudes" class="text-white">${solicitudes.total_matricula}</h6>
                                <span class="text-success small pt-1 fw-bold" id="porcentaje" >100%</span> <span class="text-muted small pt-2 ps-1">Media</span>
          
                              </div>
                            </div>
                          </div>
          
                        </div>
                    </div><!-- End Sales Card -->
                    `;
                }
            })
            solicitudes.data.forEach(item =>{
                if (item.nombre_indicador != 'Matricula o Total de Estudiantes') {
                listCard += `
                <!-- solicitudes Card -->
                <div class="col-xxl-4 col-md-6" >
                    <div class="card info-card sales-card">
      
                      <div class="card-body">
                        <h5 class="card-title">${item.nombre_indicador} <span>| ${item.nombre_item}</span></h5>
      
                        <div class="d-flex align-items-center">
                          <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people"></i>
                          </div>
                          <div class="ps-3">
                            <h6 id="total_solicitudes">${item.total_solicitudes}</h6>
                            <span class="text-success small pt-1 fw-bold" id="porcentaje" >0%</span> <span class="text-muted small pt-2 ps-1">Media</span>
      
                          </div>
                        </div>
                      </div>
      
                    </div>
                </div><!-- End Sales Card -->
                `;
                }
            })

            document.querySelector('#lista_solicitudes').innerHTML = listCard;
        }
    }
}



function editCarrera() {
    var btnEditCarrera = document.querySelectorAll('.btnEditCarrera');
    btnEditCarrera.forEach(function(btnEditCarrera){
        btnEditCarrera.addEventListener('click',function(){
            document.querySelector('#titleModal').innerHTML = 'Actualizar Carrera';
            document.querySelector('.modal-header').classList.replace('headerRegister','updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary','btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idCarrera = this.getAttribute('rl');

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/carrera/edit_carrera.php?id='+idCarrera;
            request.open('GET',ajaxUrl,true);
            request.send();
            request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if(objData.status) {
                        document.querySelector('#id').value = objData.data.id;
                        document.querySelector('#codigo').value = objData.data.codigo;
                        document.querySelector('#nombre').value = objData.data.nombre;
                        document.querySelector('#listStatus').value = objData.data.estatus;

                        if(objData.data.estatus == 1) {
                            var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                        } else {
                            var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }
                        var htmlOption = `${optionSelect}
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                        `;
                        document.querySelector('#listStatus').innerHTML = htmlOption;

                        $('#modalFormCarrera').modal('show');
                    } else {
                        swal('Atencion',objData.msg,'error');
                    }
                }
            }
        })
    })
}

function delCarrera() {
    var btnDelCarrera = document.querySelectorAll('.btnDelCarrera');
    btnDelCarrera.forEach(function(btnDelCarrera){
        btnDelCarrera.addEventListener('click',function(e){
            // e.preventDefault()
        

            var idCarrera = this.getAttribute('rl');

            swal({
                title: "Eliminar Carrera",
                text: "Realmente desea eliminar la Carrera?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },function(Confirm){
                if(Confirm) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxDelCarrera = './models/carrera/delet_carrera.php';
                    var strData = "idCarrera="+idCarrera;
                    request.open('POST',ajaxDelCarrera,true);
                    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    request.send(strData);
                    request.onreadystatechange = function() {
                        if(request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            if(objData.status) {
                                swal("Eliminar!", objData.msg , "success");
                                tableCarrera.ajax.reload(function(){
                                    delCarrera();
                                    editCarrera();
                                });
                            } else {
                                swal("Atencion",objData.msg,"error");
                            }
                        }
                    }
                }
            })
        })
    })
}

function openModalCarrera() {
    document.querySelector('#id').value = "";
    document.querySelector('#titleModal').innerHTML = 'Crear Carrera';
    document.querySelector('.modal-header').classList.replace('updateRegister','headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info','btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    $('#modalFormCarrera').modal('show');
}
