// Libraries
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import moment from 'moment'
import { toast } from 'react-toastify'
import VisibilitySensor from 'react-visibility-sensor'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Controllers
import { schedulerController, walksController } from 'Controllers'

// Styles
import './index.css'

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

class BlockDivision extends React.Component {
  render () {
    const {
      blockId,
      canDrop,
      connectDropTarget,
      dropTargetId,
      isOver
    } = this.props

    const isActive = canDrop && isOver

    return connectDropTarget(<div
      className={`BlockDivision${isActive ? ' active' : ''}${!canDrop ? ' not-droppable' : ''}`}
      data-drop-block-id={blockId}
      data-drop-target-id={dropTargetId}
    />)
  }
}

const notifyPastDateError = () => {
  toast.error('Cannot drop a walk to a time/date that has already passed.')
}

const deboncedNotifyPastDateError = _.debounce(notifyPastDateError, 1000, {
  leading: true,
  trailing: false
})

const blockDivision = {
  //   canDrop (props, monitor) {
  //     const { blockId, location: { search } } = props
  //     const filter = UrlUtil.parseQuesryString(search) || {}
  //     const startDateTime = moment(filter.startDateTime || new Date())
  //     // let endDateTime = moment(filter.endDateTime || new Date())
  //     startDateTime.set({ h: blockId })
  //     const now = moment(Date.now())
  //
  //     if (startDateTime < now) {
  //       deboncedNotifyPastDateError()
  //       return false
  //     }
  //     return true
  //   },
  drop (props, monitor) {
    schedulerController.actions.toggleIsDragging(false)
    schedulerController.actions.highlightWalkerAndColumn(null, null)

    const { blockId, dropTargetId, rowId, location: { search } } = props
    const filter = UrlUtil.parseQuesryString(search) || {}
    const startDateTime = moment(filter.startDateTime || new Date())
    startDateTime.set({ h: blockId })
    const now = moment(Date.now())

    if (startDateTime < now) {
      deboncedNotifyPastDateError()
    } else {
      let targetWalkerId = rowId
      let droppedTo = {
        hour: blockId,
        minute: dropTargetId
      }
      let { hour, minute } = droppedTo

      let walk = monitor.getItem()
      let newTime = moment(walk.requested_time).set({ hour, minute })
      let updatedTime = newTime.format('YYYY-MM-DD HH:mm:ss')
      let addons = walk.addons.map(i => { return i.active_addon_id }).join()
      let updatedAmPm = newTime.format('a')
      let timeHour = newTime.format('h')
      let timeMinute = newTime.format('mm')

      let updatedWalk = {
        ...walk,
        addons,
        ampm: updatedAmPm,
        requestedTime: updatedTime,
        time_hour: timeHour,
        time_minute: timeMinute,
        walker_id: targetWalkerId
      }

      walksController.actions.updateWalk({ updatedWalk }, (err) => {
        if (!err || err === null) {
          const _filter = UrlUtil.parseQuesryString(search) || {}
          const _t = dateTimeUtil.day()
          const _targetStartDay = _filter.startDateTime || _t.start
          const _targetEndDay = _filter.endDateTime || _t.end
          walksController.actions.fetchWalks(_targetStartDay, _targetEndDay, false)
        }
      })
    }
  },
  hover: _.debounce(function (dropTargetProps, monitor, dropTargetComponent) {
    let { highlightWalkerAndColumn, blockId, dropTargetId, rowId } = dropTargetProps
    let { columnData, walkerId } = highlightWalkerAndColumn

    if (
      Number(columnData.hour) !== Number(blockId) ||
      Number(columnData.minute) !== Number(dropTargetId) ||
      Number(walkerId) !== Number(rowId)
    ) {
      schedulerController.actions.highlightWalkerAndColumn(rowId, { hour: blockId, minute: dropTargetId })
    }
  }, 150, { leading: true, maxWait: 300 })
}

const ConnectedBlockDivision = compose(DropTarget('appointment', blockDivision, collect))(BlockDivision)

class DropBlock extends React.Component {
  constructor () {
    super()
    this.state = {
      isVisible: true
    }
  }
  shouldComponentUpdate (nextProps) {
    return this.state.isVisible
  }
  MAX_BLOCK_DIVISIONS = 60
  render () {
    let {
      blockId,
      blockDivisions,
      blockWidth,
      canDrop,
      connectDropTarget,
      highlightWalkerAndColumn,
      isOver,
      location,
      rowId
    } = this.props

    let isDroppable = canDrop && isOver
    let blockTargetMultiplier = this.MAX_BLOCK_DIVISIONS / blockDivisions

    return <VisibilitySensor partialVisibility delayedCall onChange={isVisible => this.setState({ isVisible })}>
      {connectDropTarget(<div className={`DropBlock${isDroppable ? ' droppable' : ''}`} style={{ width: `${blockWidth}px` }}>
        {isDroppable ? [...Array(blockDivisions)].map((d, i) => <ConnectedBlockDivision
          blockId={blockId}
          dropTargetId={blockTargetMultiplier * i}
          highlightWalkerAndColumn={highlightWalkerAndColumn}
          key={i}
          location={location}
          rowId={rowId}
        />) : null}
      </div>)}
    </VisibilitySensor>
  }
}

const blockTarget = {}

const mapStateToProps = (state, props) => {
  let { location } = props
  let { search } = location
  let filter = UrlUtil.parseQuesryString(search) || {}

  let targetStartDay = filter.startDateTime || new Date()
  let targetEndDay = filter.endDateTime || new Date()
  return {
    targetStartDay,
    targetEndDay,
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn
  }
}

export default withRouter(compose(DropTarget('appointment', blockTarget, collect), connect(mapStateToProps))(DropBlock))
