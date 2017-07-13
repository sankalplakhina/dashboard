import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import mitraIcon from 'public/static/images/mitraIcon.png';
import mitraInfograph from 'public/static/images/mitraInfograph.png';
import NewRegisterContent from '../containers/NewRegisterContent';

class NewLoginContainer extends React.Component {
	render() {
		const { isLoginView, isRegisterView } = this.props;
		return (
			<div className="container-fluid mirta">
				{isLoginView && <Helmet title="Login - Thirdwatch - Mobile Data Management Platform" />}
				{isRegisterView && <Helmet title="Register - Thirdwatch - Mobile Data Management Platform" />}
			    <div className="row">
			        <NewRegisterContent />
			        <div className="col-sm-6 aboutMitra">
			            <h1><img src={mitraIcon} /> MITRA</h1>
			            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium, urna et faucibus gravida, diam elit lacinia arcu, a eleifend erat arcu vel lectus. Integer id euismod mauris.</p>
			            <div className="infograph">
			                <img src={mitraInfograph} />
			            </div>
			        </div>
			    </div>
			</div>
		);
	}
}

export default NewLoginContainer;
