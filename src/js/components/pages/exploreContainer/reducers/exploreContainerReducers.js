import _ from 'lodash';
import { combineReducers } from 'redux';
import * as ACTIONS from '../actions/exploreContainerActionTypes';
import * as datePickerActions from 'src/js/components/dashboard/actions/dashboardDatePickerActionTypes';

const explore = combineReducers({
  overview,
  orders,
});

function overview(state = {}, action) {
    switch (action.type) {

        case ACTIONS.LOAD:
            return updateLoading(state);

        case ACTIONS.LOAD_SUCCESS:
            return updateSuccess(state, action);

        case ACTIONS.LOAD_FAIL:
            return updateFail(state, action);

        case datePickerActions.SET_DATE_BUCKET:
            return updateLoadedOnDateSelection(state);

        default:
          return state;
    }
}

function orders(state = {}, action) {
    switch (action.type) {

        case ACTIONS.LOAD_STATS_PANELS:
            return updateLoading(state);

        case ACTIONS.LOAD_STATS_PANELS_SUCCESS:
            return updateSuccess(state, action);

        case ACTIONS.LOAD_STATS_PANELS_FAIL:
            return updateFail(state, action);

        case ACTIONS.SET_DECISION_PENDING:
            return updateOrderDecisionLoading(state, action);

        case ACTIONS.SET_DECISION_SUCCESS:
            return updateOrderDecisionSuccess(state, action);

        case ACTIONS.SET_DECISION_FAIL:
            return updateOrderDecisionFail(state, action);

        case datePickerActions.SET_DATE_BUCKET:
            return updateLoadedOnDateSelection(state);

        default:
          return state;
    }
}

function updateLoading(state) {
    return _.defaults({
        loaded: false,
        loading: true,
    }, state)
}

function updateSuccess(state, action) {
    return {
        loaded: true,
        loading: false,
        data: action.data
    }
}

function updateFail(state, action) {
    return {
        loaded: true,
        loading: false,
        data: action.error
    }
}

function updateLoadedOnDateSelection(state) {
    return _.defaults({
        loaded: false
    }, state)
}

function updateOrderDecisionLoading(state, action) {
    return _.defaults({
        data: _.defaults({
            [action.orderId]: _.defaults({
                decision: {
                    loading: true
                }
            }, state.data[action.orderId])
        }, state.data)
    }, state);
}

function updateOrderDecisionSuccess(state, action) {
    return _.defaults({
        data: _.defaults({
            [action.orderId]: _.defaults({
                decision: _.defaults({
                    loading: false,
                    loaded: true,
                }, action.decision, action.data)
            }, state.data[action.orderId])
        }, state.data)
    }, state);
}

function updateOrderDecisionFail(state, action) {
    return _.defaults({
        data: _.defaults({
            [action.orderId]: _.defaults({
                decision: _.defaults({
                    loading: false,
                    loaded: true,
                }, action.decision, action.error)
            }, state.data[action.orderId])
        }, state.data)
    }, state);
}

export default explore;