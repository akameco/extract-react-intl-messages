import test from 'ava'
import m from '../'

test('errors', async t => {
  await t.throws(m('hello'), /Expected a Array/)
  await t.throws(m(['en', 'ja'], 2), /Expected a string/)
  await t.throws(m(['en', 'ja'], 'app/', 2), /Expected a string/)
})
