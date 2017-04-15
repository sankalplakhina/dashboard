import _ from 'lodash';

const getAuth = (state) => {
	return state.auth;
};

export const getAuthData = (state) => {
	return getAuth(state).data;
};

export const getAuthToken = (state) => {
	return _.get(getAuthData(state), ['token']);
};

export const getUserData = (state) => {
	return _.get(getAuthData(state), ['user']);
};

export const getUserSecretKey = (state) => {
	return _.get(getUserData(state), ['secret']);
};

export const isAuthDataLoaded = (state) => {
	return getAuthToken(state) && getUserData(state);
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

export const getIsResetPasswordLoading = (state) => {
	return getAuth(state).isResetPasswordLoading;
};

export const getIsLoginLoading = (state) => {
	return getAuth(state).isLoginLoading;
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