// Libraries
import React, { Component } from 'react'
import NumberFormat from 'react-number-format'

export default class OutstandingComponent extends Component {
  render () {
    return (
      <div className={this.props.outstanding > 0 ? 'outstanding-container' : ''}>
        <NumberFormat value={this.props.outstanding} displayType={'text'} thousandSeparator prefix={'$'} fixedDecimalScale decimalScale={2} />
      </div>
    )
  }
}
