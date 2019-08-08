const fs = require('fs')
const path = require('path')
const tempy = require('tempy')
const tempWrite = require('temp-write')
const yaml = require('js-yaml')
const m = require('../..')

const fixturesPath = 'test/fixtures/default/**/*.js'

const yamlLoad = (tmp, file = '') =>
  yaml.safeLoad(fs.readFileSync(path.resolve(tmp, file), 'utf8'))

test('export yaml', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, { format: 'yaml' })

  expect(yamlLoad(tmp, 'en.yml')).toMatchSnapshot()
  expect(yamlLoad(tmp, 'ja.yml')).toMatchSnapshot()
})

test('export yaml - flat', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, {
    format: 'yaml',
    flat: true
  })

  expect(yamlLoad(tmp, 'en.yml')).toMatchSnapshot()
  expect(yamlLoad(tmp, 'ja.yml')).toMatchSnapshot()
})

test('exsit yaml', async () => {
  const x = { a: { hello: 'hello2' } }

  const tmpEn = tempWrite.sync(yaml.safeDump(x), 'en.yml')
  await m(['en'], fixturesPath, path.dirname(tmpEn), { format: 'yaml' })
  expect(yaml.safeLoad(fs.readFileSync(tmpEn, 'utf8'))).toMatchSnapshot()

  const tmpJa = tempWrite.sync(yaml.safeDump(x), 'ja.yml')
  await m(['ja'], fixturesPath, path.dirname(tmpJa), { format: 'yaml' })

  expect(yaml.safeLoad(fs.readFileSync(tmpJa, 'utf8'))).toMatchSnapshot()
})
