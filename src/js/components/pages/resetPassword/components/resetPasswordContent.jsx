import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class ResetPasswordContent extends React.Component {

	constructor(props) {
		super(props);
		// this.state = this.getInitState();
		this.state = {
			password: 'hellopassword',
			confirmPassword: 'hellopassword',
		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			isResetPasswordLoading,
			isResponseSuccess,
			responseMessage,
			router,
		} = nextProps;

		const hasResetPasswordLoaded = !isResetPasswordLoading && isResetPasswordLoading !== this.props.isResetPasswordLoading;
		if (hasResetPasswordLoaded && responseMessage) {
			alert(responseMessage);
			if (isResponseSuccess) {
				this.initState();
				router.replace('/login');
			}
		}
	}

	getInitState(){
		return {
			password: '',
			confirmPassword: '',
		};
	}

	initState(){
		this.setState(this.getInitState());
	}

	handleSubmitClick(event) {
		event.preventDefault();
		const { password, confirmPassword } = this.state;
		const { resetToken } = this.props;
		if (resetToken && password && confirmPassword) {
			if (password === confirmPassword) {
				const { resetToken } = this.props;
				this.props.onSubmit(this.state, resetToken);
			} else {
				alert(`Password's don't match!`);
			}
		} else {
			alert('Reset token missing');
		}

	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleChangeConfirmPassword(event) {
		this.setState({
			confirmPassword: event.target.value
		});
	}

	render() {

		const { password, confirmPassword } = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="password" value={password} onChange={this.handleChangePassword} placeholder="New password" required />
			        <input type="password" value={confirmPassword} onChange={this.handleChangeConfirmPassword} placeholder="Confirm new password" required />
			        <input type="submit" value="SAVE PASSWORD" />
			    </form>
			</div>
		);
	}
}

export default bindHandlers(ResetPasswordContent);
