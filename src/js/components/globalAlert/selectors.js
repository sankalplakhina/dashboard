import _ from 'lodash';

export const getGobalAlert = (state) => state.globalAlert;

export const getGlobalAlertCallbackAction = (state) => _.get(getGobalAlert(state), 'callbackAction');

export const getIsGlobalAlertActive = (state) => getGobalAlert(state).isActive;

export const getGlobalAlertText = (state) => getGobalAlert(state).alertText;