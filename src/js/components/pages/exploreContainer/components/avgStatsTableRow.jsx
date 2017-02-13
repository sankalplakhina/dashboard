import React from 'react';
import cx from 'classnames';

class AvgStatsTableRow extends React.Component {

	render() {
		const { data: {text, count, icon, risky, safe} } = this.props;
		return (
			<tr>
		  		<td className={cx({'colorRed': risky, 'colorBlue': safe})}>{text}</td>
		  		<td>
		  			{icon && <img src={`/public/static/images/${icon}`} />}
		  			{count}
		  		</td>
			</tr>
		);
	}
}

export default AvgStatsTableRow;
