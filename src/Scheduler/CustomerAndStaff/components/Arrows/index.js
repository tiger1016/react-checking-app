// Libraries
import React from 'react'

// Components
import { ButtonSquare } from 'GlobalComponents/Button'

// Styles
import './index.css'

export default props => <div className='Arrows'>
  <ButtonSquare iconOnly='ion-arrow-left-c' onClick={() => props.navigate('PREV')} />
  <ButtonSquare iconOnly='ion-arrow-right-c' onClick={() => props.navigate('NEXT')} />
</div>
