import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboard/components/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboard/components/dashboardContent';

class ReviewContainer extends React.Component {
	render() {
		const { isReviewView } = this.props;
		return (
			<div className="wrapper">
				<Helmet title="Review - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav isReviewView />
		  		<DashboardContent isReviewView />
			</div>
		);
	}
}

ReviewContainer.defaultProps = {
  isReviewView: true
};

export default ReviewContainer;
