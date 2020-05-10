// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import CustomSelect from '../CustomSelect'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const generateOptions = props => {
  let {
    max,
    min,
    zeroPadded,
    interval
  } = props
  if (!min) {
    min = 0
  }
  if (!max) {
    max = 100
  }
  let options = []
  if (!interval) {
    interval = 1
  }
  if (zeroPadded) {
    let padding = ''
    let c = 0
    while (c < zeroPadded) {
      padding = padding + '0'
      c++
    }
    for (let i = min; i <= max; i += interval) {
      let value = i < 10 ? `${padding}${i}` : i
      options.push({ label: value, value })
    }
  } else {
    for (let i = min; i <= max; i += interval) {
      options.push({ label: i, value: i })
    }
  }

  return options
}

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  options={generateOptions(props)}
  placeholder={props.placeholder || '--'}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  options={generateOptions(props)}
  placeholder={props.placeholder || '--'}
  value={props.value || 1}
/>

export default props => <div className='NumberSelect t-number-select'>
  {props.reduxForm ? reduxFormSelect(props) : defaultSelect(props)}
</div>
