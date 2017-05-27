/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import twLogo from 'public/static/images/twLogo.png';

class Navbar extends React.Component {
  render() {

  	const { addFakeNavSpace, userInfo, onLogoutClick } = this.props;

    return (
    	<nav className="navbar navbar-default navbar-fixed-top">
    	    <div className="container-fluid nopad">
    	        {/* Brand and toggle get grouped for better mobile display --> */}
    	        <div className="navbar-header">
    	            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    	                <span className="sr-only">Toggle navigation</span>
    	                <span className="icon-bar"></span>
    	                <span className="icon-bar"></span>
    	                <span className="icon-bar"></span>
    	            </button>
    	            <Link className="navbar-brand navPad" to="/">
    	            	<img src={twLogo} />
    	            </Link>
    	        </div>

    	        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
    	        <div className="collapse navbar-collapse nopad" id="bs-example-navbar-collapse-1">
    	            <ul className="nav navbar-nav navbar-right navPad">
                        {
                            userInfo?
                            <li><a onClick={onLogoutClick}>{`Hello! ${userInfo.name}`}</a></li>
                            :
                            [
                                <li key="login"><Link to="/login" className="loginSap">Login</Link></li>,
                                <li key="register"><Link to="/register">Signup</Link></li>
                            ]
                        }
    	            </ul>
    	            <div className="col-lg-12 menu navPad">
    	                <ul className="nav navbar-nav navbar-right">
    	                    <li><a href="//www.thirdwatch.ai/" target="_blank">Our products</a></li>
    	                    <li><a href="//api.thirdwatch.ai/" target="_blank">Docs</a></li>
    	                    <li><a href="//www.thirdwatch.ai/" target="_blank">Pricing</a></li>
    	                    <li><a href="mailto:hello@thirdwatch.ai" target="_blank">Support</a></li>
    	                </ul>
    	            </div>
    	        </div>
    	        {/* <!-- /.navbar-collapse --> */}
    	        {
    	        	addFakeNavSpace &&
    	        	<div className="navFakeSpace">
    	        		<div></div>
    	        	</div>
    	        }
    	    </div>
    	</nav>
    );
  }
}

Navbar.defaultProps = {
  addFakeNavSpace: true
};

export default Navbar;
