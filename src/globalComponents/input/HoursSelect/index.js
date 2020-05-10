// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { HOURS_24, HOURS_12 } from './constants'

// Utils
import { utility } from 'Utils/utility'

// Styles
import './index.css'

const resolveHours = (hours, format) => hours.map(hour => {
  if (format === 'hr') {
    return {
      value: hour.value,
      label: hour.label + 'hr'
    }
  }
  return hour
})

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormHoursSelect = props => {
  let { displayFormat, format, help, name, normalize, onChange, placeholder, timeFormat, required, error } = props
  format = utility.isAFunction(format) ? format : v => Number(v)

  return <Field
    error={error}
    component={Select}
    format={format}
    help={help}
    placeholder={placeholder || '- hr -'}
    name={name}
    normalize={normalize}
    onChange={onChange}
    required={required}
    options={resolveHours(timeFormat === 12 ? HOURS_12 : HOURS_24, displayFormat || null)} />
}

const regularHoursSelect = props => {
  let { displayFormat, name, onChange, onValidate, multi, placeholder, required, timeFormat, value, iconClassname, error, disabled } = props

  return <CustomSelect
    error={error}
    name={name}
    onChange={onChange}
    onValidate={onValidate}
    options={resolveHours(timeFormat === 12 ? HOURS_12 : HOURS_24, displayFormat || null)}
    placeholder={placeholder || '--'}
    required={required}
    value={value}
    multi={multi}
    iconClassname={iconClassname}
    disabled={disabled} />
}

export default props => <div className='HoursSelect'>
  {props.reduxForm ? reduxFormHoursSelect(props) : regularHoursSelect(props)}
</div>
