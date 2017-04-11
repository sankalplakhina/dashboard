import * as ACTIONS from './exploreContainerActionTypes';
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

export function loadExploreData(apiLink = '/api/explore') {
    return (dispatch, getState, client) => {
        dispatch({
          type: ACTIONS.LOAD
        });
        return client.get(apiLink)
        .then(data => {
            // update new data
            dispatch({
                type: ACTIONS.LOAD_SUCCESS,
                data: data.data
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
        return client.get(apiLink)
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
