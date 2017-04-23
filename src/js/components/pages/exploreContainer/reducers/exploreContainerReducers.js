import _ from 'lodash';
import { combineReducers } from 'redux';
import * as ACTIONS from '../actions/exploreContainerActionTypes';
import * as datePickerActions from 'src/js/components/dashboard/actions/dashboardDatePickerActionTypes';

const explore = combineReducers({
  overview,
  orders,
});

function overview(state = {}, action) {
	switch (action.type) {

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

function orders(state = {}, action) {
	switch (action.type) {

		case ACTIONS.SET_ORDERS_PREV_API_URL:
			return setPrevApiUrl(state, action);

		case ACTIONS.REMOVE_ORDERS_PREV_API_URL:
			return removePrevApiUrl(state, action);

		case ACTIONS.LOAD_STATS_PANELS:
			return updateLoading(state, action);

		case ACTIONS.LOAD_STATS_PANELS_SUCCESS:
			return updateSuccess(state, action);

		case ACTIONS.LOAD_STATS_PANELS_FAIL:
			return updateFail(state, action);

		case ACTIONS.SET_DECISION_PENDING:
			return updateOrderDecisionLoading(state, action);

		case ACTIONS.SET_DECISION_SUCCESS:
			return updateOrderDecisionSuccess(state, action);

		case ACTIONS.SET_DECISION_FAIL:
			return updateOrderDecisionFail(state, action);

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

function updateOrderDecisionLoading(state, action) {
	return _.defaults({
		data: _.defaults({
			[action.orderId]: _.defaults({
				decision: {
					loading: true
				}
			}, state.data[action.orderId])
		}, state.data)
	}, state);
}

function updateOrderDecisionSuccess(state, action) {
	return _.defaults({
		data: _.defaults({
			[action.orderId]: _.defaults({
				decision: _.defaults({
					loading: false,
					loaded: true,
				}, action.decision, action.data)
			}, state.data[action.orderId])
		}, state.data)
	}, state);
}

function updateOrderDecisionFail(state, action) {
	return _.defaults({
		data: _.defaults({
			[action.orderId]: _.defaults({
				decision: _.defaults({
					loading: false,
					loaded: true,
				}, action.decision, action.error)
			}, state.data[action.orderId])
		}, state.data)
	}, state);
}

export default explore;