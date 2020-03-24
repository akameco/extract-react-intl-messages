import fs from 'fs'
import path from 'path'
import tempy from 'tempy'
import m from '../..'

test('export json', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'src/test/fixtures/default/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('export json with removed messages', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'src/test/fixtures/default/**/*.js', tmp)
  const enBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8')
  )
  const jaBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8')
  )
  expect(enBefore).toMatchSnapshot()
  expect(jaBefore).toMatchSnapshot()
  await m(['en', 'ja'], 'src/test/fixtures/removed/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('export json - nest', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'src/test/fixtures/default/**/*.js', tmp, {
    defaultLocale: 'en',
    flat: false
  })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('sort keys', async () => {
  const tmp = tempy.directory()
  const enPath = path.resolve(tmp, 'en.json')
  const jaPath = path.resolve(tmp, 'ja.json')

  await m(['en', 'ja'], 'src/test/fixtures/unsorted/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
  const ja = JSON.parse(fs.readFileSync(jaPath, 'utf8'))

  expect(Object.keys(en)).toMatchSnapshot()
  expect(Object.keys(ja)).toMatchSnapshot()
})

test('export using custom module', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'src/test/fixtures/custom/**/*.js', tmp, {
    defaultLocale: 'en',
    moduleSourceName: '../i18n'
  })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('with overwriteDefault', async () => {
  const tmp = tempy.directory()
  fs.writeFileSync(
    path.resolve(tmp, 'en.json'),
    JSON.stringify(
      {
        'a.custom.hello': 'hello',
        'a.custom.world': 'world',
        'b.custom.message': 'Default Message'
      },
      null,
      2
    ),
    'utf8'
  )
  await m(['en', 'ja'], 'src/test/fixtures/custom/**/*.js', tmp, {
    defaultLocale: 'en',
    moduleSourceName: '../i18n',
    overwriteDefault: false
  })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})
