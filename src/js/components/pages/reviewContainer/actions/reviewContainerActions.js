import * as ACTIONS from './reviewContainerActionTypes';

export function loadFail(error) {
  return {
    type: ACTIONS.LOAD_FAIL,
    error
  };
}

export function loadSuccess(data) {
  return {
    type: ACTIONS.LOAD_SUCCESS,
    data
  };
}

export function load(apiLink = '/fapi/review?row=5') {
    // returning a thunk as this is any async action
    // dispatch and getState and default params from
    // thunk library, client is an extra param required
    // for server as well as client rendering
    // Check createStore where when we set middlewares, we add
    // thunk middleware as thunk.withExtraArgument(client)
    return (dispatch, getState, client) => {

        dispatch({
          type: ACTIONS.LOAD
        });
        return client.get(apiLink).then(data => {
            dispatch(loadSuccess(data));
        })
        .catch(error => {
            dispatch(loadFail(error));
        });
    };
}
