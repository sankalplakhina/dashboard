import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import AppContainer from './components/appContainer/appContainer';
import LoginContainer from './components/pages/loginContainer/containers/loginContainer';
import RegisterContainer from './components/pages/registerContainer/containers/registerContainer';
import ForgotPasswordContainer from './components/pages/forgotPassword/containers/forgotPasswordContainer';
import ResetPasswordContainer from './components/pages/resetPassword/containers/resetPasswordContainer';
import OrderContainer from './components/pages/order/containers/orderContainer';
import ExploreContainer from './components/pages/exploreContainer/containers/exploreContainer';
import ReviewContainer from './components/pages/reviewContainer/containers/reviewContainer';
import AnalyzeContainer from './components/pages/analyzeContainer/containers/analyzeContainer';
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

            // rechecking auth to verify if something was found in cookies
            // doing getState again to get fresh store instance
            if (!isAuthDataLoaded(store.getState())) {
                replace('/login');
            }
        }
        callback();
    };

    const requireLogout = (nextState, replace, callback) => {

        const { dispatch, getState } = store;
        const state = getState();
        if (!isAuthDataLoaded(state)) {
            // if no auth data exists, check in cookies
            dispatch(tryAuthenticationWithCookies());

            // rechecking auth to verify if something was found in cookies
            // doing getState again to get fresh store instance
            if (!isAuthDataLoaded(store.getState())) {
                return callback();
            }
        }
        replace('/explore');
        callback();
    };

    const redirectFromIndex = (nextState, replace, callback) => {

        const { dispatch, getState } = store;
        const state = getState();
        if (!isAuthDataLoaded(state)) {
            // if no auth data exists, check in cookies
            dispatch(tryAuthenticationWithCookies());
            // rechecking auth to verify if something was found in cookies
            // doing getState again to get fresh store instance
            if (!isAuthDataLoaded(store.getState())) {
                replace('/login');
                return callback();
            }
        }
        replace('/explore');
        callback();
    };


    return (
        <Route path="/" component={AppContainer}>
            <IndexRoute onEnter={redirectFromIndex} />
            <Route onEnter={requireLogout}>
                <Route path="login" component={LoginContainer}/>
                <Route path="register" component={RegisterContainer}/>
                <Route path="forgot-password" component={ForgotPasswordContainer}/>
                <Route path="reset-password" component={ResetPasswordContainer}/>
            </Route>
            {/* Routes requiring login */}
            <Route onEnter={requireLogin}>
                <Route path="explore" component={ExploreContainer}/>
                <Route path="order/:orderId" component={OrderContainer}/>
                <Route path="review" component={ReviewContainer}/>
                <Route path="analyze" component={AnalyzeContainer}/>
            </Route>
            <Route path="404" component={NotFound} status={404} />
            <Redirect path="*" to={'/404'} />
        </Route>
    );
};
