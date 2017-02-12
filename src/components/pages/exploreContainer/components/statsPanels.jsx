import React from 'react';
import cx from 'classnames';
import StatsPanel from './statsPanel';

class StatsPanels extends React.Component {

	render() {
		const { data } = this.props;
		const { rows } = data;
		return (
			<div className="expPaginate">
				{
		  			rows.map((row, idx) => {
		  				switch(row) {
		  					case 'panelData':
		  					return <StatsPanel data={data[row]} key={idx} />;
		  				}
		  			})
				}
			</div>
		);
	}
}

export default StatsPanels;
