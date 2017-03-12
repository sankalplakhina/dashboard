import * as ACTIONS from './reviewContainerActionTypes';
import { getAuthToken } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';

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

export function load(apiLink = '/api/review?count=5') {
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
        const token = getAuthToken(getState());
        return client.get(apiLink, { headers: { Authorization: token } }).then(data => {
            dispatch(loadSuccess(data.data));
        })
        .catch(error => {
            dispatch(loadFail(error));
        });
    };
}
