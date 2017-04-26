import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import tempWrite from 'temp-write'
import yaml from 'js-yaml'
import m from '../../'
import fixtures from '../fixtures/expected'

const expectedNestEn = fixtures.nestJson.en
const expectedNestJa = fixtures.nestJson.ja

const fixturesPath = 'test/fixtures/**/*.js'

const yamlLoad = (tmp, file = '') =>
  yaml.safeLoad(fs.readFileSync(path.resolve(tmp, file), 'utf8'))

test('export yaml', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, { format: 'yaml' })

  t.deepEqual(yamlLoad(tmp, 'en.yml'), expectedNestEn)
  t.deepEqual(yamlLoad(tmp, 'ja.yml'), expectedNestJa)
})

test('export yaml - flat', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], fixturesPath, tmp, {
    format: 'yaml',
    flat: true
  })

  t.deepEqual(yamlLoad(tmp, 'en.yml'), fixtures.json.en)
  t.deepEqual(yamlLoad(tmp, 'ja.yml'), fixtures.json.ja)
})

test('exsit yaml', async t => {
  const x = { a: { hello: 'hello2' } }

  const tmpEn = tempWrite.sync(yaml.safeDump(x), 'en.yml')
  await m(['en'], fixturesPath, path.dirname(tmpEn), {
    format: 'yaml'
  })
  t.deepEqual(yaml.safeLoad(fs.readFileSync(tmpEn, 'utf8')), expectedNestEn)

  const tmpJa = tempWrite.sync(yaml.safeDump(x), 'ja.yml')
  await m(['ja'], fixturesPath, path.dirname(tmpJa), {
    format: 'yaml'
  })
  t.deepEqual(yamlLoad(tmpJa), fixtures.nestJson.ja2)
})
