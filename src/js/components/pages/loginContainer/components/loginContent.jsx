import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class LoginContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: 'sankalp@gmail.com',
			password: 'passwordtext'
		};
	}

	handleSubmitClick(event) {
		event.preventDefault();
		const { username, password } = this.state;
		if (username && password) {
			this.props.onLoginSubmit(username, password);
		}
	}

	handleChangeUsername(event) {
		this.setState({
			username: event.target.value
		});
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	render() {

		const { username, password } = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="text" value={username} onChange={this.handleChangeUsername} placeholder="E-mail or username" required />
			        <input type="password" value={password} onChange={this.handleChangePassword} placeholder="Password" required />
			        <div className="rememberMe">
			            <input type="checkbox" />
			            <label>
			            	<span></span>Remember Me
			            </label>
			        </div>
			        <input type="submit" value="LOGIN" />
			        <div className="text-left">
			        	<Link to="/forgot-password">Forgot your password?</Link>
			        </div>
			    </form>
			</div>
		);
	}
}

export default bindHandlers(LoginContent);
