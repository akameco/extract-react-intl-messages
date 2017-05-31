# extract-react-intl-messages [![Build Status](https://travis-ci.org/akameco/extract-react-intl-messages.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl-messages)

> Extract react-intl messages


## Install

```
$ npm install --save-dev extract-react-intl-messages
```


## Usage

```js
const extractReactIntlMessages = require('extract-react-intl-messages')

const locales = ['en', 'ja']
const input = 'app/**/!(*.test).js'
const buildDir = 'app/translations'

extractReactIntlMessages(locales, input, buildDir, { format: 'yaml' }).then(() => {
  console.log('finish')
})
```


## API

### extractReactIntlMessages(locales, input, buildDir, [options])

#### locales

Type: `Array<string>`

Example: `['en', 'ja']`

#### input

Type: `Array<string>`

Target files.
glob.

#### buildDir

Type: `string`

Export directory.

#### options

##### defaultLocale

Type: `string`<br>
Default: `en`

##### format

Type: `json` | `yaml`<br>
Default: `json`

Set extension to output.

##### flat
Type: `boolean`<br>
Default: `true`

If format is `yaml`, set to `false`.

## License

MIT © [akameco](http://akameco.github.io)
