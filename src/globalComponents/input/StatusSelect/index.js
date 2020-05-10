// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { STATUS } from './constants'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  iconClassname={props.iconClassname}
  multi={props.multi}
  name={props.name}
  onClose={props.onClose}
  onOpen={props.onOpen}
  onValidate={props.onValidate}
  options={STATUS}
  placeholder={props.placeholder || '--'}
  required={props.required}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  error={props.error}
  name={props.name}
  multi={props.multi}
  onChange={props.onChange}
  onClose={props.onClose}
  onOpen={props.onOpen}
  onValidate={props.onValidate}
  options={STATUS}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
/>

export default props => <div className='StatusSelect t-status-select'>
  {props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}
</div>
