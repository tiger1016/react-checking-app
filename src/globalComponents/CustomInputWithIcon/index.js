// Libraries
import React from 'react'

import Cal from 'Assets/icons/cal-icon.png'

// Styles
import './index.css'

export default props => <div className='CustomInputWithIcon'>
  {props.icon !== 'calendar' ? <div className={`icon-container ${props.icon}`} /> : <div className='icon-container'><img src={Cal} /></div>}
  <div className='input-container'>
    {props.children}
  </div>
</div>
