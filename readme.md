# extract-react-intl-messages

[![Build Status](https://travis-ci.org/akameco/extract-react-intl-messages.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl-messages)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT License](https://img.shields.io/npm/l/nps.svg?style=flat-square)](./license)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

This package will generate json or yaml files from a glob. It will generate one file per locale, with the ids of each message defined by the [`defineMessages`](https://github.com/yahoo/react-intl/wiki/API#definemessages) function of [react-intl](https://github.com/yahoo/react-intl). The value of each of these keys will be an empty string, except for your `defaultLocale` which will be populated with the [`defaultMessage`](https://github.com/yahoo/react-intl/wiki/API#message-descriptor).

## Install

This project has a peer dependency on `babel-core`.

To use this with Babel 6, run

```
$ npm install --save-dev extract-react-intl-messages babel-core
```

To use this with Babel 7, run

```
$ npm install --save-dev extract-react-intl-messages babel-core@bridge @babel/core
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
  $ extract-messages -l=ja,en -o i18n 'src/**/*.js'
  $ extract-messages -l=ja,en -o app/translations -f yaml 'app/**/messages.js'
```

### create-react-app user

create `.babelrc` like this.

```json
{
  "presets": ["react-app"]
}
```

Run with `NODE_ENV=development`.

```
$ NODE_ENV=development extract-messages ...
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
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub><b>akameco</b></sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/extract-react-intl-messages/commits?author=akameco "Code") [⚠️](https://github.com/akameco/extract-react-intl-messages/commits?author=akameco "Tests") [📖](https://github.com/akameco/extract-react-intl-messages/commits?author=akameco "Documentation") [🚇](#infra-akameco "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/13161875?v=4" width="100px;"/><br /><sub><b>Hoan Tran</b></sub>](http://hoantran.info)<br />[💻](https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it "Code") [⚠️](https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it "Tests") | [<img src="https://avatars1.githubusercontent.com/u/3383240?v=4" width="100px;"/><br /><sub><b>giantpinkwalrus</b></sub>](https://github.com/giantpinkwalrus)<br />[💻](https://github.com/akameco/extract-react-intl-messages/commits?author=giantpinkwalrus "Code") | [<img src="https://avatars3.githubusercontent.com/u/1190640?v=4" width="100px;"/><br /><sub><b>enrique-ramirez</b></sub>](https://github.com/enrique-ramirez)<br />[📖](https://github.com/akameco/extract-react-intl-messages/commits?author=enrique-ramirez "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/163128?v=4" width="100px;"/><br /><sub><b>Stefan Gojan</b></sub>](http://stefan-gojan.de)<br />[🐛](https://github.com/akameco/extract-react-intl-messages/issues?q=author%3Ahoschi "Bug reports") [💻](https://github.com/akameco/extract-react-intl-messages/commits?author=hoschi "Code") [⚠️](https://github.com/akameco/extract-react-intl-messages/commits?author=hoschi "Tests") |
| :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
