# extract-react-intl-messages [![Build Status](https://travis-ci.org/akameco/extract-react-intl-messages.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl-messages)

> Extract react-intl messages


## Install

```
$ npm install --save-dev extract-react-intl-messages
```

## Usage

app/components/App/messages.js

```js
import { defineMessages } from 'react-intl'

export default defineMessages({
  hello: {
    id: 'a.hello',
    defaultMessage: 'hello'
  },
  world: {
    id: 'a.world',
    defaultMessage: 'world'
  }
})
```


### Run Script

```
$ extract-messages -l=en,ja -o app/translations -d en --flat false 'app/**/!(*.test).js'
```

### Output

app/translations/en.json

```json
{
  "a": {
    "hello": "hello",
    "world": "world"
  },
  "b": {
    "hello": "hello",
    "world": "world"
  }
}
```

app/translations/ja.json

```json
{
  "a": {
    "hello": "",
    "world": ""
  },
  "b": {
    "hello": "",
    "world": ""
  }
}
```

## Recommend

Use with [babel-plugin-react-intl-auto: i18n for the component age. Auto management react-intl ID.](https://github.com/akameco/babel-plugin-react-intl-auto)

## CLI

```console
$ extract-messages --help

  Extract react-intl messages

  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output       Output directory [require: true]
  -l, --locales      locales [require: true]
  -f, --format       json|yaml [default: json]
  --flat             json [default: true] | yaml [default: false]
  --default-locale   default locale [default: en]

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
  $ extract-messages -l=ja,en -o app/translations -f yaml 'app/**/messages.js'
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
