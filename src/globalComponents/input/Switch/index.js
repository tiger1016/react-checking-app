// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import LabelText from '../LabelText'

// Styles
import './index.css'

// Utils
import { utility } from 'Utils/utility'

const ReduxFormSwitch = props => {
  let {
    label,
    name,
    normalize,
    noText,
    onChange,
    offText,
    onText,
    disabled
  } = props
  let format = utility.isAFunction(props.format) ? props.format : v => v == null ? '' : v
  return <div className={`Switch`}>
    <label>
      <Field
        component='input'
        format={format}
        name={name}
        normalize={normalize}
        onChange={() => !disabled && utility.isAFunction(onChange) && onChange()}
        type='checkbox'
        disabled={disabled}
      />
      <div
        data-content-after={noText ? '' : (offText || 'OFF')}
        data-content-before={noText ? '' : (onText || 'ON')}
      />
      {label ? <LabelText text={label} /> : null}
    </label>
  </div>
}

const NormalSwitch = props => {
  let {
    checked,
    label,
    name,
    noText,
    onChange,
    offText,
    onText,
    disabled
  } = props
  return <div className={`Switch`}>
    <label>
      <input
        checked={checked}
        name={name}
        onChange={() => !disabled && utility.isAFunction(onChange) && onChange()}
        type='checkbox'
        disabled={disabled}
      />
      <div
        data-content-after={noText ? '' : (offText || 'OFF')}
        data-content-before={noText ? '' : (onText || 'ON')}
      />
      {label ? <LabelText text={label} /> : null}
    </label>
  </div>
}

export default props => props.reduxForm ? ReduxFormSwitch(props) : NormalSwitch(props)
