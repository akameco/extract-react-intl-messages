'use strict'
const path = require('path')
const fs = require('fs')
const merge = require('lodash.merge')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const extractReactIntl = require('extract-react-intl')

function loadLocaleFiles(locales, buildDir) {
  const oldLocaleMaps = {}
  for (const locale of locales) {
    const file = path.resolve(buildDir, `${locale}.json`)
    // Initialize json file
    fs.writeFileSync(file, {}, { flag: 'wx' })
    const messages = loadJsonFile.sync(file)
    oldLocaleMaps[locale] = {}
    for (const messageKey of Object.keys(messages)) {
      oldLocaleMaps[locale][messageKey] = messages[messageKey]
    }
  }
  return oldLocaleMaps
}

module.exports = (locales, pattern, buildDir, defaultLocale) => {
  if (!Array.isArray(locales)) {
    return Promise.reject(
      new TypeError(`Expected a Array, got ${typeof locales}`)
    )
  }

  if (typeof pattern !== 'string') {
    return Promise.reject(
      new TypeError(`Expected a string, got ${typeof pattern}`)
    )
  }

  if (typeof buildDir !== 'string') {
    return Promise.reject(
      new TypeError(`Expected a string, got ${typeof buildDir}`)
    )
  }

  defaultLocale = defaultLocale || 'en'
  const oldLocaleMaps = loadLocaleFiles(locales, buildDir)

  return extractReactIntl(locales, pattern, {
    defaultLocale
  }).then(newLocaleMaps => {
    const localeMaps = merge(newLocaleMaps, oldLocaleMaps)
    return Promise.all(
      locales.map(locale =>
        writeJsonFile(`${buildDir}/${locale}.json`, localeMaps[locale], {
          indent: 2
        })
      )
    )
  })
}
