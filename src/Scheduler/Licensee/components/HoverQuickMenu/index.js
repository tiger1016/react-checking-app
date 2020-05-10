// Libraries
import React from 'react'

// Controllers
import {
  appController,
  schedulerController,
  walksController
} from 'Controllers'

// Styles
import './index.css'

export default class HoverQuickMenu extends React.Component {
  addToBulkList = () => e => schedulerController.actions.toggleWalkOnBulkList(e.target.value)
  delete = () => {
    let { walk } = this.props

    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        type: 'info',
        confirmButtonText: 'All appointments',
        onConfirm: () => {
          walksController.actions.cancelWalk(walk.walk_id, true)
          appController.closeAlert()
        },
        cancelButtonText: 'Only this one',
        onCancel: () => {
          walksController.actions.cancelWalk(walk.walk_id, false)
          appController.closeAlert()
        },
        showCancelButton: true,
        title: 'Cancel all future appointments in this series from this date or just this one?',
        text: '',
        onKeyDown: e => appController.closeAlert()
      }
    })
  }
  openModal = () => {
    let { walk } = this.props

    appController.actions.toggleModal({
      modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
      canClose: true,
      isOpen: true,
      data: { walk }
    })
  }
  render () {
    let {
      selected,
      walk
    } = this.props

    return <div className='hover-quick-menu' onClick={e => e.stopPropagation()}>
      <div className='hover-quick-menu-entry'>
        <i onClick={this.openModal} className='ion-edit hover-quick-menu-entry-icon' />
      </div>
      <div className='hover-quick-menu-entry'>
        <i onClick={this.delete} className='ion-trash-a hover-quick-menu-entry-icon' />
      </div>
      <div className='hover-quick-menu-entry'>
        <input checked={selected}
          onChange={this.addToBulkList}
          style={{ cursor: 'pointer' }}
          type='checkbox'
          value={walk.walk_id}
        />
      </div>
    </div>
  }
}
