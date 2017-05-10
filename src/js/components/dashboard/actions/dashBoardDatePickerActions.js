import * as ACTIONS from './dashBoardDatePickerActionTypes';

export function setDayBucket(dayBucket) {
    return {
        type: ACTIONS.SET_DATE_BUCKET,
        dayBucket
    };
}
