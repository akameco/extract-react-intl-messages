# extract-react-intl [![Build Status](https://travis-ci.org/akameco/extract-react-intl.svg?branch=master)](https://travis-ci.org/akameco/extract-react-intl)

> Extract react-intl messages


## Install

```
$ yarn add --dev extract-react-intl
```


## Usage

```js
const extractReactIntl = require('extract-react-intl');

const pattern = 'app/**/*.js';
const locales = ['en', 'ja'];

extractReactIntl(locales, pattern).then(result => {
  console.log(result);
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
});
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

Type: `string`<br>
Default: `en`

Set default locale for your app.

##### cwd

Type: `string`<br>
Default: `.`

**You most likely don't need this.**

Change run path.

## License

MIT © [akameco](http://akameco.github.io)
