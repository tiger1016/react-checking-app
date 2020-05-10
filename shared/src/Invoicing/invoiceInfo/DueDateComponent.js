// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

// Styles

export class DueDateComponent extends Component {
  render () {
    const dueDate = this.props.dueDate
    return (
      <div className='dates-container'>
        {Moment(dueDate).format('MM/DD/YYYY')}
      </div>
    )
  }
}
