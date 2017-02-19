import _ from 'lodash';
import * as ACTIONS from '../actions/reviewContainerActionTypes';

const initialState = {
  loaded: false,
  loading: false,
  data: {}
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.LOAD:
      return {
        loaded: false,
        loading: true,
        data: _.defaults({}, state.data)
      };
    case ACTIONS.LOAD_SUCCESS:
      return {
        loaded: true,
        loading: false,
        data: action.data
      };
    case ACTIONS.LOAD_FAIL:
      return {
        loaded: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}