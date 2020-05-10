// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import printJS from 'print-js'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { toast } from 'react-toastify'

// Controllers
import {
  customersController,
  reportsController
} from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

const paymentType = [
  { value: null, label: 'All Payment Methods' },
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'cc', label: 'Credit Card' }
]

export class Transaction extends Component {
  state = {
    start_date: moment().subtract(1, 'weeks'),
    end_date: moment(),
    paymentType: { value: null, label: 'All Payment Methods' },
    isScriptRun: false
  }

  runScript = () => {
    const { reportsAction } = this.props
    const { customers } = this.state
    this.setState({ isScriptRun: true })
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY'),
      payment_type: this.state.paymentType.value,
      customer_transaction_customer: []
    }
    if (customers) customers.map(item => { data.customer_transaction_customer.push(item.value) })
    reportsAction.TransactionReports(data)
  }

  handleCustomersChange = customers => this.setState({ customers })
  handleEndDateHandle = data => this.setState({ end_date: data })
  handlePaymentTypeChange = paymentType => this.setState({ paymentType })
  handleStartDateHandle = data => this.setState({ start_date: data })

  downloadReport = () => {
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('customer_transactions_report', data, reportsController.downloadReport)
  }

  copyReport = () => {
    const { transactions } = this.props
    // const json = transactions.data.transactions.map(data => ({
    //   'Customer': data.customer,
    //   'Date': data.date,
    //   'Amount': data.amount,
    //   'Sales Tax Amount': data.sales_tax_amount,
    //   'PCT Fee': data.pct_fee,
    //   'Billing/Declined': data.billing_declined,
    //   'Type': data.type,
    //   'Status': data.status
    // }))
    // const text = JSON.stringify(json)
    let csv = `"Customer","Date","Amount","Sales Tax Amount","PCT Fee","Billing/Declined","Type","Status"`
    transactions.data.transactions.map(data => {
      csv = `${csv}
"${data.customer}","${data.date}","${data.amount}","${data.sales_tax_amount}","${data.pct_fee}","${data.billing_declined}","${data.type}","${data.status}"`
    })
    copy(csv.trim(), { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }

  printReport = () => {
    const { transactions } = this.props
    const json = transactions.data.transactions.map(data => ({
      'Customer': data.customer,
      'Date': data.date,
      'Amount': data.amount,
      'Sales Tax Amount': data.sales_tax_amount,
      'PCT Fee': data.pct_fee,
      'Billing/Declined': data.billing_declined,
      'Type': data.type,
      'Status': data.status
    }))
    printJS({
      printable: json,
      properties: ['Customer',
        'Date',
        'Amount',
        'Sales Tax Amount',
        'PCT Fee',
        'Billing/Declined',
        'Type',
        'Status'],
      type: 'json'
    })
  }

  getTransactionType = type => {
    switch (type) {
      case 'transaction':
        return 'Credit Card'
      case 'manual_cash':
        return 'Cash'
      case 'manual_check':
        return 'Check'
      default:
        return ''
    }
  }

  render () {
    return (
      <div className='content transaction-container'>
        <div className='filter-container'>
          <div className='col-3'>
            <span className='information-header'>
              Report Filters
            </span>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>
                  Start Date
                </span>
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
                <span className='cus-profile-label'>
                  End Date
                </span>
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
                <span className='cus-profile-label'>
                  Payment Type
                </span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-paperclip'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi={false}
                    onChange={this.handlePaymentTypeChange}
                    options={paymentType}
                    placeholder={'--'}
                    value={this.state.paymentType} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <span className='information-header' />
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>
                  Customer(s)
                </span>
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
                    placeholder={'All Customers'}
                    value={this.state.customers} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>
            RUN REPORT
          </button>
          <span className='info'>
            In all reports, leaving options blank will search all of that selection
          </span>
          {this.state.isScriptRun && (this.props.transactions.data && this.props.transactions.data.transactions && this.props.transactions.data.transactions.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} />
          </div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult'>
          {!this.props.transactions.loading &&
            this.props.transactions.data &&
            this.props.transactions.data.transactions &&
            this.props.transactions.data.totals_info &&
            this.props.transactions.data.transactions.length > 0 &&
            <div className='totals'>
              <div className='dashStat border_right'>
                <div className='number-small'>
                  ${parseFloat(this.props.transactions.data.totals_info.total_gross_sales).toFixed(2)}
                </div>
                <div className='caption'>total gross sales</div>
              </div>
              <div className='dashStat border_right'>
                <div className='number-small'>
                  ${parseFloat(this.props.transactions.data.totals_info.total_sales_tax).toFixed(2)}
                </div>
                <div className='caption'>sales tax</div>
              </div>
              <div className='dashStat border_right'>
                <div className='number-small'>
                  ${parseFloat(this.props.transactions.data.totals_info.total_sales).toFixed(2)}
                </div>
                <div className='caption'>total sales</div>
              </div>
              <div className='dashStat border_right'>
                <div className='number-small'>
                  ${parseFloat(this.props.transactions.data.totals_info.total_pct_fee).toFixed(2)}
                </div>
                <div className='caption'>cc fee</div>
              </div>
              {/* <div className='dashStat border_right'> */}
              {/*   <div className='number-small'> */}
              {/*     ${parseFloat(this.props.transactions.data.totals_info.total_bank_fee).toFixed(2)} */}
              {/*   </div> */}
              {/*   <div className='caption'>bank fee</div> */}
              {/* </div> */}
              <div className='dashStat border_right'>
                <div className='number-small'>
                  ${parseFloat(this.props.transactions.data.totals_info.total_customer_credits).toFixed(2)}
                </div>
                <div className='caption'>customer credits</div>
              </div>
              <div className='dashStat'>
                <div className='number-small'>
                  ${parseFloat(this.props.transactions.data.totals_info.total_paid).toFixed(2)}
                </div>
                <div className='caption'>paid</div>
              </div>
              <div className='clear' />
            </div>}
          {this.props.transactions.loading ||
            (this.props.transactions.data &&
              this.props.transactions.data.transactions &&
              this.props.transactions.data.transactions.length > 0)
            ? <CustomTable
              data={this.props.transactions.data.transactions}
              loading={this.props.transactions.loading}
              minRows={0}
              columns={[{
                columns: [
                  {
                    accessor: 'customer',
                    className: 'text',
                    label: 'Customer'
                  },
                  {
                    accessor: 'invoice_id',
                    className: 'text',
                    label: 'Invoice Number(s)'
                  },
                  {
                    accessor: 'date',
                    className: 'text',
                    label: 'Date'
                  },
                  {
                    accessor: d => '$' + parseFloat(d.amount).toFixed(2),
                    id: 'amount',
                    className: 'text',
                    label: 'Amount'
                  },
                  {
                    accessor: d => '$' + parseFloat(d.sales_tax_amount).toFixed(2),
                    id: 'sales_tax_amount',
                    className: 'text',
                    label: 'Sales Tax Amount'
                  },
                  {
                    accessor: d => '$' + parseFloat(d.pct_fee).toFixed(2),
                    id: 'pct_fee',
                    className: 'text',
                    label: 'CC Fee'
                  },
                  {
                    accessor: 'billing_declined',
                    className: 'text',
                    label: 'Billing/Declined'
                  },
                  {
                    accessor: d => this.getTransactionType(d.type),
                    id: 'type',
                    className: 'text',
                    label: 'Type'
                  },
                  {
                    accessor: 'status',
                    className: 'text',
                    label: 'Status'
                  }
                ]
              }]}
            /> : <div className='empty'>
              <CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} />
            </div>}
        </div> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const customersForEditModal = customersController.selectCustomersArrayFormatForEditModal(state)
  return {
    customersForEditModal,
    transactions: state.reports.transaction
  }
}

const mapDispatchToProps = dispatch => ({
  reportsAction: bindActionCreators(reportsAction, dispatch),
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction)
