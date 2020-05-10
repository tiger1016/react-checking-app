// Libraries
import React, { Component } from 'react'

var NumberFormat = require('react-number-format')
var totalAmtDue = 0
var totalAmtPaid = 0
var totalOutstanding = 0

export class TotalComponent extends Component {
  constructor (props) {
    super(props)
    totalAmtDue = 0
    totalAmtPaid = 0
    totalOutstanding = 0
  }

  componentWillUpdate () {
    totalAmtDue = 0
    totalAmtPaid = 0
    totalOutstanding = 0
  }

  render () {
    const invData = this.props.invData

    Object.keys(invData).forEach(function (key) {
      totalAmtDue = totalAmtDue + parseInt(invData[key].owed)
    })

    Object.keys(invData).forEach(function (key) {
      if (invData[key].status === 'paid') {
        totalAmtPaid = totalAmtPaid + parseInt(invData[key].paid)
      }
    })

    Object.keys(invData).forEach(function (key) {
      if (invData[key].status === 'unpaid') {
        totalOutstanding = totalOutstanding + parseInt(invData[key].paid)
      }
    })

    return (
      <div className='total-container'>
        <div className='texts-total-container'>
          Total:
        </div>
        <div className='amount-totals-container'>
          <NumberFormat value={totalAmtDue} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
        <div className='amount-totals-container'>
          <NumberFormat value={totalAmtPaid} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
        <div className='outstanding-total-container'>
          <NumberFormat value={totalOutstanding} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
      </div>
    )
  }
}
