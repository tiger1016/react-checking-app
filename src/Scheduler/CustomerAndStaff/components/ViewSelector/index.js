// Libraries
import React from 'react'

// Components
import { ButtonSquare } from 'GlobalComponents/Button'

// Styles
import './index.css'

export default props => <div className='ViewSelector'>
  {props.views.map((v, i) => {
    return <ButtonSquare key={i} text={v.replace(/_/g, ' ')} width='85px' onClick={() => props.goToView(v)} />
  })}
</div>
