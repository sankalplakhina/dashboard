import * as ACTIONS from './exploreContainerActionTypes';
import { getDayBucketValue } from 'src/js/components/dashboard/selectors/dashBoardDatePickerSelectors';
import { getUserSecretKey } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import {
    getOrdersApiPath,
    getOrdersApiRowsCount,
    getExploreOrdersApiUrl,
} from '../selectors/exploreContainerSelectors';

export function load() {
    // returning a thunk as this is any async action
    // dispatch and getState and default params from
    // thunk library, client is an extra param required
    // for server as well as client rendering
    // Check createStore where when we set middlewares, we add
    // thunk middleware as thunk.withExtraArgument(client)
    return (dispatch, getState, client) => {
        return Promise.all([
            dispatch(loadExploreData()),
            dispatch(loadStatsPanelsWithQuery())
        ])
    };
}

export function loadExploreData(apiLink = '/fapi/overview') {
    return (dispatch, getState, client) => {
        dispatch({
          type: ACTIONS.LOAD
        });
        const state = getState();
        const secret = getUserSecretKey(state);
        const dayBucket = getDayBucketValue(state);
        const apiUrl = `${apiLink}?secret=${secret}&days=${dayBucket}`;
        return client.get(apiUrl)
        .then(data => {
            // update new data
            dispatch({
                type: ACTIONS.LOAD_SUCCESS,
                data: data
            });
        })
        .catch(error => {
            // update error data
            dispatch({
                type: ACTIONS.LOAD_FAIL,
                error
            });
        });
    };
}

function loadStatsPanels(apiUrl) {
    return (dispatch, getState, client) => {
        // initiate loader
        dispatch({
            type: ACTIONS.LOAD_STATS_PANELS,
            apiUrl,
        });
        return client.get(apiUrl)
        .then(data => {
            // update new data
            dispatch({
                type: ACTIONS.LOAD_STATS_PANELS_SUCCESS,
                data: data
            });
        })
        .catch(error => {
            // update error data
            dispatch({
                type: ACTIONS.LOAD_STATS_PANELS_FAIL,
                error
            });
        });
    };
}

export function loadStatsPanelsWithQuery(nextQuery) {
    return (dispatch, getState, client) => {
        const state = getState();
        const secret = getUserSecretKey(state);
        const dayBucket = getDayBucketValue(state);
        let apiUrl = `${getOrdersApiPath()}?rows=${getOrdersApiRowsCount()}&secret=${secret}&days=${dayBucket}`;
        if (nextQuery) {
            apiUrl += `&next=${nextQuery}`;
        }
        return dispatch(loadStatsPanels(apiUrl));
    };
}

export function loadStatsPanelsWithNextQuery(nextQuery) {
    return (dispatch, getState) => {
        // storing current api url in a stack to handle
        // previous button click. Every previous button click
        // would pop this stack and get previous api link
        const prevApiUrl = getExploreOrdersApiUrl(getState());
        dispatch({
            type: ACTIONS.SET_ORDERS_PREV_API_URL,
            prevApiUrl,
        });
        dispatch(loadStatsPanelsWithQuery(nextQuery));
    }
}

export function loadStatsPanelsWithPrevLink(prevApiUrl) {
    return (dispatch) => {
        // when the previous button is clicked, we pop
        // out the last api link added to the stack
        dispatch({
            type: ACTIONS.REMOVE_ORDERS_PREV_API_URL,
            prevApiUrl,
        });
        dispatch(loadStatsPanels(prevApiUrl));
    }
}

export function setDecision(decision, orderId, orderTimestamp, apiLink = '/twapi/action') {
    return (dispatch, getState, client) => {
        return console.log('setDecision', decision, orderId, orderTimestamp)
        dispatch({
            type: ACTIONS.SET_DECISION_PENDING,
            orderId
        });
        const state = getState();
        const secret = getUserSecretKey(state);
        return client.post(apiLink, {
            data: {
                secret,
                order_id: orderId,
                action_type: decision.value,
                order_timestamp: orderTimestamp,
            }
        })
        .then(data => {
            // update new data
            dispatch({
                type: ACTIONS.SET_DECISION_SUCCESS,
                orderId,
                decision,
                data
            });
        })
        .catch(error => {
            // update error data
            dispatch({
                type: ACTIONS.SET_DECISION_FAIL,
                orderId,
                error
            });
        });
    };
}
