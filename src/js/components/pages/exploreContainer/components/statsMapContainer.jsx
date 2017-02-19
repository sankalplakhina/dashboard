import React from 'react';
import cx from 'classnames';
import StatsMap from './statsMap';
import StatsMapData from './statsMapData';

const StatsMapContainer = (props) => {

	const { data, isActive } = props;
	const { markers } = data;
	return (
		<div className="map-c">
			{isActive? <StatsMap data={data} /> : 'Loading map....'}
			{
				markers.map((mark, idx) => {
					const markerData = data[mark];
					return <StatsMapData data={markerData} key={idx} />
				})
			}
		</div>
	);
}

export default StatsMapContainer;
