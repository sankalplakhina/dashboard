import React from 'react';
import Helmet from 'react-helmet';
import { bindHandlers } from 'react-bind-handlers';
import { Link } from 'react-router';

class RegisterContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.getInitState();
	}

	componentWillReceiveProps(nextProps) {
		const {
			isRegisterationLoading,
			isResponseSuccess,
			responseMessage,
			responseErrors,
			router,
		} = nextProps;

		const hasRegistrationLoaded = !isRegisterationLoading && isRegisterationLoading !== this.props.isRegisterationLoading;
		if (hasRegistrationLoaded && responseMessage) {
			alert(responseMessage);
			if (isResponseSuccess) {
				this.initState();
				router.replace('/login');
			} else {
				this.updateFormWithErrors(responseErrors)
			}
		}
	}

	updateFormWithErrors(errors) {
		this.setState({
			errors
		})
	}

	getInitState(){
		return {
			username: '',
			password: '',
			website: '',
			acceptTerms: false,
			errors: {},
		};
	}

	initState(){
		this.setState(this.getInitState());
	}

	handleSubmitClick(event) {
		event.preventDefault();
		this.props.onRegisterSubmit(this.state);
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

	handleTermsCheck(event) {
		this.setState({
			acceptTerms: event.target.checked
		});
	}

	render() {

		const {
			username,
			password,
			website,
			acceptTerms,
			errors,
		} = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="email" value={username} onChange={this.handleChangeUserName} placeholder="Username" required />
			        {errors['email'] && <div className="error-msg">{errors['email']}</div>}
			        <input type="password" minLength="8" value={password} onChange={this.handleChangePassword} placeholder="Password" required />
			        {errors['password'] && <div className="error-msg">{errors['password']}</div>}
			        <input type="email" value={website} onChange={this.handleChangeWebsite} placeholder="Website" required />
			        {(errors['website'] || errors['name']) && <div className="error-msg">{errors['website'] || errors['name']}</div>}
			        <div className="rememberMe checkbox">
			            <label>
			            	<input type="checkbox" checked={acceptTerms} onChange={this.handleTermsCheck} required />
			            </label>
			            I accept all <a href="#"> Terms &amp; Condition</a>
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
