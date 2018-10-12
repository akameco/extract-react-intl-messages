'use strict'
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const pick = require('lodash.pick')
const yaml = require('js-yaml')
const pify = require('pify')
const { flatten, unflatten } = require('flat')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const extractReactIntl = require('extract-react-intl')
const sortKeys = require('sort-keys')

const writeJson = (outputPath, obj) => {
  return writeJsonFile(`${outputPath}.json`, obj, { indent: 2 })
}

const writeYaml = (outputPath, obj) => {
  return pify(fs.writeFile)(`${outputPath}.yml`, yaml.safeDump(obj), 'utf8')
}

const isJson = ext => ext === 'json'

function loadLocaleFiles(locales, buildDir, ext, delimiter) {
  const oldLocaleMaps = {}

  try {
    mkdirp.sync(buildDir)
  } catch (error) {}

  for (const locale of locales) {
    const file = path.resolve(buildDir, `${locale}.${ext}`)
    // Initialize json file
    try {
      const output = isJson(ext) ? JSON.stringify({}) : yaml.safeDump({})
      fs.writeFileSync(file, output, { flag: 'wx' })
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }

    let messages = isJson(ext)
      ? loadJsonFile.sync(file)
      : yaml.safeLoad(fs.readFileSync(file, 'utf8'), { json: true })

    messages = flatten(messages, { delimiter })

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

module.exports = async (locales, pattern, buildDir, opts) => {
  if (!Array.isArray(locales)) {
    throw new TypeError(`Expected a Array, got ${typeof locales}`)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof pattern}`)
  }

  if (typeof buildDir !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof buildDir}`)
  }

  const jsonOpts = { format: 'json', flat: true }
  const yamlOpts = { format: 'yaml', flat: false }
  const defautlOpts =
    opts && opts.format && !isJson(opts.format) ? yamlOpts : jsonOpts

  opts = { defaultLocale: 'en', ...defautlOpts, ...opts }

  const ext = isJson(opts.format) ? 'json' : 'yml'

  const { defaultLocale } = opts

  const delimiter = opts.delimiter ? opts.delimiter : '.'

  const oldLocaleMaps = loadLocaleFiles(locales, buildDir, ext, delimiter)

  const newLocaleMaps = await extractReactIntl(locales, pattern, {
    defaultLocale
  })

  return Promise.all(
    locales.map(locale => {
      // If the default locale, overwrite the origin file
      let localeMap =
        locale === defaultLocale
          ? // Create a clone so we can use only current valid messages below
            { ...oldLocaleMaps[locale], ...newLocaleMaps[locale] }
          : { ...newLocaleMaps[locale], ...oldLocaleMaps[locale] }
      // Only keep existing keys
      localeMap = pick(localeMap, Object.keys(newLocaleMaps[locale]))

      const fomattedLocaleMap = opts.flat
        ? sortKeys(localeMap, { deep: true })
        : unflatten(sortKeys(localeMap), { delimiter })

      const fn = isJson(opts.format) ? writeJson : writeYaml

      return fn(path.resolve(buildDir, locale), fomattedLocaleMap)
    })
  )
}
