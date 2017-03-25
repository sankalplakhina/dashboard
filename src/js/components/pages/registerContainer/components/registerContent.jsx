import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
import { bindHandlers } from 'react-bind-handlers';
import { Link } from 'react-router';

class RegisterContent extends React.Component {

	constructor(props) {
		super(props);
		// this.state = this.getInitState();
		this.state = {
			username: 'test@gmail.com',
			password: 'hellopassword',
			website: 'ABC',
		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			isRegisterationLoading,
			isResponseSuccess,
			responseMessage,
			responseErrors,
		} = nextProps;

		const hasRegistrationLoaded = !isRegisterationLoading && isRegisterationLoading !== this.props.isRegisterationLoading;
		if (hasRegistrationLoaded && responseMessage) {
			alert(responseMessage);
			if (isResponseSuccess) {
				this.initState();
			} else {
				this.updateFormWithErrors(responseErrors)
			}
		}
	}

	updateFormWithErrors(responseErrors){
		const nextState = {};
		_.forEach(responseErrors, (errorMessage, errorField) => {
			nextState[`${errorField}ErrorMsg`] = errorMessage;
		});
		this.setState(nextState);
	}

	getInitState(){
		return {
			username: '',
			usernameErrorMsg: '',
			password: '',
			website: '',
		};
	}

	initState(){
		this.setState(this.getInitState());
	}

	handleSubmitClick(event) {
		event.preventDefault();
		const { username, password, website } = this.state;
		if (username && password && website) {
			this.props.onRegisterSubmit(this.state);
		}
	}

	handleChangeUserName(event) {
		const nextState = {
			username: event.target.value
		};
		if (this.state.usernameErrorMsg) {
			nextState.usernameErrorMsg = '';
		}
		this.setState(nextState);
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleChangeWebsite(event) {
		this.setState({
			website: event.target.value
		});
	}

	render() {

		const {
			username,
			usernameErrorMsg,
			password,
			website
		} = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="email" value={username} onChange={this.handleChangeUserName} placeholder="Username" required />
			        {usernameErrorMsg && <div className="error-msg">{usernameErrorMsg}</div>}
			        <input type="password" value={password} onChange={this.handleChangePassword} placeholder="Password" required />
			        <input type="text" value={website} onChange={this.handleChangeWebsite} placeholder="Website" required />
			        <div className="rememberMe">
			            <input type="checkbox" />
			            <label>
			            	<span></span>I accept all
			            </label>
			            <a href="#"> Terms &amp; Condition</a>
			        </div>
			        <input type="submit" value="REGISTER" />
			        <div className="text-left">
			        	<Link href="/forgot-password">Forgot your password?</Link>
			        </div>
			    </form>
			</div>
		);
	}
}

export default bindHandlers(RegisterContent);
