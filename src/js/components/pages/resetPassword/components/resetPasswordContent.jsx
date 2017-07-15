import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class ResetPasswordContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.getInitState();
	}

	componentWillReceiveProps(nextProps) {
		const {
			isResetPasswordLoading,
			isResponseSuccess,
			responseMessage,
			router,
			onSubmitMessage,
		} = nextProps;

		const hasResetPasswordLoaded = !isResetPasswordLoading && isResetPasswordLoading !== this.props.isResetPasswordLoading;
		if (hasResetPasswordLoaded && responseMessage) {
			if (isResponseSuccess) {
				this.initState();
				alert(responseMessage);
				router.replace('/login');
			} else {
				onSubmitMessage(responseMessage);
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
		const { resetToken, onSubmit, onSubmitMessage  } = this.props;
		if (resetToken && password && confirmPassword) {
			if (password === confirmPassword) {
				const { resetToken } = this.props;
				onSubmit(this.state, resetToken);
			} else {
				onSubmitMessage(`Password's don't match!`);
			}
		} else {
			onSubmitMessage('Reset token missing');
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
