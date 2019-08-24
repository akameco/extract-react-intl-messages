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

#### moduleSourceName

Type: `string`<br> Example: `./path/to/module` <br> Default: `react-intl`

The ES6 module source name of the React Intl package. Defines from where _defineMessages_, `<FormattedMessage />` and `<FormattedHTMLMessage />` are imported.

##### cwd

Type: `string`<br> Default: `.`

**You most likely don't need this.**

Change run path.
