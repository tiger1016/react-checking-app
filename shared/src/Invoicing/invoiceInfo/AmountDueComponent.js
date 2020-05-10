// Libraries
import React, { Component } from 'react'

// Styles

var NumberFormat = require('react-number-format')

export class AmountDueComponent extends Component {
  render () {
    return (
      <div className='amounts-container'>
        {this.props.amtDue !== 0 && <NumberFormat value={this.props.amtDue} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
      </div>
    )
  }
}
