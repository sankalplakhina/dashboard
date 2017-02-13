import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Tooltip from 'recharts/lib/component/Tooltip';
import Cell from 'recharts/lib/component/Cell';
import React from 'react';

class DbPieChart extends React.Component {
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
    	const { width, height, title, data, colors, centerText } = this.props;
    	const { isChartVisible } = this.state;
        return (
        	<div className="dbPieChart" style={{width: width}}>
        		{ title && <div className="title">{title}</div> }
        		<div className="chartArea">
				{
					isChartVisible &&
					<PieChart width={width} height={height}>
						<Pie
							data={data}
							cx={width/2}
							cy={height/2}
							innerRadius={60}
							outerRadius={80}
							fill="#8884d8"
							label={true}
							labelLine={true}
						>
						{
							data.map((entry, index) => <Cell fill={colors[index % colors.length]} key={index} />)
						}
						</Pie>
						<Tooltip />
					</PieChart>
				}
				{
					isChartVisible &&
					<div className="chartDetails" style={{width: width, height: height}}>
						<div>
							{centerText.map((text, idx) => <div key={idx}>{text}</div>)}
						</div>
					</div>
				}
				</div>
			</div>
        );
    }
}

DbPieChart.defaultProps = {
	width: 250,
	height: 180,
}

export default DbPieChart;
