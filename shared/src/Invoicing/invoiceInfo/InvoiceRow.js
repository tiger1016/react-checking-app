// Libraries
import React, { Component } from 'react'
import { DueDateComponent } from './DueDateComponent'
import { StatusComponent } from './StatusComponent'

export class InvoiceRow extends Component {
  render () {
    const invoice = this.props.invoice
    return (
      <div className='row-container'>
        <div className='Checkbox'><input id={invoice.id} onChange={this.props.selectInvoice} type='checkbox' /></div>
        <StatusComponent status={invoice.first_name + ' ' + invoice.last_name} />
        <StatusComponent status={invoice.status + '(' + invoice.paid + ')'} />
        <DueDateComponent dueDate={invoice.date} />
      </div>
    )
  }
}
