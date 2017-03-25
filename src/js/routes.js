import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AppContainer from './components/appContainer/appContainer';
import LoginContainer from './components/pages/loginContainer/containers/loginContainer';
import RegisterContainer from './components/pages/registerContainer/containers/registerContainer';
import ForgotPasswordContainer from './components/pages/forgotPassword/containers/forgotPasswordContainer';
import ResetPasswordContainer from './components/pages/resetPassword/containers/resetPasswordContainer';
import ExploreContainer from './components/pages/exploreContainer/containers/exploreContainer';
import ReviewContainer from './components/pages/reviewContainer/containers/reviewContainer';
import AnalyzeContainer from './components/pages/analyzeContainer/containers/analyzeContainer';
import Home from './components/pages/home/containers/home';
import NotFound from './components/pages/notFound/components/notFound';
import { isAuthDataLoaded } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { tryAuthenticationWithCookies } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';

export default (store) => {

    // Following middleware handles authenticated routes

    const requireLogin = (nextState, replace, callback) => {

        const { dispatch, getState } = store;
        const state = getState();
        if (!isAuthDataLoaded(state)) {
            // if no auth data exists, check in cookies
            dispatch(tryAuthenticationWithCookies());
            checkAuthData();
        } else {
            // if auth exists, no need to replace; call callback to continue same route
            checkAuthData();
        }

        function checkAuthData(){
            // rechecking auth to verify if something was found in cookies
            if (!isAuthDataLoaded(store.getState())) {
                replace('/');
            }
            callback();
        }
    };

    return (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={LoginContainer} />
        <Route path="login" component={LoginContainer}/>
        <Route path="register" component={RegisterContainer}/>
        <Route path="forgot-password" component={ForgotPasswordContainer}/>
        <Route path="reset-password" component={ResetPasswordContainer}/>
        {/* Routes requiring login */}
        <Route onEnter={requireLogin}>
            <Route path="explore" component={ExploreContainer}/>
            <Route path="review" component={ReviewContainer}/>
            <Route path="analyze" component={AnalyzeContainer}/>
        </Route>
        <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
