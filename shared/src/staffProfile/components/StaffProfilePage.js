// Libraries
import React, { Component } from 'react'

// Styles
import '../style.less'

// Components
import { Profile } from './staffDetail/Profile'
import { CUSTOMER_PROFILE } from './constants'
import PayrollProfileModal from './staffDetail/PayrollProfileModal'
const header = CUSTOMER_PROFILE.dataDefinition.header
// Actions

export class StaffProfilePage extends Component {
  constructor (props) {
    super(props)

    var tempvar = this.props.walkerProfile
    this.toggleProfileModal = this.toggleProfileModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.SaveProfile = this.SaveProfile.bind(this)
    this.SaveProfilecallback = this.SaveProfilecallback.bind(this)

    this.state = { isProfileModalOpen: false, walkerProfile: tempvar }
  }

  toggleProfileModal (event) {
    if (this.state.isProfileModalOpen) {
      this.setState({ isProfileModalOpen: false })
      this.setState({
        walkerProfile: this.props.walkerProfile
      })
    } else {
      this.setState({ isProfileModalOpen: true })
    }
  }

  handleInputChange (item) {
    var temp = this.state.walkerProfile
    temp[item.target.name] = item.target.value
    this.setState({
      walkerProfile: temp
    })
  }

  SaveProfile (event) {
    this.props.walkerProfileActions.updateWalker(this.props.walkerid, this.state.walkerProfile, this.SaveProfilecallback)
  }

  SaveProfilecallback (status, data) {
    this.setState({ isProfileModalOpen: false })
    this.props.walkerProfile = this.state.walkerProfile
    this.forceUpdate()
  }

  render () {
    const walkerProfile = this.props.walkerProfile
    // const staffPhotoId = this.props.customerProfile.customer_photo_id;
    // const photobaseURL ='https://s3.amazonaws.com/petcheck-assets/pets/'+staffPhotoId+'/';
    return (
      <div className='staff-profile-container'>
        <div className='right-div'>
          <div>
            <span className='contact-information-header'>{header}</span>
            <span className='edit-icons-position'><span className='ion-edit icon-circle' onClick={() => this.toggleProfileModal()} /></span>
          </div>
          <Profile Profile={walkerProfile} />
          <PayrollProfileModal Profile={this.state.walkerProfile} SaveProfile={this.SaveProfile} isProfileModalOpen={this.state.isProfileModalOpen} handleInputChange={this.handleInputChange} toggleProfileModal={this.toggleProfileModal} />
          <div />
        </div>
      </div>
    )
  }
}
