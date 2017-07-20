import * as ACTIONS from './dashboardSearchBarActionTypes';
import * as orderContainerActions from 'src/js/components/pages/order/actions/orderContainerActions';

export function searchTextLoadInitiated(orderId) {
    return {
        type: ACTIONS.SEARCH_TEXT_LOAD,
        orderId,
    }
}

export function searchTextLoadedSuccess(orderId, data) {
    return {
        type: ACTIONS.SEARCH_TEXT_SUCCESS,
        orderId,
        data,
    }
}

export function searchTextLoadedError(orderId, error) {
    return {
        type: ACTIONS.SEARCH_TEXT_ERROR,
        orderId,
        error,
    }
}

export function searchSuccess(orderId, data){
	return (dispatch) => {
		dispatch(orderContainerActions.orderDataLoadedSuccess(orderId, data));
		dispatch(searchTextLoadedSuccess(orderId, data));
	};
}

export function fetchSearchText(searchText) {
    return (dispatch, getState, client) => {
    	dispatch(searchTextLoadInitiated(searchText));
    	dispatch(orderContainerActions.loadOrderData(searchText, searchSuccess, searchTextLoadedError))
    };
}
