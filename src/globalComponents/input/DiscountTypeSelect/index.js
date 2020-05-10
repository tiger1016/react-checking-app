// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { DISCOUNT_TYPE } from './constants'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={DISCOUNT_TYPE}
  placeholder={props.placeholder || '--'}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  onClose={props.onClose}
  onOpen={props.onOpen}
  options={DISCOUNT_TYPE}
  placeholder={props.placeholder || '--'}
  value={props.value}
/>

export default props => <div className='DiscountTypeSelect'>{props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}</div>
