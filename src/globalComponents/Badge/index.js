// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className='Badge'>
  {props.closable ? <div className='closable' onClick={props.closableOnClick}>
    <div className={`icon ${props.closableIcon ? props.closableIcon : 'ion-android-close'}`} />
  </div> : null}
  <div className='text'>{props.text}</div>
</div>
