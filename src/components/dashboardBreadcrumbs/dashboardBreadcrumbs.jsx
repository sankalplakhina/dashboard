/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class DashboardBreadcrumbs extends React.Component {
    render() {
        const { isExploreView, isReviewView, isAnalyzeView } = this.props;
        return (
            <div className="breadcrumbs">
                <Link to="/">Home</Link> &nbsp; / &nbsp;
                {isExploreView && <Link to="/explore">Explore</Link>}
                {isReviewView && <Link to="/review">Review</Link>}
                {isAnalyzeView && <Link to="/analyze">Analyze</Link>}
            </div>
        );
    }
}

export default DashboardBreadcrumbs;
