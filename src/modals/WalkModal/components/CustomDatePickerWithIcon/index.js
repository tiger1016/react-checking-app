// Libraries
import React from 'react'
import DatePicker from 'react-datepicker'

// Styles
import './index.css'

export default props => <div className={`CustomDatePickerWithIcon${props.alert ? ' alert' : ''}${props.mark ? ' mark' : ''}`}>
  <div className={`${props.iconClassname || ''} larger icon-container`} />
  <div className='datepicker-container' style={{ width: props.width || null }}>
    <DatePicker
      dateFormat={props.dateFormat}
      disabled={props.disabled}
      onChange={props.onChange}
      selected={props.value}
    />
  </div>
</div>
