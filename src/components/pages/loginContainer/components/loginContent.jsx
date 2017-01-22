import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class LoginContent extends React.Component {
	render() {
		return (
			<div className="content">
			    <form>
			        <input type="text" placeholder="E-mail or username" required />
			        <input type="password" placeholder="Password" required />
			        <div className="rememberMe">
			            <input type="checkbox" />
			            <label>
			            	<span></span>Remember Me
			            </label>
			        </div>
			        <input type="submit" value="LOGIN" />
			        <div className="text-left">
			        	<a href="#">Forgot your password?</a>
			        </div>
			    </form>
			</div>
		);
	}
}

export default LoginContent;
