// Libraries
import React from 'react'

// Styles
import './index.css'

export default class ErrorDisplay extends React.Component {
  render () {
    let { message } = this.props
    return <div className='ErrorDisplayContainer'>
      <div className='icon-container'>
        <i className='icon ion-android-warning' />
      </div>
      <p className='message'>{message}</p>
    </div>
  }
}
