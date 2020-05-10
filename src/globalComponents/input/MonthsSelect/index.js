// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { MONTHS, MONTHS_ALL_NUMBER, MONTHS_NUMBER_VALUE } from './constants'

const Select = props => <CustomSelect {...props} reduxForm />

const selectOptionSet = (props) => {
  if (props.numberValue && props.numberLabel) {
    return MONTHS_ALL_NUMBER
  }

  if (props.numberValue) {
    return MONTHS_NUMBER_VALUE
  }

  return MONTHS
}

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={selectOptionSet(props)}
  placeholder={props.placeholder || '- select month -'}
/>

const defaultSelect = props => <CustomSelect
  error={props.error}
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  options={selectOptionSet(props)}
  placeholder={props.placeholder || '- select month -'}
  value={props.value}
  disabled={props.disabled}
/>

export default props => <div className={`MonthsSelect${props.numberLabel ? ' number-label' : ''}`}>{props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}</div>
