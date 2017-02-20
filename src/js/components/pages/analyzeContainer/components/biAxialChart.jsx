import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	AreaChart,
	Area,
	ReferenceLine,
} from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class biAxialChart extends React.Component {

	constructor(){
		super();
		this.state = {
			isChartVisible: false
		};
	}

	// remove the following client conditions once rechart library
	// updates their release with following PR's
	// clipPathId prop in <Pie /> - https://github.com/recharts/recharts/pull/500
	// API doc update - https://github.com/recharts/recharts.org/pull/28
	componentDidMount() {
		this.setState({
			isChartVisible: true
		});
	}

	render() {
		const { isChartVisible } = this.state;
		if (isChartVisible) {
			return (
				<AreaChart
					width={1200}
					height={400}
					data={data}
					margin={{top: 10, right: 30, left: 0, bottom: 0}}>
				    <XAxis dataKey="name" />
				    <YAxis yAxisId="left" orientation="left" stroke="#42afc6" />
	       			<YAxis yAxisId="right" orientation="right" stroke="#d04c37" />
	       			<ReferenceLine x="Page C" stroke="#656565" label="Page C"/>
	       			<ReferenceLine x="Page E" stroke="#656565" label="Page E"/>
	       			<Tooltip />
				    <Area type="monotone" yAxisId="left" dataKey="pv" stroke="#42afc6" fill="#e0f3f9" />
				    <Area type="monotone" yAxisId="right" dataKey="uv" stroke="#d04c37" fill="#fcf2f0" />
				</AreaChart>
			);
		}
		return null;
	}
}

export default biAxialChart;