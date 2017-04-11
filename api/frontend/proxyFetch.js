import _ from 'lodash';
import { twHost, twPort } from 'config/env';
import fetch from 'isomorphic-fetch';

function formatUrl(baseUrl, path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return 'http://' + twHost + ':' + twPort + adjustedPath.replace(baseUrl, '/twapi');
}

const baseFetchOptions = {
	headers: {
		Accept: 'application/json',
	},
	method: 'GET',
};

const proxyFetch = (req, res, processCallback, options = {}) => {
	console.log('via proxyFetch');
	return fetch(formatUrl(req.baseUrl, req.originalUrl), _.defaultsDeep(options, baseFetchOptions))
	      .then(response => response.json())
	      .then(data => processCallback(req, res, data))
}

export default proxyFetch;