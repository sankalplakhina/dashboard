import React from 'react';
import cx from 'classnames';

class Info extends React.Component {

	render() {

		const { data: {heading, paras} } = this.props;
		return (
			<div>
		  		{
		  			heading &&
		  			<h4>{heading}</h4>
		  		}
		  		{
		  			paras && paras.length &&
		  			paras.map((para, idx) => <p key={idx}>{para}</p>)
		  		}
			</div>
		);
	}
}

export default Info;
