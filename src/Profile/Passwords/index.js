// Libraries
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// Styles
import './index.css'

// Controlles
import { profileController, sessionController } from 'Controllers'

// Components
import DoubleInputAndAction from 'GlobalComponents/input/DoubleInputAndAction'
import Hhrr from 'GlobalComponents/Hhrr'
import SectionHeader from 'GlobalComponents/SectionHeader'

class Passwords extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isTouched: false,
      global_password: '',
      global_password_confirmation: '',
      password: '',
      password_confirmation: '',
      result: false,
      resultType: ''
    }
  }

  updatePassword = e => {
    let {
      password,
      password_confirmation // eslint-disable-line camelcase
    } = this.state

    if (password !== '' && password === password_confirmation) { // eslint-disable-line camelcase
      profileController.actions.updatePassword({
        password,
        password_confirmation
      },
      this.updatePasswordResponse)
    } else {
      this.setState({ isTouched: true })
    }
  }

  updatePasswordResponse = (type, res) => {
    let newState = { result: true, resultType: type }
    newState.password = ''
    newState.password_confirmation = ''
    newState.global_password = ''
    newState.global_password_confirmation = ''
    newState.isTouched = false
    this.setState(newState)
    setTimeout(() => {
      this.setState({ result: false })
    }, 5000)
  }

  updateGlobalPassword = e => {
    let {
      global_password, // eslint-disable-line camelcase
      global_password_confirmation // eslint-disable-line camelcase
    } = this.state

    if (global_password !== '' && global_password === global_password_confirmation) { // eslint-disable-line camelcase
      profileController.actions.updateGlobalPassword({
        global_password,
        global_password_confirmation
      },
      this.updatePasswordResponse)
    } else {
      this.setState({ isTouched: true })
    }
  }

  render () {
    let {
      userType
    } = this.props

    let {
      global_password, // eslint-disable-line camelcase
      global_password_confirmation, // eslint-disable-line camelcase
      password,
      password_confirmation // eslint-disable-line camelcase
    } = this.state

    let globalError = null
    let error = null

    if (password !== password_confirmation) { // eslint-disable-line camelcase
      error = 'Password and password confirmation have to match'
    }

    if (global_password !== global_password_confirmation) { // eslint-disable-line camelcase
      globalError = 'Password and password confirmation have to match'
    }

    return <div id='Passwords' className='profile-section'>
      <SectionHeader title='Passwords' noPadding bigBottomPadding />
      <div className='section-content'>
        <div className='header'>Reset your Account Password</div>
        <div className='full-width-section'><Hhrr /></div>
        {error ? <div className='error-label'>{error}</div> : null}
        <DoubleInputAndAction
          buttonOnClick={this.updatePassword}
          buttonText='Save'
          error={error}
          loading={this.props.profileIsLoading}
          input1label='New Password'
          input2label='Repeat New Password'
          input1Name='password'
          input2Name='password_confirmation'
          input1OnChange={e => this.setState({ password: e.target.value })}
          input2OnChange={e => this.setState({ password_confirmation: e.target.value })}
          input1Value={password || ''}
          input2Value={password_confirmation || ''} // eslint-disable-line camelcase
          textInputYype2
          type='password'
        />
        {userType === 'licensee' ? [<div key={0} className='header'>Reset Global Password (for mobile app scan override feature )</div>,
          <div key={1} className='full-width-section'><Hhrr /></div>,
          globalError ? <div key={2} className='error-label'>{globalError}</div> : null,
          <DoubleInputAndAction
            buttonOnClick={this.updateGlobalPassword}
            buttonText='Save'
            loading={this.props.profileIsLoading}
            error={globalError}
            input1label='New Password'
            input2label='Repeat New Password'
            input1Name='global_password'
            input2Name='global_password_confirmation'
            input1OnChange={e => this.setState({ global_password: e.target.value })}
            input2OnChange={e => this.setState({ global_password_confirmation: e.target.value })}
            input1Value={global_password || ''} // eslint-disable-line camelcase
            input2Value={global_password_confirmation || ''} // eslint-disable-line camelcase
            key={3}
            textInputYype2
            type='password'
          />]
          : null}
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    userType: sessionController.selectUserType(state),
    profileIsLoading: state.profile.loading
  }
}

export default connect(mapStateToProps)(Passwords)
