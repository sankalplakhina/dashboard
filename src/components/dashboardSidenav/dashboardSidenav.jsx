/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

class DashboardSidenav extends React.Component {

    render() {
        const { isExploreView, isReviewView, isAnalyzeView } = this.props;
        return (
        	<div className="sideBar">
        	    <ul className="list-unstyled">
        	        <li className={cx({"active": isExploreView})}>
        	            <Link to="/explore">
        	                <figure className="explore"></figure>
        	                Explore
                        </Link>
        	        </li>
        	        <li className={cx({"active": isReviewView})}>
        	            <Link to="/review">
        	                <figure className="review"></figure>
                            Review
                        </Link>
        	        </li>
        	        <li className={cx({"active": isAnalyzeView})}>
        	            <Link to="/analyze">
        	                <figure className="analyze"></figure>
                            Analyze
                        </Link>
        	        </li>
        	    </ul>
        	</div>
        );
    }
}

export default DashboardSidenav;
