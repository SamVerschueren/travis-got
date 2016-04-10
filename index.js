'use strict';
const got = require('got');

function travisGot(path, opts) {
	if (typeof path !== 'string') {
		return Promise.reject(new TypeError('Path should be a string'));
	}

	opts = Object.assign({json: true, endpoint: 'https://api.travis-ci.org/'}, opts);

	opts.headers = Object.assign({
		'accept': 'application/vnd.travis-ci.2+json',
		'user-agent': 'https://github.com/SamVerschueren/travis-got'
	}, opts.headers);

	const env = process.env;
	const token = opts.token || env.TRAVIS_TOKEN;

	if (token) {
		opts.headers.authorization = `token ${token}`;
	}

	const endpoint = env.TRAVIS_ENDPOINT ? env.TRAVIS_ENDPOINT.replace(/[^/]$/, '$&/') : opts.endpoint;
	const url = /https?/.test(path) ? path : endpoint + path;

	if (opts.stream) {
		return got.stream(url, opts);
	}

	return got(url, opts);
}

const helpers = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

travisGot.stream = (url, opts) => travisGot(url, Object.assign({}, opts, {json: false, stream: true}));

for (const x of helpers) {
	const method = x.toUpperCase();
	travisGot[x] = (url, opts) => travisGot(url, Object.assign({}, opts, {method}));
	travisGot.stream[x] = (url, opts) => travisGot.stream(url, Object.assign({}, opts, {method}));
}

module.exports = travisGot;
