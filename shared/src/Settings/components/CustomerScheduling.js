// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Styles
import '../styles/style.less'

class CustomerScheduling extends Component {
  render () {
    return (
      <div className='settings-scheduler-container'>
        Scheduler
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(CustomerScheduling))
