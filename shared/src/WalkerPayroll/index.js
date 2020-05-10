// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { View } from 'react-native'
// Styles
import styles from './styles'

// Components
import Filterbar from './components/Filterbar'
import SectionHeader from '../globalComponents/SectionHeader'
import CustomTable from '../globalComponents/CustomTable'
import CenteredTextNotify from '../globalComponents/CenteredTextNotify'
// Actions
import payrollActions from '../../actions/payroll'
import reportsActions from '../../actions/reports'

// Controllers
import { appController, reportsController, walkersController, sessionController } from '../../controllers'

class WalkerPayroll extends Component {
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
    // let params = {
    //   start_date: this.state.startDate.format('YYYY-MM-DD'),
    //   end_date: this.state.endDate.format('YYYY-MM-DD')
    // }
    // walkersController.actions.fetchWalkerPayRoll(35369, params)
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
      } else {
        return false
      }
    }
  }

  handleStartDateChange = (startDate) => {
    this.setState({ startDate })
    const params = {
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: this.state.endDate.format('YYYY-MM-DD')
    }
    walkersController.actions.fetchWalkerPayRoll(35369, params)
  }

  handleEndDateChange = (endDate) => {
    this.setState({ endDate })
    const params = {
      start_date: this.state.startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD')
    }
    walkersController.actions.fetchWalkerPayRoll(35369, params)
  }

  searchHandle = (event) => {
    this.setState({ searchText: event.target.value })
  }

  sendPayrollReport = (payrollId, e) => {
    if (e) { e.stopPropagation() }
    reportsController.actions.sendPayrollReport(payrollId)
  }

  openPayrollDetailModal = data => {
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
      items.map(function (val) { amount = amount + parseFloat(val.amount) })
    }
    return amount.toFixed(2)
  }

  render () {
    const payrolls = this.props.payrolls.payrolls
    // if (this.props.payrolls.payrolls && !utility.isEmpty(this.state.searchText)) payrolls = payrolls.filter(this.filterSearch)
    // if (this.state.selectedWalkers.length > 0) {
    //   payrolls = payrolls.filter(item => this.state.selectedWalkers.find(walker => walker.value === item.user_id))
    // }
    return <View style={styles.Payroll}>
      <SectionHeader bigBottomPadding title='Payroll' />
      <Filterbar
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        handleEndDateChange={this.handleEndDateChange}
        handleStartDateChange={this.handleStartDateChange}

      />
      {(this.props.payrolls.loading || payrolls.length > 0) && <CustomTable
        data={payrolls}
        style={styles.payrollsTable}
        onRowClick={this.openPayrollDetailModal}
        loading={this.props.payrolls.loading}
        columns={[
          {
            accessor: (d) => moment(d.date).format('MM/DD/YYYY'),
            className: 'text strong',
            id: 'date',
            label: 'DATE',
            width: 110
          },
          {
            accessor: 'payroll_id',
            className: 'text',
            label: 'NUMBER',
            width: 110
          },
          {
            accessor: (d) => (moment(d.period_start).format('MM/DD/YYYY') + '  -  ' + moment(d.period_end).format('MM/DD/YYYY')),
            id: 'payroll_peroid',
            className: 'text',
            label: 'PAYROLL PERIOD',
            width: 180
          },
          {
            accessor: (d) => ('$' + this.totalcount(d.items)),
            id: 'amount',
            className: 'text',
            label: 'AMOUNT',
            width: 100
          }
        ]
        }
      />}
      {!this.props.payrolls.loading && payrolls.length === 0 && <CenteredTextNotify icon='checkmark' text={`You have no payroll reports.`} />}
    </View>
  }
}

const mapStateToProps = state => {
  const selectUser = sessionController.selectUser(state)
  return {
    staffsData: state.walkers,
    payrolls: state.payrolls,
    selectUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    payrollActions: bindActionCreators(payrollActions, dispatch),
    reportsActions: bindActionCreators(reportsActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkerPayroll)
