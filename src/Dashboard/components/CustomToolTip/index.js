// Libraries
import React, { Component } from 'react'

// Styles
import './index.css'

export default class CustomToolTip extends Component {
  render () {
    let payload = ''
    if (this.props.payload[0]) {
      payload = this.props.payload[0].payload
    }
    return <div className='custom-tooltip-container'>
      <div className='data-color' style={{ backgroundColor: '#50D166' }} />
      <span>{`${payload.name}`}</span>
    </div>
  }
}
