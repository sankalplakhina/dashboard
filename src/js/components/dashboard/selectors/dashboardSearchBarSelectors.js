import _ from 'lodash';
import { getDashboardData } from './dashBoardDatePickerSelectors';

export const getSearchBarData = (state) => {
  return getDashboardData(state).searchBar;
};

export const getIsSearchBarLoading = (state) => getSearchBarData(state).loading;

export const getSearchBarLoadingOrderId = (state) => getSearchBarData(state).loadingOrderId;

export const getIsSearchBarResponseSuccess = (state) => getSearchBarData(state).success;

export const getIsSearchBarResponseError = (state) => getSearchBarData(state).error;