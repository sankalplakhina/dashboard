/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';

import { Link } from 'react-router';

import DashboardBreadcrumbs from '~/src/components/dashboardBreadcrumbs/dashboardBreadcrumbs';
import ExploreContent from '~/src/components/pages/exploreContainer/components/exploreContent';
import ReviewContent from '~/src/components/pages/reviewContainer/components/reviewContent';
import AnalyzeContent from '~/src/components/pages/analyzeContainer/components/analyzeContent';

class DashboardContent extends React.Component {
    render() {
        const { isExploreView, isReviewView, isAnalyzeView } = this.props;
        return (
        	<div className="scrollaleContent">
                <div className="scrollFix">
                    <div className="fxdContent">
                        {isExploreView && <DashboardBreadcrumbs isExploreView />}
                        {isReviewView && <DashboardBreadcrumbs isReviewView />}
                        {isAnalyzeView && <DashboardBreadcrumbs isAnalyzeView />}
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
