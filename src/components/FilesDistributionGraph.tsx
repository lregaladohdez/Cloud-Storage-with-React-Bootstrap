// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { ReactElement } from 'react'
import Ratio from 'react-bootstrap/Ratio';

function FilesDistributionGraph(): ReactElement{
   const data = [
  {
    "id": "Documents",
    "label": "Documents",
    "value": 195,
    "color": "hsl(119, 70%, 50%)"
  },
  {
    "id": "Archives",
    "label": "Archives",
    "value": 312,
    "color": "hsl(164, 70%, 50%)"
  },
  {
    "id": "Video",
    "label": "Video",
    "value": 566,
    "color": "hsl(99, 70%, 50%)"
  },
  {
    "id": "Images",
    "label": "Images",
    "value": 430,
    "color": "hsl(203, 70%, 50%)"
  },
  ]
    const CenteredMetric = ({ dataWithArc, centerX, centerY }:
        { dataWithArc: { value: number }[], centerX: number, centerY: number }) => {
        let total = 0
        dataWithArc.forEach(datum => {
            total += datum.value
        })

        return (
            <text
                x={centerX}
                y={centerY}
                
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '48px',
                    fontWeight: 400,
                    
                }}
            >
                {total}<tspan dominantBaseline="central" alignmentBaseline='mathematical' style={{
                    fontSize: '30px',
                    fontWeight: 30,
                }}>GB</tspan>
            </text>
        
        )
    }
    // const customshape : React.FC<SymbolProps> = (data):
    return (
        <Ratio aspectRatio={'16x9'} style={{ width: '30vh'  }} className="flex-fill">
            <ResponsivePie
                data={data}
                sortByValue={true}
                layers={['arcs','legends',CenteredMetric]}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                innerRadius={0.9}
                padAngle={1}
                cornerRadius={10}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'dark2' }}
                borderWidth={1}
                borderColor={{ theme: 'background' }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={15}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLabels={false}
                arcLabel={function (e) { return e.id + " (" + e.value + ")" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.5
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 0,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 64,
                        itemHeight: 30,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </Ratio>
       
    );
}

export default FilesDistributionGraph;