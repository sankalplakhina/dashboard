import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class LoginContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.getInitState();
	}

	componentWillReceiveProps(nextProps) {
		const {
			isLoginLoading,
			isResponseSuccess,
			responseMessage,
			responseErrors,
			router,
		} = nextProps;

		const hasLoginLoaded = !isLoginLoading && isLoginLoading !== this.props.isLoginLoading;
		if (hasLoginLoaded && responseMessage) {
			alert(responseMessage);
			if (isResponseSuccess) {
				this.initState();
	        	router.replace('/');
			} else {
				this.updateFormWithErrors(responseErrors)
			}
		}
	}

	updateFormWithErrors(errors = {}) {
		this.setState({
			errors
		})
	}

	getInitState(){
		return {
			username: '',
			password: '',
			errors: {},
		};
	}

	initState(){
		this.setState(this.getInitState());
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

		const { username, password, errors } = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="text" value={username} onChange={this.handleChangeUsername} placeholder="E-mail or username" required />
			        {errors['username'] && <div className="error-msg">{errors['username']}</div>}
			        <input type="password" minLength="8" value={password} onChange={this.handleChangePassword} placeholder="Password" required />
			        {errors['password'] && <div className="error-msg">{errors['password']}</div>}
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
