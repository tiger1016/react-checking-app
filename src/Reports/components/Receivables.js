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

// Controllers
import { customersController, reportsController } from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

export class Receivables extends Component {
  state = {
    start_date: moment().subtract(1, 'weeks'),
    end_date: moment(),
    isScriptRun: false
  }

  runScript = () => {
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY'),
      customer_report_customer: []
    }
    if (this.state.customers) {
      this.state.customers.map(item => {
        data.customer_report_customer.push(item.value)
      })
    }
    this.setState({ isScriptRun: true })
    this.props.reportsAction.ReceivablesReports(data)
  }

  handleStartDateHandle = (date) => {
    this.setState({ start_date: date })
  }
  handleEndDateHandle = (date) => {
    this.setState({ end_date: date })
  }
  handleCustomersChange = (data) => {
    this.setState({ customers: data })
  }
  downloadReport = () => {
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('customer_receivables_report', data, reportsController.downloadReport)
    // reportsController.downloadReport('customer_receivables_report', data)
  }
  copyReport = () => {
    let text = `"Date","Customer","Number","Days Late","Payment Status","Amount Due","Outstanding"`
    this.props.receivables.map(d => {
      text = `${text}
"${moment(d.date).format('MM/DD/YYYY')}","${d.first_name + ' ' + d.last_name}","${d.id}","${moment(d.date).diff(d.ts, 'days')}","${d.status}","${'$' + parseFloat(d.total ? d.total : 0).toFixed(2)}","${'$' + parseFloat(d.total ? d.total : 0).toFixed(2)}"`
    })
    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }
  printReport = () => {
    let json = []
    this.props.receivables.map(function (d) {
      json.push({
        'Date': moment(d.date).format('MM/DD/YYYY'),
        'Customer': d.first_name + ' ' + d.last_name,
        'Number': d.id,
        // 'Due Date': moment(d.ts).format('MM/DD/YYYY'),
        'Days Late': moment(d.date).diff(d.ts, 'days'),
        'Payment Status': d.status,
        'Amount Due': '$' + parseFloat(d.total ? d.total : 0).toFixed(2),
        'Outstanding': '$' + parseFloat(d.total ? d.total : 0).toFixed(2)
      })
    })
    printJS({
      printable: json,
      properties: ['Date',
        'Customer',
        'Number',
        // 'Due Date',
        'Days Late',
        'Payment Status',
        'Amount Due',
        'Outstanding'
      ],
      type: 'json'
    })
  }
  render () {
    return (
      <div className='content receivables-container'>
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
                    onChange={this.handleEndDateHandle} />
                </CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Customer(s)</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-person'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleCustomersChange}
                    options={this.props.customersForEditModal}
                    placeholder={'-select customers-'}
                    value={this.state.customers} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.receivables && this.props.receivables.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun && <div className='reportResult' id='reportResult'>
          {this.props.receivableLoading || (this.props.receivables && this.props.receivables.length > 0) ? <CustomTable
            data={this.props.receivables}
            loading={this.props.receivableLoading}
            minRows={0}
            columns={[{
              columns: [
                {
                  accessor: d => moment(d.date).format('MM/DD/YYYY'),
                  id: 'Date',
                  className: 'text',
                  label: 'Date'
                },
                {
                  accessor: d => d.first_name + ' ' + d.last_name,
                  id: 'Customer',
                  className: 'text',
                  label: 'Customer'
                },
                {
                  accessor: 'id',
                  id: 'id',
                  className: 'text',
                  label: 'Number'
                },
                // {
                //   accessor: d => moment(d.ts).format('MM/DD/YYYY'),
                //   id: 'ts',
                //   className: 'text',
                //   label: 'Due Date'
                // },
                // {
                //   accessor: d => moment(d.date).diff(d.ts, 'days'),
                //   id: 'Dayslate',
                //   className: 'text',
                //   label: 'Days Late'
                // },
                {
                  accessor: 'status',
                  id: 'payment_status',
                  className: 'text',
                  label: 'Payment Status'
                },
                {
                  accessor: d => '$' + parseFloat(d.total ? d.total : 0).toFixed(2),
                  id: 'amount_due',
                  className: 'text',
                  label: 'Amount Due'
                },
                {
                  accessor: d => '$' + parseFloat(d.total ? d.total : 0).toFixed(2),
                  id: 'Outstanding',
                  className: 'text',
                  label: 'Outstanding'
                }
              ]
            }]}
          /> : <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} /></div>}
        </div>}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const customersForEditModal = customersController.selectCustomersArrayFormatForEditModal(state)

  return {
    customersForEditModal,
    receivables: state.reports.receivables.data.receivables || [],
    receivableLoading: state.reports.receivables.loading
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    reportsAction: bindActionCreators(reportsAction, dispatch),
    dispatch
  })
)(Receivables)
