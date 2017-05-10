import _ from 'lodash';
import * as ACTIONS from '../actions/reviewContainerActionTypes';
import * as datePickerActions from 'src/js/components/dashboard/actions/dashBoardDatePickerActionTypes';

export function reducer(state = {}, action = {}) {

	switch (action.type) {
		case ACTIONS.SET_REVIEW_PREV_API_URL:
			return setPrevApiUrl(state, action);

		case ACTIONS.REMOVE_REVIEW_PREV_API_URL:
			return removePrevApiUrl(state, action);

		case ACTIONS.LOAD:
			return updateLoading(state, action);

		case ACTIONS.LOAD_SUCCESS:
			return updateSuccess(state, action);

		case ACTIONS.LOAD_FAIL:
			return updateFail(state, action);

		case datePickerActions.SET_DATE_BUCKET:
			return updateStateOnDateSelection(state);

		default:
			return state;
	}
}

function setPrevApiUrl(state, action) {
	const prevApiUrls = _.concat(state.prevApiUrls || [], [action.prevApiUrl]);
	return _.defaults({
		prevApiUrls,
	}, state);
}

function removePrevApiUrl(state, action) {
	const prevApiUrls = _.dropRight(state.prevApiUrls);
	return _.defaults({
		prevApiUrls,
	}, state);
}

function updateLoading(state, action) {
	return _.defaults({
		loaded: false,
		loading: true,
		apiUrl: action.apiUrl,
	}, state);
}

function updateSuccess(state, action) {
	return _.defaults({
		loaded: true,
		loading: false,
		data: action.data,
	}, state);
}

function updateFail(state, action) {
	return _.defaults({
		loaded: true,
		loading: false,
		data: action.error
	}, state);
}

function updateStateOnDateSelection(state) {
	const nextState = _.omit(state, ['loaded', 'apiUrl', 'prevApiUrls']);
	return nextState;
}