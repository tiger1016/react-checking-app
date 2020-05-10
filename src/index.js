// Libraries
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { render } from 'react-dom'
import * as Sentry from '@sentry/browser'
import StyleSheet from 'react-native/dist/exports/StyleSheet'
import View from 'react-native/dist/exports/View'

// Version
import { version } from '../package.json'

// Store
import { persistor, store } from 'Store'

// Components
import App from 'Web/App'
import MobileAndTabletOnly from 'Shared/globalComponents/MobileAndTabletOnly'

// if (NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const {
  NODE_ENV,
  PLATFORM_ENV,
  REACT_APP_SENTRY_DSN
} = process.env

const resolvedStyle = (PLATFORM_ENV && PLATFORM_ENV === 'web')
  ? 'containerWeb' : 'containerNative'

const isProduction = NODE_ENV === 'production'

const sentryInit = () => {
  if (isProduction) {
    return Sentry.init({
      dsn: REACT_APP_SENTRY_DSN,
      environment: NODE_ENV,
      version
    })
  }
  return null
}

sentryInit()

class PrepareWebMobile extends React.Component {
  componentDidMount () {
    // Generate required css
    const iconFont = require('react-native-vector-icons/Fonts/FontAwesome.ttf')
    const iconFontStyles = `@font-face {
      src: url(${iconFont});
      font-family: FontAwesome;
    }`

    // Create stylesheet
    const style = document.createElement('style')
    style.type = 'text/css'
    if (style.styleSheet) {
      style.styleSheet.cssText = iconFontStyles
    } else {
      style.appendChild(document.createTextNode(iconFontStyles))
    }

    // Inject stylesheet
    document.head.appendChild(style)
  }
  render () {
    return <div style={{ height: 0 }} />
  }
}

class Petcheck extends React.Component {
  render () {
    return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View id='main-web-container' style={styles[resolvedStyle]} target='true'>
          <App {...this.props} />
        </View>
        <MobileAndTabletOnly style={{ height: 0, flex: 0 }}>
          <PrepareWebMobile />
        </MobileAndTabletOnly>
      </PersistGate>
    </Provider>
  }
}

const styles = StyleSheet.create({
  containerNative: {
    flex: 1
  },
  containerWeb: {
    minHeight: '100%',
    width: '100%'
  }
})

const reactRoot = document.getElementById('root')

if (PLATFORM_ENV === 'web') {
  reactRoot.style.width = '100%'
  reactRoot.style.height = '100%'
}

render(<Petcheck />, reactRoot)
