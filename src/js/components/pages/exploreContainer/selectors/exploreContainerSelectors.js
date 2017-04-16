import _ from 'lodash';

const DECESION_OPTIONS = [
    { label: 'Approve', value: 'approved'},
    { label: 'Reject', value: 'declined'},
];

export const getStatsPanelAPI = () => '/fapi/orders';
export const getExploreOrdersDecisionOptions = () => DECESION_OPTIONS;

export const getExplore = (state) => state.explore;
export const getExploreOverview = (state) => getExplore(state).overview;
export const getExploreOrders = (state) => getExplore(state).orders;

export const getIsExploreOverviewLoaded = (state) => {
	return _.get(getExploreOverview(state), 'loaded');
};

export const getIsExploreOrdersLoaded = (state) => {
	return _.get(getExploreOrders(state), 'loaded');
};

export const getIsExploreDataLoaded = (state) => {
	return getIsExploreOverviewLoaded(state) && getIsExploreOrdersLoaded(state);
};

export const getExploreOverviewData = (state) => {
	return _.get(getExploreOverview(state), 'data');
};

export const getIsExploreOrdersLoading = (state) => {
	return _.get(getExploreOrders(state), 'loading');
};

export const getExploreOrdersData = (state) => {
	return _.get(getExploreOrders(state), 'data');
};

export const getExploreOrder = (state, orderId) => {
	return _.get(getExploreOrdersData(state), orderId);
};

export const getExploreOrderDecision = (state, orderId) => {
	return _.get(getExploreOrder(state, orderId), 'decision');
};

export const getExploreOrderIsDecisionLoading = (state, orderId) => {
	return _.get(getExploreOrderDecision(state, orderId), 'loading');
};

export const getExploreOrderDecisionMsg = (state, orderId) => {
	return _.get(getExploreOrderDecision(state, orderId), 'msg');
};