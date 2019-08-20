// @flow
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Greeting from '../Greeting'
import messages from './messages'

injectIntl(({ intl }) => {
  const label = intl.formatMessage({ defaultMessage: "Submit button" })

  return <button aria-label={label}>{label}</button>
});


export default class App extends Component {
  render() {
    const user = {
      name: 'Eric',
      unreadCount: 4,
      lastLoginTime: Date.now() - 1000 * 60 * 60 * 24
    }

    return (
      <div>
        <FormattedMessage {...messages.hello} />
        <Greeting user={user} />
      </div>
    )
  }
}
