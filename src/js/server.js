import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import morgan from 'morgan';
import compression from 'compression';
import favicon from 'serve-favicon';
import path from 'path';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import cookie from 'react-cookie';
import _ from 'lodash';
import { createStore } from './store/createStore';
import ApiClient from './helpers/ApiClient';

import getRoutes from './routes';
import Html from './components/html/html';
import {
    port,
    apiHost,
    apiPort,
    authProtocol,
    authHost,
    authPort,
    twHost,
    twPort,
} from 'config/env';

const targetUrl = `http://${apiHost}:${apiPort}`;
const authUrl = `${authProtocol}://${authHost}:${authPort}/neo/v1`;
const twUrl = `http://${twHost}:${twPort}`;
const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer();

global.__CLIENT__ = false; // eslint-disable-line

app.use(compression());

// Proxy to Auth server
app.use('/auth', (req, res) => {
    delete req.headers.host; // hack to allow localhost
    proxy.web(req, res, {
        target: `${authUrl}/auth`,
    });
});

// Proxy to API server
app.use('/twapi', (req, res) => {
    proxy.web(req, res, { target: `${twUrl}/twapi` });
});

// Proxy to Frontend API server
app.use('/fapi', (req, res) => {
    proxy.web(req, res, { target: `${targetUrl}/fapi` });
});

// Proxy to API server
app.use('/api', (req, res) => {
    proxy.web(req, res, { target: `${targetUrl}/api` });
});

server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

proxy.on('error', (error, req, res) => {

    if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error);
    }
    if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
    }
    const json = { error: 'proxy_error', reason: error.message };
    res.end(JSON.stringify(json));
});

// setup the logger
app.use(morgan('dev', {}));

app.use('/assets', express.static(path.resolve('public/assets')));
app.use('/public', express.static(path.resolve('public')));
app.use(favicon(path.join('public/static/images/favicon', 'favicon.ico')));

app.use((req, res) => {

    if (process.env.NODE_ENV === 'development') {
        webpackIsomorphicTools.refresh();
    }

    const client = new ApiClient();
    const memoryHistory = createHistory(req.originalUrl);
    const store = createStore(client, memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);
    cookie.plugToRequest(req, res);
    match({
        history,
        routes: getRoutes(store),
        location: req.originalUrl
    }, (error, redirectLocation, renderProps) => {

        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            res.status(500);
            hydrateOnClient({ store, res });
        } else if (renderProps) {
            global.navigator = { userAgent: req.headers['user-agent'] };
            renderPage({ renderProps, store, res, client });
        } else {
            res.status(404).send('Not found');
        }
    });
});

function hydrateOnClient({ store, res }) {

    res.send(`<!doctype html>${
        ReactDOM.renderToStaticMarkup(
            <Html assets={webpackIsomorphicTools.assets()}
                  store={store}
                  />
        )}`
    );
}

function renderPage({ renderProps, store, res, client }) {

    loadOnServer({ ...renderProps, store, helpers: { client } })
    .then(() => {
        const responseStatus = _.chain(renderProps.routes).find('status').get('status').value();
        const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
        );
        res.status(responseStatus || 200);
        res.send(`<!doctype html>${
            ReactDOM.renderToStaticMarkup(
                <Html assets={webpackIsomorphicTools.assets()}
                      component={component}
                      store={store}
                      />
            )}`
        );
    })
    .catch(err => {
      console.error(err.stack);
    });
}

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is up on port ${port}`);
    }
});
