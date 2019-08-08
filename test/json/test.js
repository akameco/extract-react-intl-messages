const fs = require('fs')
const path = require('path')
const tempy = require('tempy')
const m = require('../..')

test('export json', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('export json with removed messages', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp)
  const enBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8')
  )
  const jaBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8')
  )
  expect(enBefore).toMatchSnapshot()
  expect(jaBefore).toMatchSnapshot()
  await m(['en', 'ja'], 'test/fixtures/removed/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('export json - nest', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp, { flat: false })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('sort keys', async () => {
  const tmp = tempy.directory()
  const enPath = path.resolve(tmp, 'en.json')
  const jaPath = path.resolve(tmp, 'ja.json')

  await m(['en', 'ja'], 'test/fixtures/unsorted/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(enPath))
  const ja = JSON.parse(fs.readFileSync(jaPath))

  expect(Object.keys(en)).toMatchSnapshot()
  expect(Object.keys(ja)).toMatchSnapshot()
})

test('delimiter - nest', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp, {
    flat: false,
    delimiter: '_'
  })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})

test('export using custom module', async () => {
  const tmp = tempy.directory()
  const opts = { moduleName: '../i18n' }
  await m(['en', 'ja'], 'test/fixtures/custom/**/*.js', tmp, opts)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  expect(en).toMatchSnapshot()
  expect(ja).toMatchSnapshot()
})
