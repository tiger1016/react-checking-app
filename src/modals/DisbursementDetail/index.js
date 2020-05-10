// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import NumberFormat from 'react-number-format'

// Components
import Loader from 'GlobalComponents/Loader'
import ModalTemplate from 'GlobalComponents/ModalTemplate'

// Styles
import './index.css'

// Actions
import { getDisbursementDetail, clearDisbursementDetail } from 'Actions/reports/DisbursementReports'

// Controllers
import { appController } from 'Controllers'

class DisbursementDetail extends Component {
  componentDidMount () {
    this.props.clearDisbursementDetail()
    const date = moment(this.props.disbursementDate, 'MM/DD/YYYY').format('YYYY-MM-DD')
    const data = { disbursement_date: date }
    this.props.getDisbursementDetail(data)
  }

  closeModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: false,
      modalIdentifier: null
    })
  }

  render () {
    const { disbursementDate, disbursementDetail } = this.props

    return <ModalTemplate
      actions={[{
        onClick: this.closeModal,
        text: 'Close',
        textOnly: true
      }]}
      body={() => <div id='DisbursementDetail'>
        <div className='Disbursement-head'>
          <span className='title-text'> Disbursement Transactions - {disbursementDate} </span>
        </div>
        <div className='payrolldetail-column-headers'>
          <div className='header-style customer-container'>Customer</div>
          <div className='header-style date-container'>Transaction Date</div>
          <div className='header-style invoice-amount-container'>Invoice Amount</div>
          <div className='header-style salestax-container'>Sales Tax Amount</div>
          <div className='header-style pct-fee-container'>CC Fee</div>
          <div className='header-style disbursed-amount-container'>Disbursed Amount</div>
        </div>
        {!disbursementDetail.length && <div className='loader'><Loader /></div>}
        <div className='row-scroll'>
          {disbursementDetail.filter(t => Number(t.amount) > 0).map((transaction, i) => <div key={i + '-' + transaction.ts} className='row-container'> {/*  refunds (any negative number) should not display in the Disbursement Report as per discussion.Handled on frontend for now but will be done at backend  */}
            <div className='customer-container'>
              {transaction.customer}
            </div>
            <div className='date-container' >
              {transaction.date}
            </div>
            <div className='invoice-amount-container' >
              <NumberFormat value={`${transaction.amount}`} displayType={'text'}
                thousandSeparator prefix={''} fixedDecimalScale decimalScale={2} style={{ color: '#6C6C6C' }} />
            </div>
            <div className='salestax-container' >
              <NumberFormat value={transaction.sales_tax_amount || 0} displayType={'text'}
                thousandSeparator prefix={'$'} fixedDecimalScale decimalScale={2} style={{ color: '#6C6C6C' }} />
            </div>
            <div className='pct-fee-container' >
              <NumberFormat value={transaction.amount > 0 ? transaction.pct_fee : 0} displayType={'text'}
                thousandSeparator prefix={'$'} fixedDecimalScale decimalScale={2} style={{ color: '#6C6C6C' }} />
            </div>
            <div className='disbursed-amount-container' >
              <NumberFormat value={transaction.amount > 0 ? Number(transaction.amount) - Number(transaction.pct_fee) : Number(transaction.amount)} displayType={'text'}
                thousandSeparator prefix={'$'} fixedDecimalScale decimalScale={2} style={{ color: '#6C6C6C' }} />
            </div>
          </div>)}
        </div>
      </div>}
      title='Disbursement Detail'
    />
  }
}

const mapStateToProps = (state) => {
  const { disbursementDate } = state.app.modal.data
  const { disbursementDetail } = state.reports.disbursement

  return {
    disbursementDetail,
    disbursementDate
  }
}

const mapDispatchToProps = dispatch => ({
  getDisbursementDetail: (data) => dispatch(getDisbursementDetail(data)),
  clearDisbursementDetail: () => dispatch(clearDisbursementDetail())
})

export default connect(mapStateToProps, mapDispatchToProps)(DisbursementDetail)
