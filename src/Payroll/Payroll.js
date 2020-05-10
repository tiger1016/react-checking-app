// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

// Styles
import './index.css'

// Components
import Filterbar from './components/Filterbar'
import SectionHeader from 'GlobalComponents/SectionHeader'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

// Utility
import { utility } from 'Utils'

// Actions
import payrollActions from 'Actions/payroll'
import reportsActions from 'Actions/reports'

// Controllers
import { appController, reportsController } from 'Controllers'

export class Invoice extends Component {
  constructor () {
    super()
    this.state = {
      startDate: moment('2016-01-01'),
      endDate: moment(),
      searchText: '',
      selectedInvoices: [],
      PayrollDetail: {},
      TotalAmount: 0,
      selectedWalkers: []
    }
  }

  componentWillMount () {
    this.props.payrollActions.fetchLicenseePayroll(this.state.startDate, this.state.endDate)
  }

  componentDidMount () {
    appController.actions.openSideBar()
  }
  handleStaffChange = (data) => {
    this.setState({ selectedWalkers: data })
  }
  filterSearch = (val, index) => {
    if (this.state.searchText === '') {
      return true
    } else {
      if (val.first_name.toUpperCase().includes(this.state.searchText.toUpperCase())) {
        return true
      } else if (val.last_name.toUpperCase().includes(this.state.searchText.toUpperCase())) {
        return true
      } else if (val.payroll_id.toString().includes(this.state.searchText.toUpperCase())) {
        return true
      } else {
        return false
      }
    }
  }

  handleStartDateChange = (startDate) => {
    this.setState({ startDate })
    this.props.payrollActions.fetchLicenseePayroll(startDate, this.state.endDate)
  }

  handleEndDateChange = (endDate) => {
    this.setState({ endDate })
    this.props.payrollActions.fetchLicenseePayroll(this.state.startDate, endDate)
  }

  searchHandle = (event) => {
    this.setState({ searchText: event.target.value })
  }

  sendPayrollReport = (payrollId, e) => {
    if (e) { e.stopPropagation() }
    reportsController.actions.sendPayrollReport(payrollId)
  }

  openPayrollDetailModal = (data) => {
    appController.actions.toggleModal({
      canClose: true,
      data: { PayrollDetail: data, TotalAmount: this.totalcount(data.items) },
      isOpen: true,
      modalIdentifier: appController.constants.PAYROLL_DETAIL_MODAL_IDENTIFIER
    })
  }
  totalcount = (items) => {
    var amount = 0
    if (items) {
      items.map(function (val) { amount = amount + parseFloat(val.total_amount) })
    }
    return amount.toFixed(2)
  }
  render () {
    let payrolls = this.props.payrolls.payrolls
    if (this.props.payrolls.payrolls && !utility.isEmpty(this.state.searchText)) payrolls = payrolls.filter(this.filterSearch)
    if (this.state.selectedWalkers.length > 0) {
      payrolls = payrolls.filter(item => this.state.selectedWalkers.find(walker => walker.value === item.user_id))
    }

    const noPayrolls = payrolls.length === 0
    const { loading } = this.props.payrolls

    return <div id='Payroll'>
      <SectionHeader bigBottomPadding title='Payroll' />
      <Filterbar
        endDate={this.state.endDate}
        handleEndDateChange={this.handleEndDateChange}
        handleStartDateChange={this.handleStartDateChange}
        handleStaffChange={this.handleStaffChange}
        selectedWalkers={this.state.selectedWalkers}
        search={this.props.payrolls.payrolls}
        searchHandle={this.searchHandle}
        startDate={this.state.startDate}
      />
      {(loading || !noPayrolls) && <CustomTable
        data={payrolls}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => this.openPayrollDetailModal(rowInfo.original)
        })}
        loading={loading}
        columns={[{
          columns: [
            {
              accessor: d => moment(d.date).format('MM/DD/YYYY'),
              className: 'text strong',
              id: 'date',
              label: 'DATE',
              maxWidth: 110
            },
            {
              accessor: 'payroll_id',
              className: 'text',
              label: 'NUMBER',
              maxWidth: 110
            },
            {
              accessor: d => (d.first_name + ' ' + d.last_name),
              id: 'staff_name',
              className: 'text',
              label: 'STAFF NAME'
            },
            {
              accessor: d => (moment(d.period_start).format('MM/DD/YYYY') + '  -  ' + moment(d.period_end).format('MM/DD/YYYY')),
              id: 'payroll_peroid',
              className: 'text',
              label: 'PAYROLL PERIOD',
              maxWidth: 180
            },
            {
              accessor: d => ('$' + this.totalcount(d.items)),
              id: 'amount',
              className: 'text',
              label: 'AMOUNT',
              maxWidth: 100
            }, {
              accessor: 'payroll_id',
              Cell: (d) => (
                <div
                  className='action-container'
                  onClick={(evt) => this.sendPayrollReport(d.original.payroll_id, evt)}
                >
                  <span className='ion-paper-airplane ions-style' />
                </div>
              ),
              className: 'text',
              label: 'ACTION',
              maxWidth: 80
            }]
        }]}
      />}
      {!loading && noPayrolls && <div className='empty'>
        <CenteredTextNotify icon='ion-ios-checkmark' text={`You have no payroll reports.`} />
      </div>}
    </div>
  }
}

let mapStateToProps = state => {
  return {
    payrolls: state.payrolls
  }
}

let mapDispatchToProps = dispatch => {
  return {
    payrollActions: bindActionCreators(payrollActions, dispatch),
    reportsActions: bindActionCreators(reportsActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
