import _ from 'lodash';

const DECESION_OPTIONS = [
    { label: 'Approve', value: 'approved'},
    { label: 'Reject', value: 'declined'},
];

export const getOrdersApiPath = () => '/fapi/orders';
export const getOrdersApiRowsCount = () => '5';

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

export const getExploreOrdersApiUrl = (state) => {
	return _.get(getExploreOrders(state), 'apiUrl');
};

export const getExploreOrdersPrevApiUrlsStack = (state) => {
	return _.get(getExploreOrders(state), 'prevApiUrls');
};

export const getExploreOrdersPrevApiUrl = (state) => {
	return _.last(getExploreOrdersPrevApiUrlsStack(state));
};

export const getExploreOrdersPaginationData = (state) => {
	const pages = getExploreOrdersPrevApiUrlsStack(state) || [];
	const perPageRowCount = getOrdersApiRowsCount();
	const { rows } = getExploreOrdersData(state);
	const total = ((pages.length + 1) * perPageRowCount) - (perPageRowCount - rows.length);
	const start = (pages.length * perPageRowCount) + 1;
	const end = total;
	return {
		start,
		end,
		total,
	};
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