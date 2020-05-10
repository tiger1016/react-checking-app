// Libraries
import React, { Component } from 'react'

export class NumberComponent extends Component {
  render () {
    const number = this.props.number
    return (
      <div className='numbers-container'>
        {number}
      </div>
    )
  }
}
