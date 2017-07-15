import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import auth from 'src/js/components/pages/loginContainer/reducers/loginContainerReducers';
import { dashboard } from 'src/js/components/dashboard/reducers/dashBoardDatePickerReducers';
import explore from '../components/pages/exploreContainer/reducers/exploreContainerReducers';
import { reducer as review } from 'src/js/components/pages/reviewContainer/reducers/reviewContainerReducers';
import { reducer as analyze } from 'src/js/components/pages/analyzeContainer/reducers/analyzeContainerReducers';
import order from 'src/js/components/pages/order/reducers/orderContainerReducers';
import globalAlert from 'src/js/components/globalAlert/reducers';

// root reducer
const reducers = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  dashboard,
  explore,
  order,
  review,
  analyze,
  globalAlert,
});

export default reducers;