// Libraries
import React, { Component } from 'react'

// Components
import Checkbox from 'GlobalComponents/input/Checkbox'

export default class SelectComponent extends Component {
  render () {
    const invoice = this.props.invoice
    const isChecked = this.props.isChecked(invoice.id)
    return (
      <div style={{ curser: 'pointer' }} onClick={() => { this.setState({ modalisOpen: true }) }}>
        <div className='checkbox-container' onClick={(e) => { e.stopPropagation() }}>
          {isChecked ? <Checkbox id={invoice.id} onChange={this.props.selectInvoice} type='checkbox' checked /> : <Checkbox id={invoice.id} onChange={this.props.selectInvoice} type='checkbox' />}
        </div>
      </div>

    )
  }
}
