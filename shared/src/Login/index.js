// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { ImageBackground, Text, View } from 'react-native'

// Assets
import bgImage from 'Assets/bg_content.png'

// Controllers
import { sessionController } from 'Controllers/sessionController'

// Components
import Button from '../globalComponents/Button'
import CustomIcon from '../globalComponents/CustomIcon'
import TextInput from '../globalComponents/input/TextInput'

// Styles
import styles from './styles'

const {
  PLATFORM_ENV
} = process.env

const resolvedStyle = (PLATFORM_ENV && PLATFORM_ENV === 'web')
  ? 'loginContainerWeb' : 'loginContainerNative'

function validate (email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0
  }
}

class Login extends React.Component {
  state = {
    // email: 'dougsimon8895@sbcglobal.net',
    email: '',
    // password: 'AGEvlt3$88',
    password: '',
    touched: { email: false, password: false }
  }

  canBeSubmitted = () => {
    const errors = validate(this.state.email, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  handleEmailChange = email => this.setState({ email })

  handlePasswordChange = password => this.setState({ password })

  // handleBlur = (field) => (evt) => {
  //   this.setState({
  //     touched: { ...this.state.touched, [field]: true }
  //   })
  // }

  handleSubmit = () => {
    if (!this.canBeSubmitted()) return

    const { email, password } = this.state
    sessionController.actions.requestLogin(email, password)
  }

  render () {
    const {
      loginFailed,
      sessionError
    } = this.props

    const {
      email,
      password
    } = this.state

    const errors = validate(email, password)
    const isDisabled = Object.keys(errors).some(x => errors[x])

    // const shouldMarkError = (field) => {
    //   const hasError = errors[field]
    //   const shouldShow = this.state.touched[field]
    //   return hasError ? shouldShow : false
    // }

    return <ImageBackground
      style={styles[resolvedStyle]}
      source={bgImage}>
      <View className='login-form' style={styles.innerContainer}>
        <Text style={[styles.item, styles.title]}>PetCheck</Text>
        <Text style={[styles.item, styles.subText]}>Login to your account</Text>
        {loginFailed ? <View style={styles.errorContainer}>
          <CustomIcon color='#c7011a' name='ios-alert' size={24} />
          <Text style={styles.errorMessage}>{/401/.test(sessionError) ? 'Unauthorized' : (sessionError || 'Unknown error')}</Text>
        </View> : null}
        <TextInput
          onChangeText={this.handleEmailChange}
          placeholder='Enter email'
          style={[styles.item, styles.input]}
          value={email}
        />
        <TextInput
          onChangeText={this.handlePasswordChange}
          placeholder='Enter password'
          secureTextEntry
          style={[styles.item, styles.input, styles.input2]}
          value={password}
        />
        <Button
          class='login-button'
          id='login-button'
          disabled={isDisabled}
          onPress={this.handleSubmit}
          style={[styles.item, styles.loginButton]}
          text='login'
        />
        <Text style={[styles.item, styles.forgetLink]}>Forgot your password?</Text>
      </View>
    </ImageBackground>
  }
}

const mapStateToProps = state => {
  const loggingIn = sessionController.selectLoggingIn(state)
  const loginFailed = sessionController.selectLoginFailed(state)
  const selectUserType = sessionController.selectUserType(state)

  return {
    loggingIn,
    loginFailed,
    sessionError: state.session.error,
    selectUserType
  }
}

export default connect(mapStateToProps)(Login)
