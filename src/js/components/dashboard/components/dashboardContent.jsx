import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';

import { Link } from 'react-router';

import DashboardBreadcrumbs from 'src/js/components/dashboard/containers/dashboardBreadcrumbs';
import DashboardDatePicker from 'src/js/components/dashboard/containers/dashboardDatePicker';
import ExploreContent from 'src/js/components/pages/exploreContainer/containers/exploreContent';
import OrderContent from 'src/js/components/pages/order/containers/orderContent';
import ReviewContent from 'src/js/components/pages/reviewContainer/containers/reviewContent';
import AnalyzeContent from 'src/js/components/pages/analyzeContainer/containers/analyzeContent';

class DashboardContent extends React.Component {
    render() {
        const {
            isExploreView,
            isOrderView,
            isReviewView,
            isAnalyzeView,
            onUpdateView,
        } = this.props;
        return (
        	<div className="scrollaleContent">
                <div className="scrollFix">
                    <div className="fxdContent clearfix">
                        {isExploreView && <DashboardBreadcrumbs isExploreView />}
                        {isOrderView && <DashboardBreadcrumbs isOrderView />}
                        {isReviewView && <DashboardBreadcrumbs isReviewView />}
                        {isAnalyzeView && <DashboardBreadcrumbs isAnalyzeView />}
                        {!isOrderView && <DashboardDatePicker onUpdateView={onUpdateView} />}
                    </div>
                </div>
                {isExploreView && <ExploreContent />}
                {isOrderView && <OrderContent />}
                {isReviewView && <ReviewContent />}
                {isAnalyzeView && <AnalyzeContent />}
            </div>
        );
    }
}

DashboardContent.defaultProps = {
    onUpdateView: _.noop,
}

export default DashboardContent;
