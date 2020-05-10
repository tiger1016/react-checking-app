// Libraries
import React from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import CustomInput from '../../../CustomInput'

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
  handleChange = date => {
    const { history: { push }, location: { pathname } } = this.props
    const { view } = this.state
    let t = {}
    if (view === 'week') {
      t = dateTimeUtil.week(date)
    } else if (view === 'month') {
      t = dateTimeUtil.month(date)
    } else {
      t = dateTimeUtil.day(date)
    }
    push(`${pathname}?startDateTime=${t.start}&endDateTime=${t.end}`)
  }
  render () {
    const { walksStartDateTime } = this.props
    let walksStartDateTimeMoment = moment(walksStartDateTime)

    if (!walksStartDateTimeMoment.isValid()) {
      walksStartDateTimeMoment = moment()
    }

    return <div id='CalendarPicker'>
      <div style={{ paddingLeft: 8 }}>
        <DatePicker
          // style={datepickerStyle}
          customInput={<CustomInput newValue={walksStartDateTimeMoment} />}
          selected={walksStartDateTimeMoment}
          onChange={this.handleChange}
        />
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
  const schedulerView = schedulerController.isView(pathname)

  const filter = UrlUtil.parseQuesryString(search) || {}
  const targetStartDay = filter.startDateTime || new Date()

  return {
    schedulerView,
    walksStartDateTime: targetStartDay
  }
}

export default withRouter(connect(mapStateToProps)(CalendarPicker))
