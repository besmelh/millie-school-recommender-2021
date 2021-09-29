import React from 'react';
import { ResponsiveBar } from '@nivo/bar';



// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function BarChart(props) {
  return (
    <ResponsiveBar
    data={props.data}
    keys={[props.keys]}
    indexBy={props.indexBy}
        margin={{ top: 0, right: 0, bottom: 50, left: 30 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: '', enabled: false }}
        colors={['#FF7F49']}
        borderRadius={2}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.axisBottomLegend,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.axisBottomLegend,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[]}
    />
    )
}


// import Paper from '@material-ui/core/Paper';
// import {
//     Chart,
//     BarSeries,
//     ArgumentAxis,
//     ValueAxis,
//   } from '@devexpress/dx-react-chart-material-ui';
//   import { EventTracker, HoverState } from '@devexpress/dx-react-chart';
//   import './BarChart.css'

  
//   export default class BarChart extends React.PureComponent {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         data: props.data,
//         hover: undefined,
//         valueField: props.valueField,
//         argumentField: props.argumentField,
//         height: props.height
//       };
  
//       this.changeHover = hover => this.setState({ hover });
//     }
  
//     render() {
//       const { data: chartData, hover, valueField:valueField, argumentField: argumentField, height:height } = this.state;

  
//       return (
//         <Paper>
//           <Chart
//             data={chartData}
//             height={height}
//           >
//             <ArgumentAxis />
//             <ValueAxis />
  
//             <BarSeries
//               valueField = {valueField}
//               argumentField= {argumentField}
//               fill={"#FF7F49"}
//             />
//             <EventTracker />
//             <HoverState hover={hover} onHoverChange={this.changeHover} />
//           </Chart>
//         </Paper>
//       );
//     }
//   }
  