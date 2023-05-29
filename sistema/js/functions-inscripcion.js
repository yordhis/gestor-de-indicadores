$('#tableInscripciones').DataTable();
var tableInscripciones;

window.addEventListener('DOMContentLoaded',function(){
    tableInscripciones = $('#tableInscripciones').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/inscripciones/table_inscripciones.php",
            "dataSrc": ""
        },
        "columns": [
            {"data":"contador"},
            {"data":"nombre_solicitante"},
            {"data":"nombre_carrera"},
            {"data":"tipo_turno"},
            {"data":"estatusI"},
            {"data":"options"},
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"asc"]]
    });

    // CREAR INSCRIPCION
    var formInscripcion = document.querySelector('#formInscripcion');
    formInscripcion.onsubmit = function(e) {
        e.preventDefault();

        var idInscripcion = document.querySelector('#idInscripcion').value;
        var alumno = document.querySelector('#id_solicitante').value;
        var curso = document.querySelector('#listCarreras').value;
        var turno = document.querySelector('#listTurno').value;
        var status = document.querySelector('#listStatus').value;
        console.log(alumno);
        if(alumno == '' || curso == '' || turno == '' || status == '') {
            swal('Atencion','Todos los campos son necesarios','error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = './models/inscripciones/ajax_inscripciones.php';
        var formData = new FormData(formInscripcion);
        request.open('POST',ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
                var objData = JSON.parse(request.responseText);
                if(objData.status) {
                    $('#modalFormInscripcion').modal('hide');
                    formInscripcion.reset();
                    swal('Crear Inscripcion',objData.msg,'success');
                    tableInscripciones.ajax.reload(function(){
                        editInscripcion();
                        delInscripcion();
                    })
                } else {
                    swal('Atencion',objData.msg,'error');
                }
            }
        }

    }
});

window.addEventListener('load',function(){
    editInscripcion();
    delInscripcion();
    getOptionCursos();
    getOptionTurnos();
},false);


/** Funcion que se encarga de consultar los datos de la cedula ingreseda */
const inputCedulaSolicitante = () => {
    let input = document.querySelector("#cedula_solicitante");
    console.log(tipoSolicitante.value);
    getDataSolicitante(input.value, input, tipoSolicitante.value)
}

/** Evento para detectaar que hallan seleccionado el tipo de solicitante */
let tipoSolicitante = document.querySelector("#tipo_solicitante");
tipoSolicitante.addEventListener('change',(e)=>{

    let inputCedulaSolicitante = document.querySelector("#cedula_solicitante");

    const tipo = e.target.value;
    console.log(tipo);
    if(tipo === "ESTUDIANTE" || tipo === "DOCENTE"){
        inputCedulaSolicitante.disabled=false;
        inputCedulaSolicitante.value='';

    }else{
        inputCedulaSolicitante.disabled=true;
    }
});

function getDataSolicitante(cedula, input, tipo) {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = `./models/options/data-solicitante.php?cedula=${cedula}&tipo=${tipo}`;
    request.open('GET', ajaxUrl, true);
    request.send();
    request.onreadystatechange = function () {
        let cardData = document.querySelector('#data_solicitante');
        let btnGenerar = document.querySelector('#btnActionForm');
        let inputIdSolicitante = document.querySelector('#id_solicitante');

        cardData.classList.remove('invisible');

        if (request.readyState == 4 && request.status == 200) {
            let dataSolicitante = JSON.parse(request.responseText);
            let htmlDatasolicitante = `
            <b>Nombre y Apellido: </b> ${dataSolicitante[0].nombres} ${dataSolicitante[0].apellidos} <br>
            <b>Telf: </b> ${dataSolicitante[0].telefono} <br>
            <b>Correo: </b> ${dataSolicitante[0].correo} 
            `;
            inputIdSolicitante.value = dataSolicitante[0].id_solicitante
            btnGenerar.classList.remove('disabled');
            btnGenerar.disabled = false;
            cardData.innerHTML = "";
            input.classList.remove('border-danger');
            cardData.classList.add("spinner-border", "text-success");
            setTimeout(() => {
                cardData.classList.remove("spinner-border", "text-success");
                cardData.classList.add("card", "card-body", "mt-2");
                cardData.innerHTML = htmlDatasolicitante;
            }, 3000)
        } else {

            inputIdSolicitante.value = "";
            input.classList.add('border-danger');
            btnGenerar.classList.add('disabled');
            btnGenerar.disabled = true;
            cardData.innerHTML = `<span class="flex">No hay registros de esta cédula, 
                                 por favor registre al solicitante. 
                                <br><a href="lista_alumnos.php">Registrar Alumno</span>
                                <br><a href="lista_profesores.php">Registrar Docente</span>
                                `;
            // <a href="lista_profesores.php">Registrar Profesor</span>
            setTimeout(() => {
                cardData.classList.remove("card", "card-body", "mt-2");
                cardData.innerHTML = ""
            }, 3000)
        }
    }
}

function getOptionCursos() {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/options/options-subprogramas.php';
    request.open('GET',ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var option = JSON.parse(request.responseText);
            console.log(option);
            
            option.forEach(function(valor){
               option += '<option value="'+valor.id_carrera+'">'+valor.nombre+'</option>';  
            });
            option += '<option value="0" selected>Seleccione una carrera</option>';
            document.querySelector('#listCarreras').innerHTML = option;
        }
    }
}

function getOptionTurnos() {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/options/options-turnos.php';
    request.open('GET',ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var option = JSON.parse(request.responseText);
            option.forEach(function(valor){
               option += '<option value="'+valor.turno_id+'">'+valor.tipo_turno+'</option>';  
            });
            document.querySelector('#listTurno').innerHTML = option;
        }
    }
}

function editInscripcion() {
    var btnEditInscripcion = document.querySelectorAll('.btnEditInscripcion');
    btnEditInscripcion.forEach(function(btnEditInscripcion){
        btnEditInscripcion.addEventListener('click',function(){
            document.querySelector('#titleModal').innerHTML = 'Actualizar Inscripcion';
            document.querySelector('.modal-header').classList.replace('headerRegister','updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary','btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idInscripcion = this.getAttribute('rl');

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/inscripciones/edit_inscripciones.php?id='+idInscripcion;
            request.open('GET',ajaxUrl,true);
            request.send();
            request.onreadystatechange = function() {
                if(request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if(objData.status) {


                        let inputCedula = document.querySelector('#cedula_solicitante');
                        getDataSolicitante(objData.data.cedula, inputCedula, objData.data.tipo_solicitante)

                        // inputCedula.disabled = false;
                        inputCedula.value = objData.data.cedula;
                        document.querySelector('#idInscripcion').value = objData.data.inscripcion_id;
                        document.querySelector('#id_solicitante').value = objData.data.id_solicitante;
                        document.querySelector('#listCarreras').value = objData.data.id_carrera;
                        document.querySelector('#listTurno').value = objData.data.turno_id;
                        document.querySelector('#listStatus').value = objData.data.estatusI;

                        if(objData.data.estatusI == 1) {
                            var optionSelect = '<option value="1" selected class="notBlock">Activo</option>';
                        } else {
                            var optionSelect = '<option value="2" selected class="notBlock">Inactivo</option>';
                        }
                        var htmlOption = `${optionSelect}
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                        `;
                        document.querySelector('#listStatus').innerHTML = htmlOption;

                        $('#modalFormInscripcion').modal('show');
                    } else {
                        swal('Atencion',objData.msg,'error');
                    }
                }
            }
        })
    })
}

function delInscripcion() {
    var btnDelInscripcion = document.querySelectorAll('.btnDelInscripcion');
    btnDelInscripcion.forEach(function(btnDelInscripcion){
        btnDelInscripcion.addEventListener('click',function(){
            var idInscripcion = this.getAttribute('rl');

            swal({
                title: "Eliminar Inscripcion",
                text: "Realmente desea eliminar la inscripcion?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            },function(Confirm){
                if(Confirm) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxDelInscripcion = './models/inscripciones/delet_inscripcion.php';
                    var strData = "idInscripcion="+idInscripcion;
                    request.open('POST',ajaxDelInscripcion,true);
                    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    request.send(strData);
                    request.onreadystatechange = function() {
                        if(request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            if(objData.status) {
                                swal("Eliminar!", objData.msg , "success");
                                tableInscripciones.ajax.reload(function(){
                                    delInscripcion();
                                    editInscripcion();
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

/** Resetear el modal del formulario cuando le den XXXXXX */
let botonCerrar = document.querySelector('.close');
botonCerrar.addEventListener('click', (e)=>{
    let formInscripcion = document.querySelector('#formInscripcion'),
    cardData = document.querySelector('#data_solicitante'),
    inputs_extras = document.querySelector('#inputs_extras');
    inputs_extras.innerHTML="";
    cardData.innerHTML="";
    for(i=0; i < formInscripcion.length; i++ ) { formInscripcion[i].value="" }
});


function openModalInscripcion() {
    document.querySelector('#idInscripcion').value = "";
    document.querySelector('#titleModal').innerHTML = 'Nueva Inscripcion';
    document.querySelector('.modal-header').classList.replace('updateRegister','headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info','btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    document.querySelector('#formInscripcion').reset();
    $('#modalFormInscripcion').modal('show');
}
