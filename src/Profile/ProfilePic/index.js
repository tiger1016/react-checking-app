// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Controllers
import { profileController } from 'Controllers'

// Components
import ButtonGroup from 'GlobalComponents/ButtonGroup'
import ImageUploader from 'GlobalComponents/ImageUploader'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Styles
import './index.css'

class ProfilePic extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      profilePic: this.props.profilePic ? this.props.profilePic.profile_pic : false
    }
  }
  componentWillMount () {
    profileController.actions.fetchProfilePicture()
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ profilePic: nextProps.profilePic ? nextProps.profilePic.profile_pic : false })
  }

  /**
   * Uploads image to server on save butto click
   * @return {Void}
   */
  saveImage = () => profileController.actions.updateProfilePicture(this.state.profilePic)

  /**
   * Saves image file to state on ImageUploaderChange
   * @param  {Array} files       Array of image files
   * @param  {[type]} filesSrcs  Array of image urls
   * @return {Void}
   */
  imageUploaderChange = (files, filesSrcs) => {
    if (files.length) {
      this.setState({ profilePic: files[0] })
    } else {
      this.setState({ profilePic: null })
    }
  }

  render () {
    return <div id='ProfilePic' className='profile-section profileInfo-container'>
      <SectionHeader title='Profile Pic' noPadding bigBottomPadding />
      <div className='section-content'>
        <div className='image-action-area'>
          <ImageUploader multiple={false} onChange={this.imageUploaderChange} />
        </div>
      </div>
      <ButtonGroup buttons={[{ disabled: !this.state.profilePic, onClick: this.saveImage, text: 'Upload' }]} />
      <div className='section-label'>
        <span>Picture cannot be larger than 400x400 pixels</span>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    profilePic: state.profile.profile
  }
}

export default connect(mapStateToProps)(ProfilePic)
