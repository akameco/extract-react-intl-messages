#!/usr/bin/env node
 
import meow from 'meow'
import extractMessage from './index.js'

const cli = meow(
  `
  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output            Output directory [require: true]
  -l, --locales           locales [require: true]
  -f, --format            json | yaml [default: json]
  -d, --default-locale    default locale
  --overwriteDefault      [default: true]
  --flat                  json [default: true] | yaml [default: false]
  --cache                 [default: false]
  --cacheLocation         [default: .extract-react-intl-messages-cache]
  --indent                default: 2

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
  $ extract-messages -l=ja,en -o app/translations -f yaml 'app/**/messages.js'
`,
  {
    importMeta: import.meta,
    flags: {
      flat: {
        type: 'boolean'
      },
      output: {
        type: 'string',
        shortFlag: 'o'
      },
      locales: {
        type: 'string',
        shortFlag: 'l'
      },
      format: {
        type: 'string',
        shortFlag: 'f',
        default: 'json'
      },
      defaultLocale: {
        type: 'string',
        shortFlag: 'd'
      },
      overwriteDefault: {
        type: 'boolean',
        default: true
      },
      withDescriptions: {
        type: 'boolean',
        default: false
      },
      // babel-plugin-react-intl boolean options
      extractSourceLocation: {
        type: 'boolean',
        default: false
      },
      removeDefaultMessage: {
        type: 'boolean'
      },
      extractFromFormatMessageCall: {
        type: 'boolean',
        default: true
      },
      indent: {
        type: 'number',
        default: 2
      }
    }
  }
)

const { output, locales } = cli.flags

if (!output) {
  console.log('ERROR: required output')
  process.exit(1)
}

if (!locales || typeof locales !== 'string') {
  console.log('ERROR: required locales')
  process.exit(1)
}

const localesMap = locales.split(',')

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
extractMessage(localesMap, cli.input[0], output, cli.flags as any)
