// Libraries
import React from 'react'

// Utils
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default props => {
  return <div className={`ModalTemplateField${props.flexStart ? ' flexStart' : ''}${props.noMargin ? ' noMargin' : ''}`}>
    <div className='label'>{props.label}</div>
    <div style={props.inputStyle} className='input'>{utility.isAFunction(props.input) ? props.input() : props.input}</div>
  </div>
}
