// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

var NumberFormat = require('react-number-format')

export class UnpaidInvoice extends Component {
  render () {
    const invoice = this.props.invoice
    return (
      <div className='refund-row-container'>
        {invoice.status === 'unpaid' && <input name='isGoing' type='checkbox' value={invoice.invoice_id} className='checkbox_align' onChange={this.props.handleInputChange} />}

        {invoice.status === 'unpaid' && <div className='date-align-container'>
          {Moment(invoice.date).format('MM/DD/YYYY')}
        </div>}

        {invoice.status === 'unpaid' && <div className='display-container'>
          <span>{invoice.first_name} {invoice.last_name}</span>
        </div>}
        {invoice.status === 'unpaid' && <div className='display-container'>
          <span>{invoice.invoice_id}</span>
        </div>}

        {invoice.status === 'unpaid' && <div className='dates-indate-containers'>
          {Moment(invoice.ts).format('MM/DD/YYYY')}
        </div>}

        {invoice.status === 'unpaid' && <div className='display-container'>
          <span>{invoice.status}</span>
        </div>}

        {invoice.status === 'unpaid' && <div className='display-container'>
          <span>${invoice.owed}</span>
        </div>}

        {invoice.status === 'unpaid' && <div className='display-container'>
          {Number(invoice.paid) !== 0 && invoice.status === 'paid' && <NumberFormat value={invoice.paid} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
        </div>}

      </div>

    )
  }
}
