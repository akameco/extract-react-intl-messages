import React from 'react'
import { useIntl } from 'react-intl'

export const SubmitButton = () => {
  const intl = useIntl()
  const label = intl.formatMessage({
    id: 'a.submit',
    defaultMessage: 'Submit Button'
  })
  return <button aria-label={label}>{label}</button>
}
