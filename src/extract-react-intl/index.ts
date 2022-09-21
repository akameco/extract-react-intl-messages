import path from 'path'
import glob from 'glob'
import pify from 'pify'
import merge from 'lodash.merge'
import mergeWith from 'lodash.mergewith'
import {
  resolvePlugin,
  resolvePreset,
  transformFile,
  PluginItem
} from '@babel/core'
import readBabelrcUp from 'read-babelrc-up'
import babelPluginReactIntl from 'babel-plugin-react-intl'

type LocaleMap = Record<string, Record<string, {}>>

const localeMap = (arr: string[]): LocaleMap =>
  arr.reduce((obj: Record<string, {}>, x: string) => {
    obj[x] = {}
    return obj
  }, {})

const concatArray = (obj: string[], src: string) => {
  if (Array.isArray(obj)) {
    return obj.concat(src)
  }
  return undefined
}

const createResolveList = (
  fn: (name: string, dirname: string) => string | null
) => (list: PluginItem[], cwd: string) =>
  list.map((x) => (typeof x === 'string' ? fn(x, cwd) : x))

const resolvePresets = createResolveList(resolvePreset)
const resolvePlugins = createResolveList(resolvePlugin)

const getBabelrc = (cwd: string) => {
  try {
    const babelrc = readBabelrcUp.sync({ cwd }).babel
    if (!babelrc.env) {
      return babelrc
    }

    const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'

    return mergeWith(babelrc, babelrc.env[env], concatArray)
  } catch (error) {
    return { presets: [], plugins: [] }
  }
}

const getBabelrcDir = (cwd: string) =>
  path.dirname(readBabelrcUp.sync({ cwd }).path)

const babelPluginReactIntlOptions = [
  'moduleSourceName',
  'extractSourceLocation',
  'messagesDir',
  'overrideIdFn',
  'removeDefaultMessage',
  'extractFromFormatMessageCall',
  'additionalComponentNames'
]

type Options = {
  [key: string]: unknown
  defaultLocale?: string
  cwd?: string
  withDescriptions?: boolean
}

type PartnerVariation = {
  [key: string]: string
}

type Message = {
  id: string
  defaultMessage: string
  description: string
  partners: string
  partnerVariations: PartnerVariation
}

// eslint-disable-next-line max-lines-per-function
export default async (
  locales: string[],
  pattern: string,
  {
    defaultLocale = 'en',
    withDescriptions = false,
    cwd = process.cwd(),
    ...pluginOptions
  }: Options = {}
) => {
  if (!Array.isArray(locales)) {
    throw new TypeError(`Expected a Array, got ${typeof locales}`)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof pattern}`)
  }

  const babelrc = getBabelrc(cwd) || {}
  const babelrcDir = getBabelrcDir(cwd)

  const presets = babelrc.presets || []
  const plugins = babelrc.plugins || []

  if (
    !plugins.find(
      (plugin) => (Array.isArray(plugin) ? plugin[0] : plugin) === 'react-intl'
    )
  ) {
    // Append a the `react-intl` babel plugin only when it isn’t already included in the babel config
    presets.unshift({
      plugins: [
        [
          babelPluginReactIntl,
          Object.entries(pluginOptions).reduce((acc, [key, value]) => {
            if (babelPluginReactIntlOptions.includes(key)) {
              return { ...acc, [key]: value }
            }
            return acc
          }, {})
        ]
      ]
    })
  }

  const extractFromFile = async (file: string) => {
    const babelOpts = {
      presets: resolvePresets(presets, babelrcDir),
      plugins: resolvePlugins(plugins, babelrcDir)
    }
    const { metadata } = await pify(transformFile)(file, babelOpts)
    const localeObj = localeMap(locales)
    const result = metadata['react-intl'].messages as Message[]
    for (const {
      id,
      defaultMessage,
      description,
      partners,
      partnerVariations
    } of result) {
      // eslint-disable-next-line no-unused-vars
      for (const locale of locales) {
        const message = defaultLocale === locale ? defaultMessage : ''
        localeObj[locale][id] = withDescriptions
          ? { message, description, partners, partnerVariations }
          : { message, partners, partnerVariations }
      }
    }
    return localeObj
  }

  const files: string[] = await pify(glob)(pattern)
  if (files.length === 0) {
    throw new Error(`File not found (${pattern})`)
  }
  const arr = await Promise.all(files.map(extractFromFile))
  return arr.reduce((h, obj) => merge(h, obj), localeMap(locales))
}
