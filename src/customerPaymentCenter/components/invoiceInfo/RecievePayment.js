// Libraries
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select'

import billingActions from 'Actions/payments'
import invoicesActions from 'Actions/invoices'

import { UnpaidInvoice } from './UnpaidInvoice'
import CreditRefund from './CreditRefund'

// Styles
import '../../index.css'

var options = [
  { value: 'Receive a Payment', label: 'Receive a Payment' },
  { value: 'refunds', label: 'Issue Refund' },
  { value: 'credits', label: 'Credit a Customer' }
]
var optionsCard = [
  { value: 'Visa', label: 'Visa' },
  { value: 'Mastercard', label: 'Mastercard' },
  { value: 'Discover', label: 'Discover' }
]
var optionsYear = [
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' }
]

class RecievePayment extends Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      customer: '',
      checkedInvoice: '',
      invoices: [],
      billing: [],
      first_name: '',
      last_name: '',
      card_type: '',
      card: '',
      card_number: '',
      cvv: '',
      card_expiration_month: '',
      address_billing: '',
      address2_billing: '',
      city_billing: '',
      state_billing: '',
      zip_billing: '',
      balance: '',
      data: '',
      name: '',
      SelectCustomer: []
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this._changeTransactionType = this._changeTransactionType.bind(this)
    this._changeCustomerName = this._changeCustomerName.bind(this)
    this._changeAmount = this._changeAmount.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this._changeFirstName = this._changeFirstName.bind(this)
    this._changeLastName = this._changeLastName.bind(this)
    this._changeCardType = this._changeCardType.bind(this)
    this._changeCard = this._changeCard.bind(this)
    this._changeCardNumber = this._changeCardNumber.bind(this)
    this._changeCVV = this._changeCVV.bind(this)
    this._changeCardExpiration = this._changeCardExpiration.bind(this)
    this._changeAddress = this._changeAddress.bind(this)
    this._changeAddress2 = this._changeAddress2.bind(this)
    this._changeCity = this._changeCity.bind(this)
    this._changeState = this._changeState.bind(this)
    this._changeZip = this._changeZip.bind(this)
  }

  componentWillMount () {
    this.setState({
      paymentType: '',
      SelectCustomer: this.props.selCustomer,
      customer: this.props.custid,
      issueType: this.props.issueType,
      amount: '',
      invoices: this.props.invoices,
      billing: this.props.billing
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log('next props that ewe received ', nextProps)
    this.setState({
      invoices: nextProps.invoicess.invoices,
      billing: nextProps.billing
    })
  }

  _changeCustomerName (val) {
    this.setState({
      customer: val.value,
      checkedInvoice: '',
      balance: val.balance,
      name: val.label
    })
    this.props.billingActions.fetchBilling(val.value)
    this.props.invoicesActions.fetchCustomerInvoices(val.value)
  }

  _changeFirstName (e) {
    this.setState({
      first_name: e.target.value
    })
  }

  _changeLastName (e) {
    this.setState({
      last_name: e.target.value
    })
  }

  _changeCardType (val) {
    this.setState({
      card_type: val.value
    })
  }
  _changeCardNumber (e) {
    this.setState({
      card_number: e.target.value
    })
  }

  _changeCVV (e) {
    this.setState({
      cvv: e.target.value
    })
  }
  _changeCardExpiration (e) {
    this.setState({
      card_expiration_month: e.target.value
    })
  }

  _changeAddress (e) {
    this.setState({
      address_billing: e.target.value
    })
  }
  _changeAddress2 (e) {
    this.setState({
      address2_billing: e.target.value
    })
  }
  _changeCard (val) {
    this.setState({
      card: val.value
    })
  }

  _changeCity (e) {
    this.setState({
      city_billing: e.target.value
    })
  }
  _changeState (e) {
    this.setState({
      state_billing: e.target.value
    })
  }
  _changeZip (e) {
    this.setState({
      zip_billing: e.target.value
    })
  }

  _changeAmount (e) {
    this.setState({
      amount: e.target.value
    })
  }

  _changeTransactionType (val) {
    this.setState({
      issueType: val.value
    })
  }

  closeModal () {
    this.props.closeModal()
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  toggleCheckbox (e) {
    this.setState({
      paymentType: e.target.value
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value

    if (value) {
      this.state.checkedInvoice = ''
      this.state.checkedInvoice = event.target.value
    }
  }

  handleUpdate () {
    var itemList = {
      customer_id: this.props.custid,
      amount: this.state.amount,
      pay_with: this.state.paymentType,
      first_name_billing: this.state.first_name,
      last_name_billing: this.state.last_name,
      card_type: this.state.card_type,
      card_number: this.state.card_number,
      cvv: this.state.cvv,
      card_expiration_month: this.state.card_expiration_month,
      card_expiration_year: '',
      address_billing: this.state.address_billing,
      address2_billing: this.state.address2_billing,
      city_billing: this.state.city_billing,
      state_billing: this.state.state_billing,
      zip_billing: this.state.zip_billing,
      invoices: this.state.checkedInvoice
    }
    console.log('The Updating value we got is', itemList)
    this.props.invoicesActions.receivePayment(itemList)
  }

  render () {
    var updateInvoices = this.state.invoices
    var selectedInvoices = []
    var Billing = this.state.billing.card_digits

    Object.keys(updateInvoices).forEach(function (key) {
      if (updateInvoices[key].invoice_id && updateInvoices[key].status === 'unpaid') {
        selectedInvoices.push(updateInvoices[key])
      }
    })

    return (
      <div>
        <div className='modal-main-container'>
          <div className='modal-header-container'>
            <div className='modal-header'>
              <span className='modal-header-text'>Recieve Payment</span>
              <div>
                <button className='close-modal' onClick={this.props.closeModal}>X</button>
              </div>
            </div>
          </div>
          <div className='issue-billing-box'>
            <div className='issue-credit-container'>
              <div className='refund-type-box'>
                <div className='issue-credit-label'>Billing</div>
                <div className='pets-container'>
                  <span className='trans-name-label'>Transaction Type: </span>
                  <span className='trans-type-select'>
                    <Select className='trans-type-label' onChange={this._changeTransactionType} value={this.state.issueType} options={options} />
                  </span>
                </div>
                <div className='pets-container'>
                  <span className='trans-name-label'>Customer: </span>
                  <span className='custname-type-select'>
                    <Select className='trans-type-label' placeholder='Select Customer' onChange={this._changeCustomerName} value={this.state.customer} options={this.props.allCustomer} />
                  </span>
                </div>
                <div className='pets-container'>
                  <span className='trans-name-label'>Amount: </span>
                  <span className='amts-type-label'><input type='text' value={this.state.amount} onChange={this._changeAmount} /></span>
                </div>
              </div>
            </div>
            {this.state.issueType === 'Receive a Payment' &&
              <div className='refund-typeselect-box' >
                <span className='refunds-type-label'>Payments Options</span>
                <div className='refundss-type-box'>
                  <div className='refundss-type-container'>
                    <input type='radio' name='myValue' value='customer_balance' checked={this.state.paymentType === 'customer_balance'} onChange={this.toggleCheckbox} />
                    <span className='value-refund-data refund-row'> Customer Balance ({this.state.balance}) </span>
                  </div>
                  <div className='refundss-type-container'>
                    <input type='radio' name='myValue' value='existing' checked={this.state.paymentType === 'existing'} onChange={this.toggleCheckbox} />
                    <span className='value-refund-data refund-row'> CreditCard on file </span><br />
                    <span className='value-refund-data refund-row'> {this.state.name} <br />********{Billing}<br />{this.state.billing.card_expiration_month} / {this.state.billing.card_expiration_year}</span>
                  </div>
                  <div className='refundss-type-container'>
                    <input type='radio' name='myValue' value='new' checked={this.state.paymentType === 'new'} onChange={this.toggleCheckbox} />
                    <span className='value-refund-data refund-row'> New Credit Card </span>
                    {this.state.paymentType === 'new' &&
                      <div className='refund-credit'>
                        <div className='refund-header-style refunds-header'>First Name On Card</div>
                        <input type='text' onChange={this._changeFirstName} />
                        <div className='refund-header-style refunds-header'>Last Name On Card</div>
                        <input type='text' onChange={this._changeLastName} />
                        <div className='refund-header-style refunds-header'>Card Type</div>
                        <Select onChange={this._changeCardType} value={this.state.card_type} options={optionsCard} />
                        <div className='refund-header-style refunds-header'>Card number</div>
                        <input type='text' onChange={this._changeCardNumber} />
                        <div className='refund-header-style refunds-header'>CVV</div>
                        <input type='text' onChange={this._changeCVV} />
                        <div className='refund-header-style refunds-header'>Card Expiration</div>
                        <input type='text' onChange={this._changeCardExpiration} />
                        <Select onChange={this._changeCard} value={this.state.card} options={optionsYear} />
                        <div className='refund-header-style refunds-header'>Billing Address</div>
                        <input type='text' onChange={this._changeAddress} />
                        <div className='refund-header-style refunds-header'>Billing Address 2</div>
                        <input type='text' onChange={this._changeAddress2} />
                        <div className='refund-header-style refunds-header'>Billing City</div>
                        <input type='text' onChange={this._changeCity} />
                        <div className='refund-header-style refunds-header'>Billing State</div>
                        <input type='text' onChange={this._changeState} />
                        <div className='refund-header-style refunds-header'>Billing Zip</div>
                        <input type='text' onChange={this._changeZip} />
                      </div>}
                  </div>
                  <div className='refundss-type-container'>
                    <input type='radio' name='myValue' value='Cash' checked={this.state.paymentType === 'Cash'} onChange={this.toggleCheckbox} />
                    <span className='value-refund-data refund-row'> Cash </span>
                    {this.state.paymentType === 'Cash' && <div className='refund-credit'>
                      <div className='refund-header-style refunds-header'>Payment Date</div>
                      <DatePicker dateFormat='MM/DD/YYYY' />
                    </div>}
                  </div>

                  <div className='refundss-type-container'>
                    <input type='radio' name='myValue' value='Check' checked={this.state.paymentType === 'Check'} onChange={this.toggleCheckbox} />
                    <span className='value-refund-data refund-row'>Check </span>
                    {this.state.paymentType === 'Check' && <div className='refund-credit'>
                      <div className='refund-header-style refunds-header'>Check number</div>
                      <input type='text' />
                      <div className='refund-header-style refunds-header'>Payment Date</div>
                      <DatePicker dateFormat='MM/DD/YYYY' />
                    </div>}
                  </div>
                </div>
              </div>}
            {this.state.issueType === 'refunds' &&
              <CreditRefund issueType={this.state.issueType} allCustomer={this.props.allCustomer} custid={this.props.custid} invoices={this.props.invoices} billing={this.props.billing} />
            }
            {this.state.issueType === 'Receive a Payment' &&
              <div className='refund-column-headers'>
                <div className='refund-header-style refunds-header'>Invoice Date</div>
                <div className='refund-header-style refunds-header'>Customer</div>
                <div className='refund-header-style refunds-cus-header'>Number</div>
                <div className='refund-header-style refunds-header'>Due Date</div>
                <div className='refund-header-style refunds-indate-header'>Status</div>
                <div className='refund-header-style refunds-header'>Amount Due</div>
                <div className='refund-header-style refunds-header'>Outstanding</div>
              </div>}
            {selectedInvoices && this.state.issueType === 'Receive a Payment' && <div className='refunds-invoice-scroll'>

              {selectedInvoices.map((invoice, i) =>

                <UnpaidInvoice key={i} invoice={invoice} handleInputChange={this.handleInputChange} />
              )}
            </div>}
          </div>
          {this.state.issueType === 'refunds' && <div className='add-credit-actions'>
            <div className='delete'>
              <button onClick={this.props.closeModal}>CANCEL</button>
            </div>
            <div className='save'>
              <button onClick={this.handleUpdateRefunds}>ISSUE REFUND</button>
            </div>
          </div>}
          {this.state.issueType === 'credits' && <div className='add-credit-actions'>
            <div className='delete'>
              <button onClick={this.props.closeModal}>CANCEL</button>
            </div>
            <div className='save'>
              <button onClick={this.handleUpdateCredits}>ISSUE CREDIT</button>
            </div>
          </div>}
          {this.state.issueType === 'Receive a Payment' && <div className='add-pets-actions'>
            <div className='delete'>
              <button onClick={this.props.closeModal}>CANCEL</button>
            </div>
            <div className='save'>
              <button onClick={this.handleUpdate} >UPDATE</button>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    invoicess: state.invoices,
    billing: state.payments.billings,
    receivePayment: state.invoices.receivePayment
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    invoicesActions: bindActionCreators(invoicesActions, dispatch),
    billingActions: bindActionCreators(billingActions, dispatch),
    dispatch
  })
)(RecievePayment)
