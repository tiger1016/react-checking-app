// Libraries
import React from 'react'

// Components
import Button from '../Button'

// Styles
import './index.css'

export default props => <div className={`ButtonGroup${props.className ? ` ${props.className}` : ''}`}>
  {props.buttons.filter(item => !item.hide).map((button, i) => <Button {...button} key={i} />)}
</div>
