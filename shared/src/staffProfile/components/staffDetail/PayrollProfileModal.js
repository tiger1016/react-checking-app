// Libraries
import React from 'react'
import ReactModal from 'react-modal'

// Helpers

export default props => <ReactModal
  className='ReactModal__Content ReactModal__Content_Mobile--after-open'
  contentLabel='Payroll Detail'
  isOpen={props.isProfileModalOpen}
  onAfterOpen={() => console.log('Profile modal after close')}
  onRequestClose={() => props.toggleProfileModal()}>
  <div className='modal-main-container'>
    <div className='modal-header-container'>
      <div className='modal-header'>
        <span className='modal-header-text'>Edit Profile</span>
        <div>
          <button className='close-modal' onClick={() => props.toggleProfileModal()}>X</button>
        </div>
      </div>
    </div>

    <div className='contact-container'>
      <div className='profile-div'>
        <div className='table-container'>
          <span className='cus-profile-label'>Email</span><br />
          <input type='text' class='search-placeholder' onChange={props.handleInputChange} name='username' placeholder='Email' value={props.Profile.username} />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Mobile Phone</span>
          <br />
          <input type='text' class='search-placeholder' name='phone_mobile' onChange={props.handleInputChange} placeholder='Mobile Phone' value={props.Profile.phone_mobile} />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Work Phone</span>
          <br />
          <input type='text' class='search-placeholder' name='phone_work' onChange={props.handleInputChange} placeholder='Work Phone' value={props.Profile.phone_work} />
        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Home Phone</span>
          <br />
          <input type='text' class='search-placeholder' name='phone_home' onChange={props.handleInputChange} placeholder='Home Phone' value={props.Profile.phone_home} />
        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Address</span>
          <br />
          <input type='text' class='search-placeholder' name='address' onChange={props.handleInputChange} placeholder='Address' value={props.Profile.address} />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Address2</span>
          <br />
          <input type='text' class='search-placeholder' name='address2' onChange={props.handleInputChange} placeholder='Address2' value={props.Profile.address2} />
        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>city</span>
          <br />
          <input type='text' class='search-placeholder' name='city' onChange={props.handleInputChange} placeholder='city' value={props.Profile.city} />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>state</span>
          <br />
          <input type='text' class='search-placeholder' name='state' onChange={props.handleInputChange} placeholder='state' value={props.Profile.state} />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Emergency Name</span>
          <br />
          <input type='text' class='search-placeholder' name='emergency_name' onChange={props.handleInputChange} placeholder='Emergency Name' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Emergency Phone</span>
          <br />
          <input type='text' class='search-placeholder' name='emergency_phone' onChange={props.handleInputChange} placeholder='Emergency Phone' />

        </div>
      </div>
      <div className='profile-div'>
        <div className='table-container'>
          <span className='cus-profile-label'>Hire Date</span>
          <br />
          <input type='text' class='search-placeholder' name='hire_date' onChange={props.handleInputChange} placeholder='Hire Date' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Bio</span>
          <br />
          <input type='text' class='search-placeholder' name='bio' onChange={props.handleInputChange} placeholder='Bio' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Transportation Type</span>
          <br />
          <input type='text' class='search-placeholder' name='transportation_type' onChange={props.handleInputChange} placeholder='Transportation Type' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>License Plate</span>
          <br />
          <input type='text' class='search-placeholder' name='license_plate' onChange={props.handleInputChange} placeholder='License Plate' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Security Question</span>
          <br />
          <input type='text' class='search-placeholder' name='security_question' onChange={props.handleInputChange} placeholder='Security Question' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Security Answer</span>
          <br />
          <input type='text' class='search-placeholder' name='security_answer' onChange={props.handleInputChange} placeholder='Security Answer' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Notes</span>
          <br />
          <input type='text' class='search-placeholder' name='notes' onChange={props.handleInputChange} placeholder='Notes' />

        </div>

      </div>
      <div className='profile-div'>
        <div className='table-container'>
          <span className='cus-profile-label'>Payroll Frequency</span>
          <br />
          <input type='text' class='search-placeholder' name='payroll_frequency' onChange={props.handleInputChange} placeholder='Payroll Frequency' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Payroll Date (if monthly)</span>
          <br />
          <input type='text' class='search-placeholder' name='payroll_date' onChange={props.handleInputChange} placeholder='Payroll Date' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Email Payroll Reports</span>
          <br />
          <input type='text' class='search-placeholder' name='email_payroll_reports' onChange={props.handleInputChange} placeholder='Email Payroll Reports' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Email Alerts</span>
          <br />
          <input type='text' class='search-placeholder' name='email_alerts' onChange={props.handleInputChange} placeholder='Email Alerts' />

        </div>
        <div className='table-container'>
          <span className='cus-profile-label'>Walker Access Level</span>
          <br />
          <input type='text' class='search-placeholder' name='walker_access_level' onChange={props.handleInputChange} placeholder='Walker Access Level' />

        </div>
      </div>
    </div>
    <div className='create-service' style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '32%', paddingLeft: '54%' }}>
      <button action='submit' onClick={() => props.SaveProfile()} className='add-service-button' style={{ backgroundColor: '#3DA647' }}>
        <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>SAVE </div>
      </button>
      <button onClick={() => props.toggleProfileModal()} className='add-service-button' style={{ marginLeft: 20, backgroundColor: '#7D7D7D' }}>
        <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>CANCEL</div>
      </button>
    </div>
  </div>

</ReactModal>
