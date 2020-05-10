// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

// Styles
import '../../index.css'

export class DueDateComponent extends Component {
  render () {
    const dueDate = this.props.dueDate
    return (
      <div className='dates-container' style={{ width: '10%' }}>
        {Moment(dueDate).format('MM/DD/YYYY')}
      </div>
    )
  }
}
