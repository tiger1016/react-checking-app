// Libraries
import React from 'react'

// Components
import { ButtonSquare } from 'GlobalComponents/Button'

export default props => <div className='Today'>
  <ButtonSquare text='Today' width='65px' onClick={() => props.onClick()} />
</div>
