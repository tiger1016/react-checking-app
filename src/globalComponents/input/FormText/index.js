// Libraries
import React from 'react'

// Components
import Help from '../../Help'

// Styles
import './index.css'

export default props => <span onClick={props.onClick} style={{ cursor: props.clickable ? 'pointer' : '' }} className={`FormText${props.help ? ' help' : ''}`}>
  {props.text}
  {props.help ? <div className='help-section'>
    <Help text={props.help} />
  </div> : null}
</span>
