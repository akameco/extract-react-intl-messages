'use strict'
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const merge = require('lodash.merge')
const yaml = require('js-yaml')
const pify = require('pify')
const { flatten, unflatten } = require('flat')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const extractReactIntl = require('extract-react-intl')

const writeJson = (outputPath, obj) => {
  return writeJsonFile(`${outputPath}.json`, obj, { indent: 2 })
}

const writeYaml = (outputPath, obj) => {
  return pify(fs.writeFile)(`${outputPath}.yml`, yaml.safeDump(obj), 'utf8')
}

function loadLocaleFiles(locales, buildDir, ext) {
  const oldLocaleMaps = {}

  try {
    mkdirp.sync(buildDir)
  } catch (err) {}

  for (const locale of locales) {
    const file = path.resolve(buildDir, `${locale}.${ext}`)
    // Initialize json file
    try {
      fs.writeFileSync(file, '{}', { flag: 'wx' })
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }

    let messages = ext === 'json'
      ? loadJsonFile.sync(file)
      : yaml.safeLoad(fs.readFileSync(file, 'utf8'), { json: true })

    messages = flatten(messages)

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

module.exports = (locales, pattern, buildDir, opts) => {
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

  opts = Object.assign(
    {
      defaultLocale: 'en',
      format: 'json',
      flat: true
    },
    opts
  )

  opts.flat = opts.format !== 'yaml'
  const ext = opts.format === 'yaml' ? 'yml' : 'json'

  const { defaultLocale } = opts

  const oldLocaleMaps = loadLocaleFiles(locales, buildDir, ext)

  return extractReactIntl(locales, pattern, {
    defaultLocale
  }).then(newLocaleMaps => {
    return Promise.all(
      locales.map(locale => {
        // If the default locale, overwrite the origin file
        const localeMap = locale === defaultLocale
          ? merge(oldLocaleMaps[locale], newLocaleMaps[locale])
          : merge(newLocaleMaps[locale], oldLocaleMaps[locale])

        const outputPath = path.resolve(buildDir, locale)

        const fomattedLocaleMap = opts.flat ? localeMap : unflatten(localeMap)

        if (opts.format === 'yaml') {
          return writeYaml(outputPath, fomattedLocaleMap)
        }
        return writeJson(outputPath, fomattedLocaleMap)
      })
    )
  })
}
