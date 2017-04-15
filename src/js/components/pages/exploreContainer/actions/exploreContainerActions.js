import * as ACTIONS from './exploreContainerActionTypes';
import { getDayBucketValue } from 'src/js/components/dashboard/selectors/dashboardDatePickerSelectors';
import { getUserSecretKey } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { getStatsPanelAPI } from '../selectors/exploreContainerSelectors';

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
            dispatch(loadStatsPanels())
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

export function loadStatsPanels(apiLink = `${getStatsPanelAPI()}?rows=5`) {
    return (dispatch, getState, client) => {
        // initiate loader
        dispatch({
            type: ACTIONS.LOAD_STATS_PANELS
        });
        const state = getState();
        const secret = getUserSecretKey(state);
        const dayBucket = getDayBucketValue(state);
        return client.get(`${apiLink}&secret=${secret}&days=${dayBucket}`)
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
