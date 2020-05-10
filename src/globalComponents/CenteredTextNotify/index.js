// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className='CenteredTextNotify'>
  <div className='container'>
    <span className='icon'><i className={props.icon} /></span>
    <span className='text'>{props.text}</span>
  </div>
</div>
