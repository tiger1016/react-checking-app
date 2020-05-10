// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import printJS from 'print-js'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'

// Controllers
import { reportsController, appController } from 'Controllers'

// Actions
import { getDisbursementReports } from 'Actions/reports/DisbursementReports'

// Components
import CustomInputWithIcon from 'GlobalComponents/CustomInputWithIcon'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

export class Disbursement extends Component {
  state = {
    start_date: moment().subtract(1, 'weeks'),
    end_date: moment(),
    isScriptRun: false
  }

  runScript = () => {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    this.setState({ isScriptRun: true })
    this.props.getDisbursementReports(data)
  }

  handleStartDateHandle = (date) => {
    this.setState({ start_date: date })
  }

  handleEndDateHandle = (date) => {
    this.setState({ end_date: date })
  }

  downloadReport = () => {
    var data = {
      start_date: this.state.start_date.format('MM/DD/YYYY'),
      end_date: this.state.end_date.format('MM/DD/YYYY')
    }
    reportsController.actions.downloadReport('customer_disbursements_report', data, reportsController.downloadReport)
  }

  copyReport = () => {
    // let json = []
    // this.props.disbursement.data.transactions.map(function (data) {
    //   json.push({ 'Processed Date': data.disbursement_date, 'Disbursed Amount': data.disbursement_amount, 'Total Sales': data.amount, 'PCT Fee': data.service_fee })
    // })
    // var text = JSON.stringify(json)

    let text = `"Processed Date","Disbursed Amount","Total Sales","PCT Fee"`
    this.props.disbursement.data.transactions.map(data => {
      text = `${text}
"${data.disbursement_date}","${data.disbursement_amount}","${data.amount}","${data.service_fee}"`
    })

    copy(text, { format: 'text/plain' })
    toast.success('Copied...', { position: toast.POSITION.LEFT })
  }

  printReport = () => {
    let json = []
    this.props.disbursement.data.transactions.map(function (data) {
      json.push({ 'Processed Date': data.disbursement_date, 'Disbursed Amount': data.disbursement_amount, 'Total Sales': data.amount, 'PCT Fee': data.service_fee })
    })
    printJS({ printable: json, properties: ['Processed Date', 'Disbursed Amount', 'Total Sales', 'PCT Fee'], type: 'json' })
  }

  handleClickRow = disbursement => () => {
    appController.actions.toggleModal({
      canClose: true,
      data: {
        licenseeId: disbursement.licensee_id,
        disbursementDate: disbursement.disbursement_date
      },
      isOpen: true,
      modalIdentifier: appController.constants.DISBURSEMENT_DETAIL_MODAL_IDENTIFIER
    })
  }

  render () {
    return (
      <div className='content disbursement-container'>
        <div className='filter-container'>
          <div className='col-3'>
            <span className='information-header'>Report Filters</span>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>Start Date</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='calendar'>
                  <DatePicker showYearDropdown className='datePicker' selected={this.state.start_date} onChange={this.handleStartDateHandle} />
                </CustomInputWithIcon>
              </div>
            </div>
            <div className='input-group'>
              <div className='label'>
                <span className='cus-profile-label'>End Date</span>
              </div>
              <div className='body'>
                <CustomInputWithIcon icon='calendar'>
                  <DatePicker showYearDropdown className='datePicker' selected={this.state.end_date} onChange={this.handleEndDateHandle} />
                </CustomInputWithIcon>
              </div>
            </div>
          </div>
        </div>
        <div className='action-container'>
          <button className='btnPrimary' onClick={() => this.runScript()}>RUN REPORT</button>
          <span className='info'>In all reports, leaving options blank will search all of that selection</span>
          {this.state.isScriptRun && (this.props.disbursement.data && this.props.disbursement.data.transactions && this.props.disbursement.data.transactions.length > 0) ? <div className='actionBtn-container'>
            <ReactTooltip effect='solid' offset={{ top: -10 }} type='dark' />
            <span className='action-btn ion-ios-copy-outline' data-tip='copy' onClick={() => this.copyReport()} />
            <span className='action-btn ion-clipboard' data-tip='download' onClick={() => this.downloadReport()} />
            <span className='action-btn ion-ios-printer-outline' data-tip='print' onClick={() => this.printReport()} /></div> : ''}

        </div>
        {this.state.isScriptRun && <div className='reportResult' id='reportResult'>
          {this.props.disbursement.loading || (this.props.disbursement.data && this.props.disbursement.data.transactions && this.props.disbursement.data.transactions.length > 0) ? <CustomTable
            data={this.props.disbursement.data ? this.props.disbursement.data.transactions : []}
            loading={this.props.disbursement.loading}
            minRows={0}
            getTrProps={(state, rowInfo, column, instance) => ({
              onClick: this.handleClickRow(rowInfo.original)
            })}
            columns={[{
              columns: [
                {
                  accessor: 'disbursement_date',
                  id: 'disbursement_date',
                  className: 'text',
                  label: 'Processed Date'
                },
                {
                  accessor: d => '$' + parseFloat(d.disbursement_amount ? d.disbursement_amount : 0).toFixed(2),
                  id: 'disbursement_amount',
                  className: 'text',
                  label: 'Disbursed Amount'
                },
                {
                  accessor: d => '$' + parseFloat(d.amount ? d.amount : 0).toFixed(2),
                  id: 'amount',
                  className: 'text',
                  label: 'Total Sales'
                }
                // {
                //   accessor: d => '$' + parseFloat(0).toFixed(2),
                //   id: 'service_fee',
                //   className: 'text',
                //   label: 'CC Fee'
                // }
              ]
            }]}
          /> : <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No records`} /></div>}
        </div>}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  disbursement: state.reports.disbursement
})

const mapDispatchToProps = dispatch => ({
  getDisbursementReports: (data) => dispatch(getDisbursementReports(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Disbursement)
