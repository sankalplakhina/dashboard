import React from 'react';
import StatsPanel from 'src/js/components/pages/exploreContainer/components/statsPanel';

class OrderContent extends React.Component {
	render() {
		const { data } = this.props;
		return (
			<div className="content">
	  			<div className="row">
	  				<div className="col-sm-12">
						<StatsPanel data={data} isFirstExpanded isFixedExpanded />
	  				</div>
	  			</div>
			</div>
		);
	}
}

export default OrderContent;
