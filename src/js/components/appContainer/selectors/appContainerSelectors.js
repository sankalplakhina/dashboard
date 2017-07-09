export const getLocation = (state) => state.routing.locationBeforeTransitions;
export const getLocationPathName = (state) => getLocation(state).pathname;
export const getRouteQueryParams = (state) => getLocation(state).query;

export const isAuthViewSelector = (state) => {
	const pathname = getLocationPathName(state);
  	return pathname === '/login' ||
           pathname === '/register' ||
  		   pathname === '/forgot-password' ||
           pathname === '/reset-password';
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