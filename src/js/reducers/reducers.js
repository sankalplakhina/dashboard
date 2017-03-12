import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import auth from 'src/js/components/pages/loginContainer/reducers/loginContainerReducers';
import { reducer as home } from '../components/pages/home/reducers/homeReducers';
import { dashboard } from '../components/dashboard/reducers/dashBoardDatePickerReducers';
import { reducer as explore } from '../components/pages/exploreContainer/reducers/exploreContainerReducers';
import { reducer as review } from '../components/pages/reviewContainer/reducers/reviewContainerReducers';
import { reducer as analyze } from '../components/pages/analyzeContainer/reducers/analyzeContainerReducers';

// root reducer
const reducers = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  dashboard,
  home,
  explore,
  review,
  analyze,
});

export default reducers;