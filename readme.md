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

extract-intl.js

```js
const extractReactIntlMessages = require('extract-react-intl-messages')

const input = 'app/**/!(*.test).js'
const buildDir = 'app/translations'

extractReactIntlMessages(['en', 'ja'], input, buildDir, { flat: false }).then(() => {
  console.log('finish')
})
```

```
$ node extract-intl.js
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
