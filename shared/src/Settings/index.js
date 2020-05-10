// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

// Styles
import './styles/style.less'

// Components
import Addons from './components/Addons'
import BusinessHours from './components/BusinessHours'
import CustomerBilling from './components/CustomerBilling'
import GPSMap from './components/GPSMap'
import LateAlerts from './components/LateAlerts'
import CustomerScheduling from './components/CustomerScheduling'
import Services from './components/Services'
import StaffPayroll from './components/StaffPayroll'

// Actions

const subNavLinks = ['Customer Billing', 'Staff Payroll', 'Services', 'Add-Ons', 'Business Hours', 'Scheduler', 'GPS Map', 'Late Alerts']

class Settings extends Component {
  constructor (props) {
    super(props)
    console.log('settings')
    this.state = {
      selected: 0
    }
    this._selected = this._selected.bind(this)
  }

  _selected (i, link) {
    this.setState({
      selected: i
    })
    this.props.history.push(`${this.props.match.path}/${link}`)
  }

  componentWillMount () {

  }

  render () {
    const rootPath = this.props.match.path
    return (
      <div className='settings-container'>
        <div className='sub-nav-main-container'>
          <div className='sub-nav-header'>
            <div className='scroll'>
              {subNavLinks.map((link, i) => {
                return (
                  i < 1
                    ? <div className='sub-nav-link' style={{ borderBottom: this.state.selected === i ? '2px solid #1875F0' : '2px solid #F5F5F5', padding: '1.8% 1%' }} onClick={() => this._selected(i, link.replace(/ /g, '-').toLowerCase())}>
                      <span>{link}</span>
                    </div>
                    : <div className='sub-nav-link' style={{ borderBottom: this.state.selected === i ? '2px solid #1875F0' : '2px solid #F5F5F5' }} onClick={() => this._selected(i, link.replace(/ /g, '-').toLowerCase())}>
                      <span>{link}</span>
                    </div>
                )
              })}
            </div>
            <div className='sub-nav-link' style={{ flex: 1, flexShrink: 1 }}>
              <br />
            </div>
          </div>
          <div className='sub-nav-body'>
            <div style={{}} />
            <Route exact path={`${rootPath}`} component={CustomerBilling} />
            <Route path={`${rootPath}/add-ons`} component={Addons} />
            <Route path={`${rootPath}/business-hours`} component={BusinessHours} />
            <Route path={`${rootPath}/customer-billing`} component={CustomerBilling} />
            <Route path={`${rootPath}/gps-map`} component={GPSMap} />
            <Route path={`${rootPath}/late-alerts`} component={LateAlerts} />
            <Route path={`${rootPath}/customer-scheduling`} component={CustomerScheduling} />
            <Route path={`${rootPath}/services`} component={Services} />
            <Route path={`${rootPath}/staff-payroll`} component={StaffPayroll} />
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(Settings))
