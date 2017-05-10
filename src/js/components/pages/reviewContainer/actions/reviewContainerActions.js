import * as ACTIONS from './reviewContainerActionTypes';
import { getDayBucketValue } from 'src/js/components/dashboard/selectors/dashBoardDatePickerSelectors';
import { getUserSecretKey } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import {
    getReviewApiPath,
    getReviewApiRowsCount,
    getReviewApiUrl,
} from '../selectors/reviewContainerSelectors';

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

function loadReview(apiUrl) {
    // returning a thunk as this is any async action
    // dispatch and getState and default params from
    // thunk library, client is an extra param required
    // for server as well as client rendering
    // Check createStore where when we set middlewares, we add
    // thunk middleware as thunk.withExtraArgument(client)
    return (dispatch, getState, client) => {
        dispatch({
          type: ACTIONS.LOAD,
          apiUrl,
        });
        return client.get(apiUrl)
        .then(data => dispatch(loadSuccess(data)))
        .catch(error => dispatch(loadFail(error)));
    };
}

export function loadReviewWithQuery(nextQuery) {
    return (dispatch, getState, client) => {

        const state = getState();
        const secret = getUserSecretKey(state);
        const dayBucket = getDayBucketValue(state);
        let apiUrl = `${getReviewApiPath()}?secret=${secret}&rows=${getReviewApiRowsCount()}&days=${dayBucket}`;
        if (nextQuery) {
            apiUrl += `&next=${nextQuery}`;
        }
        return dispatch(loadReview(apiUrl));
    };
}

export function loadReviewWithNextQuery(nextQuery) {
    return (dispatch, getState) => {
        // storing current api url in a stack to handle
        // previous button click. Every previous button click
        // would pop this stack and get previous api link
        const prevApiUrl = getReviewApiUrl(getState());
        dispatch({
            type: ACTIONS.SET_REVIEW_PREV_API_URL,
            prevApiUrl,
        });
        dispatch(loadReviewWithQuery(nextQuery));
    }
}

export function loadReviewWithPrevLink(prevApiUrl) {
    return (dispatch) => {
        // when the previous button is clicked, we pop
        // out the last api link added to the stack
        dispatch({
            type: ACTIONS.REMOVE_REVIEW_PREV_API_URL,
            prevApiUrl,
        });
        dispatch(loadReview(prevApiUrl));
    }
}