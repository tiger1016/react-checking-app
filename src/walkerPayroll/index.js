// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

// Styles
import './index.css'

// Components
// import Button from 'GlobalComponents/Button'
import Filterbar from './components/Filterbar'
import SectionHeader from 'GlobalComponents/SectionHeader'
import PayrollReport from 'Web/Walker/PayrollReport'

// Actions
import reportsActions from 'Actions/reports'

// Controllers
import { sessionController, walkersController } from 'Controllers'

export class WalkerPayroll extends Component {
  constructor () {
    super()
    this.state = {
      startDate: moment('2016-01-01'),
      endDate: moment(),
      searchText: ''
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.searchHandle = this.searchHandle.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
    this.sendPayrollReport = this.sendPayrollReport.bind(this)
  }

  componentWillMount () {
    let params = {
      start_date: this.state.startDate.format('YYYY-MM-DD'),
      end_date: this.state.endDate.format('YYYY-MM-DD')
    }
    walkersController.actions.fetchWalkerPayRoll(this.props.selectUser.user_id, params)
    walkersController.actions.fetchWalkers()
  }

  filterSearch (val, index) {
    if (this.state.searchText === '') {
      return true
    } else {
      if (val.first_name.toUpperCase().includes(this.state.searchText.toUpperCase())) {
        return true
      } else if (val.last_name.toUpperCase().includes(this.state.searchText.toUpperCase())) {
        return true
      } else {
        return false
      }
    }
  }

  handleStartDateChange (startDate) {
    this.setState({ startDate })
    let params = {
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: this.state.endDate.format('YYYY-MM-DD')
    }
    walkersController.actions.fetchWalkerPayRoll(this.props.selectUser.user_id, params)
  }

  handleEndDateChange (endDate) {
    this.setState({ endDate })
    let params = {
      start_date: this.state.startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD')
    }
    walkersController.actions.fetchWalkerPayRoll(this.props.selectUser.user_id, params)
  }

  searchHandle (event) {
    this.setState({ searchText: event.target.value })
  }

  sendPayrollReport (payrollId, e) {
    if (e) { e.stopPropagation() }
    this.props.reportsActions.sendPayrollReport(payrollId, this.sendPayrollReportCallback)
  }

  sendPayrollReportCallback (status) {
    if (status === 'SUCCEDED') { // Toast not imported
      // toast.success('Walker Info Updated', {position: toast.POSITION.LEFT})
    } else {
      // toast.error('Something Wrong!', {position: toast.POSITION.LEFT})
    }
  }

  render () {
    let walkerProfile = {}
    if (this.props.staffsData && this.props.staffsData.walkers.length > 0) {
      walkerProfile = this.props.staffsData.walkers[0]
    }
    const walkerPayroll = this.props.walkerPayroll.walkerPayroll.payrolls
    return <div id='WalkerPayroll'>
      <SectionHeader bigBottomPadding title='Payroll Report' />
      <Filterbar
        endDate={this.state.endDate}
        handleEndDateChange={this.handleEndDateChange}
        handleStartDateChange={this.handleStartDateChange}
        searchHandle={this.searchHandle}
        startDate={this.state.startDate}
        type='all'
      />
      <div id='staffProfile' style={{ width: '100%' }}>
        <PayrollReport sendReport={this.sendPayrollReport} loading={this.props.walkerPayroll.loading} walkerid={this.props.selectUser.user_id} walkerPayroll={walkerPayroll} walkerProfile={walkerProfile} />
      </div>
    </div>
  }
}

let mapStateToProps = state => {
  let selectUser = sessionController.selectUser(state)
  return {
    staffsData: state.walkers,
    walkerPayroll: state.walkerPayroll,
    selectUser
  }
}

let mapDispatchToProps = dispatch => {
  return {
    reportsActions: bindActionCreators(reportsActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkerPayroll)
