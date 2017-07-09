import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import twLogo from 'public/static/images/twLogo.png';
import loadingGif from 'public/static/images/loading.gif';

class ActivateContainer extends React.Component {
	constructor() {
		super();
		this.decrementCounter = this.decrementCounter.bind(this);
		this.intervalMultiplier = 1000;
		this.state = {
			counter: 5
		};
	}

	componentDidMount() {

		// if email activation is success, redirect to login page
		if (this.props.success) {
			this.timer = this.decrementCounter();
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	decrementCounter() {
		return setTimeout(() => {
			if (this.state.counter === 1) {
				this.props.router.replace('/login');
			} else {
				this.setState({
					counter: (this.state.counter - 1)
				});
				this.timer = this.decrementCounter();
			}
		}, this.intervalMultiplier);
	}

	render() {
		const { success, message } = this.props;
		const { counter } = this.state;
		return (
			<div className="redirect">
			    {message && <h3>{message}</h3>}
			    {success && <figure><img src={loadingGif} /></figure>}
			    {success &&
			    	[
			    		<h3 key="1">You will be redirected to login page in {`${counter} sec${(counter !== 1)? 's': ''}`}</h3>,
			    		<p key="2">Please do not CLOSE TAB or REFRESH the page.</p>
			    	]
			    }
			    {!success &&
			    		<p key="1">Please contact <a href="mailto:hello@thirdwatch.ai" target="_blank">support</a> to rectify your problem.</p>
			    }
			    <figure><img src={twLogo} /></figure>
			</div>
		)
	}
}

export default ActivateContainer;
