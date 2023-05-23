$('#tableSubproyectos').DataTable();
var tableSubproyectos;

document.addEventListener('DOMContentLoaded',function(){
    tableSubproyectos = $('#tableSubproyectos').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/subproyectos/table_subproyectos.php",
            "dataSrc": ""
        },
        "columns": [
            {"data":"codigo_subproyecto"},
            {"data":"nombre_subproyecto"},
            {"data":"estatus_subproyecto"},
            {"data":"options"},
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"asc"]]
    });

    // CREAR O EDITAR SUB-PROYECTO 
    var formSubproyecto = document.querySelector('#formSubproyecto');
    formSubproyecto.onsubmit = function(e) {
        e.preventDefault();
        var idSubproyecto = document.querySelector('#idSubproyecto').value;
        var codigo = document.querySelector('#txtCodigo').value;
        var nombre = document.querySelector('#txtNombre').value;
        var status = document.querySelector('#listStatus').value;

        if(nombre == '' || status == '' || codigo == '') {
            swal('Atencion','Todos los campos son necesarios','error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = idSubproyecto == ''   ? './models/subproyectos/ajax-subproyecto-registrar.php'
                                            : './models/subproyectos/ajax-subproyecto-editar.php'
        request.open('POST',ajaxUrl,true);
        var strData = new FormData(formSubproyecto);
        request.send(strData);
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                var objData = JSON.parse(request.responseText);
                if(objData.status) {
                    $('#modalFormSubproyecto').modal('hide');
                    formSubproyecto.reset();
                    swal('Crear Sub-Proyecto',objData.msg,'success');
                    tableSubproyectos.ajax.reload(function(){
                        editSubproyecto();
                        delSubproyecto();
                    })
                } else {
                    swal('Atencion',objData.msg,'error');
                }
            }
        }
    }
});

window.addEventListener('load',function(){
    editSubproyecto();
    delSubproyecto();
},false);

function editSubproyecto() {
    var btnEditSubproyecto = document.querySelectorAll('.btnEditSubproyecto');
    btnEditSubproyecto.forEach(function(btnEditSubproyecto){
        btnEditSubproyecto.addEventListener('click',function(){
            document.querySelector('#titleModal').innerHTML = 'Actualizar Sub-Proyecto';
            document.querySelector('.modal-header').classList.replace('headerRegister','updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary','btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idSubproyecto = this.getAttribute('rl');

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/subproyectos/edit_subproyecto.php?id='+idSubproyecto;
            request.open('GET',ajaxUrl,true);
            request.send();
            request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if(objData.status) {
                        document.querySelector('#idSubproyecto').value = objData.data.id_subproyecto;
                        document.querySelector('#txtCodigo').value = objData.data.codigo_subproyecto;
                        document.querySelector('#txtNombre').value = objData.data.nombre_subproyecto;
                        document.querySelector('#listStatus').value = objData.data.estatus_subproyecto;

                        if(objData.data.estatus_subproyecto == 1) {
                            var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                        } else {
                            var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }
                        var htmlOption = `${optionSelect}
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                        `;
                        document.querySelector('#listStatus').innerHTML = htmlOption;

                        $('#modalFormSubproyecto').modal('show');
                    } else {
                        swal('Atencion',objData.msg,'error');
                    }
                }
            }
        })
    })
}

function delSubproyecto() {
    var btnDelSubproyecto = document.querySelectorAll('.btnDelSubproyecto');
    btnDelSubproyecto.forEach(function(btnDelSubproyecto){
        btnDelSubproyecto.addEventListener('click',function(){
            var idSubproyecto = this.getAttribute('rl');

            swal({
                title: "Eliminar Subproyecto",
                text: "Realmente desea eliminar el Sub-Proyecto?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },function(Confirm){
                if(Confirm) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxDelSubproyecto = './models/subproyectos/delet_subproyecto.php';
                    var strData = "idSubproyecto="+idSubproyecto;
                    request.open('POST',ajaxDelSubproyecto,true);
                    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    request.send(strData);
                    request.onreadystatechange = function() {
                        if(request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            if(objData.status) {
                                swal("Eliminar!", objData.msg , "success");
                                tableSubproyectos.ajax.reload(function(){
                                    editSubproyecto();
                                    delSubproyecto();
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

function openModalSubproyecto() {
    document.querySelector('#idSubproyecto').value = "";
    document.querySelector('#titleModal').innerHTML = 'Nuevo Sub-Proyecto';
    document.querySelector('.modal-header').classList.replace('updateRegister','headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info','btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    document.querySelector('#formSubproyecto').reset();
    $('#modalFormSubproyecto').modal('show');
}