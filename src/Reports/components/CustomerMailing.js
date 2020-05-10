// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import printJS from 'print-js'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { toast } from 'react-toastify'
import _ from 'lodash'

// Contollers
import { reportsController } from 'Controllers/reportsController'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

const customerMailingColumns = [
  {
    accessor: 'first_name',
    className: 'text',
    label: 'First Name'
  },
  {
    accessor: 'last_name',
    className: 'text',
    label: 'Last Name'
  },
  {
    accessor: 'username',
    className: 'text',
    label: 'Email'
  },
  {
    accessor: 'email_secondary',
    className: 'text',
    label: 'Secondary Email'
  },
  {
    accessor: 'address',
    className: 'text',
    label: 'Address'
  },
  {
    accessor: 'city',
    className: 'text',
    label: 'City'
  },
  {
    accessor: 'state',
    className: 'text',
    label: 'State'
  },
  {
    accessor: 'zip',
    className: 'text',
    label: 'Zip'
  },
  {
    accessor: d => moment(d.sign_up_date).format('MM/DD/YYYY'),
    id: 'sign_up_date',
    className: 'text',
    label: 'Sign Up Date'
  },
  {
    accessor: d => moment(d.last_active_date).format('MM/DD/YYYY - hh:mm A'),
    id: 'last_active_date',
    className: 'text',
    label: 'Last Active Date'
  }
]

export class CustomerMailing extends Component {
  state = {
    start_date: moment().subtract(1, 'weeks'),
    end_date: moment(),
    isScriptRun: false,
    isFilterActive: false
  }

  handleChange = data => this.setState(data)

  runScript = () => {
    const { reportsAction } = this.props
    const {
      city,
      email,
      state,
      status,
      street,
      zip
    } = this.state
    this.setState({ isScriptRun: true })
    const data = {
      customer_type: status ? status.value : null,
      customer_mail_emails: [],
      customer_mail_zips: [],
      customer_mail_states: [],
      customer_mail_cities: [],
      customer_mail_streets: []
    }
    if (street) street.map(item => data.customer_mail_streets.push(item.value))
    if (email) email.map(item => data.customer_mail_emails.push(item.value))
    if (zip) zip.map(item => data.customer_mail_zips.push(item.value))
    if (state) state.map(item => data.customer_mail_states.push(item.value))
    if (city) city.map(item => data.customer_mail_cities.push(item.value))
    if (this.isAnyFilterActive()) {
      this.setState({
        isFilterActive: true
      })
    } else {
      this.setState({
        isFilterActive: false
      })
    }
    reportsAction.CustomerMailingReports(data)
  }
  isAnyFilterActive = () => {
    const {
      city,
      email,
      state,
      status,
      street,
      zip
    } = this.state
    if (street && street.length > 0) return true
    if (email && email.length > 0) return true
    if (zip && zip.length > 0) return true
    if (state && state.length > 0) return true
    if (city && city.length > 0) return true
    if (status) return true
    return false
  }
  getCustomerMailingColumns = () => {
    if (this.state.isFilterActive) {
      return customerMailingColumns
    }
    return customerMailingColumns.filter(item => item.accessor !== 'email_secondary')
  }
  downloadReport = () => {
    const data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('customer_mailing_report', data, reportsController.downloadReport)
  }

  copyReport = () => {
    const { customers } = this.props
    // const json = []
    // customers.data.customers.map(data =>
    //   json.push({
    //     'First Name': data.first_name,
    //     'Last Name': data.last_name,
    //     'Email': data.username,
    //     'Address': data.address,
    //     'City': data.city,
    //     'State': data.state,
    //     'Zip': data.zip
    //   })
    // )
    let text = `"First Name","Last Name","Email","Address","City","State","Zip"`
    customers.data.customers.map(data => {
      text = `${text}
"${data.first_name}","${data.last_name}","${data.username}","${data.address}","${data.city}","${data.state}","${data.zip}"`
    })
    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }

  printReport = () => {
    const { customers } = this.props
    const json = []
    customers.data.customers.map(data =>
      json.push({
        'First Name': data.first_name,
        'Last Name': data.last_name,
        'Email': data.username,
        'Address': data.address,
        'City': data.city,
        'State': data.state,
        'Zip': data.zip
      }))

    printJS({
      printable: json,
      properties: ['First Name',
        'Last Name',
        'Email',
        'Address',
        'City',
        'State',
        'Zip'],
      type: 'json'
    })
  }

  formatdropdowm = data => _.map(data, w => ({ value: w, label: w }))

  render () {
    return (
      <div className='content customerMailing-container'>
        <div className='filter-container'>
          <div className='col-3'>
            <span className='information-header'>Report Filters</span>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Active/Inactive</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-unlock'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    onChange={(e) => this.handleChange({ 'status': e })}
                    options={[{ label: 'InActive', value: 0 }, { label: 'Active', value: 1 }]}
                    placeholder={'-select status-'}
                    value={this.state.status} />
                </CustomInputWithIcon>
              </div>
            </div>
            {/* <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Email</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-drafts'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={(e) => this.handleChange({ 'email': e })}
                    options={this.formatdropdowm(this.props.customerInfo.emails.filter((value, index, self) => { return self.indexOf(value) === index }))}
                    placeholder={'-select Email-'}
                    value={this.state.email} />
                </CustomInputWithIcon>
              </div>
            </div> */}
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Zip</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-pin'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={(e) => this.handleChange({ 'zip': e })}
                    options={this.formatdropdowm(this.props.customerInfo.zip.filter((value, index, self) => { return self.indexOf(value) === index }))}
                    placeholder={'-select Zip-'}
                    value={this.state.zip} />
                </CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>State</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-pin'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={(e) => this.handleChange({ 'state': e })}
                    options={this.formatdropdowm(this.props.customerInfo.state.filter((value, index, self) => { return self.indexOf(value) === index }))}
                    placeholder={'-select State-'}
                    value={this.state.state} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <span className='information-header' />

            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>City</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-pin'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={(e) => this.handleChange({ 'city': e })}
                    options={this.formatdropdowm(this.props.customerInfo.city.filter((value, index, self) => { return self.indexOf(value) === index }))}
                    placeholder={'-select City-'}
                    value={this.state.city} />
                </CustomInputWithIcon>
              </div>
            </div>
            {/* <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Street</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-android-pin'>
                  <Select
                    className='select-component'
                    clearable={false}
                    disabled={false}
                    multi
                    onChange={(e) => this.handleChange({ 'street': e })}
                    options={this.formatdropdowm(this.props.customerInfo.street.filter((value, index, self) => { return self.indexOf(value) === index }))}
                    placeholder={'-select Street-'}
                    value={this.state.street} />
                </CustomInputWithIcon>
              </div>
            </div> */}
          </div>

        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={this.runScript}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.customers.data && this.props.customers.data.customers && this.props.customers.data.customers.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult'>
          {this.props.customers.loading || (this.props.customers.data && this.props.customers.data.customers && this.props.customers.data.customers.length > 0) ? <CustomTable
            data={this.props.customers.data.customers}
            loading={this.props.customers.loading}
            minRows={0}
            columns={[{
              columns: this.getCustomerMailingColumns()
            }]}
          /> : <div className='empty'>
            <CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} />
          </div>}
        </div> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.reports.customerMailing,
    customerInfo: state.reports.customerInfo.data
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    reportsAction: bindActionCreators(reportsAction, dispatch),
    dispatch
  })
)(CustomerMailing)
