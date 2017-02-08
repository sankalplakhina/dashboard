import React from 'react';
import DbPieChart from 'src/components/dashboard/dbPieChart/dbPieChart';

class PieGraphs extends React.Component {

	render() {

		const { data } = this.props;
		const { cols } = data;
		return (
			<div>
		  		{
		  			cols.map((column, idx) => {
		  				return (
		  					<div className="col-md-4" key={idx}>
		  						<DbPieChart {...column} width={300} height={250} />
		  					</div>
		  				)
		  			})
		  		}
			</div>
		);
	}
}

export default PieGraphs;