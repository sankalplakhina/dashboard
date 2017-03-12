import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import RegisterContent from './registerContent';

class RegisterContainer extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Helmet title="Register - Thirdwatch - Mobile Data Management Platform" />
			    <div className="loginBox">
			        <h1>New User Registration</h1>
			        <p><em>Register with your email id</em></p>
			        <RegisterContent {...this.props} />
			        <h1>Already have an account?? <Link to="/login">Login Now</Link></h1>
			    </div>
			</div>
		);
	}
}

export default RegisterContainer;
