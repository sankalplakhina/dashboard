import cookie from 'react-cookie';
import * as ACTIONS from './loginContainerActionTypes';
import { cookieKey as COOKIE_KEY } from 'config/env';

export function initiateLogin(){
	return {
		type: ACTIONS.LOGIN
	};
}

export function setLoginSuccess(data) {
	cookie.save(COOKIE_KEY, JSON.stringify(data)); // saving login info to cookies
	return {
		type: ACTIONS.LOGIN_SUCCESS,
		data
	};
}

export function setLoginFailure(data){
	return {
		type: ACTIONS.LOGIN_FAILURE,
		data
	};
}

export function initiateRegister(){
	return {
		type: ACTIONS.REGISTER
	};
}

export function setRegisterSuccess(data) {
	return {
		type: ACTIONS.REGISTER_SUCCESS,
		data
	};
}

export function setRegisterFailure(data){
	return {
		type: ACTIONS.REGISTER_FAILURE,
		data
	};
}

export function initiateForgotPassword(){
	return {
		type: ACTIONS.FORGOT_PASSWORD
	};
}

export function setForgotPasswordSuccess(data) {
	return {
		type: ACTIONS.FORGOT_PASSWORD_SUCCESS,
		data
	};
}

export function setForgotPasswordFailure(data){
	return {
		type: ACTIONS.FORGOT_PASSWORD_FAILURE,
		data
	};
}

export function initiateResetPassword(){
	return {
		type: ACTIONS.RESET_PASSWORD
	};
}

export function setResetPasswordSuccess(data) {
	return {
		type: ACTIONS.RESET_PASSWORD_SUCCESS,
		data
	};
}

export function setResetPasswordFailure(data){
	return {
		type: ACTIONS.RESET_PASSWORD_FAILURE,
		data
	};
}

export function tryAuthenticationWithCookies(){
	return (dispatch, getState, client) => {
		const data = cookie.load(COOKIE_KEY);
		if (data && data.token) {
	        dispatch(setLoginSuccess(data));
		}
	};
}


export function login({ username, password }, apiLink = '/auth/login'){
	return (dispatch, gπetState, client) => {
	    dispatch(initiateLogin());
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		username,
	    		password,
	    	}
	    })
	    .then(data => {
	        dispatch(setLoginSuccess(data));
	    })
	    .catch(data => dispatch(setLoginFailure(data)));
	};
}

export function register({ username, password, website }, apiLink = '/auth/signup'){
	return (dispatch, getState, client) => {
	    dispatch(initiateRegister());
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		username,
	    		password,
	    		website,
	    	}
	    })
	    .then((data) => {
	        dispatch(setRegisterSuccess(data));
	    })
	    .catch((data) => dispatch(setRegisterFailure(data)));
	};
}

export function forgotPassword({ username }, apiLink = '/auth/forgot'){
	return (dispatch, getState, client) => {
	    dispatch(initiateForgotPassword());
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		username,
	    	}
	    })
	    .then((data) => {
	        dispatch(setForgotPasswordSuccess(data));
	    })
	    .catch((data) => dispatch(setForgotPasswordFailure(data)));
	};
}

export function resetPassword({ password, resetToken }, apiLink = '/auth/resetpassword'){
	return (dispatch, getState, client) => {
	    dispatch(initiateResetPassword());
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		resettoken: resetToken,
	    		password,
	    	}
	    })
	    .then((data) => {
	        dispatch(setResetPasswordSuccess(data));
	    })
	    .catch((data) => dispatch(setResetPasswordFailure(data)));
	};
}

export function logout(){
	cookie.remove(COOKIE_KEY); // remove login info from cookies
	return window.location.replace('/login');
}