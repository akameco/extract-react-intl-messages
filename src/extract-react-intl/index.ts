import path from 'path'
import glob from 'glob'
import pify from 'pify'
import merge from 'lodash.merge'
import deepmerge from 'deepmerge'
import {
  resolvePlugin,
  resolvePreset,
  transformFile,
  PluginItem
} from '@babel/core'
import readBabelrcUp from 'read-babelrc-up'
import babelPluginReactIntl from 'babel-plugin-react-intl'
import fileEntryCache, { FileDescriptor } from 'file-entry-cache'

type LocaleMap = Record<string, Record<string, unknown>>

const localeMap = (arr: string[]): LocaleMap =>
  arr.reduce((obj: LocaleMap, x: string) => {
    obj[x] = {}
    return obj
  }, {})


const createResolveList =
  (fn: (name: string, dirname: string) => string | null) =>
  (list: PluginItem[], cwd: string) =>
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

    return deepmerge(babelrc, babelrc.env[env] || {})
  } catch {
    return { presets: [], plugins: [] }
  }
}

const getBabelrcDir = (cwd: string) =>
  path.dirname(readBabelrcUp.sync({ cwd }).path)

const babelPluginReactIntlOptions = new Set([
  'moduleSourceName',
  'extractSourceLocation',
  'messagesDir',
  'overrideIdFn',
  'removeDefaultMessage',
  'extractFromFormatMessageCall',
  'additionalComponentNames'
])

type Options = {
  [key: string]: unknown
  defaultLocale?: string
  cwd?: string
  cache?: boolean
  cacheLocation?: string
  withDescriptions?: boolean
}

type Message = {
  id: string
  defaultMessage: string
  description: string
}

type CacheData = {
  defaultLocale: string
  localeMap: LocaleMap
}

type File = FileDescriptor & {
  meta: {
    data: CacheData
  }
}

export default async (
  locales: string[],
  pattern: string,
  {
    defaultLocale = 'en',
    withDescriptions = false,
    cwd = process.cwd(),
    cache: cacheEnabled = false,
    cacheLocation = '.extract-react-intl-messages-cache',
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
      (plugin: PluginItem) => (Array.isArray(plugin) ? plugin[0] : plugin) === 'react-intl'
    )
  ) {
    // Append a the `react-intl` babel plugin only when it isn’t already included in the babel config
    presets.unshift({
      plugins: [
        [
          babelPluginReactIntl,
          Object.entries(pluginOptions).reduce((acc, [key, value]) => {
            if (babelPluginReactIntlOptions.has(key)) {
              return { ...acc, [key]: value }
            }
            return acc
          }, {})
        ]
      ]
    })
  }

  const files: string[] = await pify(glob)(pattern)
  if (files.length === 0) {
    throw new Error(`File not found (${pattern})`)
  }

  const cachePath = path.resolve(cacheLocation)
  const cacheDirname = path.dirname(cachePath)
  const cacheBasename = path.basename(cachePath)

  const cache = cacheEnabled
    ? fileEntryCache.create(cacheBasename, cacheDirname)
    : null

  const extractFromFile = async (file: string) => {
    const babelOpts = {
      presets: resolvePresets(presets, babelrcDir),
      plugins: resolvePlugins(plugins, babelrcDir)
    }
    const { metadata } = await pify(transformFile)(file, babelOpts)
    const localeObj = localeMap(locales)
    const result = metadata['react-intl'].messages as Message[]
    for (const { id, defaultMessage, description } of result) {
      for (const locale of locales) {
        const message = defaultLocale === locale ? defaultMessage : ''
        localeObj[locale][id] = withDescriptions
          ? { message, description }
          : message
      }
    }
    return localeObj
  }

  const extractFromCache = async (file: string) => {
    if (cache === null) {
      return extractFromFile(file)
    }

    const cachedLocaleObj = cache?.getFileDescriptor(file) as File | undefined
    const changed = cachedLocaleObj?.changed
    const data = cachedLocaleObj?.meta.data

    if (changed === false && data?.defaultLocale === defaultLocale) {
      return data.localeMap
    }

    const localeObj = await extractFromFile(file)

    if (cachedLocaleObj) {
      cachedLocaleObj.meta.data = { defaultLocale, localeMap: localeObj }
    }

    return localeObj
  }

  const extract = cacheEnabled ? extractFromCache : extractFromFile

  const arr = await Promise.all(files.map(extract))

  if (cache) {
    cache.reconcile()
  }

  return arr.reduce((h, obj) => merge(h, obj), localeMap(locales))
}
