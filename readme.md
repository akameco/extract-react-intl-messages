# extract-react-intl

[![Build Status](https://travis-ci.org/akameco/extract-react-intl.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

> Extract react-intl messages

## Install

```
$ yarn add --dev extract-react-intl
```

## Usage

```js
const extractReactIntl = require('extract-react-intl')

const pattern = 'app/**/*.js'
const locales = ['en', 'ja']

extractReactIntl(locales, pattern).then(result => {
  console.log(result)
  /*
{
  en:
   { 'components/App/hello': 'hello',
     'components/App/welcome': 'welcome to extract-react-intl' }
  ja:
   { 'components/App/hello': '',
     'components/App/world': '' }
}
  */
})
```

## API

### extractReactIntl(locales, pattern, [options])

Return a `Promise` wrapped extracted messages.

#### locales

Type: `Array<string>`

Example: `['en', 'ja']`

#### pattern

Type: `string`

File path with glob.

#### options

Additional options.

#### defaultLocale

Type: `string`<br> Default: `en`

Set default locale for your app.

##### cwd

Type: `string`<br> Default: `.`

**You most likely don't need this.**

Change run path.

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub><b>akameco</b></sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/extract-react-intl/commits?author=akameco "Code") [📖](https://github.com/akameco/extract-react-intl/commits?author=akameco "Documentation") [⚠️](https://github.com/akameco/extract-react-intl/commits?author=akameco "Tests") [🚇](#infra-akameco "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars0.githubusercontent.com/u/27622?v=4" width="100px;"/><br /><sub><b>nodaguti</b></sub>](http://about.me/nodaguti)<br />[💻](https://github.com/akameco/extract-react-intl/commits?author=nodaguti "Code") [⚠️](https://github.com/akameco/extract-react-intl/commits?author=nodaguti "Tests") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
