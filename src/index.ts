import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import pick from 'lodash.pick'
import pickBy from 'lodash.pickby'
import mapValues from 'lodash.mapvalues'
import yaml from 'js-yaml'
import pify from 'pify'
import { flatten, unflatten } from 'flat'
import loadJsonFile from 'load-json-file'
import writeJsonFile from 'write-json-file'
import sortKeys from 'sort-keys'
import _extractReactIntl from './extract-react-intl'

const writeJson = (outputPath: string, obj: object) => {
  return writeJsonFile(`${outputPath}.json`, obj, { indent: 2 })
}

const writeYaml = (outputPath: string, obj: object) => {
  return pify(fs.writeFile)(`${outputPath}.yml`, yaml.safeDump(obj), 'utf8')
}

const isJson = (ext: string) => ext === 'json'

function loadLocaleFiles(locales: string[], buildDir: string, ext: string) {
  const oldLocaleMaps: Record<string, Record<string, object>> = {}

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

type Opts = {
  [key: string]: unknown
  defaultLocale: string
  format?: string
  flat?: boolean
  overwriteDefault?: boolean
}

// eslint-disable-next-line max-lines-per-function
const extractMessage = async (
  locales: string[],
  pattern: string,
  buildDir: string,
  {
    format = 'json',
    flat = isJson(format),
    defaultLocale = 'en',
    overwriteDefault = true,
    ...opts
  }: Opts = {
    defaultLocale: 'en'
  }
) => {
  if (!Array.isArray(locales)) {
    throw new TypeError(`Expected a Array, got ${typeof locales}`)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof pattern}`)
  }

  if (typeof buildDir !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof buildDir}`)
  }

  const ext = isJson(format) ? 'json' : 'yml'

  const oldLocaleMaps = loadLocaleFiles(locales, buildDir, ext)

  const extractorOptions = {
    defaultLocale,
    withDescriptions: false,
    cwd: process.cwd(),
    extractFromFormatMessageCall: true,
    ...opts
  }

  const newLocaleMaps = await _extractReactIntl(
    locales,
    pattern,
    extractorOptions
  )

  return Promise.all(
    locales.map((locale) => {
      // If the default locale, overwrite the origin file
      let localeMap =
        locale === defaultLocale && overwriteDefault
          ? // Create a clone so we can use only current valid messages below
            { ...oldLocaleMaps[locale], ...newLocaleMaps[locale] }
          : { ...newLocaleMaps[locale], ...oldLocaleMaps[locale] }
      // Only keep existing keys
      localeMap = pick(localeMap, Object.keys(newLocaleMaps[locale]))

      const fomattedLocaleMap: object = flat
        ? sortKeys(flatten(mapValues(localeMap, (a) => a.message)), {
            deep: true
          })
        : sortKeys(unflatten(localeMap, { object: true }), { deep: true })

      const fomattedPartnerVariationMap = {}
      const partnerVariationMap = pickBy(
        mapValues(localeMap, (a) => a.partnerVariations),
        (a) => a
      )
      for (const [key, value] of Object.entries(partnerVariationMap)) {
        for (const [partnerKey, partnerValue] of Object.entries(value)) {
          Object.assign(fomattedPartnerVariationMap, {
            [partnerKey]: {
              ...fomattedPartnerVariationMap[partnerKey],
              [key]: partnerValue
            }
          })
        }
      }
      const partnerMap = sortKeys(localeMap, { deep: true })
      for (const key in partnerMap) {
        if (key) {
          partnerMap[key] = partnerMap[key].partners
        }
      }
      const fn = isJson(format) ? writeJson : writeYaml

      return Promise.all([
        fn(path.default.resolve(buildDir, locale), fomattedLocaleMap),
        Object.keys(fomattedPartnerVariationMap).map((partnerKey) =>
          fn(
            path_1.default.resolve(
              buildDir,
              `${locale}__[partner]${partnerKey}`
            ),
            sort_keys_1.default(fomattedPartnerVariationMap[partnerKey], {
              deep: true
            })
          )
        ),
        fn(
          path_1.default.resolve(
            buildDir,
            '..',
            '..',
            'partners',
            'partner-strings'
          ),
          partnerMap
        )
      ])
    })
  )
}

extractMessage.extractReactIntl = _extractReactIntl

export default extractMessage

// For CommonJS default export support
module.exports = extractMessage
module.exports.default = extractMessage
