import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import LoginContent from './loginContent';

class LoginContainer extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Helmet title="Login - Thirdwatch - Mobile Data Management Platform" />
			    <div className="loginBox">
			        <h1>Login</h1>
			        <p><em>Login with your username or email</em></p>
			        <LoginContent {...this.props} />
			        <h1>Don’t have an account? <Link to="/register">Create one</Link></h1>
			    </div>
			</div>
		);
	}
}

export default LoginContainer;
