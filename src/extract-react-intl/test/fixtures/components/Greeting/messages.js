// @flow
import { defineMessages } from 'react-intl'

export default defineMessages({
  // Welcome message description
  welcome: {
    id: 'components/Greeting/welcome',
    defaultMessage: `
    Welcome {name}, you have received {unreadCount, plural,
      =0 {no new messages}
      one {{formattedUnreadCount} new message}
      other {{formattedUnreadCount} new messages}
    } since {formattedLastLoginTime}.
    `
  }
})
