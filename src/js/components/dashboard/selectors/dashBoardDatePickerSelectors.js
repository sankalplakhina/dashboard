export const dashboardDataSelector = (state) => {
  return state.dashboard || {};
};

export const isDatePickerVisibleSelector = (state) => {
  return dashboardDataSelector(state).isDatePickerVisible;
};

export const dateRangeSelector = (state) => {
  return dashboardDataSelector(state).dateRange;
};