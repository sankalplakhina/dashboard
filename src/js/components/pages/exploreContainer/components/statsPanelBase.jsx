import React from 'react';

const StatsPanelBase = ({ widthSize, header, body, footer }) => {

	return (
		<div className={`col-md-${widthSize}`}>
			<div className="tableView">
				{header}
				<div className="tblViewContent">
					{body}
					{footer}
				</div>
			</div>
		</div>
	);
}

StatsPanelBase.defaultProps = {
	widthSize: 12,
}

export default StatsPanelBase;
