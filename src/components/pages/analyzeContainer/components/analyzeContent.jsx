import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class AnalyzeContent extends React.Component {
	render() {
		return (
			<div className="content">
		  		<div className="row">
		  			<div className="col-lg-12">
		  				<h4>Score Threshold Tool</h4>
		  				<p>Below is a graph of the number of Create Orders from
		  				users labeled "bad" in red and total Create Orders in blue.
		  				Click and drag the score bubble to explore your data.</p>
		  			</div>
		  		</div>
			</div>
		);
	}
}

export default AnalyzeContent;
