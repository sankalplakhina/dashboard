import _ from 'lodash';
import * as ACTIONS from '../actions/loginContainerActionTypes';

const initialState = {
	isLoginLoading: false,
	isLogoutLoading: false,
};

export default function auth(state = initialState, action = {}){

	switch (action.type) {
		case ACTIONS.LOGIN:
			return _.defaults({
				isLoginLoading: true,
				data: {},
			}, state);

		case ACTIONS.LOGIN_SUCCESS:
			return _.defaults({
				isLoginLoading: false,
				data: action.data
			}, state);

		case ACTIONS.LOGIN_FAILURE:
			return _.defaults({
				isLoginLoading: false,
				data: action.error
			}, state);

		case ACTIONS.LOGOUT:
			return _.defaults({
				isLogoutLoading: true,
				data: {},
			}, state);

		case ACTIONS.LOGOUT_SUCCESS:
			return _.defaults({
				isLogoutLoading: false,
				data: action.data
			}, state);

		case ACTIONS.LOGOUT_FAILURE:
			return _.defaults({
				isLogoutLoading: false,
				data: action.error
			}, state);

		default:
			return state;
	}
}
