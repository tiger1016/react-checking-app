// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Select from 'react-select'
import printJS from 'print-js'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

// Controllers
import { reportsController } from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'
import Loader from 'GlobalComponents/Loader'

export class Payroll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start_date: moment().subtract(1, 'weeks'),
      end_date: moment()
    }
  }
  handleStartDateHandle = (date) => {
    this.setState({ start_date: date })
  }
  handleEndDateHandle = (date) => {
    this.setState({ end_date: date })
  }
  runScript = () => {
    this.setState({ isScriptRun: true })
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    if (this.state.walkers) this.state.walkers.map(function (item) { if (!data.staff_report_walker) data.staff_report_walker = []; data.staff_report_walker.push(item.value) })
    if (data.staff_report_walker) data.staff_report_walker = data.staff_report_walker.join(',')
    this.props.reportsAction.StaffPayrollReport(data)
  }
  downloadReport = () => {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('payroll_report', data, reportsController.downloadReport)
  }
  copyReport = () => {
    let text = `"Customer","Payroll Number","Payroll Date","Period","Amount"`
    this.props.payrolls.data.payrolls.map(data => {
      text = `${text}
"${data.first_name} ${data.last_name}","${data.payroll_id}","${moment(data.date).format('MM/DD/YYYY')}","${moment(data.period_start).format('MM/DD/YYYY') + ' - ' + moment(data.period_end).format('MM/DD/YYYY')}","${'$' + this.payrollTotalAmount(data)}"`
    })

    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }
  printReport = () => {
    let json = []
    let self = this
    let payrolls = this.props.payrolls.data.payrolls
    Object.keys(payrolls).forEach(key => {
      json.push({ 'Customer': payrolls[key].first_name + ' ' + payrolls[key].last_name, 'Payroll Number': payrolls[key].payroll_id, 'Payroll Date': moment(payrolls[key].date).format('MM/DD/YYYY'), 'Period': moment(payrolls[key].period_start).format('MM/DD/YYYY') + ' - ' + moment(payrolls[key].period_end).format('MM/DD/YYYY'), 'Amount': '$' + self.payrollTotalAmount(payrolls[key]) })
    })
    printJS({ printable: json, properties: ['Customer', 'Payroll Number', 'Payroll Date', 'Period', 'Amount'], type: 'json' })
  }
  handleStaffChange = (data) => {
    this.setState({ walkers: data })
  }
  formatWalkersForDropdown = walkers => _.map(walkers, w => ({ value: w.id, label: (w.first_name + ' ' + w.last_name) }))
  payrollTotalAmount = (data) => {
    if (data.items) {
      return data.items.reduce((amount, item) => amount + (item && item.total_amount) ? parseFloat(item.total_amount) : 0.00, 0.00).toFixed(2)
    }
    return 0.00
  }
  render () {
    let payrolls = []
    if (this.props.payrolls && this.props.payrolls.data && this.props.payrolls.data.payrolls) {
      Object.keys(this.props.payrolls.data.payrolls).forEach(key => {
        payrolls.push(this.props.payrolls.data.payrolls[key])
      })
    }
    return (
      <div className='content payrolls-container'>
        <div className='filter-container'>
          <div className='col-3'>
            <span className='information-header'>Report Filters</span>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Start Date</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='calendar'>
                  <DatePicker
                    showYearDropdown
                    className='datePicker'
                    selected={this.state.start_date}
                    onChange={this.handleStartDateHandle} />
                </CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>End Date</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='calendar'>
                  <DatePicker
                    showYearDropdown
                    className='datePicker'
                    selected={this.state.end_date}
                    onChange={this.handleStartDateHandle} />
                </CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Staff</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='calendar'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleStaffChange}
                    options={this.formatWalkersForDropdown(this.props.walkers.walkers)}
                    placeholder={'-Select staff-'}
                    value={this.state.walkers} /></CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && payrolls && payrolls.length > 0 ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult'>

          {this.props.payrolls.loading ? <div className='empty'> <Loader /> </div> : <div className='payroll-container'>
            {payrolls && payrolls.length > 0 ? <div style={{ paddingTop: '10px' }}>
              <CustomTable
                data={payrolls}
                loading={this.props.payrolls.loading}
                minRows={0}
                showPagination={false}
                pageSize={payrolls.length}
                className='-striped -highlight'
                noDataText='No Records'
                columns={[{
                  columns: [
                    {
                      accessor: d => `${d.first_name} ${d.last_name}`,
                      id: 'name',
                      className: 'text',
                      label: 'Customer'
                    },
                    {
                      accessor: 'payroll_id',
                      id: 'payroll_numer',
                      className: 'text',
                      label: 'Payroll Number'
                    },
                    {
                      accessor: d => moment(d.date).format('MM/DD/YYYY'),
                      id: 'date',
                      className: 'text',
                      label: 'Payroll Date'
                    },
                    {
                      accessor: d => moment(d.period_start).format('MM/DD/YYYY') + ' - ' + moment(d.period_end).format('MM/DD/YYYY'),
                      id: 'period',
                      className: 'text',
                      label: 'Period'
                    },
                    {
                      accessor: d => '$' + this.payrollTotalAmount(d),
                      id: 'amount',
                      className: 'text',
                      label: 'Amount'
                    }
                  ]
                }]} />
            </div> : <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} /></div>}
          </div>}
        </div> : ''}
      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    payrolls: state.reports.payroll,
    walkers: state.walkers
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    reportsAction: bindActionCreators(reportsAction, dispatch),
    dispatch
  })
)(Payroll)
