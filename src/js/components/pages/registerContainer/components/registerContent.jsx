import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class RegisterContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: 'Test',
			email: 'sankalp@gmail.com',
			password: 'hellopassword',
			company: 'ABC',
		};
	}

	handleSubmitClick(event) {
		event.preventDefault();
		const { name, email, password, company } = this.state;
		if (name && email && password && company) {
			this.props.onRegisterSubmit(this.state);
		}
	}

	handleChangeName(event) {
		this.setState({
			name: event.target.value
		});
	}

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value
		});
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleChangeCompanyName(event) {
		this.setState({
			company: event.target.value
		});
	}

	render() {

		const { name, email, password, company } = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="text" value={name} onChange={this.handleChangeName} placeholder="Name" required />
			        <input type="email" value={email} onChange={this.handleChangeEmail} placeholder="E-mail" required />
			        <input type="password" value={password} onChange={this.handleChangePassword} placeholder="Password" required />
			        <input type="text" value={company} onChange={this.handleChangeCompanyName} placeholder="Company Name" required />
			        <div className="rememberMe">
			            <input type="checkbox" />
			            <label>
			            	<span></span>I accept all
			            </label>
			            <a href="#"> Terms &amp; Condition</a>
			        </div>
			        <input type="submit" value="REGISTER" />
			        <div className="text-left">
			        	<a href="#">Forgot your password?</a>
			        </div>
			    </form>
			</div>
		);
	}
}

export default bindHandlers(RegisterContent);
