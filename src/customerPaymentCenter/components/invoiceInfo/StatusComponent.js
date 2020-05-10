// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

export class StatusComponent extends Component {
  render () {
    const status = this.props.status
    return (
      <div className='status-containers' style={{ width: '12%' }}>
        {status}
      </div>
    )
  }
}
