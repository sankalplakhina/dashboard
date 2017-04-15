export const getOrder = (state) => {
  return state.order;
};

export const isOrderDataLoaded = (state) => {
  return getOrder(state).loaded;
};

export const getOrderData = (state) => {
  return getOrder(state).data;
};