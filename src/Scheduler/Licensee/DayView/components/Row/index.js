// Libraries
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { DropTarget } from 'react-dnd'
import { compose } from 'redux'
import { connect } from 'react-redux'

// Controllers
import { walksController } from 'Controllers'

// Components
import Appointment from '../Appointment'
import DropBlock from '../DropBlock'

// Styles
import './index.css'

class Row extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: true
    }
    this.html_id = 'dailyView-Row'
    this.rowHeight = 0
    this.rowRef = null

    window.petcheck = window.petcheck || {}
    window.petcheck.rows = window.petcheck.rows || {}

    window.petcheck.rowMouseX = null
    window.petcheck.rowMouseY = null
    window.petcheck.rows[props.walkerId] = {}
    window.petcheck.rows[props.walkerId].height = 0
  }
  componentDidMount () {
    this.resizeRow()
  }
  componentWillReceiveProps () {
    this.resizeRow()
  }
  componentDidUpdate () {
    this.resizeRow()
  }
  shouldComponentUpdate (nextProps) {
    return this.state.isVisible
  }
  /**
   * Returns appointment array with appended computed properties needed for
   * drag n drop funtionality, walk updating and displaying, and scheduler functionalities
   * @return {Array} Array of appointment components
   */
  appointments () {
    const {
      canCloseTooltip,
      dailyViewRef,
      minRowHeight,
      mouseHoveringWalk,
      showTooltip,
      walks
    } = this.props

    if (!walks.length) {
      this.rowHeight = minRowHeight
      return null
    }

    // TODO v
    let processedWalks = walksController.processWalksDailyView(walks, this.props)

    let sortedWalks = _.sortBy(processedWalks, ['xStart', 'inverseLength'])
    for (let i = 0; i < sortedWalks.length; i++) {
      sortedWalks = walksController.stackWalkUpwardsDailyView(sortedWalks[i], sortedWalks, minRowHeight)
    }

    const lowestWalk = _.maxBy(sortedWalks, 'yEnd')
    this.rowHeight = lowestWalk.yEnd

    return sortedWalks.map((walk, index) => <Appointment
      canCloseTooltip={canCloseTooltip}
      dailyViewRef={dailyViewRef}
      day={moment(walk.requested_time).format('DD')}
      key={`${index}:${walk.walk_id}:${walk.requested_time}`}
      height={walk.height}
      hour={moment(walk.requested_time).format('HH')}
      index={index}
      length={walk.length}
      minute={moment(walk.requested_time).format('mm')}
      month={moment(walk.requested_time).format('MM')}
      mouseHoveringWalk={mouseHoveringWalk}
      showTooltip={showTooltip}
      walk={walk}
      xEnd={walk.xEnd}
      xStart={walk.xStart}
      yStart={walk.yStart}
      year={moment(walk.requested_time).format('YYYY')}
      yEnd={walk.yEnd}
    />)
  }
  /**
   * Returns row background color depending on odd or even row.
   * This is to add the gray shade to the even rows
   * @param  {Number} y Row index
   * @return {String}   Css color
   */
  bgCalculator (y) {
    return y % 2 === 1 ? 'rgba(240,240,240,.6)' : 'transparent'
  }
  /**
   * [description]
   * @param  {[type]} ref [description]
   * @return {[type]}     [description]
   */
  _ref = ref => { this.rowRef = ref }
  /**
   * Resizes walker header row and row depending on hoy many appointments it has within
   * @return {Void}
   */
  resizeRow () {
    let {
      walkerId
    } = this.props

    if (window.petcheck.rows[walkerId].height !== this.rowHeight) {
      const el = document.querySelector(`#walker_${walkerId}_container`)
      const header = document.querySelector(`#header-walker-${walkerId}`)
      if (el) {
        el.style.height = this.rowHeight + 'px'
        el.dataset.height = this.rowHeight
      }
      if (header) {
        header.style.height = this.rowHeight + 'px'
        header.dataset.height = this.rowHeight
      }
      window.petcheck.rows[walkerId].height = this.rowHeight
    }
  }
  dropBlocks () {
    const {
      dayViewXUnitWidth,
      walkerId
    } = this.props

    const blockWidth = dayViewXUnitWidth * 60
    // 2, 4, 6, 12, 60
    const blockDivisions = 12
    const hours = [...Array(24)].map((a, i) => i)

    return hours.map((h, i) => <DropBlock
      blockId={i}
      blockDivisions={blockDivisions}
      blockWidth={blockWidth}
      key={i}
      rowId={walkerId}
    />)
  }
  render () {
    const {
      canDrop,
      isOver,
      connectDropTarget,
      index,
      minRowHeight,
      lastSelected,
      dayViewXUnitWidth,
      totalMinutes,
      walkerId
    } = this.props

    /*
    Check row is DnD active
     */
    const isActive = canDrop && isOver

    /*
    Compute styles
     */
    const backgroundColor = this.bgCalculator(index)
    const containerStyle = {
      backgroundColor,
      width: `${dayViewXUnitWidth * totalMinutes}px`,
      minHeight: `${minRowHeight}px`
    }
    const innerContainerStyle = { display: 'flex', position: 'relative' }

    return connectDropTarget(<div id={'walker_' + walkerId + '_container'}
      className={this.html_id}
      ref={this._ref}
      style={containerStyle}>
      <div id={'walker_' + walkerId} style={innerContainerStyle}>
        {isActive && this.dropBlocks()}
        {this.appointments()}
      </div>
      {lastSelected && <div style={{
        borderBottom: '3px dashed #1875F0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }} />}
    </div>)
  }
}

const rowTarget = {}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

const mapStateToProps = (state, props) => {
  const walks = props.walker.walks
  const walkerId = props.walker.walker_id
  return {
    minRowHeight: state.scheduler.dailyViewMinRowHeight,
    dayViewXUnitWidth: state.scheduler.dayViewXUnitWidth,
    services: state.services, // Needed here for DnD
    totalMinutes: state.scheduler.dailyViewTotalHours * state.scheduler.dailyViewHourlyDivisions,
    walkerId,
    walks
  }
}

export default compose(DropTarget('appointment', rowTarget, collect), connect(mapStateToProps))(Row)
