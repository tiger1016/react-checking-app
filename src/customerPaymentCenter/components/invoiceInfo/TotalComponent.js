// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

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
      <div className='total-container' style={{ marginTop: '-20px' }}>
        <div className='texts-total-container' style={{ width: '10%', paddingLeft: '0px', marginLeft: '6px' }} >
          TOTAL:
        </div>
        <div className='amount-totals-container' style={{ width: '12%', paddingLeft: '3vw' }} >
          <NumberFormat value={totalAmtDue} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
        <div className='amount-totals-container' style={{ width: '35%', paddingLeft: '4.5vw' }}>
          <NumberFormat value={totalAmtPaid} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
        <div className='outstanding-total-container' style={{ paddingLeft: '2.5vw' }}>
          <NumberFormat value={totalOutstanding} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
        </div>
      </div>
    )
  }
}
