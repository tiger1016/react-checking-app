// Libraries
import React, { Component } from 'react'

export class InvoiceRowHeader extends Component {
  render () {
    return (
      <div className='column-headers' style={{ width: '100%' }}>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '0px', paddingLeft: '3px' }}>DATE</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '23px' }}>NUMBER</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '10px' }}>DUE DATE</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '0px', paddingLeft: '0px', paddingRight: '30px' }}>STATUS</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '0px' }}>AMOUNT DUE</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '0px' }}>AMOUNT PAID</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '0px' }}>DATE PAID</div>
        <div className='header-style invoice-header' style={{ width: '10%', marginLeft: '10px', paddingLeft: '10px' }}>OUTSTANDING</div>
      </div>
    )
  }
}
