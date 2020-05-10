// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import printJS from 'print-js'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'

// controllers
import { customersController, reportsController } from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

export class QrCodes extends Component {
  constructor (props) {
    super(props)
    this.state = { isScriptRun: false }
  }
  runScript = () => {
    this.setState({ isScriptRun: true })
    var data = {
      customer_qrcode_customer: this.state.customers ? this.state.customers.value : null
    }
    this.props.reportsAction.QrCodesReports(data)
  }

  handleCustomersChange = (data) => {
    this.setState({ customers: data })
  }
  downloadReport = () => {
    reportsController.actions.downloadReport('qr_codes_report', null, reportsController.downloadReport)
  }
  copyReport = () => {
    let text = `"Customer","QrCodes"`
    this.props.qrcodes.data.customers.map(data => {
      text = `${text}
"${data.first_name + ' ' + data.last_name}","${data.qr_code}"`
    })
    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }
  printReport = () => {
    let json = []
    this.props.qrcodes.data.customers.map(function (data) {
      json.push({ Customer: data.first_name + ' ' + data.last_name, QrCodes: data.qr_code })
    })
    printJS({ printable: json, properties: ['Customer', 'QrCodes'], type: 'json' })
  }
  render () {
    return (
      <div className='content qrcodes-container'>
        <div className='filter-container'>
          <div className='col-3'>
            <span className='information-header'>Report Filters</span>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Customer(s)</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='ion-person'>
                  <Select
                    className='select-component'
                    clearable
                    disabled={false}
                    multi={false}
                    onChange={this.handleCustomersChange}
                    options={this.props.customersForEditModal}
                    placeholder={'-select customers-'}
                    value={this.state.customers} /></CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={() => this.runScript()}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.qrcodes.data && this.props.qrcodes.data.customers) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}
        </div>
        {this.state.isScriptRun ? <div className='reportResult' id='reportResult'>
          {this.props.qrcodes.loading || (this.props.qrcodes.data && this.props.qrcodes.data.customers) ? <CustomTable
            data={this.props.qrcodes.data.customers}
            loading={this.props.qrcodes.loading}
            minRows={0}
            columns={[{
              columns: [
                {
                  accessor: d => d.first_name + ' ' + d.last_name,
                  id: 'Customer',
                  className: 'text',
                  label: 'Customer'
                },
                {
                  accessor: 'qr_code',
                  className: 'text',
                  label: 'QrCodes'
                }]
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
    qrcodes: state.reports.qrcodes
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    reportsAction: bindActionCreators(reportsAction, dispatch),
    dispatch
  })
)(QrCodes)
