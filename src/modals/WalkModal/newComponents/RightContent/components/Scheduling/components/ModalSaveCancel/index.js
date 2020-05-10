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
      <Button onClick={props.addAction} loading={props.serviceSaving} green text='ADD SERVICE' />
    </div>
  </div> : <div className='ModalSaveCancel-buttons-container'>
    <ButtonGroup buttons={props.walkStatus === 'pending' || props.walkStatus === 'change_requested' || props.walkStatus === 'cancel_requested' ? [
      {
        onClick: props.cancelAction,
        text: 'CANCEL SERVICE',
        disabled: props.isCompleted,
        textOnly: true,
        hide: props.walkStatus === 'cancel_requested'
      }, {
        onClick: props.declineAction,
        text: 'DECLINE',
        textOnly: true
      }, {
        green: true,
        onClick: props.submitAction,
        disabled: props.isCompleted,
        text: 'APPROVE'
      }
    ] : [
      {
        onClick: props.cancelAction,
        text: 'CANCEL SERVICE',
        disabled: props.isCompleted,
        textOnly: true,
        hide: props.walkStatus === 'cancel_requested'
      }, {
        green: true,
        onClick: props.submitAction,
        disabled: props.isCompleted,
        text: 'SAVE'
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
