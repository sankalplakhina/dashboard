import _ from 'lodash';

export const getAnalyzeApiPath = () => '/api/analyze';
export const getAnalyzeApiRowsCount = () => '5';

export const getAnalyze = (state) => state.analyze;

export const isAnalyzeDataLoaded = (state) => {
  return _.get(getAnalyze(state), 'loaded');
};

export const getAnalyzeData = (state) => {
  return _.get(getAnalyze(state), 'data');
};