import _ from 'lodash';
import * as ACTIONS from '../actions/loginContainerActionTypes';

const initialState = {
	isLoginLoading: false,
	isRegisterLoading: false,
	isForgotPasswordLoading: false,
	isResetPasswordLoading: false,
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
				data: action.data
			}, state);

		case ACTIONS.REGISTER:
			return _.defaults({
				isRegisterLoading: true,
				data: {},
			}, state);

		case ACTIONS.REGISTER_SUCCESS:
			return _.defaults({
				isRegisterLoading: false,
				data: action.data
			}, state);

		case ACTIONS.REGISTER_FAILURE:
			return _.defaults({
				isRegisterLoading: false,
				data: action.data
			}, state);

		case ACTIONS.FORGOT_PASSWORD:
			return _.defaults({
				isForgotPasswordLoading: true,
				data: {},
			}, state);

		case ACTIONS.FORGOT_PASSWORD_SUCCESS:
			return _.defaults({
				isForgotPasswordLoading: false,
				data: action.data
			}, state);

		case ACTIONS.FORGOT_PASSWORD_FAILURE:
			return _.defaults({
				isForgotPasswordLoading: false,
				data: action.data
			}, state);

		case ACTIONS.RESET_PASSWORD:
			return _.defaults({
				isResetPasswordLoading: true,
				data: {},
			}, state);

		case ACTIONS.RESET_PASSWORD_SUCCESS:
			return _.defaults({
				isResetPasswordLoading: false,
				data: action.data
			}, state);

		case ACTIONS.RESET_PASSWORD_FAILURE:
			return _.defaults({
				isResetPasswordLoading: false,
				data: action.data
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
