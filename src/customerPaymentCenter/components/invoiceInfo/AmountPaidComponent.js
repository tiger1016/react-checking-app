// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

var NumberFormat = require('react-number-format')

export class AmountPaidComponent extends Component {
  render () {
    return (
      <div className='amounts-container' style={{ width: '12%' }}>
        {Number(this.props.amtPaid) !== 0 && this.props.status === 'paid' && <NumberFormat value={this.props.amtPaid} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
      </div>
    )
  }
}
