import * as ACTIONS from './orderContainerActionTypes';
import { getUserSecretKey } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
export function load(orderId) {
    // returning a thunk as this is any async action
    // dispatch and getState and default params from
    // thunk library, client is an extra param required
    // for server as well as client rendering
    // Check createStore where when we set middlewares, we add
    // thunk middleware as thunk.withExtraArgument(client)
    return (dispatch, getState, client) => {
        return dispatch(loadOrderData(orderId));
    };
}

export function loadOrderData(orderId, apiLink = '/fapi/order') {
    return (dispatch, getState, client) => {
        dispatch({
          type: ACTIONS.LOAD,
          orderId
        });
        const secret = getUserSecretKey(getState());
        return client.get(`${apiLink}?secret=${secret}&order_id=${orderId}`)
        .then(data => {
            // update new data
            dispatch({
                type: ACTIONS.LOAD_SUCCESS,
                orderId,
                data: data
            });
        })
        .catch(error => {
            // update error data
            dispatch({
                type: ACTIONS.LOAD_FAIL,
                orderId,
                error
            });
        });
    };
}
