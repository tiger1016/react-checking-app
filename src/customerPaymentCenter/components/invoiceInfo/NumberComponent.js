// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

export class NumberComponent extends Component {
  render () {
    const number = this.props.number
    return (
      <div className='numbers-container' style={{ width: '12%', paddingLeft: '20px' }}>
        {number}
      </div>
    )
  }
}
