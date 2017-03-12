const getAuth = (state) => {
  return state.auth;
};

export const isAuthDataLoaded = (state) => {
  return getAuth(state).loaded;
};

export const getAuthData = (state) => {
  return getAuth(state).data || {};
};

export const getAuthToken = (state) => {
	const token = getAuthData(state).token;
	return token? `JWT ${getAuthData(state).token}` : null;
};

export const getUserData = (state) => {
	return getAuthData(state).user;
};