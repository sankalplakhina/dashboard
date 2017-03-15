/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';

import { Link } from 'react-router';

import DashboardBreadcrumbs from 'src/js/components/dashboard/components/dashboardBreadcrumbs';
import DashboardDatePicker from 'src/js/components/dashboard/containers/dashboardDatePicker';
import ExploreContent from 'src/js/components/pages/exploreContainer/containers/exploreContent';
import ReviewContent from 'src/js/components/pages/reviewContainer/containers/reviewContent';
import AnalyzeContent from 'src/js/components/pages/analyzeContainer/containers/analyzeContent';

class DashboardContent extends React.Component {
    render() {
        const { isExploreView, isReviewView, isAnalyzeView } = this.props;
        return (
        	<div className="scrollaleContent">
                <div className="scrollFix">
                    <div className="fxdContent clearfix">
                        {isExploreView && <DashboardBreadcrumbs isExploreView />}
                        {isReviewView && <DashboardBreadcrumbs isReviewView />}
                        {isAnalyzeView && <DashboardBreadcrumbs isAnalyzeView />}
                        <DashboardDatePicker />
                    </div>
                </div>
                {isExploreView && <ExploreContent />}
                {isReviewView && <ReviewContent />}
                {isAnalyzeView && <AnalyzeContent />}
            </div>
        );
    }
}

export default DashboardContent;