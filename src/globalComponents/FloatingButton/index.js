// Libraries
import React from 'react'

// Components
import CustomIcon from '../CustomIcon'

// Styles
import './index.css'

export default props => <div className='FloatingButton'>
  <button onClick={props.onClick} className='button'>
    <div className='icon-container'>
      <CustomIcon name={props.iconOnly || 'ion-plus'} size={props.iconSize} />
    </div>
  </button>
</div>
