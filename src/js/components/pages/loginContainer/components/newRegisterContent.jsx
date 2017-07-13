import React from 'react';
import Helmet from 'react-helmet';
import { bindHandlers } from 'react-bind-handlers';
import { Link } from 'react-router';

class NewRegisterContent extends React.Component {

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
			<form className="col-sm-6 createAccount" onSubmit={this.handleSubmitClick}>
			    <h3>Create your account</h3>
			    <div className="inputContainer">
			        <input type="email" value={username} onChange={this.handleChangeUserName} placeholder="Email or Username" required />
			        {/*errors['email'] && <div className="error-msg">{errors['email']}</div>*/}
			    </div>
			    <div className="inputContainer">
			        <input
			        	type="text"
			        	value={website}
			        	onChange={this.handleChangeWebsite}
			        	placeholder="Your Website"
			        	pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
			        	required
			        />
			        {(errors['website'] || errors['name']) && <div className="error-msg">{errors['website'] || errors['name']}</div>}
			    </div>
			    <div className="inputContainer">
			        <input type="password" minLength="8" value={password} onChange={this.handleChangePassword} placeholder="Password" required />
			        {errors['password'] && <div className="error-msg">{errors['password']}</div>}
			    </div>
			    <p>By clicking Create an account, you agree to our <a href="#">Terms &amp; Condition</a></p>
			    <div className="inputContainer">
			        <button type="submit">Register</button>
			    </div>
			</form>
		);
	}
}

export default bindHandlers(NewRegisterContent);
