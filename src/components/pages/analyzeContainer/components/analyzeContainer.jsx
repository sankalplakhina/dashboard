import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from '~/src/components/dashboardSidenav/dashboardSidenav';
import DashboardContent from '~/src/components/dashboardContent/dashboardContent';

class AnalyzeContainer extends React.Component {
	render() {
		const { isAnalyzeView } = this.props;
		return (
			<div className="wrapper">
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
