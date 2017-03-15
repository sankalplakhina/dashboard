const getAuth = (state) => {
  return state.auth;
};

export const isAuthDataLoaded = (state) => {
  return getAuth(state).loaded;
};

export const getAuthData = (state) => {
  return getAuth(state).data || {};
};

export const getUserData = (state) => {
	return getAuthData(state).user;
};