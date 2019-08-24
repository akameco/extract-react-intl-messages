# extract-react-intl

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
