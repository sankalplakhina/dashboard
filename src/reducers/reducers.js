import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as home } from '../components/pages/home/reducers/homeReducers';
import { reducer as explore } from '../components/pages/exploreContainer/reducers/exploreContainerReducers';

// root reducer
const reducers = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  home,
  explore
});

export default reducers;