// Libraries
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Controllers
import { servicesController, schedulerController, walksController } from 'Controllers'

// Components
import DailyView from './components/DailyView'
import WalkerList from './components/WalkerList'
import Loader from 'GlobalComponents/Loader'

// Styles
import './index.css'

require('moment-duration-format')

class DayView extends React.Component {
  componentWillMount () {
    servicesController.fetchServices()
    window.petcheck.rows = {}
    let { targetDay } = this.props
    // if (true || !walksOfDayExist) {
    let { start, end } = dateTimeUtil.day(targetDay)
    walksController.actions.fetchWalks(start, end, true)
    // }
    this.unlisten = this.props.history.listen((location, action) => {
      let { search } = location
      let filter = UrlUtil.parseQuesryString(search) || {}
      if (filter.startDateTime && filter.endDateTime) {
        walksController.actions.fetchWalks(filter.startDateTime, filter.endDateTime, true)
      }
    })
  }
  componentWillUnmount () {
    this.unlisten()
    window.petcheck.rows = null
  }
  render () {
    let {
      scrollEventListener,
      walksByWalker,
      walksFullLoading
    } = this.props

    /* Fetch walks is loading */
    if (walksFullLoading) return <Loader />

    return <div id='Scheduler-DayView'>
      <WalkerList walkers={walksByWalker} />
      <DailyView scrollEventListener={scrollEventListener} walksByWalker={walksByWalker} />
    </div>
  }
}

const mapStateToProps = (state, props) => {
  // All this can be optimized with reselect
  const { location: { search } } = props
  const filter = UrlUtil.parseQuesryString(search) || {}

  const walksByWalker = schedulerController.processWalks(state, walksController.walksOfDay(state), filter)

  // Fetch walks of day if do not exist in store
  const targetDay = filter.startDateTime || new Date()
  const walkDatesArray = _.uniq(state.walks.walks.map(w => dateTimeUtil.toWalkKeyFormat(w.requested_time)))
  let walksOfDayExist = false
  if (dateTimeUtil.dayExistsinArray(targetDay, walkDatesArray)) {
    walksOfDayExist = true
  }

  return {
    targetDay,
    walksByWalker,
    walksFullLoading: state.walks.loading && state.walks.loadingEvent === 'fetch',
    walksProgress: state.walks.progress,
    walksOfDayExist
  }
}

export default withRouter(connect(mapStateToProps)(DayView))
