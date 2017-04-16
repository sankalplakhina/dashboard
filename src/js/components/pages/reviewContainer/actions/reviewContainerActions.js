import * as ACTIONS from './reviewContainerActionTypes';
import { getDayBucketValue } from 'src/js/components/dashboard/selectors/dashboardDatePickerSelectors';
import { getUserSecretKey } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { getReviewApiPath, getReviewApiRowsCount } from '../selectors/reviewContainerSelectors';

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

export function load(apiLink = getReviewApiPath()) {
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
        const state = getState();
        const secret = getUserSecretKey(state);
        const dayBucket = getDayBucketValue(state);
        const apiUrl = `${apiLink}?secret=${secret}&rows=${getReviewApiRowsCount()}&days=${dayBucket}`;
        return client.get(apiUrl).then(data => {
            dispatch(loadSuccess(data));
        })
        .catch(error => {
            dispatch(loadFail(error));
        });
    };
}
