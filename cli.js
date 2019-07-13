#!/usr/bin/env node
'use strict'
const meow = require('meow')
const fn = require('.')

const cli = meow(
  `
  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output          Output directory [require: true]
  -l, --locales         locales [require: true]
  -f, --format          json | yaml [default: json]
  -d, --default-locale  default locale
  --flat                json [default: true] | yaml [default: false]
  --delimiter           json | yaml [default: .]
  --module-name         module source name from where components are imported
  --extractFromFormatMessageCall      If set to 'true', Command will extract the messages and IDs from 'intl.formatMessage' calls

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
  $ extract-messages -l=ja,en -o app/translations -f yaml 'app/**/messages.js'
`,
  {
    flags: {
      flat: {
        type: 'boolean'
      },
      output: {
        type: 'string',
        alias: 'o'
      },
      locales: {
        type: 'string',
        alias: 'l'
      },
      format: {
        type: 'string',
        alias: 'f',
        default: 'json'
      },
      'default-locale': {
        type: 'string',
        alias: 'd'
      },
      delimiter: {
        type: 'string',
        default: '.'
      },
      'module-name': {
        type: 'string'
      },
      extractFromFormatMessageCall: {
        type: 'boolean'
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

fn(localesMap, cli.input[0], output, cli.flags)
