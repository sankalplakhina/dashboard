import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DashboardSidenav from 'src/js/components/dashboard/components/dashboardSidenav';
import DashboardContent from 'src/js/components/dashboard/components/dashboardContent';

class OrderContainer extends React.Component {
	render() {
		const { isOrderView } = this.props;
		return (
			<div className="wrapper">
				<Helmet title="Order - Thirdwatch - Mobile Data Management Platform" />
		  		<DashboardSidenav isOrderView />
		  		<DashboardContent isOrderView />
			</div>
		);
	}
}

OrderContainer.defaultProps = {
  isOrderView: true
};

export default OrderContainer;
