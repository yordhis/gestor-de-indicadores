

$('#tableSolicitud').DataTable();
let tableSolicitud;
/** Listar Solicitudes */
document.addEventListener('DOMContentLoaded', function () {
    tableSolicitud = $('#tableSolicitud').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": "./models/solicitud/table_solicitud.php",
            "dataSrc": ""
        },

        "columns": [
            { "data": "contador" },
            { "data": "nombre_solicitante" },
            { "data": "nombre_subprograma" },
            { "data": "nombre_item" },
            { "data": "nombre_indicador" },
            { "data": "estatus_solicitud" },
            { "data": "at_created" },
            { "data": "options" },
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 100,
        "order": [[0, "asc"]]
    });


    // CREAR SOLICITUD
    var formSolicitud = document.querySelector('#formSolicitud');
    formSolicitud.onsubmit = function (e) {
        e.preventDefault();
        var id = document.querySelector('#id').value;
        var id_solicitante = parseInt(document.querySelector('#id_solicitante').value);
        var id_subprograma = parseInt(document.querySelector('#listSubprogramas').value);
        var id_indicador = parseInt(document.querySelector('#listIndicadores').value);
        var id_item = parseInt(document.querySelector('#listItems').value);
        var estatus_solicitud = parseInt(document.querySelector('#listEstatus').value);
        let accion = document.querySelector('#btnText').textContent;

        if (id_solicitante == '' || id_subprograma == '' || id_indicador == '' || estatus_solicitud == '' 
        || id_item == '') {
            swal('Atencion', 'Todos los campos son necesarios', 'error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = accion === "Generar y Guardar Solicitud"
            ? './models/solicitud/ajax-solicitud-registrar.php'
            : './models/solicitud/ajax-solicitud-editar.php';

        request.open('POST', ajaxUrl, true);
        var strData = new FormData(formSolicitud);
        request.send(strData);
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {
                var objData = JSON.parse(request.responseText);
                if (objData.status) {
                    $('#modalFormSolicitud').modal('hide');
                    formSolicitud.reset();
                    swal('Crear Solicitud', objData.msg, 'success');
                    tableSolicitud.ajax.reload(function () {
                        /** hacer invisible input data user y extras */
                        let cardData = document.querySelector('#data_solicitante'),
                        formGroupNew = document.querySelector('#inputs_extras')
                      
                        cardData.innerHTML="";
                        formGroupNew.classList.add('invisible');
                        delSolicitud();
                        editSolicitud();
                    })
                } else {
                    swal('Atencion', objData.msg, 'error');
                }
            }
        }
    }
});


/** Escuchar y agregar los inputs faltantes segun el indicador */
const inputsDinamicos = () => {

    let indicadores = document.querySelector('#listIndicadores');
    let formGroupNew = document.querySelector('#inputs_extras');
    
    indicadores.addEventListener('change', (e) => {
        setInputsDinamicos(e, formGroupNew)
    });
}

/** Metodo encargado de setear los inputs */
const setInputsDinamicos = (e, formGroupNew) =>{
    let inputNew = '';
    let obtenerOption = [...e.currentTarget.options]
    const optionSelected = obtenerOption.filter(option => option.value == e.target.value);

    let indicadorActivo = optionSelected[0].textContent.toUpperCase();
  
    switch (indicadorActivo) {
        case 'SUB-PROYECTO PARALELO':
            inputNew = `
                <input type="text" name="extra_info_1" id="extra_info_1" class="form-control"
                 placeholder="Ingrese Sub-proyecto">
                `;
            break;
        case 'PROSECUCIÓN':
            inputNew = `
            <div class="row">
                <div class="col-1 p-2">De</div>
                <div class="col-5">
                    <input type="text" name="extra_info_1" id="extra_info_1" class="form-control"
                    placeholder="Ingrese carrera de TSU">
                </div>
                <div class="col-1 p-2">A</div>
                <div class="col-5">
                    <input type="text" name="extra_info_2" id="extra_info_2" class="form-control"
                    placeholder="Ingrese carrera de ING">
                </div>
            </div>
            `;
            break;
        case 'AUTO-ESTUDIO':
            inputNew = `
            <input type="text" name="extra_info_1" id="extra_info_1" class="form-control"
             placeholder="Ingrese Sub-proyecto para auto-estudio" required>
            `;
            break;
        case 'DOCENTES POR SUBPROGRAMA CON':
            inputNew = `
                <select class="form-control" name="extra_info_1" id="extra_info_1" required>
                    <option value="">Seleccione una opción</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Maestrías">Maestrías</option>
                    <option value="PhD">PhD</option>
                </select>
                `;
            break;
        case 'CATEGORÍA DE DOCENTE':
                inputNew = `
                <select class="form-control" name="extra_info_1" id="extra_info_1" required>
                    <option value="">Seleccione una opción</option>
                    <option value="Docente Agregado">Docente Agregado</option>
                    <option value="Docente Asistente">Docente Asistente</option>
                    <option value="Docente Instructor">Docente Instructor</option>
                    <option value="Docente Titular">Docente Titular</option>
                </select>
                `;
            break;

        default:
            inputNew = `
            <input type="text" name="extra_info_1" id="extra_info_1" class="form-control"
             placeholder="Ingrese ${indicadorActivo.toLowerCase()}">
            `;
            break;
    }

    formGroupNew.classList.remove('invisible');
    formGroupNew.innerHTML = inputNew;
}

/** Funcion que se encarga de consultar los datos de la cedula ingreseda */
const inputCedulaSolicitante = () => {
    let input = document.querySelector("#cedula_solicitante");
    console.log(tipoSolicitante.value);
    getDataSolicitante(input.value, input, tipoSolicitante.value)
}

/** Abre el modal de ver solicitud */
const verSolicitud = () => {
    btnOpenModalVer = document.querySelectorAll(".btnVerSolicitud");

    btnOpenModalVer.forEach((btnOpen) => {
        btnOpen.addEventListener("click", (e) => {
            let idSolicitud = btnOpen.getAttribute("rl");
            console.log();
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/solicitud/ver_solicitud.php?id=' + idSolicitud;
            request.open('GET', ajaxUrl, true);
            request.send();
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    console.log(objData);
                    document.querySelector("#nombre_apellido").innerText = objData.data.nombre_solicitante
                    document.querySelector("#cedula").innerText = objData.data.cedula
                    document.querySelector("#nombre_subprograma").innerText = objData.data.nombre_subprograma
                    document.querySelector("#nombre_indicador").innerText = objData.data.nombre_indicador
                }
            }

            openModalVerSolicitud();
        })
    })
}

/** Carga de modulos automaticos */
window.addEventListener('load', function () {
    delSolicitud();
    editSolicitud();
    verSolicitud();
    inputsDinamicos();
    // generarPdfDeSolicitud();     
    getOptionsIndicadores();
    getOptionsItems();
    getOptionsSubprogramas();
}, false);

/** Metodo que abre el modal de editar para actualizar datos */
function editSolicitud() {
    var btnEditSolicitud = document.querySelectorAll('.btnEditSolicitud');
    btnEditSolicitud.forEach(function (btnEditSolicitud) {
        btnEditSolicitud.addEventListener('click', function () {
            document.querySelector('#titleModal').innerHTML = 'Actualizar Solicitud';
            document.querySelector('.modal-header').classList.replace('headerRegister', 'updateRegister');
            document.querySelector('#btnActionForm').classList.replace('btn-primary', 'btn-info');
            document.querySelector('#btnText').innerHTML = 'Actualizar';

            var idSolicitud = this.getAttribute('rl');

            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = './models/solicitud/edit_solicitud.php?id=' + idSolicitud;
            request.open('GET', ajaxUrl, true);
            request.send();
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                   
                    if (objData.status) {
                        document.querySelector('#id').value = objData.data.id_solicitud;
                        document.querySelector('#cedula_solicitante').value = objData.data.cedula;
                        document.querySelector('#id_solicitante').value = objData.data.id_solicitante;

                        /** Obtenemos los elementos del select */
                        let subprogramas = document.querySelector('#listSubprogramas'),
                            items = document.querySelector('#listItems'),
                            indicadores = document.querySelector('#listIndicadores'),
                            estatus = document.querySelector('#listEstatus'),
                            tipo_solicitante = document.querySelector('#tipo_solicitante');

                        /** Ejecutamos la funcion de setear la seleccion de la opcion en el selector*/
                        setSelectOptions(subprogramas, objData.data.id_subprograma);
                        setSelectOptions(items, objData.data.id_item);
                        getOptionsIndicadores(objData.data.id_item);

                        setTimeout(async ()=>{
                            let formGroupNew = document.querySelector('#inputs_extras');
                            await setSelectOptions(indicadores, objData.data.id_indicador);
                            let e = {
                                currentTarget:{ options:[...indicadores.options],},
                                target: {value: objData.data.id_indicador}            
                            };
                           setInputsDinamicos(e, formGroupNew)
                        }, 2000);

                        setTimeout(()=>{
                            if(objData.data.extra_info_2){
                                document.querySelector('#extra_info_1').value = objData.data.extra_info_1;
                                document.querySelector('#extra_info_2').value = objData.data.extra_info_2;
                            }else{
                                document.querySelector('#extra_info_1').value = objData.data.extra_info_1;
                            }
                        }, 3000);
                        setSelectOptions(tipo_solicitante, objData.data.tipo_solicitante);
                        tipo_solicitante.disabled=true;
                        setSelectOptions(estatus, objData.data.estatus_solicitud);

                        inputCedulaSolicitante()

                        if (objData.data.estatus_solicitud == "ATENDIDO") {
                            var optionSelect = '<option value="ATENDIDO" selected class="notBlock">ATENDIDO</option>';
                        } else if (objData.data.estatus == "PROCESANDO") {
                            var optionSelect = '<option value="PROCESANDO" selected class="notBlock">PROCESANDO</option>';
                        } else {
                            var optionSelect = '<option value="PENDIENTE" selected class="notBlock">PENDIENTE</option>';
                        }

                        var htmlOption = `${optionSelect}
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="PROCESANDO">PROCESANDO</option>
                                    <option value="ATENDIDO">ATENDIDO</option>
                                        `;
                        document.querySelector('#listEstatus').innerHTML = htmlOption;

                        $('#modalFormSolicitud').modal('show');
                       
                    } else {
                        swal('Atencion', objData.msg, 'error');
                    }
                }
            }
        })
    })
}

/** Elimina la solicitud */
function delSolicitud() {
    var btnDelSolicitud = document.querySelectorAll('.btnDelSolicitud');
    btnDelSolicitud.forEach(function (btnDelSolicitud) {
        btnDelSolicitud.addEventListener('click', function (e) {
            e.preventDefault()
            var idSolicitud = this.getAttribute('rl');

            swal({
                title: "Eliminar Solicitud",
                text: "Realmente desea eliminar la Solicitud?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (Confirm) {
                if (Confirm) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxDelSolicitud = './models/solicitud/delet_solicitud.php';
                    var strData = "idSolicitud=" + idSolicitud;
                  
                    request.open('POST', ajaxDelSolicitud, true);
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.send(strData);
                    
                    request.onreadystatechange = function () {
                        if (request.readyState == 4 && request.status == 200) {
                            var objData = JSON.parse(request.responseText);
                            console.log(objData)
                            if (objData.status) {
                                swal("Eliminar!", objData.msg, "success");
                                tableSolicitud.ajax.reload(function () {
                                    delCarrera();
                                    editCarrera();
                                    tableSolicitud();
                                });
                            } else {
                                swal("Atencion", objData.msg, "error");
                            }
                        }
                    }
                }
            })
        })
    })
}

/** Optiene todos los items de la base de datos */
function getOptionsItems() {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/options/options-items.php';
    request.open('GET', ajaxUrl, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var option = JSON.parse(request.responseText);
            option.forEach(function (valor) {
                if (parseInt(valor.estatus_item)) option += '<option value="' + valor.id_item + '">' + valor.nombre_item + '</option>';
            });
            option += '<option value="" selected>Seleccione item</option>';
            document.querySelector('#listItems').innerHTML = option;
        }
    }
}

/** Eventos Para listar los indicadores segun el item*/
let listItems = document.querySelector('#listItems');
listItems.addEventListener('change', (e) => {

    var preloadIndicador = document.querySelector('#preloadIndicador');
    let indicadores = document.querySelector('#listIndicadores');

    const id_item = parseInt(e.target.value);

    indicadores.disabled = true;
    preloadIndicador.classList.remove("invisible");
    preloadIndicador.classList.add("spinner-border", "text-success");
    setTimeout(()=>{
        getOptionsIndicadores(id_item);
        preloadIndicador.classList.add("invisible");
        indicadores.disabled = false;
    },3000)

})

/** Evento para detectaar que hallan seleccionado el tipo de solicitante */
let tipoSolicitante = document.querySelector("#tipo_solicitante");
tipoSolicitante.addEventListener('change',(e)=>{

    let inputCedulaSolicitante = document.querySelector("#cedula_solicitante");

    const tipo = e.target.value;
    if(tipo === "ESTUDIANTE" || tipo === "DOCENTE"){
        inputCedulaSolicitante.disabled=false;
        inputCedulaSolicitante.value='';

    }else{
        inputCedulaSolicitante.disabled=true;
    }
});

/** Resetear el modal del formulario cuando le den XXXXXX */
let botonCerrar = document.querySelector('.close');
botonCerrar.addEventListener('click', (e)=>{
    let formSolicitud = document.querySelector('#formSolicitud'),
    cardData = document.querySelector('#data_solicitante'),
    inputs_extras = document.querySelector('#inputs_extras');
    inputs_extras.innerHTML="";
    cardData.innerHTML="";
    for(i=0; i < formSolicitud.length; i++ ) { formSolicitud[i].value="" }
});


function getOptionsIndicadores(id_item) {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/options/options-indicadores.php?id_item=' + id_item;
    request.open('GET', ajaxUrl, true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var option = JSON.parse(request.responseText);
            option.forEach(function (valor) {
                if (parseInt(valor.estatus_indicador)) option += '<option value="' + valor.id_indicador + '">' + valor.nombre + '</option>';
            });
            option += '<option value="" selected>Seleccione indicador</option>';
            document.querySelector('#listIndicadores').innerHTML = option;
        }
    }
}

function getOptionsSubprogramas() {
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/options/options-subprogramas.php';
    request.open('GET', ajaxUrl, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var option = JSON.parse(request.responseText);
            option.forEach(function (valor) {
                if (parseInt(valor.estatus_carrera)) option += '<option value="' + valor.id_carrera + '">' + valor.nombre + '</option>';
            });
            option += '<option value="" selected>Seleccione Sub-Programa</option>';
            document.querySelector('#listSubprogramas').innerHTML = option;
        }
    }
}

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

function setSelectOptions(elementos, idOptions) {
    for (const elemento of elementos) {
        elemento.value == idOptions
            ? elemento.selected = true
            : elemento.selected = false
    }
}

function openModalSolicitud() {
    let cardData = document.querySelector('#data_solicitante'),
    cedula = document.querySelector('#cedula_solicitante'),
    tipo = document.querySelector('#tipo_solicitante');

    cedula.disabled=false;
    tipo.disabled=false;
    var htmlOption = `
    <option value="PENDIENTE">PENDIENTE</option>
    <option value="PROCESANDO">PROCESANDO</option>
    <option value="ATENDIDO">ATENDIDO</option>
        `;

    cardData.classList.add('invisible');
    document.querySelector('#listEstatus').innerHTML = htmlOption;
    document.querySelector('#id').value = "";
    document.querySelector('#titleModal').innerHTML = 'Crear Solicitud';
    document.querySelector('.modal-header').classList.replace('updateRegister', 'headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info', 'btn-primary');
    document.querySelector('#btnText').innerHTML = 'Generar y Guardar Solicitud';
    $('#modalFormSolicitud').modal('show');
}

function openModalVerSolicitud() {
    console.log('open modal')
    document.querySelector('#id').value = "";
    document.querySelector('#titleModal').innerHTML = 'Ver Solicitud';
    document.querySelector('.modal-header').classList.replace('updateRegister', 'headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info', 'btn-primary');
    document.querySelector('#btnText').innerHTML = 'Imprimir Solicitud';
    $('#modalVerSolicitud').modal('show');
}


const generarPdfDeSolicitud = (jsPDF) => {
    let data = document.querySelector("#textoDeSolicitud").textContent;
    const doc = new jsPDF();
    console.log(doc);
    console.log(data);
    doc.addHTML()
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
}