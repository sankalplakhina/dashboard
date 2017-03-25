import _ from 'lodash';

const getAuth = (state) => {
	return state.auth;
};

export const getAuthData = (state) => {
	return getAuth(state).data || {};
};

export const isAuthDataLoaded = (state) => {
	const data = getAuthData(state);
	return (data.token && data.user);
};

export const getUserData = (state) => {
	return getAuthData(state).user;
};

export const getIsRegisterationLoading = (state) => {
	return getAuth(state).isRegisterLoading;
};

export const getIsRegisterationLoadedWithSuccess = (state) => {
	return getIsRegisterationLoaded(state) && getIsRegisterationSuccess(state);
};

export const getIsForgotPasswordLoading = (state) => {
	return getAuth(state).isForgotPasswordLoading;
};

export const getIsResponseSuccess = (state) => {
	return Boolean(getAuthData(state).success);
};

export const getResponseMessage = (state) => {
	return getAuthData(state).message;
};

export const getResponseErrors = (state) => {
	return getAuthData(state).errors;
};