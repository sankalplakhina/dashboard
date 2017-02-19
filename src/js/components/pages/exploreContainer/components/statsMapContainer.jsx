import React from 'react';
import cx from 'classnames';
import StatsMap from './statsMap';

const StatsMapContainer = (props) => {

	const { data, isActive } = props;
	console.log('data in StatsMapContainer', isActive);
	return (
		<div className="map">
			{isActive? <StatsMap data={data} /> : 'Loading map....'}
		</div>
	);
}

export default StatsMapContainer;
