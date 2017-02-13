import React from 'react';
import cx from 'classnames';

class AvgStatsTitleRow extends React.Component {

	render() {
		const { title, classNames, children } = this.props;
		return (
			<div className={classNames}>
		  		<h4>{title}</h4>
		  		{children}
			</div>
		);
	}
}

export default AvgStatsTitleRow;
