import fs from 'fs'
import path from 'path'
import test from 'ava'
import tempy from 'tempy'
import m from '../..'

test('export json', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('export json with removed messages', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp)
  const enBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8')
  )
  const jaBefore = JSON.parse(
    fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8')
  )
  t.snapshot(enBefore)
  t.snapshot(jaBefore)
  await m(['en', 'ja'], 'test/fixtures/removed/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('export json - nest', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp, { flat: false })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})

test('sort keys', async t => {
  const tmp = tempy.directory()
  const enPath = path.resolve(tmp, 'en.json')
  const jaPath = path.resolve(tmp, 'ja.json')

  await m(['en', 'ja'], 'test/fixtures/unsorted/**/*.js', tmp)
  const en = JSON.parse(fs.readFileSync(enPath))
  const ja = JSON.parse(fs.readFileSync(jaPath))

  t.snapshot(Object.keys(en))
  t.snapshot(Object.keys(ja))
})

test('delimiter - nest', async t => {
  const tmp = tempy.directory()
  await m(['en', 'ja'], 'test/fixtures/default/**/*.js', tmp, {
    flat: false,
    delimiter: '_'
  })
  const en = JSON.parse(fs.readFileSync(path.resolve(tmp, 'en.json'), 'utf8'))
  const ja = JSON.parse(fs.readFileSync(path.resolve(tmp, 'ja.json'), 'utf8'))
  t.snapshot(en)
  t.snapshot(ja)
})
