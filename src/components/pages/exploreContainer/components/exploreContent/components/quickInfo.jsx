import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

class QuickInfo extends React.Component {

	render() {

		const { data } = this.props;
		const { cols } = data;
		return (
			<div className="quickInfo">
		  		{cols.map((column, idx)=>{
		  			return (
		  				<div
		  					className={cx('orderInfo', {
		  								   'colorLightGrey': !data[column].risky,
		  								   'colorRed': data[column].risky
		  								})}
		  					key={idx}
		  				>
		  					<small>{data[column].title}</small>
		  					<big>{data[column].count}</big>
		  				</div>
		  			);
		  		})}
			</div>
		);
	}
}

export default QuickInfo;
