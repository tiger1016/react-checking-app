// Libraries
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Moment from 'moment'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

// Components
import Loader from 'GlobalComponents/Loader'
import ModalTemplate from 'GlobalComponents/ModalTemplate'

// Styles
import './index.css'

// Actions
import fetchInvoiceDetail from 'Actions/invoices/fetchInvoiceDetail'

// Controllers
import { appController } from 'Controllers'

// Util
import { utility } from 'Utils'

class InvoiceDetail extends React.Component {
  componentWillMount () {
    let { fetchInvoiceDetail, invoice } = this.props
    if (!invoice.items) fetchInvoiceDetail(invoice.id)
  }

  calculateDiscount (term) {
    if (term.discount_type === 'dollar') return term.discount_amount
    return (term.discount_amount / 100) * (term.amount * term.quantity)
  }

  calculateDue (term) {
    let tempAmount = 0
    let discount = this.calculateDiscount(term)
    tempAmount = ((term.amount * term.quantity) - discount).toFixed(2)
    return tempAmount
  }

  openReceivePaymentModal = e => {
    e.stopPropagation()
    const { invoice } = this.props
    appController.actions.toggleModal({
      canClose: true,
      data: {
        customerId: invoice.user_id,
        invoice_id: invoice.id
      },
      isOpen: true,
      modalIdentifier: appController.constants.RECIVE_PAYMENT_MODAL_IDENTIFIER
    })
  }

  getModalButton = () => {
    let { invoice: { status }, isLoadingInvoices } = this.props
    if (status !== 'paid') {
      return [{
        disabled: isLoadingInvoices,
        onClick: this.openReceivePaymentModal,
        text: 'RECEIVE PAYMENT'
      }]
    }
    return []
  }

  render () {
    const { invoice, isLoadingInvoices } = this.props
    let invoiceTerms = invoice.items && invoice.items.reverse()

    return <ModalTemplate
      actions={this.getModalButton()}
      body={() => <div id='InvoiceDetail'>
        <div className='invoiceDetail-upper-container'>
          <div className='Invoice-head'>
            <span className='title-text'> Invoice # <NumberFormat
              value={invoice.invoice_id}
              displayType={'text'} /></span>
            {invoice.status === 'partial' && <span className='partial'>PAID Partially</span>}
            {invoice.status === 'paid' && <span className='paid'>PAID</span>}
            {invoice.status === 'unpaid' && <span className='unpaid'>UNPAID</span>}
          </div>
          <div className='Addressbox-Datebox'>
            <div className='Addressbox'>
              <div className='left'>
                <span className='label-align from'>FROM</span>
                <div className='cus-profile-label the-company-name'>Test Dog Walker Company</div>
              </div>
              <div className='right'>
                <span className='label-align to'>TO</span>
                <div className='cus-profile-label the-last-name'>{invoice.first_name} {invoice.last_name}</div>
              </div>
            </div>
            <div className='Datebox' >
              <p> Due Date:<span>{Moment(invoice.ts).format('MM/DD/YYYY')}</span></p>
              {/* <p> Terms:<span>{invoice.invoice_terms && invoice.invoice_terms.split('_').join(' ')}</span></p> */}
              <p> Amount Due:<span >${utility.parseFloatWithFixed(invoice.owed, 2)}</span></p>
            </div>
          </div>
        </div>
        <div className='payrolldetail-column-headers'>
          <div className='header-style payrolldate-container'>DATE</div>
          <div className='header-style payrollitem-container'>ITEM</div>
          <div className='header-style payrollquantity-container'>Q-TY</div>
          <div className='header-style payrollamount-container'>PRICE</div>
          <div className='header-style payrollamount-container'>DISCOUNT</div>
          <div className='header-style payrollamount-container'>AMOUNT DUE</div>
        </div>
        {isLoadingInvoices && <div className='loader'><Loader /></div>}
        <div className='row-scroll'>
          {invoiceTerms && invoiceTerms.map((term, i) => <div
            key={i + '-' + term.requested_time}
            className='row-container'>
            <div className='payrolldate-container'>
              {!term.addon_id && Moment(term.requested_time).format('MM/DD/YYYY')}
            </div>
            <div className='payrollitem-container' >
              {term.addon_id ? term.addon_description : term.billing_group_description}
            </div>
            <div className='payrollquantity-container' >
              {term.quantity}
            </div>
            <div className='payrollamount-container' >
              <NumberFormat value={term.amount || 0} displayType={'text'}
                thousandSeparator prefix={'$'} fixedDecimalScale
                decimalScale={2} style={{ color: '#6C6C6C' }}
              />
            </div>
            <div className='payrollamount-container' >
              <NumberFormat value={term.discount_amount ? this.calculateDiscount(term) : 0} displayType={'text'}
                thousandSeparator prefix={'$'} fixedDecimalScale
                decimalScale={2} style={{ color: '#6C6C6C' }}
              />
            </div>
            <div className='payrollamount-container' >
              <NumberFormat value={this.calculateDue(term)} displayType={'text'}
                thousandSeparator prefix={'$'} fixedDecimalScale
                decimalScale={2} style={{ color: '#6C6C6C' }}
              />
            </div>
          </div>)}
        </div>
        <div className={`invoiceBottom${invoice.status === 'unpaid' ? ' right' : ''}`}>
          {(invoice.paids) && <div className='right'>
            {invoice.paids.map((item, key) =>
              <div className='totalamount' key={key + '-' + item.date_paid}>
                <span className='label'>PAID (On {Moment(item.date_paid).format('MM/DD/YYYY')} By {item.method} ) :&nbsp;&nbsp;&nbsp;</span>
                <NumberFormat className='amount' value={item.amount}
                  displayType={'text'} thousandSeparator
                  prefix={'$'} fixedDecimalScale decimalScale={2}
                />
              </div>
            )}

            {invoice.status === 'partial' && <div className='totalamount'>
              <span className='label'>BALANCE :&nbsp;&nbsp;&nbsp;</span>
              <NumberFormat className='amount' value={invoice.unpaid}
                displayType={'text'} thousandSeparator
                prefix={'$'} fixedDecimalScale decimalScale={2}
              />
            </div>}
          </div>}
          <div className='left' >
            <div className='totalamount'>
              <span className='label' >SUBTOTAL :&nbsp;&nbsp;&nbsp;</span>
              <NumberFormat className='amount' value={invoice.total}
                displayType={'text'} thousandSeparator
                prefix={'$'} fixedDecimalScale decimalScale={2}
              />
            </div>
            <div className='totalamount'>
              <span className='label' >DISCOUNT :&nbsp;&nbsp;&nbsp;</span>
              <NumberFormat className='amount' value={invoice.discount}
                displayType={'text'} thousandSeparator
                prefix={'$'} fixedDecimalScale decimalScale={2}
              />
            </div>
            <div className='totalamount'>
              <span className='label'>SALES TAX :&nbsp;&nbsp;&nbsp;</span>
              <NumberFormat className='amount' value={invoice.sales_tax}
                displayType={'text'} thousandSeparator
                prefix={'$'} fixedDecimalScale decimalScale={2}
              />
            </div>
            <div className='totalamount'>
              <span className='label'>TOTAL DUE :&nbsp;&nbsp;&nbsp;</span>
              <NumberFormat className='amount' value={invoice.owed}
                displayType={'text'} thousandSeparator
                prefix={'$'} fixedDecimalScale decimalScale={2}
              />
            </div>
          </div>
        </div>
      </div>}
      title='Invoice Detail'
    />
  }
}

InvoiceDetail.propTypes = {
  fetchInvoiceDetail: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  isLoadingInvoices: PropTypes.bool
}

const mapStateToProps = (state) => {
  const { invoiceId } = state.app.modal.data
  const invoice = invoiceId ? state.invoices.invoices.find(i => i.id.toString() === invoiceId.toString()) : {}
  return {
    invoice,
    isLoadingInvoices: state.invoices.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInvoiceDetail: bindActionCreators(fetchInvoiceDetail, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail)
