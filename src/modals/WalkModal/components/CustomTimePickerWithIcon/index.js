// libraries
import React from 'react'
import Select from 'react-select'

// Styles
import './index.css'

// Constants
import { HOURS, MINUTES_BY_FIVE, AM_PM } from 'Constants/Constants'

export default props => {
  let {
    amPmAlert,
    amPmOnChange,
    amPmPlaceholder,
    amPmValue,
    clearable,
    disabled,
    hourAlert,
    hourPlaceholder,
    hourOnChange,
    hourValue,
    iconClassname,
    mark,
    minuteAlert,
    minuteOnChange,
    minutePlaceholder,
    minuteValue
  } = props

  return <div className={`CustomTimePickerWithIcon${mark ? ' mark' : ''}${hourAlert || minuteAlert || amPmAlert ? ' alert' : ''}`}>
    <div className='CustomTimePickerWithIcon-inputs-container'>
      <div className={`${iconClassname} larger icon-container`} />
      <Select
        className={`CustomTimePickerWithIcon-Hour${hourAlert ? ' alert' : ''}`}
        clearable={clearable}
        disabled={disabled}
        onChange={hourOnChange}
        options={HOURS}
        placeholder={hourPlaceholder || '00'}
        simpleValue
        value={hourValue}
      />
      <Select
        className={`CustomTimePickerWithIcon-Minute${minuteAlert ? ' alert' : ''}`}
        clearable={clearable}
        disabled={disabled}
        onChange={minuteOnChange}
        options={MINUTES_BY_FIVE}
        placeholder={minutePlaceholder || '00'}
        simpleValue
        value={minuteValue}
      />
      <Select
        className={`CustomTimePickerWithIcon-AmPm${amPmAlert ? ' alert' : ''}`}
        clearable={clearable}
        disabled={disabled}
        onChange={amPmOnChange}
        options={AM_PM}
        placeholder={amPmPlaceholder || 'am/pm'}
        simpleValue
        value={amPmValue}
      />
    </div>
  </div>
}
