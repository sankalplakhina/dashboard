import _ from 'lodash';

export const getReviewApiPath = () => '/fapi/review';
export const getReviewApiRowsCount = () => '6';

export const getReview = (state) => {
	return state.review;
};

export const getReviewData = (state) => {
	return _.get(getReview(state), 'data');
};

export const reviewDataLoaded = (state) => {
	return _.get(getReview(state), 'loaded');
};

export const getReviewNextQuery = (state) => {
	return _.get(getReviewData(state), 'next');
};

export const getReviewApiUrl = (state) => {
	return _.get(getReview(state), 'apiUrl');
};

export const getReviewPrevApiUrlsStack = (state) => {
	return _.get(getReview(state), 'prevApiUrls');
};

export const getReviewPrevApiUrl = (state) => {
	return _.last(getReviewPrevApiUrlsStack(state));
};

export const getReviewPaginationData = (state) => {
	const pages = getReviewPrevApiUrlsStack(state) || [];
	const perPageRowCount = getReviewApiRowsCount();
	const { reviewTable : { rows } } = getReviewData(state);
	const total = ((pages.length + 1) * perPageRowCount) - (perPageRowCount - rows.length);
	const start = (pages.length * perPageRowCount) + 1;
	const end = total;
	return {
		start,
		end,
		total,
	};
};



