/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class DashboardBreadcrumbs extends React.Component {
    render() {
        const {
            isExploreView,
            isOrderView,
            params: { orderId },
            isReviewView,
            isAnalyzeView,
        } = this.props;
        return (
            <div className="breadcrumbs pull-left">
                <Link to="/">Home</Link> &nbsp; / &nbsp;
                {isExploreView && <Link to="/explore">Explore</Link>}
                {isOrderView && [
                    <Link key="1">Order</Link>,
                    <span key="2">&nbsp; / &nbsp;</span>,
                    <Link to={`/order/${orderId}`} key="3">{orderId}</Link>
                ]}
                {isReviewView && <Link to="/review">Review</Link>}
                {isAnalyzeView && <Link to="/analyze">Analyze</Link>}
            </div>
        );
    }
}

export default DashboardBreadcrumbs;
