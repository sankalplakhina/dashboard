export const isLoginOrRegisterViewSelector = (state) => {
	const location = state.routing.locationBeforeTransitions.pathname;
  	return location === '/login' || location === '/register' || location === '/';
};

export const isExploreViewSelector = (state) => {
  return state.routing.locationBeforeTransitions.pathname === "/explore";
};

export const isReviewViewSelector = (state) => {
  return state.routing.locationBeforeTransitions.pathname === "/review";
};

export const isAnalyzeViewSelector = (state) => {
  return state.routing.locationBeforeTransitions.pathname === "/analyze";
};