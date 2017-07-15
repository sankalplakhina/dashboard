import _ from 'lodash';
import * as ACTIONS from './actionTypes';

const initialState = {
	isActive: false,
	alertText: '',
};

export default function globalAlert(state = initialState, action = {}) {
    switch (action.type) {

        case ACTIONS.SHOW_ALERT:
        	return showAlert(state, action);

        case ACTIONS.DISMISS_ALERT:
        	return hideAlert(state, action);

        case ACTIONS.REMOVE_CALLBACK_ACTION:
        	return removeCallbackAction(state, action);

        default:
        return state;
    }
}

function showAlert(state, action) {
	return _.defaults({
		isActive: true,
	}, _.omit(action, 'type'), state);
}

function hideAlert(state, action) {
	return _.defaults({
		isActive: false,
		alertText: '',
	}, state);
}

function removeCallbackAction(state, action) {
	return _.omit(state, 'callbackAction');
}

