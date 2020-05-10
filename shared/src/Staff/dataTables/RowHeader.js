// Libraries
import React, { Component } from 'react'

export class RowHeader extends Component {
  render () {
    return (
      <div className='staff-column-headers'>
        <div className='staff-header'>
          <div className='header-style'>Staff Member</div>
          <div className='ion-android-arrow-dropdown header-style' />
        </div>
        <div className='header-style phone-header'>MOBILE</div>
        <div className='header-style phone-header'>HOME PHONE</div>
        {/* <div className="header-style phone-header">WORK PHONE</div>
        <div className="header-style email-header">E-MAIL</div>
        <div className="header-style address-header">ADDRESS</div> */}
      </div>
    )
  }
}
