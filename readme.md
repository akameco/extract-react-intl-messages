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
const pattern = 'app/**/!(*.test).js'
const buildDir = 'app/translations'
const defaultLocale = 'en'

extractReactIntlMessages(locales, pattern, buildDir, defaultLocale).then(() => {
  console.log('finish')
})
```


## API

### extractReactIntlMessages(locales, pattern, buildDir, defaultLocale)

#### locales

Type: `Array<string>`

Example: `['en', 'ja']`

#### pattern

Type: `Array<string>`

Target files.
glob.

#### buildDir

Type: `string`

Export directory.

#### defaultLocale

Type: `string`<br>
Default: `en`

## License

MIT © [akameco](http://akameco.github.io)
