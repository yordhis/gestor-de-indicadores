

/** Carga de modulos automaticos */
window.addEventListener('load', function () {
    getSolicitudesCard();
}, false);



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


