// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import CustomerRoutes from './CustomerRoutes'
import LicenseeRoutes from './LicenseeRoutes'
import WalkerRoutes from './WalkerRoutes'

// Styles
import './index.css'

class Routes extends React.Component {
  componentWillMount () {
    this.unlisten = this.props.history.listen((location, action) => {
      this.hashLinkScroll()
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  hashLinkScroll () {
    const { hash } = window.location
    if (hash !== '') {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) element.scrollIntoView()
        const mainElement = document.getElementsByClassName('NavHeader')
        if (mainElement) mainElement.scrollIntoView()
      }, 0)
    }
    const mainElement = document.getElementsByClassName('NavHeader')[0]
    if (mainElement) mainElement.scrollIntoView()
  }

  selectRoutes = (routesFor = 'licensee') => {
    switch (routesFor) {
      case 'customer':
        return <CustomerRoutes />
      case 'licensee':
        return <LicenseeRoutes />
      case 'scheduling_admin':
        return <WalkerRoutes />
      case 'full_scheduling_admin':
        return <LicenseeRoutes />
      case 'walker':
        return <WalkerRoutes />
    }
    return null
  }

  render () {
    const { routesFor } = this.props
    return this.selectRoutes(routesFor)
  }
}

Routes.propTypes = {
  history: PropTypes.object,
  routesFor: PropTypes.string
}

export default withRouter(Routes)
