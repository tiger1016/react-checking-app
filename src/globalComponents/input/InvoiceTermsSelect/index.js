// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Constants
import { INVOICE_TERMS } from './constants'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  onValidate={props.onValidate}
  options={INVOICE_TERMS}
  placeholder={props.placeholder || '--'}
  required={props.required}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  onValidate={props.onValidate}
  options={INVOICE_TERMS}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  error={props.error}
/>

export default props => <div className='InvoiceTermsSelect'>{
  props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}
</div>
