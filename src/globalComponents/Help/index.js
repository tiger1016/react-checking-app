// Libraries
import React from 'react'
import ReactTooltip from 'react-tooltip'

// Styles
import './index.css'

export default props => <div className={`Help ${props.place || 'top'}`} data-tip={props.text} >
  <i className='ion-help' />
  <ReactTooltip class='custom-tooltip' effect='solid' place={props.place} />
</div>
