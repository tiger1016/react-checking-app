// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { DAYS_OF_WEEK, DAYS_OF_WEEK_SINGULAR_VALUE } from './constants'
// Styles
import './index.css'

const Select = props => <CustomSelect closeOnSelect={false} {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={props.singularValue ? DAYS_OF_WEEK_SINGULAR_VALUE : DAYS_OF_WEEK}
  placeholder={props.placeholder || '--'}
  iconClassname={props.iconClassname}
/>

const defaultSelect = props => <CustomSelect
  closeOnSelect={false}
  clearable={props.clearable}
  error={props.error}
  multi={props.multi}
  name={props.name}
  onChange={props.onChange}
  options={props.singularValue ? DAYS_OF_WEEK_SINGULAR_VALUE : DAYS_OF_WEEK}
  placeholder={props.placeholder || '--'}
  value={props.value}
  iconClassname={props.iconClassname}
  disabled={props.disabled}
/>

export default props => <div className='DaysOfWeekSelect'>{props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}</div>
