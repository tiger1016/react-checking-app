// Libraries
import React, { Component } from 'react'

// Styles
import '../components/styles/row.less'

export class PhoneComponent extends Component {
  render () {
    const phone = this.props.phone
    return (
      <div className='phone-container'>
        {phone}
      </div>
    )
  }
}
