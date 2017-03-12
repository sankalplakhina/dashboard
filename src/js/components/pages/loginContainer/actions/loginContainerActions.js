import * as ACTIONS from './loginContainerActionTypes';
const TOKEN_KEY = "neo_token";

export function tryAuthentication(){
	return (dispatch, getState, client) => {
		return Promise.resolve();
	};
}

export function checkToken(token, apiLink = '/api/verify-token'){
	return (dispatch, getState, client) => {
	    dispatch({
	      type: ACTIONS.LOGIN
	    });
	    return client.get(apiLink, { headers: { Authorization: token } })
	    .then(data => {
	        dispatch({
	            type: ACTIONS.LOGIN_SUCCESS,
	            data: {
	            	data: {
	            		token
	            	}
	            }
	        });
	    })
	    .catch(error => {
	        dispatch({
	            type: ACTIONS.LOGIN_FAILURE,
	            error
	        });
	    });
	};
}


export function login({ username, password }, router, apiLink = '/api/login'){
	return (dispatch, getState, client) => {
	    dispatch({
	      type: ACTIONS.LOGIN
	    });
	    // post data should be a json object with data property
	    // as per configured in client
	    return client.post(apiLink, {
	    	data: {
	    		username,
	    		password,
	    	}
	    })
	    .then(data => {
	        dispatch({
	            type: ACTIONS.LOGIN_SUCCESS,
	            data: data.data
	        });
	        router.replace('/explore');
	    })
	    .catch(error => {
	        dispatch({
	            type: ACTIONS.LOGIN_FAILURE,
	            error
	        });
	    });
	};
}

export function register({ name, email, password, company }, router, apiLink = '/api/register'){
	return (dispatch, getState, client) => {
	    dispatch({
	      type: ACTIONS.LOGIN
	    });
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
	    .then(data => {
	        dispatch({
	            type: ACTIONS.LOGIN_SUCCESS,
	            data: data.data
	        });
	        router.replace('/explore');
	    })
	    .catch(error => {
	        dispatch({
	            type: ACTIONS.LOGIN_FAILURE,
	            error
	        });
	    });
	};
}