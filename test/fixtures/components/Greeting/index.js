// @flow
import React, { Component } from 'react'
import {
  FormattedMessage,
  FormattedNumber,
  FormattedRelative
} from 'react-intl'
import messages from './messages'

type Props = {
  user: {
    name: string,
    unreadCount: number,
    lastLoginTime: number
  }
}

export default class Greeting extends Component {
  props: Props

  render() {
    const { user } = this.props

    return (
      <p>
        <FormattedMessage
          {...messages.welcome}
          values={{
            name: <b>{user.name}</b>,
            unreadCount: user.unreadCount,
            formattedUnreadCount: (
              <b>
                <FormattedNumber value={user.unreadCount} />
              </b>
            ),
            formattedLastLoginTime: (
              <FormattedRelative value={user.lastLoginTime} />
            )
          }}
        />
      </p>
    )
  }
}

function defaultMessage() {
  return 'hello'
}
