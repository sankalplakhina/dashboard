import * as ACTIONS from './actionTypes';
import {
	getGlobalAlertCallbackAction,
} from './selectors';

export function showGlobalAlert(alertText, callbackAction) {
	if (typeof callbackAction === 'function') {
		return console.error('showGlobalAlert does not support thunk actions yet!');
	}
	return {
		type: ACTIONS.SHOW_ALERT,
		alertText,
		callbackAction,
	};
}

export function dismissGlobalAlert() {
	return {
		type: ACTIONS.DISMISS_ALERT,
	};
}

export function removeCallbackAction() {
	return {
		type: ACTIONS.REMOVE_CALLBACK_ACTION,
	};
}

export function closeGlobalAlert() {
    return (dispatch, getState) => {
    	const state = getState();
    	const callbackAction = getGlobalAlertCallbackAction(state);

    	// hide alert as it will take it's transition time to hide
    	dispatch(dismissGlobalAlert());

		// fire callback action and remove it from store
    	dispatch(callbackAction);
    	dispatch(removeCallbackAction());
    };
}