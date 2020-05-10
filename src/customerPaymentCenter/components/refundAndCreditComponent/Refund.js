// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

// Styles
import '../../index.css'
var NumberFormat = require('react-number-format')
export class Refund extends Component {
  constructor (props) {
    super(props)
    this.total = 0
    this.calculate = this.calculate.bind(this)
  }

  componentWillUpdate () {
    this.total = 0
  }

  calculate (amount) {
    if (amount !== undefined && !isNaN(amount)) {
      this.total += parseFloat(amount)
    }
  }

  render () {
    const refunds = this.props.selectedRefunds
    return (
      <div>
        <div className='refund-credits-column-headers'>
          <div className='refund-header header-style'>DATE</div>
          <div className='refund-header header-style'>AMOUNT</div>
        </div>
        {refunds && <div>
          {refunds.map((refund, i) =>
            <div key={i} className='fund-row-container'>
              <div className='refund-data-container'>
                {Moment(refund.ts).format('MM/DD/YYYY')}
              </div>
              <div className='refund-data-container'>
                <NumberFormat value={refund.amount} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
              </div>
              {this.calculate(refund.amount)}
            </div>
          )}
        </div>}
        {refunds.length === 0 && <div className='no-data-ava'>
          No Data Available
        </div>
        }
        {refunds.length > 0 && <div className='refund-data-container total-field-style'>
          TOTAL:
          <span className='total-value-style'>
            <NumberFormat value={this.total} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
          </span>
        </div>}
      </div>
    )
  }
}
