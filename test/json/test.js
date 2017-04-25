import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import m from '../../'
import fixtures from '../fixtures/expected'

const expectedEn = fixtures.json.en
const expectedJa = fixtures.json.ja

test('export json', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.deepEqual(en, expectedEn)
  t.deepEqual(ja, expectedJa)
})
