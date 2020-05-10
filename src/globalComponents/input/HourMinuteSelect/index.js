// Libraries
import React, { Component } from 'react'

// Components
import HoursSelect from '../HoursSelect'
import MinutesSelect from '../MinutesSelect'
import AmPmSelect from '../AmPmSelect'

// Styles
import './index.css'

export default class HourMinuteSelect extends Component {
  render () {
    let {
      error,
      amPmName,
      amPmOnChange,
      amPmValue,
      help,
      hourName,
      hourValue,
      hourNormalize,
      hourOnChange,
      minuteName,
      minuteValue,
      minuteNormalize,
      minuteOnChange,
      periodName,
      periodValue,
      ampmOnChange,
      postLabel,
      preLabel,
      preLabelWidth,
      reduxForm,
      separator,
      timeFormat,
      iconClassname,
      disabled,
      required,
      onValidate
    } = this.props

    return <div className='HourMinuteSelect'>
      {preLabel && <span className='preLabel' style={{ width: (preLabelWidth || null) }}>{preLabel}</span>}
      <HoursSelect
        error={error}
        timeFormat={timeFormat}
        help={help}
        name={hourName}
        normalize={hourNormalize}
        onChange={hourOnChange}
        reduxForm={reduxForm}
        value={hourValue}
        onValidate={onValidate}
        iconClassname={iconClassname}
        disabled={disabled}
        required={required}
      />
      <span className='separator'>{separator || ':'}</span>
      <MinutesSelect
        error={error}
        help={help}
        name={minuteName}
        normalize={minuteNormalize}
        onChange={minuteOnChange}
        reduxForm={reduxForm}
        value={minuteValue}
        onValidate={onValidate}
        disabled={disabled}
        required={required}
      />
      {timeFormat === 12 && <span className='separator'>{separator || ':'}</span>}
      {timeFormat === 12 && <AmPmSelect
        error={error}
        help={help}
        name={periodName || amPmName}
        onChange={ampmOnChange || amPmOnChange}
        reduxForm={reduxForm}
        value={periodValue || amPmValue}
        disabled={disabled}
        required={required}
      />}

      {postLabel ? <span
        className='postLabel'>
        {postLabel}
      </span> : null}
    </div>
  }
}
