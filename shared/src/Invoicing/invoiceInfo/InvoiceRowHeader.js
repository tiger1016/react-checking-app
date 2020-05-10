// Libraries
import React, { Component } from 'react'

export class InvoiceRowHeader extends Component {
  render () {
    return (
      <div className='column-headers'>
        <div className='header-style invoice-header'>DATE</div>
        <div className='header-style invoice-header'>CUSTOMER</div>
        <div className='header-style invoice-header'>NUMBER</div>
        <div className='header-style invoice-header'>DUE DATE</div>
        <div className='header-style invoice-header'>STATUS</div>
        <div className='header-style invoice-header'>AMOUNT DUE</div>
        <div className='header-style invoice-header'>AMOUNT PAID</div>
        <div className='header-style invoice-header'>DATE PAID</div>
        <div className='header-style invoice-header'>OUTSTANDING</div>
        <div className='header-style invoice-header'>ACTIONS</div>
      </div>
    )
  }
}
