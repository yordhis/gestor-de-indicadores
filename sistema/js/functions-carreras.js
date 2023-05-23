

$('#tableCarrera').DataTable();
var tableCarrera;
/** Listar carreras */
document.addEventListener('DOMContentLoaded',function(){
    tableCarrera = $('#tableCarrera').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/carrera/table_carrera.php",
            "dataSrc": ""
        },
        "columns": [
            {"data":"contador"},
            {"data":"codigo"},
            {"data":"nombre"},
            {"data":"estatus_carrera"},
            {"data":"options"},
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 100,
        "order": [[0,"asc"]]
    });


    // CREAR CURSO
    var formCarrera = document.querySelector('#formCarrera');
    formCarrera.onsubmit = function(e) {
        e.preventDefault();
        var id = document.querySelector('#id').value;
        var codigo = document.querySelector('#codigo').value;
        var nombre = document.querySelector('#nombre').value;
        var status = document.querySelector('#listStatus').value;
        let accion = document.querySelector('#btnText').textContent;
   
        if(codigo == '' || nombre == '' || status == '') {
            swal('Atencion','Todos los campos son necesarios','error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = accion === "Guardar" ? './models/carrera/ajax-carrera-registrar.php'
                                           : './models/carrera/ajax-carrera-editar.php';

        console.log(ajaxUrl);
        request.open('POST',ajaxUrl,true);
        var strData = new FormData(formCarrera);
        request.send(strData);

        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
        
                var objData = JSON.parse(request.responseText);
                if(objData.status) {
                    $('#modalFormCarreraX').modal('hide');
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
    delCarrera();
    editCarrera();
},false);


function editCarrera() {
    var btnEditCarrera = document.querySelectorAll('.btnEditCarreraX');
    btnEditCarrera.forEach(function(btnEditCarrera){

        console.log(btnEditCarrera);

        btnEditCarrera.addEventListener('click',function(){
            document.querySelector('#titleModal').innerHTML = 'Actualizar Carrera';
            document.querySelector('.modal-header').classList.replace('headerRegister','updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary','btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idCarrera = this.getAttribute('rl');
            console.log(idCarrera);

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/carrera/edit_carrera.php?id='+idCarrera;
            request.open('GET',ajaxUrl,true);
            request.send();
            request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                  
                    if(objData.status) {
                        document.querySelector('#id').value = objData.data.id_carrera;
                        document.querySelector('#codigo').value = objData.data.codigo;
                        document.querySelector('#nombre').value = objData.data.nombre;
                        document.querySelector('#listStatus').value = objData.data.estatus_carrera;

                        let optionSelect = '';
                        if(objData.data.estatus_carrera == 1) {
                             optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                        } else {
                             optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }
                        var htmlOption = `${optionSelect}
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                        `;
                        document.querySelector('#listStatus').innerHTML = htmlOption;

                        $('#modalFormCarreraX').modal('show');
                    } else {
                        swal('Atencion',objData.msg,'error');
                    }
                }
            }
        })
    })
}

function delCarrera() {
    var btnDelCarrera = document.querySelectorAll('.btnDelCarreraX');
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

function openModalCarrerasX() {
    document.querySelector('#id').value = "";
    document.querySelector('#titleModal').innerHTML = 'Crear Carrera';
    document.querySelector('.modal-header').classList.replace('updateRegister','headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info','btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    document.querySelector('#formCarrera').reset();
    $('#modalFormCarreraX').modal('show');
}
