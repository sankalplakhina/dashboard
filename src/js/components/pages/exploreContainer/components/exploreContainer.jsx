import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboard/components/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboard/components/dashboardContent';

class ExploreContainer extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<Helmet title="Explore - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav {...this.props} />
		  		<DashboardContent {...this.props} />
			</div>
		);
	}
}

ExploreContainer.defaultProps = {
  isExploreView: true // sets context of explore page across child components
};

export default ExploreContainer;
