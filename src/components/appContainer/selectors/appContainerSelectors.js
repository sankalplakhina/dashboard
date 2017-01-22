export const isLoginViewSelector = (state) => {
  return state.routing.locationBeforeTransitions.pathname === "/login";
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