import _ from 'lodash';
import * as ACTIONS from '../actions/dashBoardDatePickerActionTypes';

export function dashboard(state = {}, action = {}) {
    switch (action.type) {

        case ACTIONS.SET_DATE_BUCKET:
        return _.defaults({
            dayBucket: action.dayBucket
        }, state);

        default:
        return state;
    }
}