import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';



export default class DonutChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            hover: undefined,
            valueField: props.valueField,
            argumentField: props.argumentField,
            height: props.height
        };

        this.changeHover = hover => this.setState({ hover });
        }

  render() {
    const { data: chartData, hover, valueField:valueField, argumentField: argumentField, height:height } = this.state;

    return (
      <Paper>
        <Chart
        data={chartData}
        height={height}
        >
            <PieSeries
                valueField = {valueField}
                argumentField= {argumentField}
                innerRadius={0.6}

            />
            <EventTracker />
            <HoverState hover={hover} onHoverChange={this.changeHover} />
        </Chart>
      </Paper>

      
    );
  }
}
