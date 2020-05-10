// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Constants
import { FREQUENCIES } from './constants'

// Components
import CustomSelect from '../CustomSelect'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormFrequencySelect = props => <Field
  component={Select}
  help={props.help}
  placeholder={props.placeholder || '-select weekday-'}
  name={props.name}
  error={props.error}
  options={FREQUENCIES}
  iconClassname={props.iconClassname}
  disabled={props.disabled}
/>

const regularFrequencySelect = props => <CustomSelect
  error={props.error}
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  onValidate={props.onValidate}
  options={FREQUENCIES}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  multi={props.multi}
  iconClassname={props.iconClassname}
  disabled={props.disabled}
/>

export default props => <div className='FrequencySelect'>
  {props.reduxForm ? reduxFormFrequencySelect(props) : regularFrequencySelect(props)}
</div>
