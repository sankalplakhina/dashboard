import _ from 'lodash';
import * as ACTIONS from '../actions/exploreContainerActionTypes';

const initialState = {
  loaded: false,
  loading: false,
  isStatsPanelsLoading: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case ACTIONS.LOAD:
    return _.defaults({ loaded: false, loading: true }, state);

    case ACTIONS.LOAD_SUCCESS:
    return _.defaults({ loaded: true, loading: false, data: action.data }, state);

    case ACTIONS.LOAD_FAIL:
    return _.defaults({ loaded: true, loading: false, data: action.error }, state);

    case ACTIONS.LOAD_STATS_PANELS:
    return _.defaults({ isStatsPanelsLoading: true }, state);

    case ACTIONS.LOAD_STATS_PANELS_SUCCESS:
    return _.defaults({ isStatsPanelsLoading: false, statsPanels: action.data }, state);

    case ACTIONS.LOAD_STATS_PANELS_FAIL:
    return _.defaults({ isStatsPanelsLoading: false, statsPanels: action.error }, state);

    default:
      return state;
  }
}