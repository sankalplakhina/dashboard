import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import ForgotPasswordContent from './forgotPasswordContent';

class ForgotPasswordContainer extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Helmet title="Forgot Password - Thirdwatch - Mobile Data Management Platform" />
			    <div className="loginBox">
			        <h1>Forgot Password</h1>
			        <p><em>Input your registered email id</em></p>
			        <ForgotPasswordContent {...this.props} />
			    </div>
			</div>
		);
	}
}

export default ForgotPasswordContainer;
