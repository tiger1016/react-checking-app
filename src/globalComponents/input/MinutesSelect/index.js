// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { MINUTES } from './constants'

// Utils
import { utility } from 'Utils/utility'

// Styles
import './index.css'

const resolveMinutes = (minutes, format) => minutes.map(minute => {
  if (format === 'min') {
    return {
      value: minute.value,
      label: minute.label + 'min'
    }
  }
  return minute
})

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormMinutesSelect = props => {
  let {
    displayFormat,
    format,
    help,
    name,
    normalize,
    onChange,
    placeholder,
    error,
    required
  } = props

  format = utility.isAFunction(format) ? format : v => Number(v)

  return <Field
    error={error}
    component={Select}
    format={format}
    help={help}
    placeholder={placeholder || '- min -'}
    name={name}
    normalize={normalize}
    onChange={onChange}
    required={required}
    options={resolveMinutes(MINUTES, displayFormat || null)}
  />
}

const regularMinutesSelect = props => {
  let {
    displayFormat,
    name,
    onChange,
    onValidate,
    multi,
    placeholder,
    required,
    value,
    error,
    disabled
  } = props

  return <CustomSelect
    error={error}
    name={name}
    onChange={onChange}
    onValidate={onValidate}
    options={resolveMinutes(MINUTES, displayFormat || null)}
    placeholder={placeholder || '--'}
    required={required}
    value={value}
    multi={multi}
    disabled={disabled}
  />
}

export default props => <div className='MinutesSelect'>{props.reduxForm ? reduxFormMinutesSelect(props) : regularMinutesSelect(props)}</div>
