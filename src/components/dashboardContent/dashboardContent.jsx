/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';

import { Link } from 'react-router';

import DashboardBreadcrumbs from '~/src/components/dashboardBreadcrumbs/dashboardBreadcrumbs';
import ExploreContent from '~/src/components/pages/exploreContainer/components/exploreContent';

class DashboardContent extends React.Component {
    render() {
        const { isExploreView, isReviewView, isAnalyzeView } = this.props;
        return (
        	<div className="scrollaleContent">
                <div className="scrollFix">
                    <div className="fxdContent">
                        <DashboardBreadcrumbs isExploreView />
                    </div>
                </div>
                {isExploreView && <ExploreContent />}
            </div>
        );
    }
}

export default DashboardContent;
