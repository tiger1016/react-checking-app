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
import { customersController, reportsController, servicesController } from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

const salesType = [{ value: 'Customer', label: 'Customer' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Service', label: 'Service' },
  { value: 'Add-on', label: 'Add-on' },
  { value: 'Zip Code', label: 'Zip Code' },
  { value: 'Date', label: 'Date' }]

export class Sales extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start_date: moment().subtract(1, 'weeks'),
      end_date: moment(),
      isScriptRun: false,
      types: { value: 'Customer', label: 'Customer' },
      customers: null,
      walker: null,
      services: null,
      addon: null,
      zip: null
    }
    this.handleStartDateHandle = this.handleStartDateHandle.bind(this)
    this.handleEndDateHandle = this.handleEndDateHandle.bind(this)
    this.handleTypesChange = this.handleTypesChange.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this)
    this.handleWalkerChange = this.handleWalkerChange.bind(this)
    this.handleServicesChange = this.handleServicesChange.bind(this)
    this.handleAddonChange = this.handleAddonChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.handleEndDateHandle = this.handleEndDateHandle.bind(this)
    this.runScript = this.runScript.bind(this)
  }
  runScript () {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY'),
      detailed_sales_report_of: this.state.types.value
    }
    if (this.state.customers) this.state.customers.map(function (item) { if (!data.customer_sales_customer) data.customer_sales_customer = []; data.customer_sales_customer.push(item.value) })
    if (this.state.walker) this.state.walker.map(function (item) { if (!data.customer_sales_walker) data.customer_sales_walker = []; data.customer_sales_walker.push(item.value) })
    if (this.state.services) this.state.services.map(function (item) { if (!data.service_types) data.service_types = []; data.service_types.push(item.value) })
    if (this.state.addon) this.state.addon.map(function (item) { if (!data.addons) data.addons = []; data.addons.push(item.value) })
    if (this.state.zip) this.state.zip.map(function (item) { if (!data.zip_codes) data.zip_codes = []; data.zip_codes.push(item.value) })
    if (data.customer_sales_customer) data.customer_sales_customer = data.customer_sales_customer.join(',')
    if (data.customer_sales_walker) data.customer_sales_walker = data.customer_sales_walker.join(',')
    if (data.service_types) data.service_types = data.service_types.join(',')
    if (data.addons) data.addons = data.addons.join(',')
    if (data.zip_codes) data.zip_codes = data.zip_codes.join(',')
    this.setState({ isScriptRun: true })
    this.props.reportsAction.SalesReports(data)
  }
  handleStartDateHandle = (data) => {
    this.setState({ start_date: data })
  }
  handleEndDateHandle = (data) => {
    this.setState({ end_date: data })
  }
  handleTypesChange = (data) => {
    this.setState({ types: data })
  }
  handleCustomerChange = (data) => {
    this.setState({ customers: data })
  }
  handleWalkerChange = (data) => {
    this.setState({ walker: data })
  }
  handleServicesChange = (data) => {
    this.setState({ services: data })
  }
  handleAddonChange = (data) => {
    this.setState({ addon: data })
  }
  handleZipChange = (data) => {
    this.setState({ zip: data })
  }
  downloadReport = () => {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY'),
      detailed_sales_report_of: this.state.types.value
    }
    reportsController.actions.downloadReport('sales_report', data, reportsController.downloadReport)
  }
  copyReport = () => {
    let self = this
    let text = `"${self.state.types.value}","Amount"`
    this.props.sales.data.sales.map(d => {
      text = `${text}
"${self.state.types.value !== 'Date' ? d.sale_unit : moment(d.sale_unit).format('MM/DD/YYYY')}","${'$' + d.amount}"`
    })
    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }
  printReport = () => {
    let json = []
    let self = this
    this.props.sales.data.sales.map(function (d) {
      let data = { 'Amount': '$' + d.amount }
      data[self.state.types.value] = self.state.types.value !== 'Date' ? d.sale_unit : moment(d.sale_unit).format('MM/DD/YYYY')
      json.push(data)
    })
    printJS({ printable: json, properties: [self.state.types.value, 'Amount'], type: 'json' })
  }
  formatWalkersForDropdown = walkers => _.map(walkers, w => ({ value: w.id, label: (w.first_name + ' ' + w.last_name) }))
  formatdropdowm = data => _.map(data, w => ({ value: w, label: w }))
  formatServicesForDropdown = services => _.map(services, s => ({ value: s.id, label: s.dropdown_description }))
  formatAddonsForDropdown = addons => _.map(addons, a => ({ value: a.id, label: a.name }))
  render () {
    let totalAmount = 0
    if (this.props.sales && this.props.sales.data && this.props.sales.data.sales && this.props.sales.data.sales.length > 0) {
      totalAmount = this.props.sales.data.sales.reduce(function (a, b) {
        return Number(a) + Number(b['amount'])
      }, 0)
    }
    return (
      <div className='content sales-container' >
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
                <span className='cus-profile-label'>Type</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-paperclip'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi={false}
                    onChange={this.handleTypesChange}
                    options={salesType}
                    placeholder={'-Select Type-'}
                    value={this.state.types} /></CustomInputWithIcon>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <span className='information-header'>Optional Filters</span>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Customer</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-person'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleCustomerChange}
                    options={this.props.customersForEditModal}
                    placeholder={'All Customers'}
                    value={this.state.customers} /></CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Staff</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-person'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleWalkerChange}
                    options={this.formatWalkersForDropdown(this.props.walkers.walkers)}
                    placeholder={'-Select staff-'}
                    value={this.state.walker} /></CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Service</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-checkmark-round'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleServicesChange}
                    options={this.formatServicesForDropdown(this.props.services)}
                    placeholder={'-Select Services-'}
                    value={this.state.services} /></CustomInputWithIcon>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <span className='information-header' />
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Add-on</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-checkmark-round'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleAddonChange}
                    options={this.formatAddonsForDropdown(this.props.addons)}
                    placeholder={'-Select Add-Ons-'}
                    value={this.state.addon} /></CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Zip-Code</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-pin'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleZipChange}
                    options={this.formatdropdowm(this.props.customerInfo.zip)}
                    placeholder={'-Select ZipCode-'}
                    value={this.state.zip} /></CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.sales.data && this.props.sales.data.sales && this.props.sales.data.sales.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult' >
          {
            this.props.sales.loading || (this.props.sales.data && this.props.sales.data.sales && this.props.sales.data.sales.length > 0) ? <CustomTable
              data={this.props.sales.data.sales}
              loading={this.props.sales.loading}
              minRows={0}
              columns={[{
                columns: [
                  {
                    accessor: d => this.state.types.value !== 'Date' ? d.sale_unit : moment(d.sale_unit).format('MM/DD/YYYY'),
                    id: 'sale_unit',
                    className: 'text',
                    label: this.state.types.value,
                    Footer: (<span className='totalFooter firstColumn'>Total</span>)
                  },
                  {
                    accessor: d => '$' + d.amount,
                    id: 'amount',
                    className: 'text',
                    label: 'Amount',
                    Footer: (<span className='totalFooter'>${parseFloat(totalAmount).toFixed(2)}</span>)
                  }
                ]
              }]}
            /> : <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} /></div>
          }
        </div> : ''}
      </div >
    )
  }
}

function mapStateToProps (state, ownProps) {
  let customersForEditModal = customersController.selectCustomersArrayFormatForEditModal(state)

  return {
    addons: state.addons.addons || [],
    customerInfo: state.reports.customerInfo.data,
    customersForEditModal,
    sales: state.reports.sales,
    services: servicesController.selectActiveServices(state) || [],
    walkers: state.walkers
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    reportsAction: bindActionCreators(reportsAction, dispatch),
    dispatch
  })
)(Sales)
