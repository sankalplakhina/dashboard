import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboardSidenav/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboardContent/dashboardContent';

class ExploreContainer extends React.Component {
	render() {
		const { isExploreView } = this.props;
		return (
			<div className="wrapper">
				<Helmet title="Explore - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav isExploreView />
		  		<DashboardContent isExploreView />
			</div>
		);
	}
}

ExploreContainer.defaultProps = {
  isExploreView: true
};

export default ExploreContainer;
