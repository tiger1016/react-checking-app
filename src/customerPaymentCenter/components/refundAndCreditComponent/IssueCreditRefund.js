// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

// Components
import ModalFoter from 'GlobalComponents/modal/modalFoter'
import ModalBtnPrimary from 'GlobalComponents/modal/modalBtnPrimary'
import ModalBtnLight from 'GlobalComponents/modal/modalBtnLight'
import { DisplayInvoice } from './DisplayInvoice'

// Styles
import '../../index.css'

// Actions
import creditsActions from 'Actions/credits'
import refundsActions from 'Actions/refunds'
import billingActions from 'Actions/payments'
import invoicesActions from 'Actions/invoices'

var options = [
  { value: 'Receive a Payment', label: 'Receive a Payment' },
  { value: 'refunds', label: 'Issue Refund' },
  { value: 'credits', label: 'Credit a Customer' }
]

class IssueCreditRefund extends Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      checkedInvoice: [],
      invoices: [],
      billing: []
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this._changeTransactionType = this._changeTransactionType.bind(this)
    this._changeAmount = this._changeAmount.bind(this)
    this._changeCustomerName = this._changeCustomerName.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUpdateRefunds = this.handleUpdateRefunds.bind(this)
    this.handleUpdateCredits = this.handleUpdateCredits.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  componentWillMount () {
    this.setState({
      issueType: this.props.issueType,
      customer: this.props.custid,
      amount: '',
      invoices: this.props.invoices,
      billing: this.props.billing
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      invoices: nextProps.invoices,
      billing: nextProps.billing
    })
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.props.closeModal()
  }

  _changeCustomerName (val) {
    this.setState({
      customer: val.value,
      checkedInvoice: []
    })
    this.props.billingActions.fetchBilling(val.value)
    this.props.invoicesActions.fetchCustomerInvoices(val.value)
  }

  _changeTransactionType (val) {
    this.setState({
      issueType: val.value
    })
  }

  _changeAmount (e) {
    this.setState({
      amount: e.target.value
    })
  }

  toggleCheckbox (e) {
    this.setState({
      refundType: e.target.value
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    if (value) {
      this.state.checkedInvoice.push(event.target.value)
    } else {
      for (var i = 0; i < this.state.checkedInvoice.length; i++) {
        if (this.state.checkedInvoice[i] === event.target.value) {
          this.state.checkedInvoice.splice(i, 1)
        }
      }
    }
  }

  handleUpdateRefunds () {
    var pay_with = 'new' // eslint-disable-line camelcase
    this.props.refundsActions.issueRefunds(this.state.customer, this.state.amount, pay_with, this.state.checkedInvoice)
    this.props.closeModalAfterRefund(this.props.custid, this.state.amount, pay_with, this.state.checkedInvoice)
  }

  handleUpdateCredits () {
    this.props.creditsActions.issueCredits(this.state.customer, this.state.amount)
    this.props.closeModalAfterCredit(this.state.amount, this.props.custid)
  }

  render () {
    var updateInvoices = this.state.invoices
    var selectedInvoices = []
    Object.keys(updateInvoices).forEach(function (key) {
      if (updateInvoices[key].invoice_id) {
        selectedInvoices.push(updateInvoices[key])
      }
    })

    return (
      <div id='CustomerProfile' className='addCustomer-container'>
        <div className='issue-billing-box'>
          <div className='issue-credit-container'>
            <div className='refund-type-box'>
              <div className='issue-credit-label'>Billing</div>
              <div className='input-container'>
                <span className='input-label'>Transaction Type: </span>
                <Select className='trans-type-label' onChange={this._changeTransactionType} value={this.state.issueType} options={options} />
              </div>
              <div className='input-container'>
                <span className='input-label'>Customer: </span>
                <Select className='trans-type-label' placeholder='Select Customer' onChange={this._changeCustomerName} value={this.state.customer} options={this.props.allCustomer} />
              </div>
              <div className='input-container'>
                <span className='input-label'>Amount: </span>
                <input style={{ width: '20%' }} type='text' value={this.state.amount} onChange={this._changeAmount} />
              </div>
            </div>
            {this.state.issueType === 'refunds' && <div className='refund-typeselect-box'>
              <span className='refunds-type-label'>Refunds Options</span>
              <div className='refundss-type-box'>
                <div className='refundss-type-container'>
                  <input type='radio' name='myValue' value='Refund Credit Card on file' checked={this.state.refundType === 'Refund Credit Card on file'} onChange={this.toggleCheckbox} />
                  <span className='value-refund-data refund-row'> Refund Credit Card on file </span>
                  {this.state.refundType === 'Refund Credit Card on file' && <div>
                    <div className='refund-credit'>
                      <span>{this.state.billing.card_type}  **** **** **** {this.state.billing.card_digits}</span>
                    </div>
                    <div className='refund-credit'>
                      <span>{this.state.billing.card_expiration_month}/{this.state.billing.card_expiration_year}</span>
                    </div>
                  </div>}
                </div>
                <div className='refundss-type-container'>
                  <input type='radio' name='myValue' value='Refund in Cash' checked={this.state.refundType === 'Refund in Cash'} onChange={this.toggleCheckbox} />
                  <span className='value-refund-data refund-row'> Refund in Cash </span>
                  {this.state.refundType === 'Refund in Cash' && <div className='refund-credit'>
                    <DatePicker
                      dateFormat='MM/DD/YYYY'
                      selected={this.state.birthday}
                      onChange={this.handleChange} />
                  </div>}
                </div>
                <div className='refundss-type-container'>
                  <input type='radio' name='myValue' value='Refund by cheque' checked={this.state.refundType === 'Refund by cheque'} onChange={this.toggleCheckbox} />
                  <span className='value-refund-data refund-row'> Refund by cheque </span>
                  {this.state.refundType === 'Refund by cheque' && <div>
                    <div className='refund-credit'>
                      <input type='text' value={this.state.energy_level} onChange={this._changeEnergyLevel} required />
                    </div>
                    <div className='refund-credit'>
                      <DatePicker
                        dateFormat='MM/DD/YYYY'
                        selected={this.state.birthday}
                        onChange={this.handleChange} />
                    </div>
                  </div>}
                </div>
              </div>
            </div>}
            {this.state.issueType === 'refunds' && <div className='refund-invoice-type-box'>
              <div className='refund-type-box'>
                <span className='refunds-type-label'>Apply Refund to Invoice</span><br />
                <div ><br /><span className='refund-row'>Credit Card Refunds:</span>
                  <span className='trans-details-label'> Select an invoice to apply a refund to. If you do not see the invoice or transaction that has been placed within 24 hours, check back tomorrow to refund the transaction.</span> </div><br />
                <div><span className='trans-details-label'> The credit card entered in Your Account > Payment Info tab will be charged the full refund amount plus any applicable processing fees.</span></div>
                <div><span className='refund-row'>Cash/Check Refunds:</span>
                  <span className='trans-name-label'>You do not have to select an invoice to refund. </span></div>
              </div>
              <div className='refund-column-headers'>
                <div className='refund-header-style refunds-date-header'>Payment Date</div>
                <div className='refund-header-style refunds-header'>Payment Amount</div>
                <div className='refund-header-style refunds-date-header'>Customer</div>
                <div className='refund-header-style refunds-header'>Invoice</div>
                <div className='refund-header-style refunds-date-header'>Invoice Date</div>
                <div className='refund-header-style refunds-header'>Invoice Amount</div>
              </div>
              {selectedInvoices && <div className='refunds-invoice-scroll'>
                {selectedInvoices.map((invoice, i) =>
                  <DisplayInvoice key={i} invoice={invoice} handleInputChange={this.handleInputChange} />)}
              </div>}
            </div>}
          </div>
        </div>
        {this.state.issueType !== 'credits' &&
          <ModalFoter>
            <ModalBtnPrimary text='ISSUE REFUND' onClick={this.handleUpdateRefunds} />
            <ModalBtnLight text='CANCEL' onClick={this.props.closeModal} />
          </ModalFoter>}
        {this.state.issueType === 'credits' &&
          <ModalFoter>
            <ModalBtnPrimary text='ISSUE CREDIT' onClick={this.handleUpdateCredits} />
            <ModalBtnLight text='CANCEL' onClick={this.props.closeModal} />
          </ModalFoter>}

      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    credits: state.credits,
    refunds: state.refunds,
    invoicess: state.invoices,
    billing: state.payments.billings
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    creditsActions: bindActionCreators(creditsActions, dispatch),
    refundsActions: bindActionCreators(refundsActions, dispatch),
    invoicesActions: bindActionCreators(invoicesActions, dispatch),
    billingActions: bindActionCreators(billingActions, dispatch),
    dispatch
  })
)(IssueCreditRefund)
