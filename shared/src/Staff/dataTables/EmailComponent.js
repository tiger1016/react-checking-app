// Libraries
import React, { Component } from 'react'

// Styles
import '../components/styles/row.less'

export class EmailComponent extends Component {
  render () {
    const email = this.props.email
    return (
      <div className='email-container'>
        {email}
      </div>
    )
  }
}
