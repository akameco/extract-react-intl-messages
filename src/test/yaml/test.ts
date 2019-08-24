import fs from 'fs'
import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import tempy from 'tempy'
// eslint-disable-next-line import/no-extraneous-dependencies
import tempWrite from 'temp-write'
import yaml from 'js-yaml'
import m from '../..'

const fixturesPath = 'src/test/fixtures/default/**/*.js'

const yamlLoad = (tmp: string, file = '') =>
  yaml.safeLoad(fs.readFileSync(path.resolve(tmp, file), 'utf8'))

const defaultLocale = 'en'

test('export yaml', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, { defaultLocale, format: 'yaml' })

  expect(yamlLoad(tmp, 'en.yml')).toMatchSnapshot()
  expect(yamlLoad(tmp, 'ja.yml')).toMatchSnapshot()
})

test('export yaml - flat', async () => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, {
    defaultLocale,
    format: 'yaml',
    flat: true
  })

  expect(yamlLoad(tmp, 'en.yml')).toMatchSnapshot()
  expect(yamlLoad(tmp, 'ja.yml')).toMatchSnapshot()
})

test('exsit yaml', async () => {
  const x = { a: { hello: 'hello2' } }

  const tmpEn = tempWrite.sync(yaml.safeDump(x), 'en.yml')
  await m(['en'], fixturesPath, path.dirname(tmpEn), {
    defaultLocale,
    format: 'yaml'
  })
  expect(yaml.safeLoad(fs.readFileSync(tmpEn, 'utf8'))).toMatchSnapshot()

  const tmpJa = tempWrite.sync(yaml.safeDump(x), 'ja.yml')
  await m(['ja'], fixturesPath, path.dirname(tmpJa), {
    defaultLocale,
    format: 'yaml'
  })

  expect(yaml.safeLoad(fs.readFileSync(tmpJa, 'utf8'))).toMatchSnapshot()
})
