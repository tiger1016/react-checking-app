// Libraries
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import moment from 'moment'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { schedulerController, walksController } from 'Controllers'

// Components
import Cell from '../Cell'

// Styles
import './index.css'

class Column extends React.Component {
  cell = () => {
    let {
      columnId,
      rowId,
      walks
    } = this.props
    return <Cell
      cellId={`${rowId}@${columnId}`}
      columnId={columnId}
      key={`${rowId}@${columnId}`}
      rowId={rowId}
      walks={walks}
    />
  }
  render () {
    let {
      bg,
      canDrop,
      columnId,
      connectDropTarget,
      isOver,
      rowId
    } = this.props
    const isActive = canDrop && isOver
    let backgroundColor = bg === 'dark' ? 'rgba(240,240,240,.6)' : '#FFF'
    if (bg === 'yellow') {
      backgroundColor = 'rgba(255, 255, 0, 0.6)'
    }
    if (isActive) {
      backgroundColor = 'rgba(198,227,205,.8)'
    } else if (canDrop) {
      // backgroundColor = 'rgba(178,222,255,.8)'
    } else if (isOver && !canDrop) {
      backgroundColor = 'rgba(254,199,200,.8)'
    }
    return connectDropTarget(<div id={`column-${rowId}:${columnId}`} className={rowId === 0 ? 'grid-column grid-column-unassigned' : 'grid-column'} style={{ backgroundColor }}>
      {this.cell()}
    </div>)
  }
}

const notifyPastDateError = () => {
  toast.error('Cannot drop a walk to a time/date that has already passed.', { position: 'bottom-right' })
}

const boxTarget = {
  drop (props, monitor) {
    schedulerController.actions.toggleIsDragging(false)
    schedulerController.actions.highlightWalkerAndColumn(null, null)

    const { columnId, rowId } = props
    const targetWalkerId = rowId

    const now = moment()
    const isAfter = moment(props.columnId).isAfter(now)

    if (!isAfter) {
      notifyPastDateError()
    } else {
      const { walk } = monitor.getItem()
      const newTime = moment(walk.requested_time)
      const updatedTime = newTime.format('HH:mm:ss')
      const updatedDate = `${columnId} ${updatedTime}`
      const addons = walk.addons.map(i => { return i.active_addon_id }).join()
      const amPm = newTime.format('a')
      const timeHour = newTime.format('h')
      const timeMinute = newTime.format('mm')

      const updatedWalk = {
        ...walk,
        addons,
        ampm: amPm,
        requestedTime: updatedDate,
        time_hour: timeHour,
        time_minute: timeMinute,
        walker_id: targetWalkerId
      }

      walksController.actions.updateWalk({ updatedWalk }, (err) => {
        if (!err || err === null) {
          walksController.actions.fetchWalks(props.targetStartDay, props.targetEndDay, false)
        }
      })
    }
  },
  canDrop (props, monitor) {
    const { columnId, rowId } = monitor.getItem()
    if (columnId !== props.columnId || rowId !== props.rowId) {
      return true
    }
    return false
  },
  hover: _.debounce(function (dropTargetProps, monitor, dropTargetComponent) {
    const { highlightWalkerAndColumn, columnId, rowId } = dropTargetProps
    const { columnData, walkerId } = highlightWalkerAndColumn

    if (columnData.date !== columnId || Number(walkerId) !== Number(rowId)) {
      schedulerController.actions.highlightWalkerAndColumn(rowId, { date: columnId })
    }
  }, 150, { leading: true, maxWait: 300 })
}

let collect = (connect, monitor) => ({
  canDrop: monitor.canDrop(),
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

const mapStateToProps = (state, props) => {
  // let { location } = props
  // let { search } = location
  // let filter = UrlUtil.parseQuesryString(search) || {}

  const targetStartDay = state.walks.start_time || new Date()
  const targetEndDay = state.walks.end_time || new Date()
  return {
    targetStartDay,
    targetEndDay,
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn
  }
}

export default withRouter(compose(connect(mapStateToProps), DropTarget('appointment', boxTarget, collect))(Column))
