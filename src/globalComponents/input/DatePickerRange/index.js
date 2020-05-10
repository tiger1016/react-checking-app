// Libraries
import React from 'react'

// Components
import DatePickerInput from '../DatePicker'

// Styles
import './index.css'

export default props => <div className='DatePickerRange'>
  <div className='left'>
    <DatePickerInput disabled={props.disabled} value={props.startDate} onSelect={props.handleStartDateChange} onChange={props.handleStartDateChange} />
  </div>
  <span className='to'>to</span>
  <div className='right'>
    <DatePickerInput disabled={props.disabled} value={props.endDate} onSelect={props.handleEndDateChange} onChange={props.handleEndDateChange} />
  </div>
</div>
