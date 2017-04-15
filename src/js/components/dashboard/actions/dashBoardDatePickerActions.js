import * as ACTIONS from './dashboardDatePickerActionTypes';

export function setDayBucket(dayBucket) {
    return {
        type: ACTIONS.SET_DATE_BUCKET,
        dayBucket
    };
}
