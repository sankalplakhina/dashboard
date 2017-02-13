import * as ACTIONS from './dashboardDatePickerActionTypes';

export function setIsDatePickerVisible(isDatePickerVisible) {
    return {
        type: ACTIONS.SET_IS_DATE_PICKER_VISIBLE,
        isDatePickerVisible
    };
}

export function setDateRange(dateRange) {
    return {
        type: ACTIONS.SET_DATE_RANGE,
        dateRange
    };
}
