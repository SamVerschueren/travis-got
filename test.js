import test from 'ava';
import getStream from 'get-stream';
import fn from './';

global.Promise = Promise;

test('default', async t => {
	t.is((await fn('repos/SamVerschueren/travis-got')).body.repo.slug, 'SamVerschueren/travis-got');
});

test('full path', async t => {
	t.is((await fn('https://api.travis-ci.org/repos/SamVerschueren/travis-got')).body.repo.slug, 'SamVerschueren/travis-got');
});

test('should accept options', async t => {
	t.is((await fn('repos/SamVerschueren/travis-got', {})).body.repo.slug, 'SamVerschueren/travis-got');
});

test('endpoint option', async t => {
	await t.throws(fn('repos/SamVerschueren/travis-got', {endpoint: 'fail', retries: 1}), /ENOTFOUND/);
});

test('stream interface', async t => {
	t.is(JSON.parse(await getStream(fn.stream('repos/SamVerschueren/travis-got'))).repo.slug, 'SamVerschueren/travis-got');
	t.is(JSON.parse(await getStream(fn.stream.get('repos/SamVerschueren/travis-got'))).repo.slug, 'SamVerschueren/travis-got');
});
