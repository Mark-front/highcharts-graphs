 import './App.css'

import Highcharts from 'highcharts'
import Sankey from 'highcharts/modules/sankey'
import HighchartsReact from 'highcharts-react-official'

function App() {
    Sankey(Highcharts)
    
    const mockData = [
        {
            animals: [
                {
                    name: 'Медведи',
                    foods: [
                        {
                            name: 'Mед',
                            value: ''
                        }
                    ]
                }
            ]
        }
    ]
    
    const gradientColor = (colorFrom: string, colorTo: string) => {
        const gradient = {
            linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
            stops: [
                [0, colorFrom], // start
                [1, colorTo],
    
            ]
        }
        return gradient
    }
    
    
    const options = {
        title: {
            text: 'My chart'
        },
        series: [{
            keys: ['from', 'to', 'weight', 'color'],
            gradientForSides: true,
            colors: ['#979797','#8B75BA','#DDAFD3','#7EB8BF', '#77954D'],
            data: [
                ['Медведи', 'Mед', 35, gradientColor('rgba(151, 151, 151, 0.85)', 'rgba(139, 117, 186, 0.85)')],
                ['Медведи', 'Малина', 8, gradientColor('rgba(151, 151, 151, 0.85)', 'rgba(221, 175, 211, 0.85)')],
                ['Медведи', 'Яблоки', 15, gradientColor('rgba(151, 151, 151, 0.85)', 'rgba(126, 184, 191, 0.85)')],
                ['Ежи', 'Mед', 15, gradientColor('rgba(119, 149, 77, 0.85)', 'rgba(139, 117, 186, 0.85)')],
                ['Ежи', 'Малина', 12, gradientColor('rgba(119, 149, 77, 0.85)', 'rgba(221, 175, 211, 0.85)')],
                ['Ежи', 'Яблоки', 15, gradientColor('rgba(119, 149, 77, 0.85)', 'rgba(126, 184, 191, 0.85)')]
            ],
            states: {
                hover: {
                    opacity: 1
                },
                inactive: {
                    opacity: .8
                }
            },
            type: 'sankey'
        }]
    };
  return (
    <>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </>
  )
}

export default App
