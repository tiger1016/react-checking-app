// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />
const YEARS = () => {
  let _years = []
  let _currentYear = new Date().getFullYear()
  for (let i = _currentYear; i <= _currentYear + 20; i++) {
    _years.push({ label: i, value: i })
  }
  return _years
}
const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={YEARS()}
  placeholder={props.placeholder || '--'}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  options={YEARS()}
  placeholder={props.placeholder || '--'}
  value={props.value}
/>

export default props => <div className='YearSelect'>{props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}</div>
