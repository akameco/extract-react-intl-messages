# extract-react-intl-messages

[![test](https://github.com/akameco/extract-react-intl-messages/workflows/test/badge.svg)](https://github.com/akameco/extract-react-intl-messages/actions?query=workflow%3Atest)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT License](https://img.shields.io/npm/l/nps.svg?style=flat-square)](./license)
[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors-)

This package will generate json or yaml files from a glob. It will generate one file per locale, with the ids of each message defined by the [`defineMessages`](https://github.com/yahoo/react-intl/wiki/API#definemessages) function of [react-intl](https://github.com/yahoo/react-intl). The value of each of these keys will be an empty string, except for your `defaultLocale` which will be populated with the [`defaultMessage`](https://github.com/yahoo/react-intl/wiki/API#message-descriptor).

## Dependencies

### Babel

- 0.x works with Babel 6

## Install

```
$ npm install --save-dev extract-react-intl-messages
```

## Usage

app/components/App/messages.js

```js
import { defineMessages, useIntl } from 'react-intl'

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

export const SubmitButton = () => {
  const intl = useIntl()
  const label = intl.formatMessage({
    id: 'a.submit',
    defaultMessage: 'Submit Button'
  })
  return <button aria-label={label}>{label}</button>
}
```

### Run Script

```
$ extract-messages -l=en,ja -o app/translations -d en --flat false './app/**/!(*.test).js'
```

### Output

app/translations/en.json

```json
{
  "a": {
    "hello": "hello",
    "world": "world",
    "submit": "Submit Button"
  }
}
```

app/translations/ja.json

```json
{
  "a": {
    "hello": "",
    "world": "",
    "submit": ""
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
  -o, --output            Output directory [require: true]
  -l, --locales           locales [require: true]
  -f, --format            json | yaml [default: json]
  -d, --defaultLocale     default locale
  --overwriteDefault      default: false
  --flat                  json [default: true] | yaml [default: false]

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

### TypeScript

babel required.

See [example/with-typescript](example/with-typescript)

```
npm install --save-dev @babel/core @babel/preset-typescript @babel/preset-react
```

`babel.config.js`

```js
module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['@babel/preset-react', '@babel/preset-typescript']
  }
}
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

##### overwriteDefault

Type: `boolean`<br>
Default: true

If overwriteDefault is `false`, it will not overwrite messages in the default locale.

##### flat

Type: `boolean`<br>
Default: `true`

If format is `yaml`, set to `false`.

Be careful if `false`.
See [this issue](https://github.com/akameco/extract-react-intl-messages/issues/3).

##### babel-plugin-react-intl's Options

See https://github.com/formatjs/formatjs/tree/master/packages/babel-plugin-react-intl#options

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://akameco.github.io"><img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;" alt=""/><br /><sub><b>akameco</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=akameco" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=akameco" title="Tests">⚠️</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=akameco" title="Documentation">📖</a> <a href="#infra-akameco" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://hoantran.info"><img src="https://avatars3.githubusercontent.com/u/13161875?v=4" width="100px;" alt=""/><br /><sub><b>Hoan Tran</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoantran-it" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/giantpinkwalrus"><img src="https://avatars1.githubusercontent.com/u/3383240?v=4" width="100px;" alt=""/><br /><sub><b>giantpinkwalrus</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=giantpinkwalrus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/enrique-ramirez"><img src="https://avatars3.githubusercontent.com/u/1190640?v=4" width="100px;" alt=""/><br /><sub><b>enrique-ramirez</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=enrique-ramirez" title="Documentation">📖</a></td>
    <td align="center"><a href="http://stefan-gojan.de"><img src="https://avatars2.githubusercontent.com/u/163128?v=4" width="100px;" alt=""/><br /><sub><b>Stefan Gojan</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/issues?q=author%3Ahoschi" title="Bug reports">🐛</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoschi" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=hoschi" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://lithe.net"><img src="https://avatars1.githubusercontent.com/u/857744?v=4" width="100px;" alt=""/><br /><sub><b>Solomon English</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=solomon23" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Filson14"><img src="https://avatars1.githubusercontent.com/u/4540538?v=4" width="100px;" alt=""/><br /><sub><b>Filip "Filson" Pasternak</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=Filson14" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://about.me/nodaguti"><img src="https://avatars0.githubusercontent.com/u/27622?v=4" width="100px;" alt=""/><br /><sub><b>nodaguti</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=nodaguti" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=nodaguti" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/fix-fix"><img src="https://avatars1.githubusercontent.com/u/11943024?v=4" width="100px;" alt=""/><br /><sub><b>fix-fix</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=fix-fix" title="Code">💻</a></td>
    <td align="center"><a href="http://bradbarrow.com"><img src="https://avatars3.githubusercontent.com/u/1264276?v=4" width="100px;" alt=""/><br /><sub><b>bradbarrow</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/issues?q=author%3Abradbarrow" title="Bug reports">🐛</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=bradbarrow" title="Code">💻</a> <a href="https://github.com/akameco/extract-react-intl-messages/commits?author=bradbarrow" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://ddem.us/"><img src="https://avatars1.githubusercontent.com/u/290457?v=4" width="100px;" alt=""/><br /><sub><b>Gregor MacLennan</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=gmaclennan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zarv1k"><img src="https://avatars1.githubusercontent.com/u/6296643?v=4" width="100px;" alt=""/><br /><sub><b>Dmitry Zarva</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=zarv1k" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/panpanc"><img src="https://avatars2.githubusercontent.com/u/29132669?v=4" width="100px;" alt=""/><br /><sub><b>Michael Pan</b></sub></a><br /><a href="#example-panpanc" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/testower"><img src="https://avatars2.githubusercontent.com/u/231492?v=4" width="100px;" alt=""/><br /><sub><b>Tom Erik Støwer</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=testower" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://nextbook.io"><img src="https://avatars0.githubusercontent.com/u/20876627?v=4" width="100px;" alt=""/><br /><sub><b>Bart Lens</b></sub></a><br /><a href="https://github.com/akameco/extract-react-intl-messages/commits?author=lensbart" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/revskill10"><img src="https://avatars3.githubusercontent.com/u/1390196?v=4" width="100px;" alt=""/><br /><sub><b>Truong Hoang Dung</b></sub></a><br /><a href="#example-revskill10" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
