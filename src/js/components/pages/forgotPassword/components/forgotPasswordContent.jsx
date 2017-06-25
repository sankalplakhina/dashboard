import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class ForgotPasswordContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.getInitState();
	}

	componentWillReceiveProps(nextProps) {
		const {
			isForgotPasswordLoading,
			isResponseSuccess,
			responseMessage,
		} = nextProps;

		const hasForgotPasswordLoaded = !isForgotPasswordLoading && isForgotPasswordLoading !== this.props.isForgotPasswordLoading;
		if (hasForgotPasswordLoaded && responseMessage) {
			alert(responseMessage);
			if (isResponseSuccess) {
				this.initState();
			}
		}
	}

	getInitState(){
		return {
			username: '',
		};
	}

	initState(){
		this.setState(this.getInitState());
	}

	handleSubmitClick(event) {
		event.preventDefault();
		const { username } = this.state;
		if (username) {
			this.props.onSubmit(this.state);
		}
	}

	handleChangeUserName(event) {
		this.setState({
			username: event.target.value
		});
	}

	render() {

		const { username } = this.state;

		return (
			<div className="content">
			    <form onSubmit={this.handleSubmitClick}>
			        <input type="email" value={username} onChange={this.handleChangeUserName} placeholder="Username" required />
			        <input type="submit" value="SEND RESET LINK" />
			    </form>
			</div>
		);
	}
}

export default bindHandlers(ForgotPasswordContent);
