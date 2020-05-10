// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { DAYS_OF_MONTH } from './constants'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={DAYS_OF_MONTH}
  placeholder={props.placeholder || '--'}
  iconClassname={props.iconClassname}
/>

const defaultSelect = props => <CustomSelect
  error={props.error}
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  options={DAYS_OF_MONTH}
  placeholder={props.placeholder || '--'}
  value={props.value}
  iconClassname={props.iconClassname}
  disabled={props.disabled}
/>

export default props => <div className='DaysOfMonthSelect'>{props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}</div>
