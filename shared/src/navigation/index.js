// Libraries
import React, { Component } from 'react'
// import { withRouter } from 'react-router-native'
import { connect } from 'react-redux'
import { View } from 'react-native'
import NavBar from './NavBar'
import NavHeader from './NavHeader'

// Controller
import { appController } from 'Controllers/appController'
import { navigationController } from 'Controllers/navigationController'
import { sessionController } from 'Controllers/sessionController'

// Utils
import { api } from 'Utils/api'

// Styles
import Styles from './styles'

class Navigation extends Component {
  networkDaemonId = undefined

  networkDaemonIntervalLengthInMinutes = 0.1

  state = {
    online: false
  }

  componentDidMount () {
    this.startNetworkStatusDaemon()
  }

  startNetworkStatusDaemon = () => {
    this.stopNetworkStatusDaemon()
    setInterval(() => {
      this.networkDaemonId = this.fetchNetworkStatus()
    }, this.networkDaemonIntervalLengthInMinutes * 60000)
  }

  stopNetworkStatusDaemon = () => {
    clearInterval(this.networkDaemonId)
  }

  fetchNetworkStatus = () => {
    api.get('/network', {}, false)
      .then(response => {
        this.setState({ online: response.data.online })
      })
      .catch(error => {
        if (error) { this.setState({ online: false }) }
      })
  }

  search = () => {
    console.log('search value')
  }

  openModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: { url: this.props.pathname },
      isOpen: true,
      modalIdentifier: appController.constants.SEND_FEEDBACK_MODAL_IDENTIFIER
    })
  }

  logout () {
    sessionController.actions.destroySession()
  }

  render () {
    const {
      routesFor,
      history
    } = this.props

    let pathname = this.props.pathname

    const temppathArray = pathname.split('/')
    if (temppathArray.length >= 1) {
      pathname = temppathArray[0] + temppathArray[1]
    }

    if (routesFor === 'customer' || routesFor === 'walker') {
      pathname = pathname === '' ? 'scheduler' : pathname
    } else {
      pathname = pathname === '' ? 'dashboard' : pathname
    }

    const routes = navigationController.navBarRoutes(routesFor)

    return <View style={Styles.navigation}>
      <NavHeader history={history} routes={routes} title={pathname} openSideBar={() => { this.myRef.toggleMenu() }} />
      {this.props.children}
      <NavBar history={history} routes={routes} ref={(ref) => { this.myRef = ref }} />
    </View>
  }
}

const mapStateToProps = state => {
  const selectUser = sessionController.selectUser(state)
  return {
    online: state.network.online,
    selectUser
  }
}

export default connect(mapStateToProps)(Navigation)
