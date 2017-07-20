import _ from 'lodash';
import * as dashboardDatePickerActionTypes from '../actions/dashBoardDatePickerActionTypes';
import * as dashboardSearchBarActionTypes from '../actions/dashboardSearchBarActionTypes';

const initialState = {
	searchBar: {},
};

export default function dashboard(state = initialState, action = {}) {
    switch (action.type) {

        case dashboardDatePickerActionTypes.SET_DATE_BUCKET:
	        return _.defaults({
	            dayBucket: action.dayBucket
	        }, state);

        case dashboardSearchBarActionTypes.SEARCH_TEXT_LOAD:
	        return updateSearchBarLoad(state, action);

	    case dashboardSearchBarActionTypes.SEARCH_TEXT_SUCCESS:
	        return updateSearchBarSuccess(state, action);

	    case dashboardSearchBarActionTypes.SEARCH_TEXT_ERROR:
	        return updateSearchBarError(state, action);

        default:
        	return state;
    }
}

function updateSearchBarLoad(state, action) {
	return _.defaults({
		searchBar: _.defaults({
			loading: true,
			loadingOrderId: action.orderId,
		}, _.omit(state.searchBar, ['error', 'success']))
	}, state)
}

function updateSearchBarSuccess(state, action) {
	return _.defaults({
		searchBar: _.defaults({
			loading: false,
			loadingOrderId: action.orderId,
			success: true,
		}, _.omit(state.searchBar, 'error'))
	}, state)
}

function updateSearchBarError(state, action) {
	return _.defaults({
		searchBar: _.defaults({
			loading: false,
			loadingOrderId: action.orderId,
			error: true,
		}, _.omit(state.searchBar, 'success'))
	}, state)
}