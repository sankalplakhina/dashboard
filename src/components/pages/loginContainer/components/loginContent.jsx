import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class LoginContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.onSubmitClick = this.onSubmitClick.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
	}

	onSubmitClick(event) {
		event.preventDefault();
		const { email, password } = this.state;
		if (email && password) {
			this.props.onLoginSuccess();
		}
	}

	onChangeEmail(event) {
		this.setState({
			email: event.target.value
		});
	}

	onChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	render() {

		const { email, password } = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.onSubmitClick}>
			        <input type="text" value={email} onChange={this.onChangeEmail} placeholder="E-mail or username" required />
			        <input type="password" value={password} onChange={this.onChangePassword} placeholder="Password" required />
			        <div className="rememberMe">
			            <input type="checkbox" />
			            <label>
			            	<span></span>Remember Me
			            </label>
			        </div>
			        <input type="submit" value="LOGIN" />
			        <div className="text-left">
			        	<a href="#">Forgot your password?</a>
			        </div>
			    </form>
			</div>
		);
	}
}

export default LoginContent;
