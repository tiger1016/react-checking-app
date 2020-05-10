// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Styles
import '../styles/style.less'

class LateAlerts extends Component {
  render () {
    console.log('customer billing')
    return (
      <div className='late-alerts-container'>
        Late Alerts
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(LateAlerts))
