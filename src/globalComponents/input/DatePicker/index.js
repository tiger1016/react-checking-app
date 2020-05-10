// Libraries
import React from 'react'
import DatePicker from 'react-datepicker'

// Utils
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class EINInput extends React.Component {
  constructor () {
    super()
    this.state = {
      error: false
    }
  }
  onChange = date => {
    date = date || ''

    let {
      onChange,
      onValidate,
      minDate,
      maxDate,
      name,
      id
    } = this.props

    let error = 'Please enter a valid Date.'

    if (date < minDate || date > maxDate) {
      if (utility.isAFunction(onValidate)) onValidate({ name: name || id, error })
      this.setState({ error: true })
    } else {
      if (utility.isAFunction(onValidate)) onValidate({ name: name || id, error: null })
      this.setState({ error: false })
    }

    if (utility.isAFunction(onChange)) onChange(date)
  }
  render () {
    let {
      className,
      name,
      onBlur,
      //  onChange,
      onFocus,
      value,
      width,
      iconLeft,
      iconRight,
      iconBorder,
      disabled,
      minDate,
      maxDate,
      showMonthDropdown,
      showYearDropdown,
      error
    } = this.props
    let _rightIconClass = 'icon-container larger '
    if (iconRight && iconRight !== '' && iconRight.toString() !== 'true') {
      _rightIconClass = _rightIconClass + iconRight
    } else {
      _rightIconClass = _rightIconClass + 'ion-android-calendar'
    }
    let _leftIconClass = 'icon-container larger '
    if (iconLeft && iconLeft !== '' && iconLeft.toString() !== 'true') {
      _leftIconClass = _leftIconClass + iconLeft
    } else {
      _leftIconClass = _leftIconClass + 'ion-android-calendar'
    }
    let _datePickerClassName = ''
    if (iconBorder) {
      if (iconLeft) {
        _datePickerClassName = 'borderLeft'
      }
      if (iconRight || (!iconLeft && !iconRight)) {
        _datePickerClassName = 'borderRight'
      }
    }
    if (error) {
      _datePickerClassName = _datePickerClassName + ' alert'
    }
    return <div className={_datePickerClassName + ' DatePicker'} name={name} style={{ width }}>
      {iconLeft && <span className={_leftIconClass} />}
      <DatePicker
        dateFormat='MM/DD/YYYY'
        disabled={disabled}
        className={className + ' datePicker'}
        dropdownMode='select'
        onBlur={onBlur}
        onChange={this.onChange}
        onFocus={onFocus}
        // onSelect={this.onChange}
        minDate={minDate}
        maxDate={maxDate}
        selected={value ? utility.dateFormat(value) : null}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
      />
      {/* <img className='icon-container' src={cal} /> */}
      {(iconRight || (!iconLeft && !iconRight)) && <span className={_rightIconClass} />}
    </div>
  }
}
