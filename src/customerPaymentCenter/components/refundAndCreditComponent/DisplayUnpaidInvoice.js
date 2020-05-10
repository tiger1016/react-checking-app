// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

var NumberFormat = require('react-number-format')

export class DisplayUnpaidInvoice extends Component {
  render () {
    const invoice = this.props.invoice
    return (
      <div className='refund-row-container'>
        <input name='isGoing' type='checkbox' value={invoice.invoice_id} className='checkbox_align' onChange={this.props.handleInputChange} />

        <div className='dates-container'>
          {Moment(invoice.date).format('MM/DD/YYYY')}
        </div>
        <div className='amounts-container'>
          <NumberFormat value={invoice.paid} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
        <div className='amounts-container'>
          <span>{invoice.first_name} {invoice.last_name}</span>
        </div>
        <div className='amounts-container'>
          <span>{invoice.invoice_id}</span>
        </div>
        <div className='dates-indate-container'>
          {Moment(invoice.ts).format('MM/DD/YYYY')}
        </div>
        <div className='amounts-container'>
          {invoice.total !== 0 && invoice.status === 'unpaid' && <NumberFormat value={invoice.total} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
        </div>
      </div>
    )
  }
}
