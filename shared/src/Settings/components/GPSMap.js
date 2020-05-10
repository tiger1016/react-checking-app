// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Styles
import '../styles/style.less'

class GPSMap extends Component {
  render () {
    console.log('customer billing')
    return (
      <div className='gps-map-container'>
        GPS Map
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(GPSMap))
