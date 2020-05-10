// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <a className={'FormLink t-form-link'} href={'javascript:void(0)'} onClick={props.onClick}>
  {props.text}
</a>
