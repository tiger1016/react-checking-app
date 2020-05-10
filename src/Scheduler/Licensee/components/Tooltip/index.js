// Libraries
import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Utils
import { doc } from 'Utils'

// Styles
import './index.css'

// Components
import CustomIcon from 'GlobalComponents/CustomIcon'
import Button from 'GlobalComponents/Button'

// Constants
import { FREQUENCIES } from 'GlobalComponents/input/FrequencySelect/constants'

// Controllers
import { appController, walksController } from 'Controllers'

require('moment-duration-format')

const setDays = walk => {
  // days initial
  let days = []
  if (walk.sunday && walk.sunday !== '') {
    days.push('Sun')
  }
  if (walk.monday && walk.monday !== '') {
    days.push('Mon')
  }
  if (walk.tuesday && walk.tuesday !== '') {
    days.push('Tue')
  }
  if (walk.wednesday && walk.wednesday !== '') {
    days.push('Wed')
  }
  if (walk.thursday && walk.thursday !== '') {
    days.push('Thu')
  }
  if (walk.friday && walk.friday !== '') {
    days.push('Fri')
  }
  if (walk.saturday && walk.saturday !== '') {
    days.push('Sat')
  }

  return days.length ? (' on ' + days.join(', ')) : ''
}

const setDateAndTime = walk => {
  let fq = FREQUENCIES.find(f => f.value === walk.frequency)
  let frequency = ''
  switch (fq && fq.value) {
    case 'weekly':
      frequency = 'Weekly'
      break
    case 'bi-weekly':
      frequency = 'Bi Weekly'
      break
    case 'monthly':
      frequency = 'Monthly'
      break
    case 'once':
      frequency = 'Once'
      break
  }
  let dateAndTime = frequency + setDays(walk)
  if (walk.end_date && walk.end_date !== '') {
    dateAndTime = dateAndTime + ' until ' + moment(walk.end_date).format('MMM Do, Y')
  }

  return dateAndTime
}

class Tooltip extends React.Component {
  deleteWalk = (apply_to_all) => { // eslint-disable-line camelcase
    let { walk, targetStartDay, targetEndDay } = this.props
    walksController.actions.cancelWalk(walk.walk_id, apply_to_all, (err) => {
      if (!err || err === null) {
        walksController.actions.fetchWalks(targetStartDay, targetEndDay, false)
      }
    })
  }
  openDeleteAlert = () => {
    const isPaidRequest = (this.props.walk.billing_status === 'paid' || this.props.walk.paid_ts !== '0000-00-00 00:00:00')
    const isInvoicedCancelRequest = this.props.walk.billing_status === 'none' && this.props.walk.paid_ts === '0000-00-00 00:00:00' && this.props.walk.invoiced_ts !== '0000-00-00 00:00:00'
    let _alertData = {
      confirmButtonText: 'All appointments',
      cancelButtonText: 'Only this one',
      onConfirm: () => { appController.closeAlert(); this.deleteWalk(1) },
      onCancel: () => { appController.closeAlert(); this.deleteWalk(0) },
      onKeyDown: () => appController.closeAlert(),
      show: true,
      showCancelButton: true,
      text: `Delete all appointments in this series or just this one?
        ${isPaidRequest ? 'Please note - this service has been paid for by the customer so you may want to issue them a credit.'
        : (isInvoicedCancelRequest ? 'Please note - this service has already been invoiced so you may want to send them an updated invoice.' : '')}`,
      type: 'warning'
    }
    let fq = FREQUENCIES.find(f => f.value === this.props.walk.frequency)
    if (fq && fq.value === 'once') {
      _alertData = {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onConfirm: () => { appController.closeAlert(); this.deleteWalk(0) },
        onCancel: () => { appController.closeAlert() },
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: `You are about to cancel this service.  Proceed?
          ${isPaidRequest ? 'Please note - this service has been paid for by the customer so you may want to issue them a credit.'
          : (isInvoicedCancelRequest ? 'Please note - this service has already been invoiced so you may want to send them an updated invoice.' : '')}`,
        type: 'warning'
      }
    }
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: _alertData
    })
  }
  render () {
    let {
      canClose,
      // dayViewXUnitWidth,
      showTooltip,
      walk,
      walkAddons
    } = this.props

    // let walkerComments = walk.walker_comments && walk.walker_comments.length > 100 ? `${walk.walker_comments.substring(0, 100)}...` : walk.walker_comments
    // let userComments = walk.user_comments && walk.user_comments.length > 100 ? `${walk.user_comments.substring(0, 100)}...` : walk.user_comments
    // let length = 0
    // if (walk.length) {
    //   length = moment.duration(walk.length, 'minutes').format('h [hrs], m [min]')
    //   if (dayViewXUnitWidth) {
    //     length = moment.duration((walk.length / dayViewXUnitWidth), 'minutes').format('h [hrs], m [min]')
    //   }
    // } else {
    //   var diff = parseInt(moment.duration(moment(walk.end).diff(moment(walk.start))).format('mm'))
    //   length = diff > 60 ? `${diff / 60} hours` : `${diff} minutes`
    // }
    let tooltipStyle = {}
    let { height, width } = doc.viewPortDimensions()
    let heightMid = height / 2
    let widthMid = width / 2
    let { petcheckMPY, petcheckMPX } = window
    let mouseY = 'top'
    let mouseX = 'left'

    if (petcheckMPY > heightMid) { mouseY = 'bottom' }
    if (petcheckMPX > widthMid) { mouseX = 'right' }

    tooltipStyle = { position: 'fixed' }
    tooltipStyle.bottom = mouseY === 'bottom' ? (height - petcheckMPY) + 'px' : null
    tooltipStyle.top = mouseY === 'top' ? petcheckMPY + 'px' : null
    tooltipStyle.right = mouseX === 'right' ? (width - petcheckMPX) + 'px' : null
    tooltipStyle.left = mouseX === 'left' ? petcheckMPX + 'px' : null

    let statusFill = walksController.getStatusFill(walk)

    let durationInMinutes = moment.duration(walk.walk_length).asMinutes()
    let walkEndTime = moment(walk.requested_time).add(durationInMinutes, 'minutes')
    let walkStart = moment(walk.requested_time).format('h:mma')
    let walkEnd = walkEndTime.format('h:mma')

    return <div
      className='WalkDetailTooltip'
      style={tooltipStyle}
      onMouseEnter={() => canClose(false)}
      onMouseLeave={() => canClose(true, () => showTooltip(null))}
    >
      <div className='container'>
        <div className='close' onClick={() => canClose(true, () => showTooltip(null))}><CustomIcon name='ion-android-close' /></div>
        <div className='top'>
          <div className='edit' onClick={() => {
            canClose(true, () => showTooltip(null))
            appController.actions.toggleModal({
              modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
              canClose: true,
              isOpen: true,
              data: { walk }
            })
          }}>
            <CustomIcon name='ion-edit' size='large' />
          </div>
          <div className='title'>
            <div className='line-1'>{walk.walker_name} scheduled for</div>
            <div className='line-2'>{walk.dropdown_description} with {walk.pets.map(p => p.name).join(' and ')}</div>
          </div>
        </div>
        <div className='data'>
          {/* <div>{walk.walk_id}</div> */}
          <div className='details'>
            <div className='delete'>
              <Button textOnly iconOnly={'ion-android-delete'} onClick={() => this.openDeleteAlert()} />
            </div>
            <div className='icon-container'><div className='ion-android-calendar details-icon' /></div>
            <div className='details-text'>
              <div className='line-1'>{moment(walk.requested_time).format('dddd, MMM Do, Y')}</div>
              <div className='line-2'>{walkStart} - {walkEnd}</div>
              <div className='line-2'>{setDateAndTime(walk)}</div>
            </div>
          </div>
          <div className='details' >
            <div className='icon-container'><div className='color-badge' style={{ background: statusFill }} /></div>
            <div className='details-text'>
              <div className='line-1'>{walksController.getStatusTitle(walk)}</div>
              {
                walk.status === 'in_process' &&
                <div className='line-2'>Scan In: {moment(walk.start).format('MM/DD/YYYY h:mma')}</div>
              }
            </div>
          </div>
          <div className='details' >
            <div className='icon-container'><div className='ion-ios-person details-icon' /></div>
            <div className='details-text'>
              <div className='line-1'>Customer</div>
              <div className='line-2'>{walk.customer.name}</div>
            </div>
          </div>
          {walkAddons.length ? <div className='details'>
            <div className='icon-container'><div className='ion-plus details-icon' /></div>
            <div className='details-text'>
              <div className='line-1'>Addons</div>
            </div>
          </div> : null}
        </div>
      </div>
    </div>
  }
}
const mapStateToProps = (state, { location, walk }) => {
  // let { search } = location
  // let filter = UrlUtil.parseQuesryString(search) || {}

  let targetStartDay = state.walks.start_time || new Date()
  let targetEndDay = state.walks.end_time || new Date()
  return {
    targetStartDay,
    targetEndDay,
    walkAddons: walksController.getWalkAddons(state, walk)
  }
}

export default withRouter(connect(mapStateToProps)(Tooltip))
