import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import QuickInfo from './quickInfo';
import AvgStats from './avgStats';
import StatsPanels  from '../containers/statsPanels';

class ExploreContent extends React.Component {
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
		  							{(row === 'quickInfo') && <QuickInfo data={data[row]} /> }
		  							{(row === 'avgStats') && <AvgStats data={data[row]} /> }
		  							{(row === 'statsPanels') && <StatsPanels data={data[row]} /> }
		  						</div>
		  					</div>
		  				);
		  			})
		  		}
			</div>
		);
	}
}

export default ExploreContent;
