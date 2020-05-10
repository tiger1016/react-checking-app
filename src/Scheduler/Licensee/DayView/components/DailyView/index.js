// Libraries
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

// Controllers
import { schedulerController } from 'Controllers'

// Components
import Row from '../Row'
import RowsHeader from '../RowsHeader'
import Tooltip from '../../../components/Tooltip'
// import WalkerSearch from '../../../components/WalkerSearch'

// Styles
import './index.css'

require('moment-duration-format')

class DailyView extends React.Component {
  constructor () {
    super()
    this.mouseOverWalk = false
    this.dailyViewRef = null
    this.rowRefs = []
    this.state = {
      canCloseTooltip: false,
      displayTooltipFor: null
    }
  }
  componentDidMount () {
    let {
      dayViewXUnitWidth,
      hourlyDivisions,
      scrollEventListener
    } = this.props

    scrollEventListener()

    // Capture mouse position
    document.addEventListener('mousemove', this.captureMouseDocument)

    let dailyView = document.getElementById('DailyView')
    if (dailyView) {
      // Scroll to users current time
      let t = new Date()
      let h = Number(moment(t).format('H'))
      dailyView.scrollLeft = ((h - 1) * hourlyDivisions * dayViewXUnitWidth)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.selectAllWalks) {
      nextProps.walksByWalker.forEach(walker => {
        if (walker.walks && walker.walks.length) {
          walker.walks.forEach(w => {
            let selected = _.indexOf(nextProps.bulkList, w.walk_id) > -1
            if (!selected) {
              schedulerController.actions.toggleWalkOnBulkList(w.walk_id)
            }
          })
        }
      })
    }
  }
  captureMouseDocument = event => {
    // To position tooltip based on mouse position
    window.petcheckMPX = event.clientX
    window.petcheckMPY = event.clientY
  }

  componentWillUnmount () {
    let {
      scrollEventListener
    } = this.props
    scrollEventListener('remove')
    document.removeEventListener('mousemove', this.captureMouseDocument)
  }
  canCloseTooltip = (canCloseTooltip, cbF) => this.setState({ canCloseTooltip }, () => cbF && cbF())

  mouseHoveringWalk = b => { this.mouseOverWalk = (b && true) }

  showTooltip = walk => {
    if (this.mouseOverWalk && walk) {
      this.setState({ displayTooltipFor: walk })
    } else {
      if (this.state.canCloseTooltip) {
        this.setState({ displayTooltipFor: null })
      }
    }
  }
  render () {
    let {
      isDragging,
      dayViewXUnitWidth,
      walksByWalker,
      totalMinutes,
      walkerColumnWidth
    } = this.props

    const wSelected = walksByWalker.filter(w => w.filterSelected)
    const lastSelectedId = wSelected.length ? wSelected[wSelected.length - 1].walker_id : null

    return <div
      ref={ref => { this.dailyViewRef = ref }}
      id='DailyView'
      className='DailyView'
      style={{ marginLeft: `${walkerColumnWidth}px` }}>
      <div className='fixed-top-row'><RowsHeader /></div>
      <RowsHeader />
      <div
        id='RowsContainer'
        className='RowsContainer'
        style={{ width: `${dayViewXUnitWidth * totalMinutes}px` }}>
        {walksByWalker.map((walker, i) => <Row
          canCloseTooltip={this.canCloseTooltip}
          dailyViewRef={this.dailyViewRef}
          index={i}
          key={`Row-For-Walker-${walker.walker_id}`}
          mouseHoveringWalk={this.mouseHoveringWalk}
          lastSelected={`${lastSelectedId}` === `${walker.walker_id}`}
          ref={ref => { this.rowRefs[i] = ref }}
          rowId={walker.walker_id}
          showTooltip={this.showTooltip}
          walker={walker}
        />)}
      </div>
      {!isDragging && this.state.displayTooltipFor && <Tooltip
        canClose={this.canCloseTooltip}
        dayViewXUnitWidth={dayViewXUnitWidth}
        showTooltip={this.showTooltip}
        walk={this.state.displayTooltipFor}
      />}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    bulkList: state.scheduler.bulkList,
    dayViewXUnitWidth: state.scheduler.dayViewXUnitWidth,
    highlightWalkerAndColumn: state.scheduler.highlightWalkerAndColumn,
    hourlyDivisions: state.scheduler.dailyViewHourlyDivisions,
    isDragging: state.scheduler.isDragging,
    selectAllWalks: state.scheduler.selectAllWalks,
    totalMinutes: state.scheduler.dailyViewTotalHours * state.scheduler.dailyViewHourlyDivisions,
    walkerColumnWidth: state.scheduler.dailyViewWalkerColumnWidth
  }
}

export default connect(mapStateToProps)(DailyView)
