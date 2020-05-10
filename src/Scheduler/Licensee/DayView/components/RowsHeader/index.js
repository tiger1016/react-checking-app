// Libraries
import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Utils
import { UrlUtil } from 'Utils'

// Styles
import './index.css'

require('moment-duration-format')

class RowsHeader extends React.Component {
  hours () {
    let {
      dayViewXUnitWidth,
      highlightWalkerAndColumn,
      walksStartDateTime
    } = this.props

    let hours = []
    let currentHour = new Date().getHours()
    for (let hour = 0; hour < 24; hour++) {
      let h = Number(moment.duration(hour, 'hours').format('h'))
      if (h < 12) {
        h = (h === 0 ? 12 : h) + ' am'
      } else {
        h = h - 12
        h = (h === 0 ? 12 : h) + ' pm'
      }

      let isActive = false
      let hourLabel = h
      let labelColor = ''
      let dayDiff = moment(new Date().setHours(0, 0, 0, 0)).diff(new Date(walksStartDateTime).setHours(0, 0, 0, 0), 'days')
      if (hour === currentHour && dayDiff === 0) {
        labelColor = '#1875F0'
      } else if (hour > currentHour && dayDiff === 0) {
        labelColor = '#000000'
      } else if (dayDiff < 0) {
        labelColor = '#000000'
      }
      if (highlightWalkerAndColumn.columnData) {
        if (highlightWalkerAndColumn.columnData.hour !== null && Number(highlightWalkerAndColumn.columnData.hour) === Number(hour)) {
          isActive = true
          let formattedMinute = Number(highlightWalkerAndColumn.columnData.minute) < 10 ? `0${highlightWalkerAndColumn.columnData.minute}` : highlightWalkerAndColumn.columnData.minute
          let formattedHour = Number(highlightWalkerAndColumn.columnData.hour)
          if (formattedHour < 12) {
            hourLabel = (formattedHour === 0 ? 12 : formattedHour) + ':' + formattedMinute + ' am'
          } else {
            formattedHour = formattedHour - 12
            hourLabel = (formattedHour === 0 ? 12 : formattedHour) + ':' + formattedMinute + ' pm'
          }
          // hourLabel = `${highlightWalkerAndColumn.columnData.hour}:${formattedMinute}`
        }
      }

      hours.push(<div key={`Minute-Header-${hour}-ClearAll-`}
        className={`hour-column-header${isActive ? ' active' : ''}`}
        style={{
          color: labelColor,
          width: `${dayViewXUnitWidth * 60}px`,
          borderLeftColor: h === '12 am' ? 'transparent' : '#f5f5f5'
        }}>
        {hourLabel}
      </div>)
    }
    hours.push(<div key={`Minute-Header-61-ClearAll-`} className='clear-all' />)
    return hours
  }
  render () {
    let {
      dayViewXUnitWidth,
      totalMinutes
    } = this.props
    return <div id={`DailyViewHeader`} style={{ width: `${dayViewXUnitWidth * totalMinutes}px` }}>
      {this.hours()}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  let { location } = props
  let { search } = location
  let filter = UrlUtil.parseQuesryString(search) || {}

  let targetStartDay = filter.startDateTime || new Date()

  return {
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn,
    dayViewXUnitWidth: state.scheduler.dayViewXUnitWidth,
    totalMinutes: state.scheduler.dailyViewTotalHours * state.scheduler.dailyViewHourlyDivisions,
    walksStartDateTime: targetStartDay
  }
}

export default withRouter(connect(mapStateToProps)(RowsHeader))
