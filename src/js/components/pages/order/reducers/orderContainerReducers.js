import _ from 'lodash';
import * as ACTIONS from '../actions/orderContainerActionTypes';

const initialState = {
  loaded: false,
  loading: false,
};

export default function order(state = initialState, action = {}) {
  switch (action.type) {

    case ACTIONS.LOAD:
    return _.defaults({ loaded: false, loading: true }, state);

    case ACTIONS.LOAD_SUCCESS:
    return _.defaults({ loaded: true, loading: false, data: action.data }, state);

    case ACTIONS.LOAD_FAIL:
    return _.defaults({ loaded: true, loading: false, data: action.error }, state);

    default:
      return state;
  }
}