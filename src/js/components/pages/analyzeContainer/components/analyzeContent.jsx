import React from 'react';
import Info from './info';
import PieGraphs from './pieGraphs';
import BiAxialChart from './biAxialChart';

class AnalyzeContent extends React.Component {

	render() {
		const { data } = this.props;
		const { rows } = data;
		return (
			<div className="content">
		  		{
		  			rows.map((row, idx) => {
		  				return (
		  					<div className="row" key={idx}>
		  						<div className="col-sm-12">
		  							{(row === 'info') && <Info data={data[row]} /> }
		  							{(row === 'biAxialChart') && <BiAxialChart data={data[row]} /> }
		  							{(row === 'pieGraphs') && <PieGraphs data={data[row]} /> }
		  						</div>
		  					</div>
		  				);
		  			})
		  		}
			</div>
		);
	}
}

export default AnalyzeContent;
