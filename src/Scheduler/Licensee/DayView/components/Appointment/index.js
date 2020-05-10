// Libraries
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'
import moment from 'moment'
import { toast } from 'react-toastify'
import _ from 'lodash'

// Controllers
import { appController, schedulerController, walksController } from 'Controllers'

// Styles
import './index.css'

class Appointment extends React.Component {
  constructor () {
    super()
    this.autoScroll = _.throttle(this.autoScroll, 600, { 'leading': false })
    this.scroll = _.throttle(this.scroll, 20)
    this.mouseInside = false
    this.state = {
      alertOpened: false
    }
    this.timeout = null
  }

  componentDidMount () {
    const { length, walk } = this.props

    // Show appointment info as dataset
    this._appointment.dataset.dateTime = moment(walk.requested_time)
    this._appointment.dataset.service = walk.dropdown_description
    this._appointment.dataset.yOffset = this._appointment.getBoundingClientRect().top

    // Show all buggy appointments
    if (Number(length) === 0) {
      const b = this._appointment.getElementsByClassName('dailyView-Appointment-body')[0]
      b.style.background = '#eeeeee'
    }
    const dailyView = document.getElementById(`DailyView`)
    dailyView.addEventListener('dragover', this.autoScroll)
  }

  componentWillUnmount () {
    const dailyView = document.getElementById(`DailyView`)
    dailyView.removeEventListener('dragover', this.autoScroll)
  }

  autoScroll = e => {
    const w = window
    const doc = document
    const el = doc.documentElement
    const body = doc.getElementsByTagName('body')[0]
    // const x = w.innerWidth || el.clientWidth || body.clientWidth
    const y = w.innerHeight || el.clientHeight || body.clientHeight
    if (e.screenY > (y - 20)) {
      this.scroll(e.screenX, 6)
    }
    if (e.screenY < 200) {
      this.scroll(e.screenX, -6)
    }
  }

  onClickAddToBulkList = e => schedulerController.actions.toggleWalkOnBulkList(e.target.value)

  onClickDelete = e => {
    const { walk } = this.props
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        type: '',
        confirmButtonText: 'All appointments',
        onConfirm: () => {
          walksController.actions.cancelWalk(walk.walk_id, true)
          appController.closeAlert()
        },
        cancelButtonText: 'Only this one',
        onCancel: () => {
          walksController.actions.cancelWalk(walk.walk_id, false)
          appController.closeAlert()
        },
        showCancelButton: true,
        title: 'Cancel all future appointments in this series from this date or just this one?',
        text: '',
        onKeyDown: e => appController.closeAlert()
      }
    })
  }

  onClickOpenModal = e => {
    let { walk } = this.props
    appController.actions.toggleModal({
      modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
      canClose: true,
      isOpen: true,
      data: { walk }
    })
  }

  onClickStopPropagation = e => e.stopPropagation()

  handleMouseEnter = () => {
    const { showTooltip, walk } = this.props
    this.mouseInside && showTooltip(walk)
  }

  handleMouseLeave = () => {
    const { canCloseTooltip, showTooltip } = this.props
    canCloseTooltip(true, () => showTooltip(null))
  }

  onMouseEnter = () => {
    this.mouseInside = true
    this.props.mouseHoveringWalk(true)
    this.timeout = setTimeout(this.handleMouseEnter, 550)
  }

  onMouseLeave = () => {
    this.mouseInside = false
    this.props.mouseHoveringWalk(false)
    clearTimeout(this.timeout)
    this.handleMouseLeave()
  }

  onMouseDown = () => {
    window.dragHoldTimer = setTimeout(() => {
      window.dragActive = true
    }, 20)
  }

  _ref = ref => {
    this._appointment = ref
  }

  scroll = (x, y) => window.scrollBy(x, y)

  render () {
    const {
      // bulkList,
      connectDropTarget,
      connectDragSource,
      dailyViewRef,
      dragging,
      dayViewXUnitWidth,
      height,
      // isDragging,
      isOver,
      length,
      xEnd,
      xStart,
      yStart,
      walk,
      walkId
    } = this.props

    // Calculate Quick Menu position
    // let qmLeftPos = 'auto'
    let qmRightPos = '5px'
    let wX = _.max([window.innerWidth, window.outerWidth])
    if (dailyViewRef) {
      if (
        xEnd > dailyViewRef.scrollLeft &&
        xEnd < (dailyViewRef.scrollLeft + (wX / 2) - 160)
      ) {
        // qmLeftPos = 'auto'
        qmRightPos = '5px'
      } else {
        if (
          xStart > dailyViewRef.scrollLeft + (wX / 2) - 160 &&
          xStart < (dailyViewRef.scrollLeft + (wX) - 160)
        ) {
          // qmLeftPos = '5px'
          qmRightPos = 'auto'
        } else {
          // qmLeftPos = 'auto'
          qmRightPos = (wX / 2 + 160 + xEnd - dailyViewRef.scrollLeft - wX) + 'px'
        }
      }
    }
    if ((parseInt(qmRightPos, 10) + 60) > length) {
      // qmLeftPos = '5px'
      qmRightPos = 'auto'
    }

    // See if current walk is selected
    // let selected = _.indexOf(bulkList, walkId) > -1

    // Set styles
    const containerStyle = {
      height: `${height}px`,
      left: `${xStart}px`,
      top: `${yStart}px`,
      width: `${length ? (Number(length) === 0 ? dayViewXUnitWidth * 5 : length) : dayViewXUnitWidth * 5}px`,
      opacity: isOver || dragging ? 0.3 : null,
      zIndex: dragging ? -1 : null
    }
    const background = walksController.getStatusFill(walk)
    const appointmentBodyStyle = {
      background: walk.shifted ? 'purple' : background,
      maxHeight: `${height - 1}px`
    }
    // let hoverQuickMenuContainerStyle = { right: qmRightPos, left: qmLeftPos }
    const hoverQuickMenuTextStyle = { color: walksController.getStatusForegroundColor(walk) }

    return connectDropTarget(connectDragSource(<div id={`walk-${walkId}`} className='dailyView-Appointment' key={walkId} ref={this._ref} style={containerStyle}>
      <div className='dailyView-Appointment-body' style={appointmentBodyStyle} onClick={this.onClickOpenModal} onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <span className='dailyView-Appointment-text' style={hoverQuickMenuTextStyle} onMouseEnter={this.onMouseEnter}>
          {_.isArray(walk.pets) ? `${walk.pets.map(p => p.name).join(', ')}` : walk.pets}
          <span className='dailyView-Appointment-description'> - {walk.dropdown_description} <b>({moment(walk.requested_time).format('h:mma')})</b></span>
        </span>
      </div>
    </div>))
  }
}

const notifyApprovedDeclinedError = () => {
  toast.error('This appointment must be approved or declined before it can be updated.', { position: 'bottom-right' })
}

const deboncedNotifyApprovedDeclinedError = _.debounce(notifyApprovedDeclinedError, 1000, {
  leading: true,
  trailing: false
})

const boxTarget = {}

const boxSource = {
  beginDrag: ({ walk }) => {
    schedulerController.actions.toggleIsDragging(true)
    return walk
  },
  canDrag (props) {
    const { walk } = props
    const status = walksController.getStatus(walk)
    if (
      !window.dragActive ||
      status === 'in_process' ||
      status === 'completed' ||
      status === 'pending' ||
      status === 'change_requested' ||
      status === 'cancel_requested' ||
      status === 'late'
    ) {
      if (status === 'change_requested' || status === 'cancel_requested') {
        deboncedNotifyApprovedDeclinedError()
      }
      return false
    }
    return true
  },
  endDrag () {
    window.dragActive = false
    schedulerController.actions.toggleIsDragging(false)
    schedulerController.actions.highlightWalkerAndColumn(null, null)
  }
}

const dropCollect = (connect, monitor) => {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const mapStateToProps = (state, props) => {
  const { walk } = props
  return {
    bulkList: state.scheduler.bulkList,
    dragging: state.scheduler.isDragging,
    dayViewXUnitWidth: state.scheduler.dayViewXUnitWidth,
    walkId: walk.walk_id
  }
}

export default compose(
  DropTarget('appointment', boxTarget, dropCollect),
  DragSource('appointment', boxSource, dragCollect),
  connect(mapStateToProps)
)(Appointment)
