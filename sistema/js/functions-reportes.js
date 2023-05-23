

$('#tableReporte').DataTable();
var tableReporte;
/** Listar carreras */
document.addEventListener('DOMContentLoaded', function () {
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
            { "data": "contador" },
            { "data": "nombre_item" },
            { "data": "nombre_indicador" },
            { "data": "total_solicitudes" }
        ],
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 100,
        "order": [[0, "asc"]]
    });



    // Generar reporte 
    var formCarrera = document.querySelector('#formCarrera');
    formCarrera.onsubmit = function (e) {
        e.preventDefault();
        var id = document.querySelector('#id').value;
        var codigo = document.querySelector('#codigo').value;
        var nombre = document.querySelector('#nombre').value;
        var status = document.querySelector('#listStatus').value;
        let accion = document.querySelector('#btnText').textContent;
        console.log(accion);
        if (codigo == '' || nombre == '' || status == '') {
            swal('Atencion', 'Todos los campos son necesarios', 'error');
            return false;
        }

        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = accion === "Guardar" ? './models/carrera/ajax-carrera-registrar.php'
            : './models/carrera/ajax-carrera-editar.php';
        request.open('POST', ajaxUrl, true);
        var strData = new FormData(formCarrera);
        request.send(strData);
        console.log(strData)
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                console.log(request.responseText)

                var objData = JSON.parse(request.responseText);
                if (objData.status) {
                    $('#modalFormCarrera').modal('hide');
                    formCarrera.reset();
                    swal('Crear Carrera', objData.msg, 'success');
                    tableCarrera.ajax.reload(function () {
                        delCarrera();
                        editCarrera();
                    })
                } else {
                    swal('Atencion', objData.msg, 'error');
                }
            }
        }
    }
});

/** Carga de modulos automaticos */
window.addEventListener('load', function () {
    getSolicitudesCard();
    // delCarrera();
    // editCarrera();
}, false);

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
            // Llenamos las tarjetas de los items con su total de solicitudes en general
            let listCardItems = '';
            solicitudes.items.forEach(item => {

                let promedio = (item.total_solicitudes * 100) / solicitudes.total_general;

                listCardItems += `
                    <!-- solicitudes Card -->
                    <div class=" col-md-6" >
                        <div class="card info-card sales-card bg-dark ">
          
                          <div class="card-body ">
                            <h5 class="card-title text-white">${item.nombre_item} </h5>
          
                            <div class="d-flex align-items-center">
                              <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i class="bi bi-people text-black"></i>
                              </div>
                              <div class="ps-3">
                                <h6 id="total_solicitudes" class="text-white">${item.total_solicitudes}  </h6><span>| Solicitudes</span>
                                <span class="text-success small pt-1 fw-bold" id="porcentaje" > ${promedio}%</span> <span class="text-muted small pt-2 ps-1">Media</span>
          
                              </div>
                            </div>
                          </div>
          
                        </div>
                    </div><!-- End Sales Card -->
                    `;
            }
            )
            document.querySelector('#lista_solicitudes').innerHTML = listCardItems;



        }
    }
}

// Barra de estadisticas por item con los porcentajes de solicitud por idicador
document.addEventListener("DOMContentLoaded", () => {

    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/reportes/table_reporte.php';
    request.open('GET', ajaxUrl, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var solicitudes = JSON.parse(request.responseText);
            console.log(solicitudes.data);
            let columnsChartsHtml = '';
            const charts =  [];
            solicitudes.items.forEach( (item) => {

                columnsChartsHtml+=`
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre_item}</h5>
                
                            <!-- Column Chart -->
                            <div id="columnChart${item.id_item}"></div>
        
                        </div>
                    </div>
                </div>
                `;
                document.querySelector('#barraDeEstadisticas').innerHTML = columnsChartsHtml;

                // crear array de indicadores
                let indicadores = solicitudes.data.filter(indicador => indicador.id_item == item.id_item);
                console.log(indicadores);
                let dataSerieSolicitudes = [];
                let dataSerieNombres = [];
                indicadores.forEach(dataSS => dataSerieSolicitudes.push(parseInt(dataSS.total_solicitudes)));
                indicadores.forEach(dataSS => dataSerieNombres.push(dataSS.nombre_indicador));
                console.log(dataSerieSolicitudes);
                console.log(dataSerieNombres);

                
                charts.push({
                    series: [
                        {
                            name: 'Total solicitudes',
                            data: dataSerieSolicitudes
                        }, {
                            name: 'Aprobadas',
                            data: []
                        }, {
                            name: 'Rechazadas',
                            data: []
                        }],
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: dataSerieNombres,
                    },
                    yaxis: {
                        title: {
                            text: '% (Estadisticas)'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return "% " + val + " porcentaje"
                            }
                        }
                    },
                    id:item.id_item
                });
            })

          
            charts.forEach(chart =>{
                new ApexCharts(document.querySelector(`#columnChart${chart.id}`), chart ).render();
            })
        }
    }
});



function openModalCarrera() {
    document.querySelector('#id').value = "";
    document.querySelector('#titleModal').innerHTML = 'Crear Carrera';
    document.querySelector('.modal-header').classList.replace('updateRegister', 'headerRegister');
    document.querySelector('#btnActionForm').classList.replace('btn-info', 'btn-primary');
    document.querySelector('#btnText').innerHTML = 'Guardar';
    $('#modalFormCarrera').modal('show');
}
