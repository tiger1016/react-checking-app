// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Components
import Help from '../../Help'
import LabelText from '../LabelText'

// Styles
import './index.css'

const radioInputReduxForm = props => <Field name={props.name} component='input' type='radio' value={props.value} />

const radioInput = props => <input
  checked={props.checked}
  onChange={props.onChange}
  name={props.name}
  type='radio'
  value={props.value}
/>

export default props => <div className={`RadioInput${props.child ? ' child' : ''}${props.parentOf ? ' parent' : ''}`}>
  <label>
    {props.reduxForm ? radioInputReduxForm(props) : radioInput(props)}
    <LabelText text={props.label} />
  </label>
  {props.help ? <Help text={props.help.text} place={props.help.place} /> : null}
</div>
