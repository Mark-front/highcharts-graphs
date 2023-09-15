import {memo} from 'react';
import Highcharts from "highcharts";
import drilldow from "highcharts/modules/drilldown";
import PieChart from "highcharts-react-official";

export const DonutChart = memo(() => {
    
    drilldow(Highcharts);
    
    const subtitleData = (dataText: string[]) => {
        const newArr = dataText.map(item => `<span class="subtitle-text">
                        ${item}
                    </span>`)
        
        return newArr.join('')
    }
    const subtitleCreate = (titleMain: string, dataText: string[]) => {
        return `
            <span class='subtitle-container'>
                <span class="subtitle-main">
                    ${titleMain}
                </span>
                ${subtitleData(dataText)}
            </span>
        `
    }
    
    
    // Create the chart
    const options = {
        chart: {
            width: 570,
            height: 350,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: '#313131',
        },
        legend: {
            itemStyle: {
                "color": "#fff",
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            useHTML: true,
            text: subtitleCreate('215', ['133 (+74)', '82']),
            floating: true,
            verticalAlign: 'middle',
            y: 30
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Значение',
            colorByPoint: true,
            allowPointSelect: true,
            data: [{
                name: 'Не зашифровано',
                y: 38,
                color: '#979797'
            }, {
                name: 'Зашифровано',
                y: 62,
                color: '#77954D'
            }],
            innerSize: '80%',
            showInLegend: true,
            dataLabels: {
                enabled: true,
                className: 'sankey-text',
                color: '#FFFFFF',
                style: {
                    textOutline: 'none'
                }
            },
        }]
    };
    
    return (
        <div className="container-diagram">
            <h2>Влияние криптовалют на неокрепший разум
                молодых людей в Омске.</h2>
            <PieChart highcharts={Highcharts} options={options}/>
        </div>
    )
})

