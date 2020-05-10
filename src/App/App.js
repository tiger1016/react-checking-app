// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

// Utils
import { dateTimeUtil } from 'Utils/dateTimeUtil'

// Actions
import fetchAlerts from 'Actions/alerts/fetchAlerts'
import fetchCustomers from 'Actions/customers/fetchCustomers'
import fetchPets from 'Actions/pets/fetchPets'
import fetchWalks from 'Actions/walks/fetchWalks'
import fetchWalkers from 'Actions/walkers/fetchWalkers'
import requestSessionInfo from 'Actions/session/requestSessionInfo'

// Controllers
import { addonsController } from 'Controllers/addonsController'
import { servicesController } from 'Controllers/servicesController'
import { sessionController } from 'Controllers/sessionController'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'
import Login from 'Web/Login'
import MainRouter from 'Web/MainRouter'
import ReduxPopupAlert from 'GlobalComponents/ReduxPopupAlert'

// Styles
import 'Web/globalStyles/reset.css'
import 'Web/globalStyles/normalize.css'
import 'react-toastify/dist/ReactToastify.css'
import 'sweetalert/dist/sweetalert.css'
import 'react-table/react-table.css'
import 'Web/globalStyles/style.css'
import 'react-datepicker/dist/react-datepicker.css'

class App extends React.Component {
  petcheckNetworkRetryIntervalId = null
  fetchInitiated = false

  componentWillMount () {
    // Expose a global petcheck object as local memory alternative
    if (process.env.PLATFORM_ENV === 'web') {
      window.petcheck = {}
    }

    // remove mobile icons css
    for (var i = 0; i <= 5; i++) {
      let _tempStyle = document.getElementById('fonticons_' + i)
      if (_tempStyle) {
        _tempStyle.remove()
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const {
      fetchAlerts,
      fetchCustomers,
      fetchPets,
      fetchWalkers,
      fetchWalks,
      requestSessionInfo
    } = this.props
    const {
      online,
      loggedIn,
      doInitialSyncFetch
    } = nextProps

    if (online) {
      // Login via session info if in old demo
      if (process.env.BUILD_TARGET === 'staging') {
        // Request session info from server if in production / staging
        if (!this.props.loggedIn) {
          requestSessionInfo()
        }
      }
    }
    if (loggedIn && !this.fetchInitiated) {
      if (doInitialSyncFetch) {
        this.fetchInitiated = true
        addonsController.fetchAddons()
        fetchCustomers()
        fetchPets()
        servicesController.fetchServices()
        fetchWalkers()
        const { start, end } = dateTimeUtil.day(new Date())
        fetchWalks(start, end, true)
        fetchAlerts()
      }
    }
  }

  render () {
    const {
      loggedIn,
      loggingIn
    } = this.props

    // Advise if requesting login or session info
    if (loggingIn) return <FullScreenTextOnly text={'Welcome'} spinner />

    // Render app if logged in
    if (loggedIn) {
      return <div id='PetcheckApp'>
        <Helmet
          link={[
            { rel: 'apple-touch-icon', href: require('Assets/icon.jpg'), 'sizes': '57x57' },
            { rel: 'icon', sizes: '192x192', href: require('Assets/icon.jpg') },
            { rel: 'apple-touch-icon', href: require('Assets/icon.jpg') },
            { rel: 'mask-icon', href: require('Assets/icon.jpg'), color: 'blue' }
          ]}
        />
        <ReduxPopupAlert />
        <MainRouter />
      </div>
    }

    // Render login form
    return <Login />
  }
}

App.propTypes = {
  doInitialSyncFetch: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const loggedIn = sessionController.selectLoggedIn(state) && true
  const loggingIn = sessionController.selectLoggingIn(state) && true
  const doInitialSyncFetch = (!state.app.syncEvents || state.app.syncEvents.length <= 0) && true
  return {
    doInitialSyncFetch,
    loggedIn,
    loggingIn
  }
}

const mapDispatchToProps = {
  fetchAlerts,
  fetchCustomers,
  fetchPets,
  fetchWalks,
  fetchWalkers,
  requestSessionInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
