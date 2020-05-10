// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Controllers
import { sessionController } from 'Controllers/sessionController'

// Actions
import requestLogin from 'Actions/session/requestLogin'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'

// Styles
import './index.css'

function validate (email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email && email.length === 0,
    password: password && password.length === 0
  }
}

class Login extends React.Component {
  state = {
    email: process.env.NODE_ENV === 'development' ? (process.env.REACT_APP_DEV_USERNAME || '') : '',
    password: process.env.NODE_ENV === 'development' ? (process.env.REACT_APP_DEV_PASSWORD || '') : '',
    touched: { email: false, password: false }
  }

  handleEmailChange = ({ target: { value: email } }) => this.setState({ email })

  handlePasswordChange = ({ target: { value: password } }) => this.setState({ password })

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    if (this.canBeSubmitted()) {
      const { requestLogin } = this.props
      const { email, password } = this.state
      requestLogin(email, password)
    }
  }

  canBeSubmitted () {
    const errors = validate(this.state.email, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  render () {
    const {
      error,
      errorMessage,
      loggedIn,
      networkCheckError,
      networkCheckLoading,
      networkCheckLoadingMessage,
      online
    } = this.props

    const errors = validate(this.state.email, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])

    const shouldMarkError = (field) => {
      const hasError = errors[field]
      const shouldShow = this.state.touched[field]
      return hasError ? shouldShow : false
    }

    // Currently checking network
    if (!online && networkCheckLoading) {
      return <FullScreenTextOnly text={networkCheckLoadingMessage} spinner />
    }

    // Check if we are online
    if (networkCheckError && !loggedIn && ((!online && !networkCheckLoading) || networkCheckError)) {
      return <FullScreenTextOnly text={`${networkCheckError}: Bad connection`} error />
    }

    return (
      <div id='Login' className='loginContainer'>
        <div className='pen-title'>
          <h1>PetCheck</h1>
        </div>
        <div className='module form-module'>
          <div className='form'>
            <h2>Login to your account</h2>
            {error && <div className='login-error'>
              <div className='icon-container'>
                <div className='icon ion-alert' />
              </div>
              {/401/.test(errorMessage) ? 'Unauthorized' : (errorMessage || 'Unknown error')}
            </div>}
            <form onSubmit={this.handleSubmit}>
              <input
                className={shouldMarkError('email') ? 'error' : ''}
                type='text'
                placeholder='Enter email'
                value={this.state.email}
                onChange={this.handleEmailChange}
                onBlur={this.handleBlur('email')}
              />
              <input
                className={shouldMarkError('password') ? 'error' : ''}
                type='password'
                placeholder='Enter password'
                value={this.state.password}
                onChange={this.handlePasswordChange}
                onBlur={this.handleBlur('password')}
              />
              <button disabled={isDisabled}>LOGIN</button>
            </form>
          </div>
          <div className='cta'><a>Forgot your password?</a></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const loggedIn = sessionController.selectLoggedIn(state)
  const loggingIn = sessionController.selectLoggingIn(state)
  const error = sessionController.selectLoginFailed(state)

  return {
    error,
    errorMessage: state.session.error,
    loggedIn,
    loggingIn,
    networkCheckError: state.network.error,
    networkCheckLoading: state.network.loading,
    networkCheckLoadingMessage: state.network.loadingMessage,
    online: state.network.online
  }
}

const mapDispatchToProps = {
  requestLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
