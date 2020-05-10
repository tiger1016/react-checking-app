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
import { customersController, reportsController } from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

export class WalkAudit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start_date: moment().subtract(1, 'weeks'),
      end_date: moment(),
      isScriptRun: false
    }
  }
  runScript = () => {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY'),
      customer_walk_audit_walker: [],
      customer_walk_audit_customer: []

    }
    if (this.state.customers) this.state.customers.map(function (item) { data.customer_walk_audit_customer.push(item.value) })
    if (this.state.walkers) this.state.walkers.map(function (item) { data.customer_walk_audit_walker.push(item.value) })
    this.setState({ isScriptRun: true })
    this.props.reportsAction.WalkAuditReports(data)
    this.downloadReport = this.downloadReport.bind(this)
    this.copyReport = this.copyReport.bind(this)
    this.printReport = this.printReport.bind(this)
  }

  handleStartDateHandle = (date) => {
    this.setState({ start_date: date })
  }
  handleEndDateHandle = (date) => {
    this.setState({ end_date: date })
  }
  handleWalkersChange = (data) => {
    this.setState({ walkers: data })
  }
  handleCustomersChange = (data) => {
    this.setState({ customers: data })
  }
  downloadReport = () => {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('customer_walk_audit_report', data, reportsController.downloadReport)
  }
  copyReport = () => {
    let text = `"Date","Pet(s)","Walk Status","Scan In","Scan Out","Duration","Customer","Walker","Walker Comments","Map"`
    this.props.walkAudits.data.activities.map(d => {
      text = `${text}
""${moment(d.requested_time).format('MM/DD/YYYY')}","${d.pet_name}","${d.walk_status}","${d.start_time}","${d.end_time}","${this.getDuration(d.start_time, d.end_time)}","${d.customer_name}","${d.walker_name}","${d.walker_comments}","${d.map ? 'YES' : 'NO'}"`
    })
    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }
  printReport = () => {
    let json = []
    this.props.walkAudits.data.activities.map(d => {
      json.push({
        'Date': moment(d.requested_time).format('MM/DD/YYYY'),
        'Pet(s)': d.pet_name,
        'Walk Status': d.walk_status,
        'Scan In': d.start_time,
        'Scan Out': d.end_time,
        'Duration': this.getDuration(d.start_time, d.end_time),
        'Customer': d.customer_name,
        'Walker': d.walker_name,
        'Walker Comments': d.walker_comments,
        'Map': d.map ? 'YES' : 'NO'
      })
    })
    printJS({
      printable: json,
      properties: ['Date',
        'Pet(s)',
        'Walk Status',
        'Scan In',
        'Scan Out',
        'Duration',
        'Customer',
        'Walker',
        'Walker Comments',
        'Map'
      ],
      type: 'json'
    })
  }
  formatWalkersForDropdown = walkers => _.map(walkers, w => ({ value: w.id, label: (w.first_name + ' ' + w.last_name) }))
  getDuration = (start, end) => {
    const _start = moment(start)
    const _end = moment(end)
    const duration = moment.duration(_end.diff(_start))
    let hours = parseInt(duration.as('hours'))
    let minutes = parseInt(duration.as('minutes')) % 60
    let seconds = parseInt(duration.as('seconds')) % 60
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    return hours + ':' + minutes + ':' + seconds
  }
  render () {
    return (
      <div className='content walkAudit-container'>
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
                    value={this.state.walkers} /></CustomInputWithIcon>
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

          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.walkAudits.data && this.props.walkAudits.data.activities && this.props.walkAudits.data.activities.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult'>
          {this.props.walkAudits.loading || (this.props.walkAudits.data && this.props.walkAudits.data.activities && this.props.walkAudits.data.activities.length > 0) ? <CustomTable
            data={this.props.walkAudits.data && this.props.walkAudits.data.activities}
            loading={this.props.walkAudits.loading}
            minRows={0}
            columns={[{
              columns: [
                {
                  accessor: d => moment(d.requested_time).format('MM/DD/YYYY'),
                  id: 'Date',
                  className: 'text',
                  label: 'Date'
                },
                {
                  accessor: 'pet_name',
                  className: 'text',
                  label: 'Pet(s)'
                },
                {
                  accessor: 'walk_status',
                  className: 'text',
                  label: 'Walk Status'
                },
                {
                  accessor: d => moment(d.start_time).isValid() ? moment(d.start_time).format('hh:mm:ss A') : '',
                  id: 'start_time',
                  className: 'text',
                  label: 'Scan In'
                },
                {
                  accessor: d => moment(d.end_time).isValid() ? moment(d.end_time).format('hh:mm:ss A') : '',
                  id: 'end_time',
                  className: 'text',
                  label: 'Scan Out'
                },
                {
                  accessor: d => this.getDuration(d.start_time, d.end_time),
                  id: 'Duration',
                  className: 'text',
                  label: 'Duration'
                },
                {
                  accessor: 'customer_name',
                  className: 'text',
                  label: 'Customer'
                },
                {
                  accessor: 'walker_name',
                  className: 'text',
                  label: 'Staff'
                },
                {
                  accessor: 'walker_comments',
                  className: 'text',
                  label: 'Staff Comments'
                },
                {
                  accessor: d => d.map ? 'YES' : 'NO',
                  id: 'map',
                  className: 'text',
                  label: 'Map'
                }
              ]
            }]}
          /> : <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} /></div>}
        </div> : ''}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let customersForEditModal = customersController.selectCustomersArrayFormatForEditModal(state)
  return {
    customersForEditModal,
    walkAudits: state.reports.walkAudit,
    walkers: state.walkers
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    reportsAction: bindActionCreators(reportsAction, dispatch),
    dispatch
  })
)(WalkAudit)
