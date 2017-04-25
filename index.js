'use strict'
const glob = require('glob')
const pify = require('pify')
const merge = require('lodash.merge')
const { transformFile } = require('babel-core')
const readBabelrcUp = require('read-babelrc-up')

const localeMap = arr =>
  arr.reduce((obj, x) => {
    obj[x] = {}
    return obj
  }, {})

module.exports = (locales, pattern, opts) => {
  if (!Array.isArray(locales)) {
    Promise.reject(new TypeError(`Expected a Array, got ${typeof locales}`))
  }

  if (typeof pattern !== 'string') {
    Promise.reject(new TypeError(`Expected a string, got ${typeof pattern}`))
  }

  opts = Object.assign(
    {
      cwd: process.cwd(),
      defaultLocale: 'en',
    },
    opts
  )

  const { babel: { presets, plugins } } = readBabelrcUp.sync({
    cwd: opts.cwd,
  })

  plugins.push(require('babel-plugin-react-intl').default)

  const extractFromFile = file => {
    return pify(transformFile)(file, {
      presets,
      plugins,
    }).then(({ metadata: result }) => {
      const localeObj = localeMap(locales)
      for (const { id, defaultMessage } of result['react-intl'].messages) {
        for (const locale of locales) {
          localeObj[locale][id] = opts.defaultLocale === locale
            ? defaultMessage
            : ''
        }
      }
      return localeObj
    })
  }

  return pify(glob)(pattern)
    .then(files => Promise.all(files.map(extractFromFile)))
    .then(arr => arr.reduce((h, obj) => merge(h, obj), localeMap(locales)))
}
