import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class AvgStats extends React.Component {
	render() {
		const { data: {cols, stats, matchedOrders, scoreDistribution} } = this.props;
		console.log('cols, stats, matchedOrders, scoreDistribution', cols, stats, matchedOrders, scoreDistribution);
		return (
			<div>
		  		AvgStats
			</div>
		);
	}
}

export default AvgStats;
