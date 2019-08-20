// eslint-disable-next-line import/no-extraneous-dependencies
import { defineMessages, injectIntl } from 'react-intl'

export const SubmitButton = injectIntl(({ intl }) => {
  const label = intl.formatMessage({
    id: 'a.submit',
    defaultMessage: 'Submit Button'
  })
  return <button aria-label={label}>{label}</button>
})

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
