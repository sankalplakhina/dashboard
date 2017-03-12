import * as ACTIONS from '../actions/loginContainerActionTypes';

const initialState = {
	loaded: false,
	loading: false,
};

export default function auth(state = initialState, action = {}){

	switch (action.type) {
		case ACTIONS.LOGIN:
			return {
				loaded: false,
				loading: true,
				data: {}
			};
		case ACTIONS.LOGIN_SUCCESS:
			return {
				loaded: true,
				loading: false,
				data: action.data
			};
		case ACTIONS.LOGIN_FAILURE:
			return {
				loaded: false,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
}
