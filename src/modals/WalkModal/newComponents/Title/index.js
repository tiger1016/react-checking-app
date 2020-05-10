// Libraries
import React from 'react'
import ReactTooltip from 'react-tooltip'
// Controllers
import {
  walksController
} from 'Controllers'

// Styles
import './index.css'

export default props => <div className='Title'>
  <ReactTooltip effect='solid' place={'bottom'} />
  <div className='title'>{props.title}</div>
  {props.isEditModal() && <div data-tip={walksController.getStatusTitle(props.walk)} className='color-badge' style={{ background: walksController.getStatusFill(props.walk) }} />}
</div>
