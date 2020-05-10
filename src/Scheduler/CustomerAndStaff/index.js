// Libraries
import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'

// Utils
import { dateTimeUtil, utility } from 'Utils'

// Controllers
import {
  sessionController,
  walksController
} from 'Controllers'

// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './index.css'

// Components
import Toolbar from './components/Toolbar'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

/**
 * Format needed for react big calendar compatibility
 * @type {Array}
 */
const myEventsList = [
  {
    'title': 'Multi-day Event',
    'start': new Date(2017, 11, 20, 19, 30, 0),
    'end': new Date(2017, 11, 22, 2, 0, 0)
  }
]

let allViews = Object.keys(Views).map(k => Views[k]).filter(v => v !== 'agenda')

/**
 * Custom header to display full weekday names on the month view
 * @param  {[Object} props React Big Calendar Assgined props
 * @return {[Object}       React component
 */
let CustomMonthViewHeader = props => {
  const { date } = props
  return <span>
    {moment(date).format('dddd')}
  </span>
}

/**
 * [description]
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
let CustomWeekViewHeader = props => {
  let {
    date
  } = props
  return <div>
    <div>
      {moment(date).format('dddd')}
    </div>
    <div>
      {moment(date).format('D')}
    </div>
  </div>
}

/**
 * Custom event component to display as walk in calendar
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
let CustomEventComponent = props => {
  let {
    event
  } = props
  return <div className={`walk ${event.status}`}>
    <span className='pets'>{event.pets}</span>
    <span className='title'>{event.title}</span>
  </div>
}

/**
 * Scheduler Calendar
 */
class CustomerAndStaff extends React.Component {
  constructor () {
    super()
    this.state = {
      currentView: 'week'
    }
  }

  componentWillMount () {
    let targetDay = this.props.walksStartTime || new Date()
    if (!dateTimeUtil.weekOfDayExistsInArray(targetDay, this.props.datesInWalksObjectKeyFormatArray)) {
      let { start, end } = dateTimeUtil.week(targetDay)
      walksController.actions.fetchWalks(start, end, true)
    }
  }

  /**
   * [description]
   * @param  {[type]} targetDay [description]
   * @return {[type]}           [description]
   */
  fetchWalksOfDate = targetDay => {
    let { currentView } = this.state
    let { user, userType } = this.props
    let userId = user.user_id
    let start, end

    switch (currentView.toLowerCase()) {
      case 'day':
        let dayInfo = dateTimeUtil.day(targetDay)
        start = dayInfo ? (dayInfo.start || null) : null
        end = dayInfo ? (dayInfo.end || null) : null
        break
      default:
        let weekInfo = dateTimeUtil.week(targetDay)
        start = weekInfo ? (weekInfo.start || null) : null
        end = weekInfo ? (weekInfo.end || null) : null
        break
    }

    if (userType === 'customer') {
      walksController.actions.fetchWalksOfCustomer(userId, start, end)
    } else if (userType === 'walker') {
      walksController.actions.fetchWalksOfWalker(userId, start, end)
    } else {
      walksController.actions.fetchWalksOfWalker(userId, start, end)
    }
  }

  /**
   * Calls walks for new date on date change
   * @param  {String} date New date
   * @return {Void}
   */
  onDateChange = date => this.fetchWalksOfDate(moment(date))

  /**
   * Keep track of react big calendar view in current state
   * @param  {String} currentView Current view of react-big-calendar
   * @return {Void}
   */
  onChangedView = currentView => this.setState({ currentView })

  render () {
    let {
      sortedWalkers,
      walksLoading
    } = this.props

    if (walksLoading) {
      return <div style={{ padding: '15px', textAlign: 'center' }}>
        LOADING DATA...
      </div>
    }

    if (!sortedWalkers || !sortedWalkers.length) {
      return <div style={{ padding: '15px', textAlign: 'center' }}>
        NO WALKS TO SHOW
      </div>
    }

    let currentWalkerOrCustomerId = 39674

    let currentWalkerOrCustomer = sortedWalkers.find(walker => Number(walker.walker_id) === currentWalkerOrCustomerId)

    if (!currentWalkerOrCustomer) {
      return <div style={{ padding: '15px', textAlign: 'center' }}>
        STILL, NO WALKS TO SHOW
      </div>
    }

    let walksOfCurrentWalkerOrCustomer = currentWalkerOrCustomer.walks

    if (!walksOfCurrentWalkerOrCustomer || !walksOfCurrentWalkerOrCustomer.length) {
      return <div>
        FOUND SUBJECT BUT STILL, CERO WALKS
      </div>
    }

    let walks = walksOfCurrentWalkerOrCustomer.map(walk => {
      if (walk.requested_time) {
        let end = moment(walk.requested_time).add(2, 'hours').toDate()
        let late = walksController.isWalkLate(walk)
        let pets = walk.pets ? walk.pets.map(w => walk.name).join(',') : ''
        let start = moment(walk.requested_time).toDate()
        let status = walksController.getStatus(walk)
        let title = walk.dropdown_description
        return {
          end,
          late,
          pets,
          start,
          status,
          title,
          walk
        }
      }
    })

    return <div id='CustomerAndStaff'>
      <Calendar
        components={{
          event: CustomEventComponent,
          month: {
            header: CustomMonthViewHeader
          },
          week: {
            header: CustomWeekViewHeader
          },
          work_week: {
            header: CustomWeekViewHeader
          },
          toolbar: Toolbar,
          eventWrapper: props => {
            return <div className='custom-event-wrapper'>
              {props.children}
            </div>
          }
        }}
        defaultDate={new Date()}
        events={walks || myEventsList}
        messages={{
          showMore: total => {
            return `${total} more`
          }
        }}
        localizer={localizer}
        onNavigate={this.onDateChange}
        onSelectEvent={() => {
          window.alert()
        }}
        onView={this.onChangedView}
        step={60}
        timeslots={2}
        views={allViews}
      />
    </div>
  }
}

const mapStateToProps = state => {
  /*
  Prepare walks
   */
  let sortedWalkers = walksController.selectWalksArrayByWalker(state)
  utility.mutateSortCollectionBy(sortedWalkers, 'walker_name')

  let user = sessionController.selectUser(state)
  let userType = sessionController.selectUserType(state)

  return {
    sortedWalkers,
    user,
    userType,
    walksLoading: state.walks.loading
  }
}

export default connect(mapStateToProps)(CustomerAndStaff)
