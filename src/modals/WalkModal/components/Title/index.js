// Libraries
import React from 'react'

// Controllers
import {
  walksController
} from 'Controllers'

// Styles
import './index.css'

export default props => <div className='Title title-container'>
  <div className='title'>{props.title}</div>
  <div className='approval-status-container'>
    {!props.isEditModal() ? null : <div className='color-badge' style={{ background: walksController.getStatusFill(props.walk) }} />}
  </div>
</div>
