import { asyncConnect } from 'redux-connect';
import { load } from '../actions/orderContainerActions';
import { isOrderDataLoaded } from '../selectors/orderContainerSelectors';
import OrderContainer from '../components/orderContainer';

const asyncProps = {
    promise: (options) => {
    	const { store: { dispatch, getState }, params: { orderId } } = options;
    	const state = getState();
    	if (!isOrderDataLoaded(state, orderId)) {
    		return dispatch(load(orderId));
    	}
    	return null;
    }
};

export default asyncConnect([asyncProps])(OrderContainer);