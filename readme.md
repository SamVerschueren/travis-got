# travis-got [![Build Status](https://travis-ci.org/SamVerschueren/travis-got.svg?branch=master)](https://travis-ci.org/SamVerschueren/travis-got)

> Convenience wrapper for [got](https://github.com/sindresorhus/got) to interact with the [Travis API](https://docs.travis-ci.com/api)


## Install

```
$ npm install --save travis-got
```


## Usage

Instead of:

```js
const got = require('got');

got('https://api.travis-ci.org/repos/SamVerschueren/travis-got', {
    json: true,
    headers: {
        accept: 'application/vnd.travis-ci.2+json'
    }
}).then(res => {
    console.log(res.body.repo.slug);
    //=> 'SamVerschueren/latest-push'
});
```

You can do:

```js
const travisGot = require('travis-got');

travisGot('repos/SamVerschueren/travis-got').then(res => {
    console.log(res.body.repo.slug);
    //=> 'SamVerschueren/latest-push'
});
```

Or:

```js
const travisGot = require('travis-got');

travisGot('https://api.travis-ci.org/repos/SamVerschueren/travis-got').then(res => {
    console.log(res.body.repo.slug);
    //=> 'SamVerschueren/latest-push'
});
```

## API

Same as [got](https://github.com/sindresorhus/got) (including the stream API and aliases), but with some additional options:

### token

Type: `string`

Travis [access token](https://docs.travis-ci.com/api#authentication).

Can be overridden globally with the TRAVIS_TOKEN environment variable.

### endpoint

Type: `string`<br>
Default: `https://api.travis-ci.org/`

To support [Travis Enterprise](https://enterprise.travis-ci.com/).

Can be overridden globally with the TRAVIS_ENDPOINT environment variable.


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
