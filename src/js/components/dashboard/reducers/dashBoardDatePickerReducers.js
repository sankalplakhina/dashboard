import _ from 'lodash';
import moment from 'moment';
import * as ACTIONS from '../actions/dashboardDatePickerActionTypes';

const format = 'DD MMM YYYY';

const initialState = {
    isDatePickerVisible: false,
    format,
    dateRange: {
        startDate: moment().format(format),
        endDate: moment().format(format),
    }
};

export function dashboard(state = initialState, action = {}) {
    switch (action.type) {
        case ACTIONS.SET_IS_DATE_PICKER_VISIBLE:
        return _.defaults({
            isDatePickerVisible: action.isDatePickerVisible
        }, state);

        case ACTIONS.SET_DATE_RANGE:
        return _.defaults({
            dateRange: action.dateRange
        }, state);

        default:
        return state;
    }
}