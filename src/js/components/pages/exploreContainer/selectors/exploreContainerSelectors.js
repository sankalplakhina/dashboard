import _ from 'lodash';

const DECESION_OPTIONS = [
    { label: 'Approve', value: 'approved'},
    { label: 'Reject', value: 'declined'},
];

export const getStatsPanelAPI = () => '/fapi/orders';
export const getStatsPanelDecisionOptions = () => DECESION_OPTIONS;

export const getExplore = (state) => state.explore;

export const isExploreDataLoaded = (state) => {
	return _.get(getExplore(state), 'loaded');
};

export const getExploreData = (state) => {
	return _.get(getExplore(state), 'data');
};

export const getIsStatsPanelsLoading = (state) => {
	return getExplore(state).isStatsPanelsLoading;
};

export const getExploreStatsPanelsData = (state) => {
	return _.get(getExplore(state), 'statsPanels');
};