# extract-react-intl-messages [![Build Status](https://travis-ci.org/akameco/extract-react-intl-messages.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl-messages)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

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
  --delimiter        json | yaml [default: .]

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

Be careful if `false`.
See [this issue](https://github.com/akameco/extract-react-intl-messages/issues/3).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub>akameco</sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/extract-react-intl-messages/commits?author=akameco "Code") [⚠️](https://github.com/akameco/extract-react-intl-messages/commits?author=akameco "Tests") [📖](https://github.com/akameco/extract-react-intl-messages/commits?author=akameco "Documentation") [🚇](#infra-akameco "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/13161875?v=4" width="100px;"/><br /><sub>Hoan Tran</sub>](http://hoantran.info)<br />[💻](https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it "Code") [⚠️](https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it "Tests") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
