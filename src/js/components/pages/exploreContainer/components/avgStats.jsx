import React from 'react';
import AvgStatsTitleRow from './avgStatsTitleRow';
import AvgStatsTableRow from './avgStatsTableRow';
import DbPieChart from 'src/js/components/dashboard/components/dbPieChart';

class AvgStats extends React.Component {

	render() {

		const { data = {} } = this.props;
		const { cols } = data;
		return (
			<div className="avgStats">
		  		{
		  			cols && cols.map((column, idx) => {

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
							  Content = data[column].rows.map(
											(row, idx) =>
											<DbPieChart {...row} key={idx} width={300} height={230} />
									  	);
							break;
		  				}

		  				return (
		  					<AvgStatsTitleRow
		  						classNames="col-md-4"
		  						key={idx}
		  						title={data[column].title}>
		  						{
		  							data[column].rows && data[column].rows.length &&
		  							<div className="abtDtats">
		  							{Content}
		  							</div>
		  						}
		  					</AvgStatsTitleRow>
		  				);
		  			})
		  		}
			</div>
		);
	}
}

export default AvgStats;
