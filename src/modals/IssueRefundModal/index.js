// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import CustomersSelect from 'GlobalComponents/input/CustomersSelect'
import CurrencyInput from 'GlobalComponents/input/CurrencyInput'
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'
import Checkbox from 'GlobalComponents/input/Checkbox'

// Styles
import './index.css'

// Actions
import refundsActions from 'Actions/refunds'
import billingActions from 'Actions/payments'

// Controllers
import { appController } from 'Controllers'

class IssueRefundModal extends React.Component {
  state = {
    modalIsOpen: false,
    checkedInvoice: [],
    invoices: [],
    billing: [],
    amount: '',
    refundType: 'customer_balance',
    issueRefundFor: this.props.selectedCustomer && this.props.selectedCustomer.user_id,
    selectedCustomer: this.props.selectedCustomer
  }

  _changeAmount = (e) => {
    this.setState({ amount: e.target.value })
  }

  toggleCheckbox = (e) => {
    this.setState({ refundType: e.target.value })
  }

  selectInvoice = (event) => {
    const { checkedInvoice, issueRefundFor } = this.state
    const refundInvoices = this.props.invoices.filter(invoice => invoice.user_id === issueRefundFor && invoice.status === 'paid')

    if (event.target.checked) {
      checkedInvoice.push(refundInvoices.filter(invoice => invoice.invoice_id.toString() === event.target.id)[0])
    } else {
      const index = checkedInvoice.findIndex(invoice => invoice.invoice_id.toString() === event.target.id)
      if (index !== -1) {
        checkedInvoice.splice(index, 1)
      }
    }

    let amount = 0
    checkedInvoice.forEach(invoice => {
      amount += parseFloat(invoice.paid)
    })

    this.setState({ checkedInvoice, amount })
  }

  handleUpdateRefunds = () => {
    if (this.state.issueRefundFor && this.state.amount) {
      appController.confirmSaveChanges(() => {
        this.props.refundsActions.issueRefunds(this.state.issueRefundFor, this.state.amount, this.state.refundType, this.state.checkedInvoice.join(','), () => { appController.closeModal() })
      }, `You are about to issue a refund to ${this.state.selectedCustomer.first_name + ' ' + this.state.selectedCustomer.last_name} in the amount of $${parseFloat(this.state.amount).toFixed(2)}. Do you wish to continue?`)
    }
  }

  renderPaymentOptions = () => {
    const { selectedCustomer, refundType, checkedInvoice } = this.state
    const billing = selectedCustomer.paymentInformation && selectedCustomer.paymentInformation.billing

    return (
      <div className='refunds-type-box'>
        <div className='refunds-type-container mb10'>
          <input
            type='radio'
            id='customerBalanceOption'
            name='myValue'
            value='customer_balance'
            checked={refundType === 'customer_balance'}
            onChange={this.toggleCheckbox} />
          <label className='RadioLabel' htmlFor='customerBalanceOption'>&nbsp; Customer Balance </label>
        </div>

        {billing && billing.card_digits && <div className='refunds-type-container mb10'>
          <input type='radio'
            id='refundByCreditOption'
            name='myValue'
            value='existing'
            disabled={checkedInvoice.length === 0}
            checked={refundType === 'existing'}
            onChange={this.toggleCheckbox} />
          <label
            className='RadioLabel'
            htmlFor='refundByCreditOption'>
            &nbsp; Credit Card on file ending in {billing.card_digits.substring(billing.card_digits.length - 4)}
          </label>
        </div>}
        <div className='refunds-type-container mb10'>
          <input type='radio' id='cashOption' name='cash' value='cash' checked={refundType === 'cash'} onChange={this.toggleCheckbox} />
          <label className='RadioLabel' htmlFor='cashOption'>&nbsp; Cash </label>
        </div>
        <div className='refunds-type-container'>
          <input type='radio' id='checkOption' name='check' value='check' checked={refundType === 'check'} onChange={this.toggleCheckbox} />
          <label className='RadioLabel' htmlFor='checkOption'>&nbsp; Check </label>
        </div>
      </div>
    )
  }

  renderModalBody = () => {
    const { issueRefundFor } = this.state
    const refundInvoices = this.props.invoices.filter(invoice => invoice.user_id === issueRefundFor && invoice.status === 'paid')
    return (
      <div className='IssueRefundModal'>
        <ModalTemplateField
          input={<CustomersSelect value={this.state.issueRefundFor} disabled />}
          label='Select customer' />
        <ModalTemplateField
          input={
            <CurrencyInput
              onChange={e => this.setState({ amount: e.target.value })}
              value={this.state.amount} />
          }
          label='Refund Amount' />
        <span className='span10' />
        <ModalTemplateField flexStart
          input={this.renderPaymentOptions()}
          label='Refunds Options' />
        <div className='refund-invoice-type-box'>
          <div className='refund-type-box mb10'>
            <h5 className='refunds-desc'>Apply Refund to Invoice</h5>
            <div className='refunds-detail'><b>Credit Card Refunds:</b> Select an invoice to apply a refund to. If you do not see the invoice or transaction that has been placed within 24 hours, check back tomorrow to refund the transaction.</div>
            <br />
            <div className='refunds-detail'>The credit card entered in Your Account > Payment Info tab will be charged the full refund amount plus any applicable processing fees.</div>
            <br />
            <div className='refunds-detail'><b>Cash/Check Refunds: </b>You do not have to select an invoice to refund.</div>
          </div>
          <h5 className='refunds-desc ml10 mb10'>Select Invoice to apply amount to</h5>
          {refundInvoices.length > 0 && <CustomTable
            data={refundInvoices}
            minRows={0}
            loading={false}
            showPagination={false}
            pageSize={refundInvoices.length}
            className='-striped -highlight'
            noDataText='No rates found'
            columns={[{
              columns: [
                {
                  Cell: (d) => <Checkbox id={d.original.invoice_id} onChange={this.selectInvoice} type='checkbox' />,
                  id: 'checkbox',
                  label: '',
                  maxWidth: 40
                },
                {
                  accessor: d => moment(d.date).format('MM/DD/YYYY'),
                  className: 'text strong',
                  id: 'date',
                  label: 'DATE',
                  maxWidth: 100
                },
                {
                  accessor: 'invoice_id',
                  className: 'text',
                  label: 'NUMBER',
                  maxWidth: 90
                },
                {
                  accessor: d => (d.first_name + ' ' + d.last_name),
                  id: 'staff_name',
                  className: 'text',
                  label: 'CUSTOMER'
                },
                {
                  Cell: d => <NumberFormat value={d.original.paid ? d.original.paid : 0} displayType={'text'} thousandSeparator prefix={'$'} decimalScale={2} />,
                  id: 'paid',
                  className: 'text',
                  label: 'AMOUNT PAID',
                  maxWidth: 120
                },
                {
                  accessor: d => moment(d.ts).format('MM/DD/YYYY'),
                  id: 'date_paid',
                  className: 'text',
                  label: 'DATE PAID',
                  maxWidth: 110
                }]
            }]} />}
          {refundInvoices.length === 0 && <div className='empty'>
            <CenteredTextNotify icon='ion-ios-checkmark' text={`No invoices to refund.`} />
          </div>}
        </div>
      </div>
    )
  }

  render () {
    return (<ModalTemplate
      actions={[
        {
          hide: this.props.refundsLoading,
          disabled: this.props.disabled,
          onClick: () => { appController.closeModal() },
          text: 'Cancel',
          textOnly: true
        },
        {
          loading: this.props.refundsLoading,
          disabled: !this.state.issueRefundFor || !this.state.amount,
          onClick: this.handleUpdateRefunds,
          text: 'Issue'
        }
      ]}
      body={this.renderModalBody()}
      title='Issue Refund'
    />
    )
  }
}
const mapStateToProps = (state) => {
  const selectedCustomer = state.app.modal.data.customer

  return {
    selectedCustomer,
    refunds: state.refunds,
    refundsLoading: state.refunds.loading,
    billing: state.payments.billings,
    invoices: state.invoices.invoices
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    refundsActions: bindActionCreators(refundsActions, dispatch),
    billingActions: bindActionCreators(billingActions, dispatch),
    dispatch
  })
)(IssueRefundModal)
