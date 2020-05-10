// Libraries
import React from 'react'
import { withRouter } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import qs from 'qs'

// Controllers
import { schedulerController, walksController } from 'Controllers'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Styles
import './index.css'

class TodayButton extends React.Component {
  createOnClick = view => {
    const {
      history: { push },
      location: { pathname, search }
    } = this.props
    let filter = UrlUtil.parseQuesryString(search) || {}

    let t = dateTimeUtil.day()
    if (view === 'week') {
      t = dateTimeUtil.week()
    } else if (view === 'month') {
      t = dateTimeUtil.month()
    }
    return () => {
      walksController.actions.fetchWalks(t.start, t.end, true)
      filter.startDateTime = t.start
      filter.endDateTime = t.end
      push(`${pathname}?${qs.stringify(filter)}`)
    }
  }
  render () {
    const {
      location: { pathname }
    } = this.props
    const view = schedulerController.isView(pathname)
    return <div id='TodayButton'>
      <button
        data-tip data-for='todayButton'
        onClick={this.createOnClick(view)}
        className='today-button'>
        {view === 'day' && 'Today'}
        {view === 'week' && 'This Week'}
        {view === 'month' && 'This Month'}
      </button>
      <ReactTooltip id='todayButton' effect='solid' place='top' type='info'>
        <span>{moment().format('dddd, MMMM Do')}</span>
      </ReactTooltip>
    </div>
  }
}

export default withRouter(TodayButton)
