import test from 'ava'
import m from '../'

const pattern = 'test/fixtures/**/*.js'
const locales = ['en', 'ja']

test('extract from file', async t => {
  const x = await m(locales, pattern, { cwd: './test/fixtures' })
  t.snapshot(x)
})

test('error', async t => {
  await t.throws(
    m(locales, 'notfound', { cwd: './test/fixtures' }),
    /File not found/
  )

  await t.throws(
    m(locales, 'notfound', { cwd: './hoge/fuga' }),
    /.babelrc not found/
  )
})
