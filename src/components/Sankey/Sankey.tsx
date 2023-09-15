import {memo} from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Sankey from 'highcharts/modules/sankey'
import {gradientColor} from "../../libs/gragientColor";

export const WoodSankey = memo(() => {
    Sankey(Highcharts)
    
    const options = {
        title: {
            text: ''
        },
        chart: {
            width: 296,
            height: 181,
            backgroundColor: '#242427',
        },
        credits: {
            enabled: false,
        },
        series: [{
            name: 'Служба безопасности леса',
            keys: ['from', 'to', 'weight', 'color', 'dataLabels'],
            gradientForSides: true,
            colors: ['#979797', '#8B75BA', '#DDAFD3', '#7EB8BF', '#77954D'],
            data: [
                ['Медведи', 'Mед', 40, gradientColor('rgba(151, 151, 151, 0.85)', 'rgba(139, 117, 186, 0.85)'),],
                ['Медведи', 'Малина', 10, gradientColor('rgba(151, 151, 151, 0.85)', 'rgba(221, 175, 211, 0.85)'),],
                ['Медведи', 'Яблоки', 15, gradientColor('rgba(151, 151, 151, 0.85)', 'rgba(126, 184, 191, 0.85)'),],
                ['Ежи', 'Mед', 10, gradientColor('rgba(119, 149, 77, 0.85)', 'rgba(139, 117, 186, 0.85)'),],
                ['Ежи', 'Малина', 10, gradientColor('rgba(119, 149, 77, 0.85)', 'rgba(221, 175, 211, 0.85)'),],
                ['Ежи', 'Яблоки', 15, gradientColor('rgba(119, 149, 77, 0.85)', 'rgba(126, 184, 191, 0.85)'),]
            ],
            states: {
                hover: {
                    opacity: 1
                },
                inactive: {
                    opacity: .8
                }
            },
            type: 'sankey',
            dataLabels: {
                enabled: true,
                className: 'sankey-text',
                color: '#FFFFFF',
                nodeFormatter: function (): string {
                    const {point, key} = this
                    console.log(this)
                    return `${key} <br/> ${point.sum}%`
                },
                style: {
                    textOutline: 'none'
                }
            },
            
        }]
    };
    return (
        <div className="container-diagram">
            <h2>Служба безопасности леса</h2>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
})

