import React from 'react';
import cx from 'classnames';

const StatsMapData = ({ data }) => {

	const { icon, heading, address } = data;
	return (
		<div className="media">
			<div className="media-left">
				<img className="media-object" src={`/public/static/images/${icon}`} />
			</div>
			<div className="media-body">
				<h4 className="media-heading">{heading}</h4>
				{address}
			</div>
		</div>
	);
}

export default StatsMapData;
