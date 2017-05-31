import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import m from '../../'

test('export json', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('export json - nest', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/**/*.js', tmp, { flat: false })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})
