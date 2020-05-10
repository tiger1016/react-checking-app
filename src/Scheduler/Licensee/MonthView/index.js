// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, schedulerController, walksController, servicesController } from 'Controllers'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Styles
import './index.css'

// Components
import Loader from 'GlobalComponents/Loader'
import Tooltip from '../components/Tooltip'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

/**
 * Custom event component to display as walk in calendar
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
class CustomEventComponent extends React.Component {
  handleMouseEnter = () => {
    let { event } = this.props
    let { mouseHoveringWalk, showTooltip, walk } = event
    mouseHoveringWalk(true)
    showTooltip(walk)
  }
  handleMouseLeave = () => {
    let { event } = this.props
    let { showTooltip, mouseHoveringWalk, canCloseTooltip } = event
    mouseHoveringWalk(false)
    canCloseTooltip(true, () => showTooltip(false))
  }
  onMouseEnter = () => {
    this.timeout = setTimeout(this.handleMouseEnter, 500)
  }
  onMouseLeave = () => {
    clearTimeout(this.timeout)
    this.handleMouseLeave()
  }
  render () {
    const { event: { walk } } = this.props
    const background = walksController.getStatusFill(walk)
    return <div
      className={`walk`}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      style={{ background }}
    >
      <div className='time'>{moment(walk.requested_time).format('h:mm a')}</div>
      <div className='walker'>{walk.walker_name}</div>
      <span className='customer'>{(walk.customer && walk.customer.name) || walk.customer_name}</span>
    </div>
  }
}

class MonthView extends React.Component {
  state = { canCloseTooltip: false, tooltipData: null }
  timeout = null

  componentWillMount () {
    const { history: { listen }, targetDay } = this.props
    const { start, end } = dateTimeUtil.month(targetDay)
    walksController.actions.fetchWalks(start, end, true)
    this.unlisten = listen((location, action) => {
      const { search } = location
      const filter = UrlUtil.parseQuesryString(search) || {}
      if (filter.startDateTime && filter.endDateTime) {
        walksController.actions.fetchWalks(filter.startDateTime, filter.endDateTime, true)
      }
    })
  }

  componentDidMount () {
    document.addEventListener('mousemove', this.captureMouseDocument)
  }

  componentWillUnmount () {
    this.unlisten()
    const showMore = document.getElementsByClassName('rbc-show-more')
    for (let i = 0; i < showMore.length; i++) {
      if (showMore[i].removeEventListener) {
        showMore[i].removeEventListener('mouseover', this.showMoreMouseOver, 0)
      }
    }

    document.removeEventListener('mousemove', this.captureMouseDocument)
  }

  canCloseTooltip = (canCloseTooltip, cbF) => this.setState({ canCloseTooltip }, () => cbF && cbF())
  mouseHoveringWalk = b => { this.mouseOverWalk = (b && true) }

  captureMouseDocument = event => {
    // To position tooltip based on mouse position
    window.petcheckMPX = event.clientX
    window.petcheckMPY = event.clientY
  }

  onClick = ({ walk }) => {
    appController.actions.toggleModal({
      modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
      canClose: true,
      isOpen: true,
      data: { walk }
    })
  }

  registerShowMoreEvents = () => {
    setTimeout(() => {
      var showMore = document.getElementsByClassName('rbc-show-more')
      for (var i = 0; i < showMore.length; i++) {
        if (showMore[i].removeEventListener) {
          showMore[i].removeEventListener('mouseover', this.showMoreMouseOver, 0)
        }
        showMore[i].addEventListener('mouseover', this.showMoreMouseOver, 0)
      }
    }, 100)
  }

  showMoreMouseLeave = () => {
    let mainContent = document.getElementsByClassName('main-content')
    let overlay = document.getElementsByClassName('rbc-overlay')
    if (overlay && overlay.length > 0) {
      if (overlay[0].removeEventListener) {
        overlay[0].removeEventListener('mouseleave', this.showMoreMouseLeave, false)
      }
    }
    if (mainContent) { mainContent[0].click() }
  }

  showMoreMouseOver = (e) => {
    e.target.click()
    setTimeout(() => {
      const overlay = document.getElementsByClassName('rbc-overlay')
      if (overlay && overlay[0]) {
        if (overlay[0].removeEventListener) {
          overlay[0].removeEventListener('mouseleave', this.showMoreMouseLeave, false)
        }
        overlay[0].addEventListener('mouseleave', this.showMoreMouseLeave, false)
      }
    }, 0)
  }

  showTooltip = tooltipData => {
    if (this.mouseOverWalk && tooltipData) {
      this.setState({ tooltipData })
    } else {
      if (this.state.canCloseTooltip) {
        this.setState({ tooltipData })
      }
    }
  }

  render () {
    const { services, startDateTime, walks, walksFullLoading } = this.props

    if (walksFullLoading) return <Loader />

    const events = walks.map(w => {
      const start = moment(w.requested_time)
      let end = moment(w.requested_time)
      const service = services.find(o => Number(o.id) === Number(w.billing_price_group_id))
      if (service) {
        end = end.add(moment.duration(service.length || 60))
      }

      return {
        // allDay: true,
        end: end.toDate(),
        id: w.walk_id,
        service,
        showTooltip: this.showTooltip,
        mouseHoveringWalk: this.mouseHoveringWalk,
        canCloseTooltip: this.canCloseTooltip,
        start: start.toDate(),
        walk: w
      }
    })

    this.registerShowMoreEvents()
    return <div id='Scheduler-MonthView'>
      {!!events.length && <Calendar
        localizer={localizer}
        components={{ event: CustomEventComponent }}
        date={moment(startDateTime || new Date()).toDate()}
        events={events}
        onNavigate={(date) => { this.setState({ selectedDate: date }) }}
        onSelectEvent={this.onClick}
        popup
        toolbar={false}
      />}
      {this.state.tooltipData && <Tooltip
        canClose={this.canCloseTooltip}
        showTooltip={this.showTooltip}
        walk={this.state.tooltipData}
      />}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  // Fetch walks of day if do not exist in store
  // All this can be optimized with reselect
  const { location: { search } } = props
  const filter = UrlUtil.parseQuesryString(search) || {}

  let walksByWalker = schedulerController.processWalks(state, walksController.walksOfMonth(state), filter)

  walksByWalker = _.flatten(walksByWalker.map(w => w.walks))

  const targetDay = filter.startDateTime || new Date()
  const walkDatesArray = _.uniq(state.walks.walks.map(w => dateTimeUtil.toWalkKeyFormat(w.requested_time)))
  let walksOfMonthExist = false
  if (dateTimeUtil.monthOfDayExistsInArray(targetDay, walkDatesArray)) {
    walksOfMonthExist = true
  }

  if (filter.walkers && filter.walkers.length) {
    walksByWalker = schedulerController.filterWalksByWalkerIds(filter.walkers, walksByWalker)
  }

  return {
    services: servicesController.selectActiveServices(state),
    startDateTime: targetDay,
    targetDay,
    walks: walksByWalker,
    walksFullLoading: state.walks.loading && state.walks.loadingEvent === 'fetch',
    walksOfMonthExist
  }
}

export default withRouter(connect(mapStateToProps)(MonthView))
