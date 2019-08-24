import m from '..'

const pattern = 'src/extract-react-intl/test/fixtures/**/*.js'
const locales = ['en', 'ja']

test('extract from file', async () => {
  process.env.BABEL_ENV = 'react-intl'
  const x = await m(locales, pattern, {
    defaultLocale: 'en',
    cwd: `${__dirname}/fixtures`,
    extractFromFormatMessageCall: true
  })
  expect(x).toMatchSnapshot()
})

// TODO: fix
test.skip('babelrc path resolution', async () => {
  const x = await m(['en'], './extract-react-intl/test/resolution/**/*.js', {
    defaultLocale: 'en',
    cwd: `${__dirname}/resolution`
  })
  expect(x).toMatchSnapshot()
})

test('babel plugin execution order', async () => {
  const x = await m(
    ['en'],
    'src/extract-react-intl/test/pluginOrdering/**/*.js',
    { defaultLocale: 'en', cwd: `${__dirname}/pluginOrdering` }
  )
  expect(x).toMatchSnapshot()
})

test('error', async () => {
  expect.assertions(1)
  await m(locales, 'notfound', {
    defaultLocale: 'en',
    cwd: `${__dirname}/fixtures`
  }).catch(error => {
    expect(error.message).toMatch('File not found')
  })
})

test('extract from file with descriptions', async () => {
  process.env.BABEL_ENV = 'react-intl'
  const x = await m(locales, pattern, {
    defaultLocale: 'en',
    cwd: './test/fixtures',
    withDescriptions: true
  })
  expect(x).toMatchSnapshot()
})
