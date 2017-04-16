import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboard/components/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboard/components/dashboardContent';

class ReviewContainer extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<Helmet title="Review - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav {...this.props} />
		  		<DashboardContent {...this.props} />
			</div>
		);
	}
}

ReviewContainer.defaultProps = {
  isReviewView: true // sets context of review page across child components
};

export default ReviewContainer;
