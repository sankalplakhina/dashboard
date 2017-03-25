import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import ResetPasswordContent from './resetPasswordContent';

class ResetPasswordContainer extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Helmet title="Reset Password - Thirdwatch - Mobile Data Management Platform" />
			    <div className="loginBox">
			        <h1>Reset Password</h1>
			        <p><em>Set your new password</em></p>
			        <ResetPasswordContent {...this.props} />
			        <h1>Login instead? <Link to="/login">Login Now</Link></h1>
			    </div>
			</div>
		);
	}
}

export default ResetPasswordContainer;
