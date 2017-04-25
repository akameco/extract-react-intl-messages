'use strict'
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const merge = require('lodash.merge')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const extractReactIntl = require('extract-react-intl')

function loadLocaleFiles(locales, buildDir) {
  const oldLocaleMaps = {}
  mkdirp.sync(buildDir)
  for (const locale of locales) {
    const file = path.resolve(buildDir, `${locale}.json`)
    // Initialize json file
    try {
      fs.writeFileSync(file, '{}', { flag: 'wx' })
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
    const messages = loadJsonFile.sync(file)
    oldLocaleMaps[locale] = {}
    for (const messageKey of Object.keys(messages)) {
      const message = messages[messageKey]
      if (message && typeof message === 'string' && message !== '') {
        oldLocaleMaps[locale][messageKey] = messages[messageKey]
      }
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
    return Promise.all(
      locales.map(locale => {
        // If the default locale, overwrite the origin file
        const localeMap = locale === defaultLocale
          ? merge(oldLocaleMaps[locale], newLocaleMaps[locale])
          : merge(newLocaleMaps[locale], oldLocaleMaps[locale])
        return writeJsonFile(`${buildDir}/${locale}.json`, localeMap, {
          indent: 2
        })
      })
    )
  })
}
