/*
* CustomInput.js
* Custom text input that shows current selected date for the calendar picker located on the top header
* IMPORTANT: Needs to be a statefull component (class) or else it will break the calendar picker which breaks the whole scheduler app
*/

// Libraries
import React from 'react'
import moment from 'moment'

// Styles
import './index.css'

export default class CustomInput extends React.Component {
  render () {
    let {
      modalEdit,
      newValue,
      onClick,
      value
    } = this.props

    let date = !newValue ? value : newValue
    let dateFormat = modalEdit ? 'MM/DD/YYYY' : 'MMM D, YYYY'

    return <div className='CustomInput'>
      {modalEdit ? <div className='icon-container' onClick={onClick}>
        <div className='ion-android-arrow-dropdown custom-arrow icon' />
      </div>
        : <div className='ion-android-calendar larger icons-dropdown' onClick={onClick} />
      }
      <button onClick={onClick}>
        {moment(date).format(dateFormat)}
      </button>
    </div>
  }
}
