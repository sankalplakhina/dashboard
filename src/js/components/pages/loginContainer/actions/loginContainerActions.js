import cookie from 'react-cookie';
import * as ACTIONS from './loginContainerActionTypes';
import { cookieKey as COOKIE_KEY } from 'config/env';

export function initiateLogin(){
	return {
		type: ACTIONS.LOGIN
	};
}

export function setLoginSuccess(data) {
	cookie.save(COOKIE_KEY, data.data); // saving login info to cookies
	return {
		type: ACTIONS.LOGIN_SUCCESS,
		data
	};
}

export function setLoginFailure(error){
	return {
		type: ACTIONS.LOGIN_FAILURE,
		error
	};
}

export function tryAuthenticationWithCookies(){
	return (dispatch, getState, client) => {
		const data = cookie.load(COOKIE_KEY);
		if (data && data.token) {
	        dispatch(setLoginSuccess(data));
		}
		return Promise.resolve();
	};
}


export function login({ username, password }, router, apiLink = '/api/login'){
	return (dispatch, getState, client) => {
	    initiateLogin();
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		username,
	    		password,
	    	}
	    })
	    .then(data => {
	        dispatch(setLoginSuccess(data.data));
	        router.replace('/analyze');
	    })
	    .catch(error => dispatch(setLoginFailure(error)));
	};
}

export function register({ name, email, password, company }, router, apiLink = '/api/register'){
	return (dispatch, getState, client) => {
	    initiateLogin();
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		name,
	    		email,
	    		password,
	    		company,
	    	}
	    })
	    .then((data) => {
	        dispatch(setLoginSuccess(data.data));
	        router.replace('/analyze');
	    })
	    .catch((error) => dispatch(setLoginFailure(error)));
	};
}

