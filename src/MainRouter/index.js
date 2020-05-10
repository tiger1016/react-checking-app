// Libraries
import React from 'react'
import { Router } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'

// History
import history from 'Utils/history'

// Actions
import fetchWalks from 'Actions/walks/fetchWalks'
import sync from 'Actions/app/sync'

// Controllers
import { sessionController } from 'Controllers/sessionController'

// Components
import DesktopOnly from 'Shared/globalComponents/DesktopOnly'
// import Footer from '../Footer'
import ModalContainer from 'GlobalContainers/ModalContainer'
import NavBar from 'GlobalComponents/navigation/NavBar'
import NavHeader from 'GlobalComponents/navigation/NavHeader'
import Routes from '../Routes'

// Functions
import createActionDispatcher from 'Functions/app/createActionDispatcher'
import deleteActionDispatcher from 'Functions/app/deleteActionDispatcher'
import updateActionDispatcher from 'Functions/app/updateActionDispatcher'

// Styles
import './index.css'

class MainRouter extends React.Component {
  syncDaemonId = null
  syncDaemonIntervalLengthInMinutes = 0.5

  componentWillMount () {
    this.startSyncDaemon()
  }

  syncActionDispatcher (event, dispatch) {
    const { fetchWalks } = this.props
    if (event.type !== 'walk') {
      switch (event.event_type) {
        case 'delete':
          deleteActionDispatcher(event.type, event.object_id, dispatch)
          break
        case 'create':
          createActionDispatcher(event.type, event.object_id, dispatch)
          break
        case 'update':
          updateActionDispatcher(event.type, event.object_id, dispatch)
          break
      }
    }
    if (event.event_type === 'walks_update') {
      const { schedulerStartTime, schedulerEndTime } = this.props
      fetchWalks(schedulerStartTime, schedulerEndTime, false)
    }
  }

  startSyncDaemon = () => {
    const { sync } = this.props
    this.stopSyncDaemon()
    this.syncDaemonId = setInterval(() => {
      sync(this.props.lastSyncId, this.syncActionDispatcher.bind(this))
    }, this.syncDaemonIntervalLengthInMinutes * 60000)
  }

  stopSyncDaemon = () => {
    clearInterval(this.syncDaemonId)
  }

  routeConfirmation (message, cbF) {
    cbF(true)
  }

  componentWillUnmount () {
    this.stopSyncDaemon()
  }

  render () {
    const {
      hasSideBar,
      userType
    } = this.props

    return (
      <Router getUserConfirmation={this.routeConfirmation} history={history}>
        <div id='MainRouter'>
          {hasSideBar && <DesktopOnly>
            <NavBar navBarFor={userType} />
          </DesktopOnly>}
          <div className={`main-content${!hasSideBar ? ' no-sidebar' : ''}`}>
            {userType !== 'customer' && <NavHeader navBarFor={userType} />}
            <ToastContainer
              autoClose={3000}
              closeOnClick
              hideProgressBar={false}
              newestOnTop={false}
              pauseOnHover
              position='top-right'
              type='default'
            />
            <Routes routesFor={userType} />
            <ModalContainer />
          </div>
        </div>
      </Router>
    )
  }
}

MainRouter.propTypes = {
  hasSideBar: PropTypes.bool.isRequired,
  lastSyncId: PropTypes.number,
  userType: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  const userType = sessionController.selectUserType(state)
  const lastSync = state.app.syncEvents[state.app.syncEvents.length - 1]
  const schedulerStartTime = state.walks.start_time || new Date()
  const schedulerEndTime = state.walks.end_time || new Date()

  return {
    hasSideBar: !!state.app.sideBar,
    lastSyncId: lastSync ? lastSync.id : null,
    userType,
    schedulerStartTime,
    schedulerEndTime
  }
}

const mapDispatchToProps = {
  fetchWalks,
  sync
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter)
