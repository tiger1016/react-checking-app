// Libraries
import React, { Component } from 'react'

import customerProfilePic from '../../../assets/blank-profile-picture.png'

// Styles
import '../components/styles/row.less'

export class Row extends Component {
  render () {
    const walker = this.props.walker

    return (
      <div className='row-container'>
        <div className='staffmember-container'>
          <img className='img-circle' src={customerProfilePic} />
          <div className='staff-name'>
            <div className='staff-style'>
              {walker.first_name}&nbsp;{walker.last_name}
            </div>
            <div className='phone-container'>
              {walker.phone_mobile}
            </div>
            <div className='phone-container'>
              {walker.phone_home}
            </div>
          </div>
        </div>

        {/* <div className='phone-container'>
          {walker.phone_work}
        </div>
        <div className='email-container'>
           {walker.email}
        </div>
        <div className='address-container'>
          {walker.address},{walker.state} ,{walker.city},{walker.country}
        </div> */}

      </div>
    )
  }
}
