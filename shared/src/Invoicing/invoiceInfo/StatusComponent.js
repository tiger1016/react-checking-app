// Libraries
import React, { Component } from 'react'

// Styles

export class StatusComponent extends Component {
  render () {
    const status = this.props.status
    return (
      <div className='status-containers'>
        {status}
      </div>
    )
  }
}
