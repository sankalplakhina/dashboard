import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboard/components/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboard/components/dashboardContent';

class AnalyzeContainer extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<Helmet title="Analyze - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav {...this.props} />
		  		<DashboardContent {...this.props} />
			</div>
		);
	}
}

AnalyzeContainer.defaultProps = {
  isAnalyzeView: true // sets context of analyze page across child components
};

export default AnalyzeContainer;
