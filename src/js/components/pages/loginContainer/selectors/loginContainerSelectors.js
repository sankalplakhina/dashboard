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