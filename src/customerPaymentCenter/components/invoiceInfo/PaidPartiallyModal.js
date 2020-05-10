// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Moment from 'moment'

// Styles
import '../../index.css'

import invoiceTermActions from 'Actions/invoices'

const NumberFormat = require('react-number-format')
const defaultSalesTaxPercentage = 0
class PaidPartiallyModal extends Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      currency: '',
      invoice: {},
      invoiceTerm: [],
      totalAmtPaid: '',
      discountAmount: '',
      dollar: ''
    }

    this.Save = this.Save.bind(this)
    this.createRow = this.createRow.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this._changeDueDate = this._changeDueDate.bind(this)
    this._changeStatus = this._changeStatus.bind(this)
    this._changeTerms = this._changeTerms.bind(this)
    this._changeDiscountType = this._changeDiscountType.bind(this)
    this._changeDiscountAmount = this._changeDiscountAmount.bind(this)
    this._changeSalesTax = this._changeSalesTax.bind(this)
    this._changeComments = this._changeComments.bind(this)
    this._changeLog = this._changeLog.bind(this)
    this._changeCronGenerate = this._changeCronGenerate.bind(this)
    this._changePaid = this._changePaid.bind(this)
    this._changeRefunded = this._changeRefunded.bind(this)
    this._changeDiscount = this._changeDiscount.bind(this)
    this._changeOwed = this._changeOwed.bind(this)
    this._changeTotal = this._changeTotal.bind(this)
    this.SavePayratecallback = this.SavePayratecallback.bind(this)
    this._changeDollar = this._changeDollar.bind(this)
    this.handleInputChangeForService = this.handleInputChangeForService.bind(this)
  }

  componentWillMount () {
    this.props.invoiceTermActions.fetchInvoiceTerm(this.props.custid, this.SavePayratecallback)

    this.setState({
      first_name: this.props.invoice.first_name,
      last_name: this.props.invoice.last_name,
      id: this.props.invoice.invoice_id,
      customer_id: this.props.invoice.customer_id,
      date: this.props.invoice.date,
      status: this.props.invoice.status,
      invoice_terms: this.props.invoice.invoice_terms,
      discount_type: this.props.invoice.discount_type,
      discount_amount: this.props.invoice.discount_amount,
      sales_tax_percentage: this.props.invoice.sales_tax_percentage,
      comments: this.props.invoice.comments,
      log: this.props.invoice.log,
      cron_generated: this.props.invoice.cron_generated,
      paid: this.props.invoice.paid,
      refunded: this.props.invoice.refunded,
      discount: this.props.invoice.discount,
      owed: this.props.invoice.owed,
      total: this.props.invoice.total,
      invoice_id: this.props.invoice.invoice_id
    })
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  handleInputChangeForService (item) {

  }

  createRow () {
    var Add = {
      billing_group_description: '',
      quantity: '',
      discount_amount: '',
      requested_time: '',
      invoice_id: '',
      amount: ''
    }
    this.setState({
      invoiceTerm: this.state.invoiceTerm.concat([Add])
    })
  }

  Save () {
    var itemsList = []
    this.state.invoiceTerm.forEach(function (entry) {
      var addList = {
        walk_id: entry.walk_id,
        walker_id: entry.walker_id,
        requested_time: entry.requested_time,
        billing_group_id: entry.billing_group_id,
        billing_group_description: entry.billing_group_description,
        quantity: entry.quantity,
        discount_type: entry.discount_type,
        discount_amount: entry.discount_amount,
        parent_id: entry.parent_id
      }
      itemsList.push(addList)
    })

    var updateInvoice = {

      items: itemsList,
      due_date: this.state.date,
      terms: this.state.invoice_terms,
      customer_id: this.state.customer_id
    }
    this.props.invoiceTermActions.updateInvoice(this.state.id, updateInvoice)
  }

  closeModal () {
    this.props.closeModal()
  }

  _changeDueDate (e) {
    this.setState({
      date: e.target.value
    })
  }
  _changeStatus (val) {
    this.setState({
      status: val.value
    })
  }
  _changeDollar (val) {
    this.setState({
      currency: val.value
    })
  }
  _changeTerms (val) {
    this.setState({
      invoice_terms: val.value
    })
  }
  _changeDiscountType (e) {
    this.setState({
      discount_type: e.target.value
    })
  }
  _changeDiscountAmount (e) {
    this.setState({
      discount_amount: e.target.value
    })
  }
  _changeSalesTax (e) {
    this.setState({
      sales_tax_percentage: e.target.value
    })
  }
  _changeComments (e) {
    this.setState({
      comments: e.target.value
    })
  }
  _changeLog (e) {
    this.setState({
      log: e.target.value
    })
  }
  _changeCronGenerate (e) {
    this.setState({
      cron_generated: e.target.value
    })
  }
  _changePaid (e) {
    this.setState({
      paid: e.target.value
    })
  }
  _changeRefunded (e) {
    this.setState({
      refunded: e.target.value
    })
  }
  _changeDiscount (e) {
    this.setState({
      discount: e.target.value
    })
  }
  _changeOwed (e) {
    this.setState({
      owed: e.target.value
    })
  }
  _changeTotal (e) {
    this.setState({
      total: e.target.value
    })
  }

  SavePayratecallback (data) {
    var totalAmtPaid = 0
    var discountAmount = 0
    var subTotal = 0
    var salesTax = 0
    var invoiceTerm = data.invoice.invoice.items

    Object.keys(invoiceTerm).forEach(function (key) {
      invoiceTerm[key].discount_type = '$'
      totalAmtPaid = totalAmtPaid + parseFloat(invoiceTerm[key].amount)
      salesTax = totalAmtPaid * defaultSalesTaxPercentage
      discountAmount = discountAmount + parseFloat(invoiceTerm[key].discount_amount)
      subTotal = (totalAmtPaid + salesTax) - discountAmount
    })

    this.setState({
      invoiceTerm: invoiceTerm,
      totalAmtPaid: totalAmtPaid,
      discountAmount: discountAmount,
      subTotal: subTotal,
      salesTax: salesTax
    })
  }

  handleChangeDiscount (event, index) {
    var invoiceTerm = this.state.invoiceTerm
    var total_amount = 0.00 // eslint-disable-line camelcase

    Object.keys(invoiceTerm).forEach(function (key) {
      if (index === key) {
        invoiceTerm[key].discount_type = event.value
      }
    })

    Object.keys(invoiceTerm).forEach(function (key) {
      if (invoiceTerm[key].discount_type === '%') {
        total_amount = total_amount + ((parseFloat(invoiceTerm[key].discount_amount) / 100) * parseFloat(invoiceTerm[key].amount)) // eslint-disable-line camelcase
      }

      if (invoiceTerm[key].discount_type === '$') {
        total_amount = total_amount + parseFloat(invoiceTerm[key].discount_amount) // eslint-disable-line camelcase
      }
    })

    this.setState({
      invoiceTerm: invoiceTerm,
      discountAmount: total_amount
    })
  }

  handleChange (item, key) {
    var temp = this.state.invoiceTerm

    temp.map(function (value, index) {
      if (item.target.name === 'amount' && index === Number(key)) {
        var amount = item.target.value
        value.amount = amount
      }

      if (item.target.name === 'requested_time' && index === Number(key)) {
        var requested_time = parseFloat(item.target.value) // eslint-disable-line camelcase
        value.requested_time = requested_time // eslint-disable-line camelcase
      }

      if (item.target.name === 'discount_amount' && index === Number(key)) {
        var discount_amount = parseFloat(item.target.value) // eslint-disable-line camelcase
        value.discount_amount = discount_amount // eslint-disable-line camelcase
      }
      if (item.target.name === 'billing_group_description' && index === Number(key)) {
        var billing_group_description = item.target.value // eslint-disable-line camelcase
        value.billing_group_description = billing_group_description // eslint-disable-line camelcase
      }
      if (item.target.name === 'quantity' && index === Number(key)) {
        var quantity = parseInt(item.target.value)
        value.quantity = quantity
      }
    })

    this.setState({
      invoiceTerm: temp
    })

    var invoiceTerm = this.state.invoiceTerm

    var totalAmtPaid = 0
    var discountAmount = 0
    var subTotal = 0
    var salesTax = 0
    var total_amount = 0.00 // eslint-disable-line camelcase

    Object.keys(invoiceTerm).forEach(function (key) {
      totalAmtPaid = totalAmtPaid + parseFloat(invoiceTerm[key].amount)
      salesTax = totalAmtPaid * defaultSalesTaxPercentage
      discountAmount = discountAmount + parseFloat(invoiceTerm[key].discount_amount)
      subTotal = (totalAmtPaid + salesTax) - discountAmount
    })

    Object.keys(invoiceTerm).forEach(function (key) {
      if (invoiceTerm[key].discount_type === '%') {
        total_amount = total_amount + ((parseFloat(invoiceTerm[key].discount_amount) / 100) * parseFloat(invoiceTerm[key].amount)) // eslint-disable-line camelcase
      }

      if (invoiceTerm[key].discount_type === '$') {
        total_amount = total_amount + parseFloat(invoiceTerm[key].discount_amount) // eslint-disable-line camelcase
      }
    })

    this.setState({
      totalAmtPaid: totalAmtPaid,
      discountAmount: total_amount,
      subTotal: subTotal,
      salesTax: salesTax
    })
  }

  handleDelete (e, i) {
    var temp = this.state.invoiceTerm
    temp.splice(i, 1)
    this.setState({
      invoiceTerm: temp
    })

    var invoiceTerm = this.state.invoiceTerm

    var totalAmtPaid = 0
    var discountAmount = 0
    var subTotal = 0
    var salesTax = 0
    var total_amount = 0.00 // eslint-disable-line camelcase

    Object.keys(invoiceTerm).forEach(function (key) {
      totalAmtPaid = totalAmtPaid + parseFloat(invoiceTerm[key].amount)
      salesTax = totalAmtPaid * defaultSalesTaxPercentage
      discountAmount = discountAmount + parseFloat(invoiceTerm[key].discount_amount)
      subTotal = (totalAmtPaid + salesTax) - discountAmount
    })

    Object.keys(invoiceTerm).forEach(function (key) {
      if (invoiceTerm[key].discount_type === '%') {
        total_amount = total_amount + ((parseFloat(invoiceTerm[key].discount_amount) / 100) * parseFloat(invoiceTerm[key].amount)) // eslint-disable-line camelcase
      }

      if (invoiceTerm[key].discount_type === '$') {
        total_amount = total_amount + parseFloat(invoiceTerm[key].discount_amount) // eslint-disable-line camelcase
      }
    })

    this.setState({
      totalAmtPaid: totalAmtPaid,
      discountAmount: total_amount,
      subTotal: subTotal,
      salesTax: salesTax
    })
  }

  render () {
    return (
      <div>

        <div className='modal-header-container'>
          <div className='modal-header'>
            <div style={{ flex: 2 }}>
              <div className='appointment-details'>
                Invoice
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '80px' }}>
              <div>
                <button className='close-modal button-modal' onClick={this.props.closeModal}>X</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ boxShadow: '0 5px 30px 0 rgba(0, 0, 0, 0.07)', display: 'flex', flexDirection: 'column', fontFamily: 'Roboto', fontSize: '16px', width: '100%' }}>
            <div style={{ width: '100%', borderBottom: '1px solid #F5F5F5' }}>
              <div className='invoices-profile-div'>
                <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'flex-end', paddingTop: '15px', paddingBottom: '15px', width: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '30px', marginLeft: '40px' }}> Invoice # <NumberFormat value={this.state.invoice_id} displayType={'text'} /></span>
                    {this.state.status === 'partial' &&
                      <span style={{ marginLeft: '30px', backgroundColor: '#aeaeae', color: '#fff', borderRadius: '4px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '15px', paddingRight: '15px' }}>PAID Partially</span>
                    }
                    {this.state.status === 'paid' &&
                      <span style={{ marginLeft: '30px', backgroundColor: '#3da647', color: '#fff', borderRadius: '4px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '15px', paddingRight: '15px' }}>PAID</span>
                    }
                    {this.state.status === 'unpaid' &&
                      <span style={{ marginLeft: '30px', backgroundColor: '#FF9D9D', color: '#fff', borderRadius: '4px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '15px', paddingRight: '15px' }}>UNPAID</span>
                    }
                  </div>
                </div>
                <div className='invoice-profile-div' style={{ paddingTop: '0px', paddingLeft: '30px' }}>
                  <div className=' invoice-header-text'>
                    <span className='label-align' style={{ paddingLeft: '0px', fontWeight: 'bold', fontSize: '12px' }}>FROM</span>
                    <div className='cus-profile-label' style={{ width: '250px', paddingTop: '10px', paddingLeft: '0px' }}>Test Dog Walker Company</div>
                  </div>
                  <div className='invoice-header-align' style={{ paddingLeft: '70px', width: '250px' }}>
                    <span className='label-align' style={{ paddingLeft: '0px', fontWeight: 'bold', fontSize: '12px' }}>TO</span>
                    <div className='cus-profile-label' style={{ paddingTop: '10px', paddingLeft: '0px' }}>{this.state.first_name} {this.state.last_name}</div>
                  </div>
                  <div className='invoice-header-text' style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', width: '210px' }}>
                    <div className='cus-profile-label' style={{ paddingTop: '10px', paddingBottom: '10px', color: '#6C6C6C' }}> Due Date:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.date}</div>
                    <div className='cus-profile-label' style={{ paddingBottom: '10px', color: '#6C6C6C', paddingTop: '0px' }}> Terms:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.invoice_terms}</div>
                    <div className='cus-profile-label' style={{ paddingBottom: '10px', color: '#6C6C6C', paddingTop: '0px' }}> Amount Due:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#000' }}>${this.state.owed}</span></div>
                  </div>
                </div>

                {/* <div className="table-container-profile">
            <span className="cus-profile-label">FIRST NAME</span>
              <input className="search-placeholder" type="text" value={this.state.first_name} />
          </div>

          <div className="table-container-profile">
            <span className="cus-profile-label">LAST NAME</span>
              <input className="search-placeholder" type="text" value={this.state.last_name} />
          </div>

          <div className="table-container-profile">
            <span className="cus-profile-label">DUE DATE</span>
              <input className="search-placeholder" type="date" value={this.state.date} style={{width : '180px'}} onChange={this._changeDueDate} />
          </div>

             <div className="table-container-profile">
                <span className="cus-profile-label">STATUS</span>
               <Select className="search-placeholder" onChange={this._changeStatus} style={{width : '180px'}} value={this.state.status} options={options} />
             </div>

            <div className="table-container-profile">
              <span className="cus-profile-label">TERMS</span>
                <Select className="search-placeholder" onChange={this._changeTerms} style={{width : '180px'}} value={this.state.invoice_terms} options={optionss} />
             </div> */}
              </div>
              {/* <div className="invoice-profile-div">
           <div className="invoice-header-text">
           <div className="invoice-balances">
               Invoice ID
             </div>
            <div className="invoice-outstand-header">
               <NumberFormat value={this.state.invoice_id} displayType={'text'} />
              </div>
          </div>
           <div className="vertical-line line-align"></div>
           <div className="invoice-header-text">
           <div className="invoice-balance">
              Due Date
            </div>
            <div className="invoice-credit">
                {this.state.date}
             </div>
          </div>
           <div className="vertical-line line-align"></div>
           <div className="invoice-header-text">
           <div className="invoice-balance">
               Terms
           </div>
            <div className="invoice-total-header">
               {this.state.invoice_terms}
              </div>
          </div>
        </div> */}
              <div className='invoice-profile-table' style={{ height: '250px', overflowY: 'auto', overflowX: 'hidden' }}>
                <div className='invoice-heading-padding' style={{ width: '100%' }}>
                  <span className='cus-profile-label' style={{ width: '20%' }}>DATE</span>
                  <span className='cus-profile-label' style={{ width: '20%', marginLeft: '70px' }}>ITEM</span>
                  <span className='cus-profile-label' style={{ width: '20%', marginLeft: '160px' }}>Q-TY</span>
                  <span className='cus-profile-label' style={{ width: '20%', marginLeft: '44px' }}>PRICE</span>
                  <span className='cus-profile-label' style={{ width: '20%', marginLeft: '35px' }}>AMOUNT DUE</span>
                  {/* <span className="cus-profile-label">DELETE</span> */}
                </div>
                <br />
                <div className='invoice-row-container'>
                  {this.state.invoiceTerm ? this.state.invoiceTerm.map((term, i) =>
                    <div key={i} className='rate-row' style={{ paddingBottom: '35px' }}>
                      <div className='invoice-column-div' style={{ width: '20%' }}>
                        <span className='cus-profile-label' style={{ color: '#6C6C6C' }}>{Moment(term.requested_time).format('MM/DD/YYYY')}</span>
                      </div>
                      <div className='invoice-column-div' style={{ width: '35%' }}>
                        <span className='cus-profile-label' style={{ color: '#6C6C6C' }}>{term.billing_group_description}</span>
                      </div>
                      <div className='invoice-column-div' style={{ width: '15%' }}>
                        <span className='cus-profile-label' style={{ color: '#6C6C6C' }}>{term.quantity}</span>
                      </div>
                      <div className='invoice-column-div' style={{ width: '15%' }}>
                        <NumberFormat className='cus-profile-label' value={term.discount_amount} displayType={'text'}
                          thousandSeparator prefix={'$'} decimalPrecision={2} style={{ color: '#6C6C6C' }} />
                      </div>
                      <div className='invoice-column-div' style={{ width: '15%' }}>
                        <NumberFormat className='cus-profile-label' value={term.amount} displayType={'text'}
                          thousandSeparator prefix={'$'} decimalPrecision={2} style={{ color: '#6C6C6C' }} />
                      </div>
                      {/* <div className="invoice-column-div">
                          <button className="addon-icon ion-trash-b" style={{paddingLeft: '40px'}} onClick={(e) => this.handleDelete(e,i)}></button>
                       </div> */}
                    </div>
                  ) : ''}
                </div>
              </div>

              {/* <div className="invoice-heading-adding" >
                       <div  className="approve">
                            <button onClick={this.createRow} className="ion-plus-circled">Add a row</button>
                       </div>
                    </div>
                    <div className="invoice-heading-calc">
                    <div className="lining"><br/>
                          <span className="invoice-profile-label">SUBTOTAL : </span>
    <NumberFormat className="calc-invoice-heading" value={this.state.totalAmtPaid} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalPrecision={2} />
                  </div>  <br />
                    <div className="lining"><br/>
                          <span className="invoice-profile-label">DISCOUNT : </span>
    <NumberFormat className="calc-invoice-heading" value={this.state.discountAmount} displayType={'text'}
     thousandSeparator={true} prefix={'$'} decimalPrecision={2} />
                    </div> <br></br>
                <div className="lining"><br/>
                 <span className="invoice-profile-label">SALESTAX : </span>
            <NumberFormat className="calc-invoice-heading" value={this.state.salesTax} displayType={'text'}
            thousandSeparator={true} prefix={'$'} decimalPrecision={2} />
                </div> <br></br>
                  <div className="linings"><br/>
                          <span className="invoice-profile-label">TOTALDUE : </span>
      <NumberFormat className="calc-invoice-heading" value={this.state.subTotal} displayType={'text'}
                           thousandSeparator={true} prefix={'$'} decimalPrecision={2} />
                           <br></br>
                    </div>
              </div> */}

            </div>
          </div>
          <div>

            {this.state.status === 'unpaid' &&
              <div className='linings' style={{ marginTop: '15px' }}>
                <span className='cus-profile-label' style={{ marginLeft: '460px', paddingLeft: '0px', color: '#6C6C6C', fontSize: '13px' }}>TOTAL : </span>
                <NumberFormat className='cus-profile-label' value={this.state.subTotal} displayType={'text'}
                  thousandSeparator prefix={'$'} decimalPrecision={2} style={{ marginLeft: '25px', color: '#6C6C6C', paddingLeft: '-1px', fontWeight: '500', fontSize: '13px' }} />
                <br />
              </div>
            }
            {this.state.status === 'paid' &&
              <div className='linings' style={{ marginTop: '15px' }}>
                <span className='cus-profile-label' style={{ marginLeft: '460px', paddingLeft: '0px', color: '#6C6C6C', fontSize: '13px' }}>TOTAL : </span>
                <NumberFormat className='cus-profile-label' value={this.state.subTotal} displayType={'text'}
                  thousandSeparator prefix={'$'} decimalPrecision={2} style={{ marginLeft: '25px', color: '#6C6C6C', paddingLeft: '-1px', fontWeight: '500', fontSize: '13px' }} />
                <br />
              </div>
            }
            {this.state.status === 'partial' &&
              <div className='linings' style={{ marginTop: '15px' }}>
                <span className='cus-profile-label' style={{ marginLeft: '63.6%', color: '#6C6C6C' }}>SUBTOTAL:</span>
                <NumberFormat className='cus-profile-label' value={this.state.total} displayType={'text'}
                  thousandSeparator prefix={'$'} decimalPrecision={2} style={{ marginLeft: '33px', color: '#6C6C6C' }} />
                <span className='cus-profile-label' style={{ marginLeft: '65%', color: '#6C6C6C', fontSize: '13px' }}>TAXES : </span>
                <NumberFormat className='cus-profile-label' value={this.state.salesTax} displayType={'text'}
                  thousandSeparator prefix={'$'} decimalPrecision={2} style={{ marginLeft: '33px', color: '#6C6C6C', paddingLeft: '-1px', fontWeight: '500', fontSize: '13px' }} />
                <span className='cus-profile-label' style={{ marginLeft: '66.6%', color: '#6C6C6C', fontSize: '13px' }}>TOTAL : </span>
                <NumberFormat className='cus-profile-label' value={this.state.subTotal} displayType={'text'}
                  thousandSeparator prefix={'$'} decimalPrecision={2} style={{ marginLeft: '28px', color: '#6C6C6C', paddingLeft: '-1px', fontWeight: '500', fontSize: '13px' }} />
                <br />
              </div>
            }
          </div>

          {this.state.status === 'unpaid' &&
            <div style={{ marginLeft: '180px', marginTop: '18px' }}>
              <div className='add-service-actions'>
                <div className='delete' style={{ backgroundColor: '#7D7D7D', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', marginLeft: '80px' }}>
                  <span className='cus-profile-label' style={{ color: '#fff' }}>EDIT</span>
                </div>
                <div className='delete' onClick={this.props.closeModal} style={{ backgroundColor: '#7D7D7D', paddingTop: '20px', paddingLeft: '20px', paddingBottom: '20px', paddingRight: '20px' }}>
                  <span className='cus-profile-label' style={{ color: '#fff' }}>DELETE</span>
                </div>
                <div className='approve' style={{ backgroundColor: '#3DA647', paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', paddingRight: '20px' }}>
                  <span className='cus-profile-label' style={{ color: '#fff' }}>RECEIVE PAYMENT</span>
                </div>
              </div>
            </div>
          }

          {this.state.status === 'paid' &&
            <div style={{ marginTop: '18px' }}>
              <div className='add-service-actions' style={{ marginLeft: '500px' }}>
                <div className='delete' onClick={this.props.closeModal} style={{ backgroundColor: '#7D7D7D', paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', paddingRight: '20px' }}>
                  <span className='cus-profile-label' style={{ color: '#fff' }}>DELETE</span>
                </div>
              </div>
            </div>
          }

          {this.state.status === 'partial' &&
            <div style={{ marginTop: '18px' }}>
              <div className='add-service-actions' style={{ marginLeft: '500px' }}>
                <div className='delete' onClick={this.props.closeModal} style={{ backgroundColor: '#7D7D7D', paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', paddingRight: '20px' }}>
                  <span className='cus-profile-label' style={{ color: '#fff' }}>DELETE</span>
                </div>
              </div>
            </div>
          }

        </div>

      </div>

    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    invoiceTerm: state.invoices,
    updateInvoice: state.updateInvoice
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    invoiceTermActions: bindActionCreators(invoiceTermActions, dispatch),
    dispatch
  })
)(PaidPartiallyModal)
