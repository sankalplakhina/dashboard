import * as ACTIONS from './analyzeContainerActionTypes';
import { dateRangeSelector } from '~/src/components/dashBoardDatePicker/selectors/dashboardDatePickerSelectors';

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

export function load() {
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
        const dateRange = dateRangeSelector(state);
        let apiLink = '/api/analyze';
        if (dateRange.startDate && dateRange.endDate) {
            apiLink += `?start-date=${dateRange.startDate}&end-date=${dateRange.endDate}`;
        }
        return client.get(apiLink).then(data => {
            dispatch(loadSuccess(data.data));
        })
        .catch(error => {
            dispatch(loadFail(error));
        });
    };
}
