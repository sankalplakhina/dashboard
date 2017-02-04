import { PieChart, Pie, Tooltip, Cell } from 'Recharts';
import React from 'react';
import styles from './dbPieChart.css';

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
        	<div className={styles.dbPieChart} style={{width: width, height: height}}>
        		{ title && <div className={styles.title}>{title}</div> }
				{
					isChartVisible &&
					<PieChart width={width} height={height}>
						<Pie
							data={data}
							cx={125}
							cy={90}
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
					<div className={styles.chartDetails}>
						<div>
							{centerText.map((text, idx) => <div key={idx}>{text}</div>)}
						</div>
					</div>
				}
			</div>
        );
    }
}

DbPieChart.defaultProps = {
	width: 250,
	height: 180,
}

export default DbPieChart;
