// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className={`CustomIcon icon-container ${props.size || ''}`}>
  <div className='icon-wrapper'>
    <i className={`icon ${props.name}`} />
  </div>
</div>
