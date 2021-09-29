// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import './PieChart.css';

//below is a sample for how the data format must be
// const demoData = [
//     {
//       "id": "css",
//       "label": "css",
//       "value": 558,
//       /* optional */ "color": "hsl(245, 70%, 50%)"
//     },
//     {
//       "id": "scala",
//       "label": "scala",
//       "value": 170,
//       /* optional */ "color": "hsl(224, 70%, 50%)"
//     },
//   ]


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function PieChart(props) {
    return (
        <ResponsivePie
        className={'ResponsivePie'}
        data={props.data}
        margin={{ top: 0, right: 60, bottom: 0, left: 60 }}
        sortByValue={true}
        innerRadius={0.45}
        padAngle={2}
        activeOuterRadiusOffset={8}
        colors= {['#FF8A59', '#FFAA87', '#FFC6AE', '#FEE4D9', '#140000', '#491600', '#6F2100', '#922E04', '#B73B08', '#D44A0F', '#ED5617', ]}
        borderWidth={1}
        borderColor={{ theme: 'background' }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={9}
        arcLinkLabelsTextColor="#061A33"
        arcLinkLabelsStraightLength={0}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}   
    />
    )
}