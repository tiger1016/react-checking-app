// Libraries
import * as Sentry from '@sentry/browser'

// Version
import { version } from '../../package.json'

const isProduction = process.env.NODE_ENV === 'production'

const sentryInit = () => {
  if (isProduction) {
    return Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      version
    })
  }
  return null
}

export default sentryInit()
