import test from 'ava';
import getStream from 'get-stream';
import m from './';

const token = process.env.TRAVIS_TOKEN;

test('default', async t => {
	t.is((await m('repos/SamVerschueren/travis-got')).body.repo.slug, 'SamVerschueren/travis-got');
});

test('full path', async t => {
	t.is((await m('https://api.travis-ci.org/repos/SamVerschueren/travis-got')).body.repo.slug, 'SamVerschueren/travis-got');
});

test('should accept options', async t => {
	t.is((await m('repos/SamVerschueren/travis-got', {})).body.repo.slug, 'SamVerschueren/travis-got');
});

test.serial('global token option', async t => {
	process.env.TRAVIS_TOKEN = 'fail';
	await t.throws(m('repos/SamVerschueren/travis-got'), 'Response code 403 (Forbidden)');
	process.env.TRAVIS_TOKEN = token || '';
});

test('token option', async t => {
	await t.throws(m('repos/SamVerschueren/travis-got', {token: 'fail'}), 'Response code 403 (Forbidden)');
});

test('endpoint option', async t => {
	await t.throws(m('repos/SamVerschueren/travis-got', {endpoint: 'fail', retries: 1}), /ENOTFOUND/);
});

test('stream interface', async t => {
	t.is(JSON.parse(await getStream(m.stream('repos/SamVerschueren/travis-got'))).repo.slug, 'SamVerschueren/travis-got');
	t.is(JSON.parse(await getStream(m.stream.get('repos/SamVerschueren/travis-got'))).repo.slug, 'SamVerschueren/travis-got');
});
