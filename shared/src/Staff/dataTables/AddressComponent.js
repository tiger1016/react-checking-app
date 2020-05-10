// Libraries
import React, { Component } from 'react'

// Styles
import '../components/styles/row.less'

export class AddressComponent extends Component {
  render () {
    const address = this.props.address
    return (
      <div className='address-container'>
        {address}
      </div>
    )
  }
}
