// Libraries
import React, { Component } from 'react'
import Moment from 'moment'

// Styles

export class DateComponent extends Component {
  render () {
    const date = this.props.date
    if (date !== '0000-00-00 00:00:00') {
      return (
        <div className='dates-container'>
          {Moment(date).format('MM/DD/YYYY')}
        </div>
      )
    } else {
      return (
        <div className='dates-container'>
          &nbsp;
        </div>
      )
    }
  }
}
