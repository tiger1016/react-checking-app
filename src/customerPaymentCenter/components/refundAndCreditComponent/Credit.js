// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

// Styles
import '../../index.css'
var NumberFormat = require('react-number-format')
export class Credit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      credits: [],
      creidtsUsed: []
    }
    this.total = 0
    this.calculate = this.calculate.bind(this)
  }

  componentWillMount () {
    this.setState({
      data: this.props.data,
      credits: this.props.selectedCredits,
      creidtsUsed: this.props.selectedCreditsUsed
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      data: nextProps.data,
      credits: nextProps.selectedCredits,
      creidtsUsed: nextProps.selectedCreditsUsed
    })
  }

  componentWillUpdate () {
    this.total = 0
  }

  calculate (amount) {
    if (amount !== undefined && !isNaN(amount)) {
      this.total += parseInt(amount)
    }
  }

  render () {
    return (
      <div>
        <div className='refund-credits-column-headers'>
          <div className='credit-headers header-style'>DATE</div>
          <div className='credit-headers header-style'>STATUS</div>
          <div className='credit-headers header-style'>AMOUNT</div>
        </div>
        <div>
          {this.state.credits.map((credit, i) =>
            <div key={i} className='fund-row-container'>
              <div className='credit-data-container'>
                {Moment(credit.ts).format('MM/DD/YYYY')}
              </div>
              <div className='credit-data-container'>
                UNUSED
              </div>
              <div className='credit-data-container'>
                <NumberFormat value={credit.credits_given} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
              </div>
              {this.calculate(credit.credits_given)}
            </div>
          )}
          {this.state.creidtsUsed.map((credit, i) =>
            <div key={i} className='fund-row-container'>
              <div className='credit-data-container'>
                {Moment(credit.ts).format('MM/DD/YYYY')}
              </div>
              <div className='credit-data-container'>
                USED
              </div>
              <div className='credit-data-container'>
                <NumberFormat value={credit.credits_used} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} />
              </div>
              {this.calculate(credit.credits_used)}
            </div>
          )}
        </div>
        <div className='credit-data-container total-field-style'>
          TOTAL:
          <span className='total-value-style'><NumberFormat value={this.total} displayType={'text'} thousandSeparator prefix={'$'} decimalPrecision={2} /></span>
        </div>
      </div>
    )
  }
}
