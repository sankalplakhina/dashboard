import React from 'react';
import AvgStatsTitleRow from './avgStatsTitleRow';
import AvgStatsTableRow from './avgStatsTableRow';

class AvgStats extends React.Component {

	render() {

		const { data } = this.props;
		const { cols } = data;
		return (
			<div className="avgStats">
		  		{
		  			cols.map((column, idx) => {

		  				let Content = null;
		  				switch(data[column].type) {

		  					case 'table':
	  					    Content = <table className="avgTable" width="100%">
											<tbody>
											{
												data[column].rows.map(
													(trows, index) =>
													<AvgStatsTableRow data={trows} key={index} />
													)
											}
											</tbody>
										</table>
							break;

							case 'chart':
							Content = <div>Chart here</div>
							break;
		  				}

		  				return (
		  					<AvgStatsTitleRow
		  						classNames="col-md-4"
		  						key={idx}
		  						title={data[column].title}>
		  						<div className="abtDtats">{Content}</div>
		  					</AvgStatsTitleRow>
		  				);
		  			})
		  		}
			</div>
		);
	}
}

export default AvgStats;
