// Libraries
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import moment from 'moment'
import { toast } from 'react-toastify'
import _ from 'lodash'

// Components
//  import HoverQuickMenu from '../../../components/HoverQuickMenu'
import Tooltip from '../../../components/Tooltip'

// Controllers
import { appController, schedulerController, walksController } from 'Controllers'

// Stlyes
import './index.css'

class Appointment extends React.Component {
  state = {
    showQuickMenu: false
  }
  timeout = null
  // componentDidMount() {
  //   // Use empty image as a drag preview so browsers don't draw it
  //   // and we can draw whatever we want on the custom drag layer instead.
  //   this.props.connectDragPreview(getEmptyImage(), {
  //     // IE fallback: specify that we'd rather screenshot the node
  //     // when it already knows it's being dragged so we can hide it with CSS.
  //     captureDraggingState: true,
  //   })
  // }

  canClose = (canClose, cbF) => cbF && cbF()

  onClick = e => {
    const { walk } = this.props
    appController.actions.toggleModal({
      modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
      canClose: true,
      isOpen: true,
      data: { walk }
    })
  }

  showTooltip = showQuickMenu => this.setState({ showQuickMenu })

  handleMouseEnter = () => {
    this.showTooltip(true)
  }

  handleMouseLeave = () => {
    this.showTooltip(false)
  }

  onMouseEnter = () => {
    this.timeout = setTimeout(this.handleMouseEnter, 150)
  }

  onMouseLeave = () => {
    clearTimeout(this.timeout)
    this.handleMouseLeave()
  }

  render () {
    const {
      connectDragSource,
      dragging,
      empty,
      isDragging,
      walk,
      walkCount
    } = this.props

    const {
      showQuickMenu
    } = this.state

    // Render nothing if empty walk
    if (empty) {
      return <div style={{ backgroundColor: 'transparent' }}>
        <span>&nbsp</span>
        <span>&nbsp</span>
      </div>
    }

    // Check if walk is selected by bulk list
    // let selected = _.indexOf(bulkList, walk.walk_id) > -1

    // Compute styles
    let oneWalkStyle = {}
    if (walkCount === 1) {
      oneWalkStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    }
    const background = walksController.getStatusFill(walk)
    const appointmentContainerStyle = {
      ...oneWalkStyle,
      background: isDragging ? '#3f7bbf' : background,
      color: walksController.getStatusForegroundColor(walk),
      opacity: dragging ? '.2' : null
    }

    return connectDragSource(<div
      className={`appointment${isDragging ? ' dragging' : ''}`}
      id={`appointment-${walk.walker_id}`}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      style={appointmentContainerStyle}
    >
      {!dragging && showQuickMenu ? <Tooltip
        canClose={this.canClose}
        showTooltip={this.showTooltip}
        walk={walk} /> : null}
      <div className='walkInfo' onClick={this.onClick}>
        <div className='walk-overlay' />
        <span className='customer'>{_.isArray(walk.pets) ? `${walk.pets.map(p => p.name).join(', ')}` : walk.pets}</span>
        <span className='service'>
          {walk.dropdown_description} <b>({moment(walk.requested_time).format('h:mma')})</b>
        </span>
      </div>
      {/* {false && !dragging && showQuickMenu ? <HoverQuickMenu walk={walk} selected={selected} /> : null} */}
    </div>)
  }
}

const notifyApprovedDeclinedError = () => {
  toast.error('This appointment must be approved or declined before it can be updated.', { position: 'bottom-right' })
}

const deboncedNotifyApprovedDeclinedError = _.debounce(notifyApprovedDeclinedError, 1000, {
  leading: true,
  trailing: false
})

const boxSource = {
  beginDrag ({ columnId, rowId, walk }) {
    schedulerController.actions.toggleIsDragging(true)
    return { columnId, rowId, walk }
  },
  canDrag ({ columnId, rowId, walk }, monitor) {
    const status = walksController.getStatus(walk)
    if (
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
  endDrag ({ columnId, rowId, walk }, monitor) {
    schedulerController.actions.toggleIsDragging(false)
    schedulerController.actions.highlightWalkerAndColumn(null, null)
  }
}

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const mapStateToProps = state => {
  return {
    bulkList: state.scheduler.bulkList,
    dragging: state.scheduler.isDragging
  }
}

export default compose(
  DragSource('appointment', boxSource, dragCollect),
  connect(mapStateToProps)
)(Appointment)
