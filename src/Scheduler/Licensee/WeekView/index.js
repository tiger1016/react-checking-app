// Libraries
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

// Components
import Grid from './components/Grid'
import Loader from 'GlobalComponents/Loader'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Controllers
import { schedulerController, walksController } from 'Controllers'

// Styles
import './index.css'

class WeekView extends React.Component {
  componentDidMount () {
    const { history: { listen }, targetDay } = this.props
    const { start, end } = dateTimeUtil.week(targetDay)
    walksController.actions.fetchWalks(start, end, true)
    this.unlisten = listen((location, action) => {
      const { search } = location
      const filter = UrlUtil.parseQuesryString(search) || {}
      if (filter.startDateTime && filter.endDateTime) {
        walksController.actions.fetchWalks(filter.startDateTime, filter.endDateTime, true)
      }
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render () {
    const {
      headerColumns,
      scrollEventListener,
      walksByWalker,
      walkerIds,
      walksFullLoading
    } = this.props

    if (walksFullLoading) return <Loader />

    return <div id='Scheduler-WeekView'>
      <Grid
        headerColumns={headerColumns}
        rowIds={walkerIds}
        scrollEventListener={scrollEventListener}
        walksByWalker={walksByWalker}
      />
    </div>
  }
}

const mapStateToProps = (state, props) => {
  // All this can be optimized with reselect
  const { location } = props
  const { search } = location
  const filter = UrlUtil.parseQuesryString(search) || {}

  const walksByWalker = schedulerController.processWalks(state, walksController.walksOfWeek(state), filter)

  // Fetch walks of day if do not exist in store
  const targetDay = filter.startDateTime || new Date()
  const walkDatesArray = _.uniq(state.walks.walks.map(w => dateTimeUtil.toWalkKeyFormat(w.requested_time)))
  let walksOfWeekExist = false
  if (dateTimeUtil.weekOfDayExistsInArray(targetDay, walkDatesArray)) {
    walksOfWeekExist = true
  }

  // Header Columns
  const headerColumns = dateTimeUtil.week(targetDay).daysArray.map(d => ({
    id: dateTimeUtil.toWalkKeyFormat(d),
    label: moment(d).format('ddd') + ' ' + moment(d).format('MMM DD'),
    value: d
  }))

  return {
    headerColumns,
    targetDay,
    walkerIds: walksController.selectUniqueWalkersIdsArrayFromWalksArrayByWalker(state),
    walksByWalker,
    walksFullLoading: state.walks.loading && state.walks.loadingEvent === 'fetch',
    walksOfWeekExist,
    walksProgress: state.walks.progress
  }
}

export default withRouter(connect(mapStateToProps)(WeekView))
