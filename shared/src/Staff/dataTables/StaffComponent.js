// Libraries
import React, { Component } from 'react'

// Styles
import '../components/styles/row.less'

export class staffComponent extends Component {
  render () {
    const staffFname = this.props.fName
    const staffLname = this.props.lName
    const image = this.props.image

    return (
      <div className='staff-container'>
        <img className='img-circle' src={image} />
        <div className='staff-name'>
          <div className='staff-style'>{staffFname}</div>
          <div className='staff-style'>{staffLname}</div>
        </div>
      </div>
    )
  }
}
