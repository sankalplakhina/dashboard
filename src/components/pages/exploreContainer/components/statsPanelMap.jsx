import React from 'react';

const StatsPanelMap = ({ widthSize, header }) => {

	return (
		<div className={`col-md-${widthSize}`}>
			<div className="tableView">
				{header}
				<div className="tblViewContent">
					StatsPanelMap
				</div>
			</div>
		</div>
	);
}

StatsPanelMap.defaultProps = {
	widthSize: 6,
}

export default StatsPanelMap;
