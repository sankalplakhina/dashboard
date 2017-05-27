import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Footer extends React.Component {

    render() {
        const { hideFooter } = this.props;
        if (!hideFooter) {
            return (
            	<div className="footer">
            	    <div className="pull-left">
            	        <a href="//www.thirdwatch.ai/" target="_blank">Our products</a>
            	        <a href="//www.thirdwatch.ai/" target="_blank">Resources</a>
            	        <a href="//api.thirdwatch.ai/" target="_blank">Docs</a>
            	        <a href="//www.thirdwatch.ai/" target="_blank">Pricing</a>
            	        <a href="mailto:hello@thirdwatch.ai" target="_blank">Support</a>
            	    </div>
            	    <div className="pull-right">&copy; ThirdWatch Pvt. Ltd. 2017 All Rights Reserved</div>
            	</div>
            );
        }
        return null;
    }
}

export default Footer;
