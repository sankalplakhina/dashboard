export const getExplore = (state) => {
  return state.explore;
};

export const isExploreDataLoaded = (state) => {
  return getExplore(state).loaded;
};

export const getExploreData = (state) => {
  return getExplore(state).data;
};

export const getIsStatsPanelsLoading = (state) => {
  return getExplore(state).isStatsPanelsLoading;
};

export const getExploreStatsPanelsData = (state) => {
  return getExplore(state).statsPanels;
};