import React from 'react'
import { connect } from 'react-redux'
// Controllers
import { sessionController } from '../../../controllers'

class LoginDecorator extends React.Component {
  componentWillMount () {
    if (!this.props.user) {
      const email = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_USERNAME : ''
      const password = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_PASSWORD : ''
      sessionController.actions.requestLogin(email, password)
    }
  }

  render () {
    if (this.props.loading || !this.props.user) {
      return 'logging In..'
    } else {
      return this.props.children
    }
  }
}

function mapStateToProps (state, props) {
  return {
    loading: state.session.loading,
    user: state.session.user
  }
}

export default connect(mapStateToProps)(LoginDecorator)
