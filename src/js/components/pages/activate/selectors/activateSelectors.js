import _ from 'lodash';

export const getOrder = (state) => {
  return state.order;
};

export const getOrderByOrderId = (state, orderId) => {
  return _.get(getOrder(state), orderId);
};


export const isOrderDataLoaded = (state, orderId) => {
	const order = getOrderByOrderId(state, orderId);
	return order && order.loaded;
};

export const getOrderData = (state, orderId) => {
  return getOrderByOrderId(state, orderId).data;
};