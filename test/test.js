// @flow weak
const m = require('..')

const pattern = 'test/fixtures/**/*.js'
const locales = ['en', 'ja']

test('extract from file', async () => {
  process.env.BABEL_ENV = 'react-intl'
  const x = await m(locales, pattern, { cwd: './test/fixtures' })
  expect(x).toMatchSnapshot()
})

test('babelrc path resolution', async () => {
  const x = await m(['en'], 'test/resolution/**/*.js', {
    cwd: './test/resolution'
  })
  expect(x).toMatchSnapshot()
})

test('error', async () => {
  expect.assertions(1)
  await m(locales, 'notfound', { cwd: './test/fixtures' }).catch(err => {
    expect(err.message).toMatch('File not found')
  })
})
