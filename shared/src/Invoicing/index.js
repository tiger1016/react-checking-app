// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
// Styles
import './style.less'
//
// Components
import { InvoiceTable } from './invoiceInfo/InvoiceTable'
import { Tab } from '../../web/globalComponents/tabComponent/Tab'

// Actions
import invoicesActions from '../../actions/invoices'

export class Invoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(), endDate: moment(), searchText: '', selectedInvoices: []
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.searchHandle = this.searchHandle.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
    this.selectInvoice = this.selectInvoice.bind(this)
    this.SelectedInoicesAction = this.SelectedInoicesAction.bind(this)

    this.deletesucesscallback = this.deletesucesscallback.bind(this)
    this.sendsucesscallback = this.sendsucesscallback.bind(this)
  }

  handleStartDateChange (date) {
    this.setState({
      startDate: date
    })
    this.props.invoicesActions.fetchLicenseeInvoices(date, this.state.endDate)
  }

  handleEndDateChange (date) {
    this.setState({
      endDate: date
    })
    this.props.invoicesActions.fetchLicenseeInvoices(this.state.startDate, date)
  }

  componentWillMount () {
    this.props.invoicesActions.fetchLicenseeInvoices(this.state.startDate, this.state.endDate)
  }

  searchHandle (event) {
    this.setState({
      searchText: event.target.value
    })
  }

  filterSearch (val, index) {
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

  selectInvoice (event) {
    if (this.state.selectedInvoices.indexOf(event.target.id) === -1 && event.target.value === 'on') {
      this.state.selectedInvoices.push(event.target.id)
    } else {
      this.state.selectedInvoices.remove(event.target.id)
    }
  }

  SelectedInoicesAction (event) {
    if (event.target.value === 1) {
      // this.props.invoicesActions.deleteSelectedInoices(this.state.selectedInvoices, this.deletesucesscallback)
    } else {
      this.props.invoicesActions.sendInoicesToSelected(this.state.selectedInvoices, this.sendsucesscallback)
    }
  }

  deletesucesscallback () {
    this.props.invoicesActions.fetchLicenseeInvoices(this.state.startDate, this.state.endDate)
  }

  sendsucesscallback () {
    console.log('send invoices sucess')
  }

  render () {
    const invoicesObj = this.props.invoicesdata.invoices
    var allInvoices = []
    var PaidInvoices = []
    var UnPaidInvoices = []
    var PartialInvoice = []
    var DeclinedInvoices = []

    if (invoicesObj != null && invoicesObj.invoices) {
      invoicesObj.invoices.filter(this.filterSearch).forEach(function (val) {
        allInvoices.push(val)
        if (val.status === 'unpaid') {
          UnPaidInvoices.push(val)
        }
        if (val.status === 'partial') {
          PartialInvoice.push(val)
        }
        if (val.status === 'paid') {
          PaidInvoices.push(val)
        }
        if (val.status === 'declined') {
          DeclinedInvoices.push(val)
        }
      })
    }
    const tabs = [
      { title: 'ALL', content: (<InvoiceTable selectInvoice={this.selectInvoice} selectedInvoices={allInvoices} />) },
      { title: 'Unpaid', content: (<InvoiceTable selectedInvoices={UnPaidInvoices} />) },
      { title: 'Partial', content: (<InvoiceTable selectedInvoices={PartialInvoice} />) },
      { title: 'Paid', content: (<InvoiceTable selectedInvoices={PaidInvoices} />) },
      { title: 'Declined', content: (<InvoiceTable selectedInvoices={DeclinedInvoices} />) }
    ].map(tab => {
      return Object.assign({}, tab)
    })
    return (
      <div>
        <div className='header-container'>
          {/* <div className="header-top">
            <div className="title-text">Invoices</div>
          </div> */}
          <button className='creates-button btn'>+ Create Invoice</button>

        </div>
        <div className='search-bar'>
          <DatePicker selected={this.state.startDate} onSelect={this.handleStartDateChange} onChange={this.handleStartDateChange} />
          <i className='ion-ios-calendar-outline' /><span className='cal-span'>to</span>
          <DatePicker selected={this.state.endDate} onSelect={this.handleEndDateChange} onChange={this.handleEndDateChange} />
          <i className='ion-ios-calendar-outline' />

        </div>
        <div className='search-bar'>
          <select onChange={this.SelectedInoicesAction}>
            <option value='1'>Delete Selected Invoices</option>
            <option value='2'>Send Selected Invoices</option>
          </select>
          <div className='right-search'>

            <input type='text' onChange={this.searchHandle} className='search-placeholder' name='search' placeholder='Search' spellcheck='false' />
            <div className='ginger-module-inputHandlerGhost ginger-module-inputHandlerGhost-textarea' />
            <div className='icon-customer'>
              <img className='search-image-customers' src='/5eca83527fc1a0c1828487c2dec3137a.png' />

            </div>
          </div>
        </div>
        <Tab tabs={tabs} />

      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    invoicesdata: state.invoicesLicensee
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    invoicesActions: bindActionCreators(invoicesActions, dispatch),
    dispatch
  })
)(Invoice)
