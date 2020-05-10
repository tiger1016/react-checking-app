// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

var NumberFormat = require('react-number-format')

export class OutstandingComponent extends Component {
  render () {
    return (
      <div className='outstanding-container' style={{ width: '14%' }}>
        {this.props.status === 'unpaid' && <NumberFormat value={this.props.outstanding} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
        {this.props.status === 'partial' && <NumberFormat value={parseInt(this.props.amtDue) - parseInt(this.props.outstanding)} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />}
      </div>
    )
  }
}
