// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import qs from 'qs'
import { withRouter } from 'react-router-dom'

// Controllers
import { schedulerController } from 'Controllers'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Styles
import './index.css'

class CalendarPicker extends React.Component {
  state = { view: null }
  unlisten = null

  componentDidMount () {
    const {
      history: { listen },
      schedulerView: view
    } = this.props
    this.setState({ view }, () => {
      this.unlisten = listen((location, action) => {
        this.setState({ view: schedulerController.isView(location.pathname) })
      })
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  next = () => {
    const {
      history: { push },
      location: { pathname, search },
      walksStartDateTime
    } = this.props
    const { view } = this.state
    const filter = UrlUtil.parseQuesryString(search) || {}

    let t = {}
    if (view === 'week') {
      t = dateTimeUtil.nextWeek(walksStartDateTime)
    } else if (view === 'month') {
      t = dateTimeUtil.nextMonth(walksStartDateTime)
    } else {
      t = dateTimeUtil.nextDay(walksStartDateTime)
    }

    filter.startDateTime = t.start
    filter.endDateTime = t.end

    push(`${pathname}?${qs.stringify(filter)}`)
  }

  previous = () => {
    const {
      history: { push },
      location: { pathname, search },
      walksStartDateTime
    } = this.props
    const { view } = this.state
    const filter = UrlUtil.parseQuesryString(search) || {}

    let t = {}
    if (view === 'week') {
      t = dateTimeUtil.previousWeek(walksStartDateTime)
    } else if (view === 'month') {
      t = dateTimeUtil.previousMonth(walksStartDateTime)
    } else {
      t = dateTimeUtil.previousDay(walksStartDateTime)
    }

    filter.startDateTime = t.start
    filter.endDateTime = t.end

    push(`${pathname}?${qs.stringify(filter)}`)
  }

  render () {
    return <div className='DateArrows'>
      <button onClick={this.previous} className='back-button ion-ios-arrow-back' />
      <div style={{ paddingLeft: 8 }}>
        <button onClick={this.next} className='back-button ion-ios-arrow-forward' />
      </div>
    </div>
  }
}

CalendarPicker.propTypes = {
  schedulerView: PropTypes.string,
  walksStartDateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ])
}

const mapStateToProps = (state, props) => {
  const { location: { pathname, search } } = props
  const filter = UrlUtil.parseQuesryString(search) || {}
  const schedulerView = schedulerController.isView(pathname)
  const targetStartDay = filter.startDateTime || new Date()

  return {
    schedulerView,
    walksStartDateTime: targetStartDay
  }
}

export default withRouter(connect(mapStateToProps)(CalendarPicker))
