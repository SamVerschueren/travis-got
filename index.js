'use strict';
var got = require('got');
var objectAssign = require('object-assign');
var Promise = require('pinkie-promise');

function travisGot(path, opts) {
	if (typeof path !== 'string') {
		return Promise.reject(new TypeError('Path should be a string'));
	}

	opts = objectAssign({json: true, endpoint: 'https://api.travis-ci.org/'}, opts);

	opts.headers = objectAssign({
		'accept': 'application/vnd.travis-ci.2+json',
		'user-agent': 'https://github.com/SamVerschueren/travis-got'
	}, opts.headers);

	var env = process.env;
	var token = env.TRAVIS_TOKEN || opts.token;

	if (token) {
		opts.headers.authorization = 'token ' + token;
	}

	var endpoint = env.TRAVIS_ENDPOINT ? env.TRAVIS_ENDPOINT.replace(/[^/]$/, '$&/') : opts.endpoint;
	var url = /https?/.test(path) ? path : endpoint + path;

	if (opts.stream) {
		return got.stream(url, opts);
	}

	return got(url, opts);
}

var helpers = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

helpers.forEach(function (el) {
	travisGot[el] = function (url, opts) {
		return travisGot(url, objectAssign({}, opts, {method: el.toUpperCase()}));
	};
});

travisGot.stream = function (url, opts) {
	return travisGot(url, objectAssign({}, opts, {json: false, stream: true}));
};

helpers.forEach(function (el) {
	travisGot.stream[el] = function (url, opts) {
		return travisGot.stream(url, objectAssign({}, opts, {method: el.toUpperCase()}));
	};
});

module.exports = travisGot;
