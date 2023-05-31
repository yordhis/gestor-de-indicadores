

/** Carga de modulos automaticos */
// window.addEventListener('load', function () {
//     getCardVisionGeneral();
// }, false);




// Barra de estadisticas por item con los porcentajes de solicitud por idicador
document.addEventListener("DOMContentLoaded", () => {

    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = './models/reportes/table_reporte.php';
    request.open('GET', ajaxUrl, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var solicitudes = JSON.parse(request.responseText);
            console.log(solicitudes);

            /** Inicio Configuracion de las tarjetas de las estadisticas generales */
             let listCardItems = '', 
             fecha = new Date(Date.now());
            listCardItems += `
                <!-- solicitudes Card -->
                <div class=" col-md-6" >
                    <div class="card info-card sales-card bg-dark ">
    
                    <div class="card-body ">
                        <h5 class="card-title text-white"> Total de solicitudes recibidas </h5>
    
                        <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people text-black"></i>
                        </div>
                        <div class="ps-3">
                            <h6 id="total_solicitudes" class="text-white"> ${solicitudes.totalGeneralSolicitudes} </h6><span>| Fecha: </span>
                            <span class="text-success small pt-1 fw-bold" id="porcentaje" >${fecha.toLocaleDateString()}</span> <span class="text-muted small pt-2 ps-1"></span>
    
                        </div>
                        </div>
                    </div>
    
                    </div>
                </div><!-- End Sales Card -->

                <!-- Matricula Card -->
                <div class=" col-md-6" >
                    <div class="card info-card sales-card bg-dark ">
    
                    <div class="card-body ">
                        <h5 class="card-title text-white"> Total Matricula Estudiantil del programa </h5>
    
                        <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people text-black"></i>
                        </div>
                        <div class="ps-3">
                            <h6 id="total_solicitudes" class="text-white"> ${solicitudes.subprogramas.totalGeneralMatricula} </h6><span>| Fecha: </span>
                            <span class="text-success small pt-1 fw-bold" id="porcentaje" >${fecha.toLocaleDateString()}</span> <span class="text-muted small pt-2 ps-1"></span>
    
                        </div>
                        </div>
                    </div>
    
                    </div>
                </div><!-- End Sales Card -->
            `;

            document.querySelector('#tarjetas_informativas').innerHTML = listCardItems;
            /** Cierre Configuracion de las tarjetas de las estadisticas generales */


            
            /** Inicio de configuracion de las estadisticas de los indicadores */
            let columnsChartsHtml = '';
            const charts = [];
            solicitudes.items.forEach((item) => {

                columnsChartsHtml += `
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
                let indicadores = solicitudes.indicadores.filter(indicador => indicador.id_item == item.id_item);
                // console.log(indicadores); 
                // console.log(indicadores.length); 
                let dataSerieSolicitudes = [],
                    dataSerieNombres = [],
                    dataSerieAprobadas = [],
                    dataTotalRechazadas = [],
                    dataTotalAprobadas = [],
                    dataSerieRechazadas = [];
                indicadores.forEach(dataSS => dataSerieSolicitudes.push(dataSS.totalSolicitudes));
                indicadores.forEach(dataSS => dataSerieNombres.push(dataSS.nombre_indicador));
                indicadores.forEach(dataSA => dataSerieAprobadas.push(dataSA.porcentajeAprobadas));
                indicadores.forEach(dataSA => dataSerieRechazadas.push(dataSA.porecentajeRechazadas));
                indicadores.forEach(dataSTR => dataTotalRechazadas.push(dataSTR.totalSolicitudesRechazadas));
                indicadores.forEach(dataSTA => dataTotalAprobadas.push(dataSTA.totalSolicitudesAprobadas));
                // console.log(dataSerieSolicitudes);
                // console.log(dataSerieNombres);
                // console.log("porcentajes");
                // console.log(dataSerieAprobadas);
                // console.log(dataSerieRechazadas);


                charts.push({
                    series: [
                        {
                            name: 'Total de solicitudes',
                            data: dataSerieSolicitudes
                        }, 
                        { 
                            name: 'Total Aprobadas',
                            data: dataTotalAprobadas
                        }, 
                        {
                            name: 'Promedio Aprobadas',
                            data: dataSerieAprobadas
                        }, 
                        { 
                            name: 'Total Rechazadas',
                            data: dataTotalRechazadas
                        }, 
                        {
                            name: 'Promedio Rechazadas',
                            data: dataSerieRechazadas
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
                        type: 'numeric',
                        title: {
                            text: '% (Estadisticas)'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => {
                                let valString = val.toString()
                                if (valString.length > 2) {
                                    return (val * 100) + '%';
                                } else {
                                    return val;
                                }

                                // console.log(w.config.series);

                            }
                        }
                    },
                    id: item.id_item
                });
            })
            charts.forEach(chart => {
                new ApexCharts(document.querySelector(`#columnChart${chart.id}`), chart).render();
            })
            /** Cierre de conguración de las estadisticas de los indicadores */



            /** Inicio de configuracion del PIE-CHART-ITEMS de las solicitudes recibidas en los ITEMS */
            let seriesItemSolicitudes = [],
            seriesItemName = [];
            solicitudes.items.forEach(item => seriesItemSolicitudes.push(parseInt(item.totalSolicitudes)));
            solicitudes.items.forEach(item => seriesItemName.push(item.nombre_item));
              new ApexCharts(document.querySelector("#pieChartItems"), {
                series: seriesItemSolicitudes,
                chart: {
                  height: 350,
                  type: 'pie',
                  toolbar: {
                    show: true
                  }
                },
                labels: seriesItemName
              }).render()
            /** Cierre de configuracion del PIE-CHART-ITEMS de las solicitudes recibidas en los ITEMS */

            /** Inicio de configuracion de PIE-CHART-DOCENTES  */
            let { docentes, subprogramas } = solicitudes,
            serieDocentePorCategoria = [],
            serieNombreCategoriaDocentes = ['Agregados', 'Asistentes', 'Asociados', 'Instructores', 'Titulares'],
            serieCantidadDocentePorCategoria = [
                parseInt(docentes.agregados), 
                parseInt(docentes.asistentes),
                parseInt(docentes.asociados),
                parseInt(docentes.instructores),
                parseInt(docentes.titulares) 
            ]
            serieDocentePorCategoria.push(parseInt(docentes.agregados) / subprogramas.totalGeneralMatriculaDocente );
            serieDocentePorCategoria.push(parseInt(docentes.asistentes) / subprogramas.totalGeneralMatriculaDocente );
            serieDocentePorCategoria.push(parseInt(docentes.asociados) / subprogramas.totalGeneralMatriculaDocente );
            serieDocentePorCategoria.push(parseInt(docentes.instructores) / subprogramas.totalGeneralMatriculaDocente );
            serieDocentePorCategoria.push(parseInt(docentes.titulares) / subprogramas.totalGeneralMatriculaDocente );
            console.log(serieDocentePorCategoria);

            new ApexCharts(document.querySelector("#barChartDocente"), {
                series: [
                    {
                        name:'Cantidad',
                        data: serieCantidadDocentePorCategoria
                    },
                    {
                        name:'Promedio',
                        data: serieDocentePorCategoria
                    }
                ],
                chart: {
                  type: 'bar',
                  height: 350
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: serieNombreCategoriaDocentes,
                },
                yaxis:{
                    title:{
                        text: "Estadísticas"
                    }
                },
                tooltip:{
                    y: {
                        formatter: (val) => {
                            let valString = val.toString()
                                if (valString.length > 2) {
                                    return val * 100 + '%';
                                } else {
                                    return val;
                                }
                        }
                    }
                }
              
              }).render();  


                // new ApexCharts(document.querySelector("#pieChartDocente"), {
                //     series: serieDocentePorCategoria,
                //     chart: {
                //     height: 350,
                //     type: 'pie',
                //     toolbar: {
                //         show: true
                //     }
                //     },
                //     labels: serieNombreCategoriaDocentes
                // }).render()
            /** Cierre de configuracion de PIE-CHART-DOCENTES  */

        }
    }
});


