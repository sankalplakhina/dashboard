/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AppContainer from './components/appContainer/appContainer';
import ExploreContainer from './components/pages/exploreContainer/containers/exploreContainer';
import ReviewContainer from './components/pages/reviewContainer/containers/reviewContainer';
import Home from './components/pages/home/containers/home';
import NotFound from './components/pages/notFound/components/notFound';

export default (store) => {

  // TODO:  Following approach to be used in case we need
  // to handle routes requiring login

  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }

  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

    return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} />
      <Route path="explore" component={ExploreContainer}/>
      <Route path="review" component={ReviewContainer}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
    );
};
