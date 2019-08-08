const m = require('..')

const pattern = 'extract-react-intl/test/fixtures/**/*.js'
const locales = ['en', 'ja']

test('extract from file', async () => {
  process.env.BABEL_ENV = 'react-intl'
  const x = await m(locales, pattern, { cwd: `${__dirname}/fixtures` })
  expect(x).toMatchSnapshot()
})

test.only('babelrc path resolution', async () => {
  const x = await m(['en'], './extract-react-intl/test/resolution/**/*.js', {
    cwd: `${__dirname}/resolution`
  })
  expect(x).toMatchSnapshot()
})

test('babel plugin execution order', async () => {
  const x = await m(
    ['en'],
    './extract-react-intl/test/pluginOrdering/**/*.js',
    { cwd: `${__dirname}/pluginOrdering` }
  )
  expect(x).toMatchSnapshot()
})

test('error', async () => {
  expect.assertions(1)
  await m(locales, 'notfound', {
    cwd: `${__dirname}/fixtures`
  }).catch(error => {
    expect(error.message).toMatch('File not found')
  })
})
