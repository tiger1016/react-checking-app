// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className='DashboardButton'>
  <button onClick={props.onClick}>{props.text}</button>
</div>
