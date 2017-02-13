import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboardSidenav/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboardContent/dashboardContent';

class AnalyzeContainer extends React.Component {
	render() {
		const { isAnalyzeView } = this.props;
		return (
			<div className="wrapper">
				<Helmet title="Analyze - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav isAnalyzeView />
		  		<DashboardContent isAnalyzeView />
			</div>
		);
	}
}

AnalyzeContainer.defaultProps = {
  isAnalyzeView: true
};

export default AnalyzeContainer;
