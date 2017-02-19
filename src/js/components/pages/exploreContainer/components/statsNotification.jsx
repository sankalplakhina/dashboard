import React from 'react';
import cx from 'classnames';

const StatsNotification = ({ data }) => {

	const { icon, postText, text } = data;
	return (
		<div className="notifications media">
			<div className="media-left">
				<img className="media-object" src={`/public/static/images/${icon}`} />
			</div>
			<div className="media-body">
				{text}
				<h4 className="media-heading">{postText}</h4>
			</div>
		</div>
	);
}

export default StatsNotification;
