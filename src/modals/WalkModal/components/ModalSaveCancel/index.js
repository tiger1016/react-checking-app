// libraries
import React from 'react'

// Components
import Button from 'GlobalComponents/Button'
import ButtonGroup from 'GlobalComponents/ButtonGroup'

// Styles
import './index.css'

export default props => <div className='ModalSaveCancel'>
  {!props.isEditModal() ? <div className='ModalSaveCancel-buttons-container'>
    <div className='save'>
      <Button onClick={props.addAction} text='ADD SERVICE' />
    </div>
  </div> : <div className='ModalSaveCancel-buttons-container'>
    <ButtonGroup buttons={[
      {
        onClick: props.cancelAction,
        text: 'CANCEL SERVICE',
        textOnly: true
      }, {
        onClick: props.submitAction,
        text: props.walkStatus === 'pending' ? 'APPROVE' : 'SAVE'
      }
    ]} />
    {/* <div className='delete'>
      <button id='schedul_cancel_request' onClick={props.cancelAction}>CANCEL SERVICE</button>
    </div>
    <div className='approve'>
      <button id='schedul_save_request' onClick={props.submitAction}>{props.walkStatus === 'pending' ? 'APPROVE' : 'SAVE'}</button>
    </div> */}
  </div>}
</div>
