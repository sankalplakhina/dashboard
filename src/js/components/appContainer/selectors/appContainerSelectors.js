export const getLocation = (state) => state.routing.locationBeforeTransitions;
export const getLocationPathName = (state) => getLocation(state).pathname;
export const getRouteQueryParams = (state) => getLocation(state).query;
export const getRouteSearch = (state) => getLocation(state).search;
export const getRouteHash = (state) => getLocation(state).hash;
export const getActiveRoute = (state) => getLocationPathName(state) + getRouteSearch(state) + getRouteHash(state);

export const isAuthViewSelector = (state) => {
	const pathname = getLocationPathName(state);
  	return pathname === '/login' ||
           pathname === '/register' ||
  		   pathname === '/forgot-password' ||
           pathname === '/reset-password';
};

export const getIsRegisterView = (state) => {
  return getLocationPathName(state) === "/register";
};

export const getIsLoginView = (state) => {
  return getLocationPathName(state) === "/login";
};

export const getIsExploreView = (state) => {
  return getLocationPathName(state) === "/explore";
};

export const getIsReviewView = (state) => {
  return getLocationPathName(state) === "/review";
};

export const getIsAnalyzeView = (state) => {
  return getLocationPathName(state) === "/analyze";
};

export const getIsActivateView = (state) => {
  return getLocationPathName(state) === "/activate";
};


export const getResetTokenParam = (state) => {
  return getRouteQueryParams(state).token;
};