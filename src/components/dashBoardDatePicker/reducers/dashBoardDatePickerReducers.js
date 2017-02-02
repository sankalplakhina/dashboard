import _defaults from 'lodash.defaults';
import * as ACTIONS from '../actions/dashboardDatePickerActionTypes';

const initialState = {
    isDatePickerVisible: false,
    dateRange: {
        startDate: '',
        endDate: ''
    }
};

export function dashboard(state = initialState, action = {}) {
    switch (action.type) {
        case ACTIONS.SET_IS_DATE_PICKER_VISIBLE:
        return _defaults({
            isDatePickerVisible: action.isDatePickerVisible
        }, state);

        case ACTIONS.SET_DATE_RANGE:
        return _defaults({
            dateRange: action.dateRange
        }, state);

        default:
        return state;
    }
}