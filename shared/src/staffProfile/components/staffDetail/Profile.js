// Libraries
import React, { Component } from 'react'

// Styles
import '../../style.less'

export class Profile extends Component {
  render () {
    const data = this.props.Profile
    return (
      <div className='contact-container'>
        <div className='profile-div'>
          <div className='table-container'>
            <span className='cus-profile-label'>Email</span>
            <span className='cus-email-value'>{data.username}</span>
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Mobile Phone</span>
            <span className='cus-mphone-value'>{data.phone_mobile}</span>
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Work Phone</span>
            <span className='cus-wphone-value'>{data.phone_work}</span>
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Home Phone</span>
            <span className='cus-hphone-value'>{data.phone_home}</span>
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Address</span>
            {data.address && <span className='cus-address-value'>{data.address}, </span>}
            {data.address2 && <span className='cus-address2-value'>{data.address2}, </span>}
            {data.city && <span className='cus-address2-value'>{data.city}, {data.state}, </span>}
            <span className='cus-address2-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Emergency Name</span>
            <span className='cus-name-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Emergency Phone</span>
            <span className='cus-hphone-value' />
          </div>
        </div>
        <div className='profile-div'>
          <div className='table-container'>
            <span className='cus-profile-label'>Hire Date</span>
            <span className='cus-name-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Bio</span>
            <span className='cus-email-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Transportation Type</span>
            <span className='cus-mphone-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>License Plate</span>
            <span className='cus-mphone-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Security Question</span>
            <span className='cus-mphone-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Security Answer</span>
            <span className='cus-mphone-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Notes</span>
            <span className='cus-mphone-value' />
          </div>

        </div>
        <div className='profile-div'>
          <div className='table-container'>
            <span className='cus-profile-label'>Payroll Frequency</span>
            <span className='cus-name-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Payroll Date (if monthly)</span>
            <span className='cus-email-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Email Payroll Reports</span>
            <span className='cus-mphone-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Email Alerts</span>
            <span className='cus-wphone-value' />
          </div>
          <div className='table-container'>
            <span className='cus-profile-label'>Walker Access Level</span>
            <span className='cus-hphone-value' />
          </div>
        </div>
      </div>
    )
  }
}
