import test from 'ava'
import m from '..'

test('errors', async t => {
  await t.throwsAsync(() => m('hello'), /Expected a Array/)
  await t.throwsAsync(() => m(['en', 'ja'], 2), /Expected a string/)
  await t.throwsAsync(() => m(['en', 'ja'], 'app/', 2), /Expected a string/)
})
