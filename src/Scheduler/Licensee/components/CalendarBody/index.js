// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'

// Components
import DayView from '../../DayView'
import MonthView from '../../MonthView'
import WeekView from '../../WeekView'
import DnDContext from '../DnDContext'

// Styles
import './index.css'

class CalendarBody extends React.Component {
  constructor (props) {
    super(props)
    const { scrollEventListener } = this.props
    const DV = () => <DayView scrollEventListener={scrollEventListener} />
    const MV = () => <MonthView />
    const WV = () => <WeekView scrollEventListener={scrollEventListener} />
    this.WV = WV
    this.schedulerRoot = '/scheduler'
    const routes = [
      {
        component: DV,
        path: `${this.schedulerRoot}/day`,
        title: 'Day'
      },
      {
        component: MV,
        path: `${this.schedulerRoot}/month`,
        title: 'Month'
      },
      {
        component: WV,
        index: true,
        path: `${this.schedulerRoot}/week`,
        title: 'Week'
      }
    ]
    this.routes = routes.map((route, i) => <Route
      key={i}
      path={route.path}
      component={route.component}
    />)
  }
  onMouseUp = () => {
    clearInterval(window.dragHoldTimer)
    window.dragActive = false
  }
  render () {
    const { walksLoading } = this.props

    return <div id='CalendarBody'
      onMouseUp={this.onMouseUp}
      style={{ cursor: walksLoading ? 'progress' : 'default' }}>
      <div className='scheduler-display-main-container'>
        <DnDContext>
          <Route exact path={this.schedulerRoot} component={this.WV} />
          {this.routes}
        </DnDContext>
      </div>
    </div>
  }
}

CalendarBody.propTypes = {
  scrollEventListener: PropTypes.func.isRequired,
  walksLoading: PropTypes.bool
}

const mapStateToProps = state => ({ walksLoading: state.walks.loading })

export default withRouter(connect(mapStateToProps)(CalendarBody))
