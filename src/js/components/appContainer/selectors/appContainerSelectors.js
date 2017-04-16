export const getLocationPathName = (state) => state.routing.locationBeforeTransitions.pathname;

export const isAuthViewSelector = (state) => {
	const location = getLocationPathName(state);
  	return location === '/login' ||
           location === '/register' ||
  		   location === '/forgot-password' ||
           location === '/reset-password' ||
  		   location === '/404' ||
  		   location === '/';
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

export const getRouteQueryParams = (state) => {
  return state.routing.locationBeforeTransitions.query;
};

export const getResetTokenParam = (state) => {
  return getRouteQueryParams(state).token;
};