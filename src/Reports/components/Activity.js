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
import _ from 'lodash'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

// Controllers
import {
  customersController,
  reportsController,
  servicesController
} from 'Controllers'

const walkStatus = [
  { value: 'approved', label: 'Approved' },
  { value: 'completed', label: 'Completed' },
  { value: 'in_progress', label: 'In Process' },
  { value: 'pending', label: 'Pending' }
]

export class Activity extends Component {
  state = {
    end_date: moment(),
    isScriptRun: false,
    start_date: moment().subtract(1, 'weeks')
  }

  sortReports = (property) => {
    if (this.state.sortBy === property + 'Aesc') {
      this.setState({ sortBy: property + 'Desc' })
    } else {
      this.setState({ sortBy: property + 'Aesc' })
    }
  }

  dynamicSort = () => {
    switch (this.state.sortBy) {
      case 'dateAesc':
        return function (a, b) {
          let adate = new Date(a['requested_time'])
          let bdate = new Date(b['requested_time'])
          var result = (adate < bdate ? -1 : (adate > bdate) ? 1 : 0)
          return result * 1
        }
      case 'dateDesc':
        return function (a, b) {
          let adate = new Date(a['requested_time'])
          let bdate = new Date(b['requested_time'])
          var result = (adate > bdate ? -1 : (adate < bdate) ? 1 : 0)
          return result * 1
        }
      default:
        return function (a, b) { return 0 }
    }
  }

  runScript = () => {
    const { reportsAction } = this.props
    const {
      customers,
      services,
      walkers,
      walkStatus
    } = this.state
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY'),
      customer_activity_customer: [],
      customer_activity_walker: [],
      customer_activity_status: [],
      service_types: []
    }
    if (customers) customers.map(item => { data.customer_activity_customer.push(item.value) })
    if (walkers) walkers.map(item => { data.customer_activity_walker.push(item.value) })
    if (services) services.map(item => { data.service_types.push(item.value) })
    if (walkStatus) walkStatus.map(item => { data.customer_activity_status.push(item.value) })
    this.setState({ isScriptRun: true })
    reportsAction.ActivityReports(data)
    this.downloadReport = this.downloadReport.bind(this)
    this.copyReport = this.copyReport.bind(this)
    this.printReport = this.printReport.bind(this)
  }

  handleCustomersChange = customers => this.setState({ customers })
  handleEndDateHandle = data => this.setState({ end_date: data })
  handleServicesChange = services => this.setState({ services })
  handleStartDateHandle = data => this.setState({ start_date: data })
  handleWalkersChange = walkers => this.setState({ walkers })
  handleWalkStatusChange = walkStatus => this.setState({ walkStatus })

  downloadReport = () => {
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('customer_activity_report', data, reportsController.downloadReport)
    // reportsController.downloadReport('customer_activity_report', data)
  }

  copyReport = () => {
    const { activities } = this.props
    // let json = []
    // activities.data.activities.map(data => {
    //   json.push(
    //     {
    //       'Date': moment(data.requested_time).format('MM/DD/YYYY'),
    //       'Staff': data.walker_name,
    //       'Customer': data.customer_name,
    //       'Pet(s)': data.pet_name,
    //       'Service': data.service,
    //       'Add-ons': data.addons && data.addons.length > 0 ? data.addons[0].name : '',
    //       'Service Status': data.walk_status,
    //       'BIlling Status': data.billing_status,
    //       'Cost': '$' + parseFloat(data.cost ? data.cost : 0).toFixed(2),
    //       'Invoice Number': data.invoice_id,
    //       'Invoice Date': data.invoiced_date && moment(data.invoiced_date).format('MM/DD/YYYY')
    //     })
    // })
    let text = `"Date","Staff","Customer","Pet(s)","Service","Add-ons","Service Status","Billing Status","Cost","Invoice Number","Invoice Date"`
    activities.data.activities.map(data => {
      text = `${text}
"${moment(data.requested_time).format('MM/DD/YYYY')}","${data.walker_name}","${data.customer_name}","${data.pet_name}","${data.service}","${data.addons && data.addons.length > 0 ? data.addons[0].name : ''}","${data.walk_status}","${data.billing_status}","${'$' + parseFloat(data.cost ? data.cost : 0).toFixed(2)}","${data.invoice_id}","${data.invoiced_date && moment(data.invoiced_date).format('MM/DD/YYYY')}"`
    })
    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }

  printReport = () => {
    const { activities } = this.props
    const json = []
    activities.data.activities.map(data => {
      json.push(
        {
          'Date': moment(data.requested_time).format('MM/DD/YYYY'),
          'Staff': data.walker_name,
          'Customer': data.customer_name,
          'Pet(s)': data.pet_name,
          'Service': data.service,
          'Add-ons': data.addons && data.addons.length > 0 ? data.addons[0].name : '',
          'Service Status': data.walk_status,
          'BIlling Status': data.billing_status,
          'Cost': '$' + parseFloat(data.cost ? data.cost : 0).toFixed(2),
          'Invoice Number': data.invoice_id,
          'Invoice Date': data.invoiced_date && moment(data.invoiced_date).format('MM/DD/YYYY')
        })
    })
    printJS({
      printable: json,
      properties: ['Date',
        'Staff',
        'Customer',
        'Pet(s)',
        'Service',
        'Add-ons',
        'Service Status',
        'BIlling Status',
        'Cost',
        'Invoice Number',
        'Invoice Date'],
      type: 'json'
    })
  }

  formatWalkersForDropdown = walkers => _.map(walkers.filter(i => i.active), w => ({ value: w.id, label: (w.first_name + ' ' + w.last_name) }))
  formatServicesForDropdown = services => _.map(services, s => ({ value: s.id, label: s.dropdown_description }))

  render () {
    let totalAmount = 0
    if (this.props.activities && this.props.activities.data && this.props.activities.data.activities && this.props.activities.data.activities.length > 0) {
      totalAmount = this.props.activities.data.activities.reduce(function (a, b) {
        return Number(a) + Number(b['cost'])
      }, 0)
    }
    // console.log(this.props.activities.data.activities.filter(r => r.invoice_id))
    return (
      <div className='content activity-container'>
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
                <span className='cus-profile-label'>Staff(s)</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-person'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleWalkersChange}
                    options={this.formatWalkersForDropdown(this.props.walkers.walkers)}
                    placeholder={'-select staff-'}
                    value={this.state.walkers} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <span className='information-header' />
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
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Walk Status(es)</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-paperclip'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={this.handleWalkStatusChange}
                    options={walkStatus}
                    placeholder={'-select walk status-'}
                    value={this.state.walkStatus} />
                </CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Service Type(s)</span>
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
                    placeholder={'-select service type-'}
                    value={this.state.services} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>RUN REPORT</button>
          <span className='info'>In all reports , leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.activities.data && this.props.activities.data.activities && this.props.activities.data.activities.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult'>
          {this.props.activities.loading || (this.props.activities.data && this.props.activities.data.activities && this.props.activities.data.activities.length > 0) ? <CustomTable
            data={this.props.activities.data.activities}
            loading={this.props.activities.loading}
            minRows={0}
            columns={[{
              columns: [
                {
                  accessor: d => d.requested_time,
                  id: 'Date',
                  className: 'text',
                  label: 'Date',
                  minWidth: 150
                },
                {
                  accessor: 'walker_name',
                  className: 'text',
                  label: 'Staff'
                },
                {
                  accessor: 'customer_name',
                  className: 'text',
                  label: 'Customer'
                },
                {
                  accessor: 'pet_name',
                  className: 'text',
                  label: 'Pet(s)'
                },
                {
                  accessor: 'service',
                  className: 'text',
                  label: 'Service'
                },
                {
                  accessor: d => d.addons && d.addons.length > 0 ? d.addons[0].name : '',
                  id: 'Add-ons',
                  className: 'text',
                  label: 'Add-ons'
                },
                {
                  accessor: 'walk_status',
                  className: 'text',
                  label: 'Service Status'
                },
                {
                  accessor: 'billing_status',
                  className: 'text',
                  label: 'Billing Status'
                },
                {
                  accessor: d => '$' + parseFloat(d.cost ? d.cost : 0).toFixed(2),
                  id: 'cost',
                  className: 'text',
                  label: 'Cost'
                },
                {
                  accessor: 'invoice_id',
                  id: 'invoice_id',
                  className: 'text',
                  label: 'Invoice Number',
                  Footer: (<span className='totalFooter firstColumn'>Total</span>)
                },
                {
                  accessor: d => d.invoiced_date && moment(d.invoiced_date).format('MM/DD/YYYY'),
                  id: 'Invoice_Date',
                  className: 'text',
                  label: 'Invoice Date',
                  Footer: (<span className='totalFooter'>${parseFloat(totalAmount).toFixed(2)}</span>)
                }
              ]
            }]}
          /> : <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} /></div>}
        </div> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const customersForEditModal = customersController.selectCustomersArrayFormatForEditModal(state)
  return {
    activities: state.reports.activity,
    addons: state.addons.addons || [],
    customersForEditModal,
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
)(Activity)
