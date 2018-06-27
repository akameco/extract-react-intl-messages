import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import tempWrite from 'temp-write'
import yaml from 'js-yaml'
import m from '../..'

const fixturesPath = 'test/fixtures/default/**/*.js'

const yamlLoad = (tmp, file = '') =>
  yaml.safeLoad(fs.readFileSync(path.resolve(tmp, file), 'utf8'))

test('export yaml', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, { format: 'yaml' })

  t.snapshot(yamlLoad(tmp, 'en.yml'))
  t.snapshot(yamlLoad(tmp, 'ja.yml'))
})

test('export yaml - flat', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, {
    format: 'yaml',
    flat: true
  })

  t.snapshot(yamlLoad(tmp, 'en.yml'))
  t.snapshot(yamlLoad(tmp, 'ja.yml'))
})

test('exsit yaml', async t => {
  const x = { a: { hello: 'hello2' } }

  const tmpEn = tempWrite.sync(yaml.safeDump(x), 'en.yml')
  await m(['en'], fixturesPath, path.dirname(tmpEn), { format: 'yaml' })
  t.snapshot(yaml.safeLoad(fs.readFileSync(tmpEn, 'utf8')))

  const tmpJa = tempWrite.sync(yaml.safeDump(x), 'ja.yml')
  await m(['ja'], fixturesPath, path.dirname(tmpJa), { format: 'yaml' })

  t.snapshot(yaml.safeLoad(fs.readFileSync(tmpJa, 'utf8')))
})
