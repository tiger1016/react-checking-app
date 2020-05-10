// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { AMPM } from './constants'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormAmPmSelect = props => {
  let {
    format,
    help,
    name,
    normalize,
    onChange,
    placeholder,
    required
  } = props

  return <div className='AmPmSelect'>
    <Field
      component={Select}
      format={format}
      help={help}
      placeholder={placeholder || '-  -'}
      name={name}
      normalize={normalize}
      onChange={onChange}
      options={AMPM}
      required={required}
    />
  </div>
}

const regularAmPmSelect = props => {
  let {
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
    disabled={disabled}
    onValidate={onValidate}
    options={AMPM}
    placeholder={placeholder || '--'}
    required={required}
    value={value}
    multi={multi}
  />
}

export default props => props.reduxForm ? reduxFormAmPmSelect(props) : regularAmPmSelect(props)
