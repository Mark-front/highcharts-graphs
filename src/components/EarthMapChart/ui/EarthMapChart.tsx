import {memo, useEffect, useRef} from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import mapData from "../data/ne_50m_admin_0_countries.geo.json";
import topology from "../data/RUS_adm2.geo.json";
import proj4 from "proj4";

export const EarthMapChart = memo(() => {
    HighchartsMap(Highcharts);
    const chartRef = useRef(null);
    
    const getGraticule = () => {
        const data = [];
        
        // Meridians
        for (let x = -180; x <= 180; x += 15) {
            data.push({
                geometry: {
                    type: 'LineString',
                    coordinates: x % 90 === 0 ? [
                        [x, -90],
                        [x, 0],
                        [x, 90]
                    ] : [
                        [x, -80],
                        [x, 80]
                    ]
                }
            });
        }
        
        // Latitudes
        for (let y = -90; y <= 90; y += 10) {
            const coordinates = [];
            for (let x = -180; x <= 180; x += 5) {
                coordinates.push([x, y]);
            }
            data.push({
                geometry: {
                    type: 'LineString',
                    coordinates
                },
                lineWidth: y === 0 ? 2 : undefined
            });
        }
        
        return data;
    };
    
    const renderSea = () => {
        let verb = 'animate';
        const chart = chartRef.current.chart
        if (!chart.sea) {
            chart.sea = chart.renderer
                .circle()
                .attr({
                    fill: {
                        radialGradient: {
                            cx: 0.4,
                            cy: 0.4,
                            r: 1
                        },
                        stops: [
                            [0, 'white'],
                            [1, 'lightblue']
                        ]
                    },
                    zIndex: -1
                })
                .add(chart.get('graticule').group);
            verb = 'attr';
        }
        
        const bounds = chart.get('graticule').bounds,
            p1 = chart.mapView.projectedUnitsToPixels({
                x: bounds.x1,
                y: bounds.y1
            }),
            p2 = chart.mapView.projectedUnitsToPixels({
                x: bounds.x2,
                y: bounds.y2
            });
        chart.sea[verb]({
            cx: (p1.x + p2.x) / 2,
            cy: (p1.y + p2.y) / 2,
            r: Math.min(p2.x - p1.x, p1.y - p2.y) / 2
        });
    };
    
    // Prepare random-like demo data
    const data = topology.features.map((g, i) => ({
        'NL_NAME_1': g.properties['NL_NAME_1'],
        value: i * 10,
    }));
    console.log(data)
    
    // Add flight route after initial animation
    const afterAnimate = e => {
        const chart = e.target.chart;
        
        if (!chart.get('flight-route')) {
            chart.addSeries({
                type: 'mapline',
                animation: false,
                id: 'flight-route',
                data: [{
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [4.90, 53.38], // Amsterdam
                            [-118.24, 34.05] // Los Angeles
                        ]
                    },
                    color: '#313f77'
                }],
                lineWidth: 2
            }, false);
            chart.addSeries({
                type: 'mappoint',
                animation: false,
                data: [{
                    name: 'Amsterdam',
                    geometry: {
                        type: 'Point',
                        coordinates: [4.90, 53.38]
                    }
                }, {
                    name: 'LA',
                    geometry: {
                        type: 'Point',
                        coordinates: [-118.24, 34.05]
                    }
                }],
                color: '#313f77'
            }, false);
            chart.redraw(false);
        }
    };
    
    
    const options: Highcharts.Options = {
        chart: {
            map: mapData,
            width: window.innerWidth,
            height: window.innerHeight,
            proj4
        },
        title: {
            text: '',
            useHTML: false
        },
        mapView: {
            maxZoom: 30,
            projection: {
                name: 'Orthographic',
                rotation: [-100, -60],
            },
            zoom: 4.5
        },
        colorAxis: {
            tickPixelInterval: 100,
            minColor: '#BFCFAD',
            maxColor: '#31784B',
            max: 1000
        },
        plotOptions: {
            series: {
                point: {
                  events: {
                  
                  }
                },
                animation: {
                    duration: 750
                },
                clip: false,
            }
        },
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        events: {
            afterAnimate
        },
        series: [
            {
                name: 'Graticule',
                id: 'graticule',
                type: 'mapline',
                data: getGraticule(),
                nullColor: 'rgba(0, 0, 0, 0.05)'
            },
            {
                type: "map",
                mapData: mapData,
                borderColor: "#a0a0a0",
                nullColor: "rgba(255, 255, 255, 0.3)",
                showInLegend: false,
                states: {
                    hover: {
                        color: "#BADA55"
                    }
                }
            },
            {
                type: 'map',
                name: topology.name || 'Map',
                mapData: topology,
                data,
                joinBy: 'NL_NAME_1',
                states: {
                    hover: {
                        color: '#a4edba',
                        borderColor: '#333333'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                },
                accessibility: {
                    exposeAsGroupOnly: true
                }
            },
            {
                type: "mappoint",
                name: "Moсква",
                dataLabels: {
                    format: "{point.id}"
                },
                data: [
                    {
                        id: "Москва",
                        lat: 55.700182,
                        lon: 37.580158
                    }
                ]
            }
        ],
        
    };
    
    useEffect(() => {
        renderSea();
        Highcharts.addEvent(chartRef.current.chart, 'redraw', renderSea);
    }, [])
    
    return (
        <div className="container-diagram">
            <h2>Нашествие ящеров на русов в %</h2>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                constructorType={"mapChart"}
                updateArgs={[true, true, true]}
                ref={chartRef}
            />
        </div>
    );
})

EarthMapChart.displayName = 'EarthMapChart'