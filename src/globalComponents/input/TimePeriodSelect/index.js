// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { TIME_PERIODS } from './constants'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={TIME_PERIODS}
  placeholder={props.placeholder || '--'}
  secondary={props.secondary}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  options={TIME_PERIODS}
  placeholder={props.placeholder || '--'}
  secondary={props.secondary}
  value={props.value}
/>

export default props => <div className='TimePeriodSelect'>{props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}</div>
