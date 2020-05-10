// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

var NumberFormat = require('react-number-format')

export class AmountDueComponent extends Component {
  render () {
    return (
      <div className='amounts-container' style={{ width: '12%' }}>
        {this.props.amtDue != null && <NumberFormat value={this.props.amtDue} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
      </div>
    )
  }
}
