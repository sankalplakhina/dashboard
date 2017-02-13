export const isLoginViewSelector = (state) => {
	const location = state.routing.locationBeforeTransitions.pathname;
  	return location === '/login' || location === '/';
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