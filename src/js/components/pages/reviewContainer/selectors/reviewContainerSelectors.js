import _ from 'lodash';

export const getReviewApiPath = () => '/fapi/review';
export const getReviewApiRowsCount = () => '5';

export const getReview = (state) => {
	return state.review;
};

export const getReviewData = (state) => {
	return _.get(getReview(state), 'data');
};

export const reviewDataLoaded = (state) => {
	return _.get(getReview(state), 'loaded');
};

