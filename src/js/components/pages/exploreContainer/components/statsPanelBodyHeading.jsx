import React from 'react';

const StatsPanelBodyHeading = ({ heading }) => {

	return (
		<div className={`heading ${heading.class}`}>
			<img src={`public/static/images/${heading.icon}`} />
			{heading.title}
		</div>
	);
}

export default StatsPanelBodyHeading;
