const OPTIONS = [
    { label: 'From Last Day', value: 1},
    { label: 'From Last Week', value: 7},
    { label: 'From Last 30 days', value: 30},
    { label: 'From Last 60 days', value: 60},
    { label: 'From Last 90 days', value: 90},
];

export const getDayBucketsList = () => OPTIONS;

export const getDefaultDayBucket = () => getDayBucketsList()[1]; // defaults to 7 days

export const getDashboardData = (state) => {
  return state.dashboard;
};

export const getDayBucket = (state) => {
  return getDashboardData(state).dayBucket || getDefaultDayBucket();
};

export const getDayBucketValue = (state) => {
  return getDayBucket(state).value;
};