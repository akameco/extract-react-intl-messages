import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import m from '../../'

const expectedEn = {
  'a/hello': 'hello',
  'a/world': 'world',
  'b/hello': 'hello',
  'b/world': 'world'
}

const expectedJa = {
  'a/hello': '',
  'a/world': '',
  'b/hello': '',
  'b/world': ''
}

test('export json', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/json/fixtures/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.deepEqual(en, expectedEn)
  t.deepEqual(ja, expectedJa)
})
