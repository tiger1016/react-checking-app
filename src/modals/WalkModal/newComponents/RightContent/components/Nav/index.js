// Libraries
import React from 'react'

// Controllers
import {
  appController
} from 'Controllers'

// Components
import Button from 'GlobalComponents/Button'

// Styles
import './index.css'

export default class Nav extends React.Component {
  closeModal = () => appController.closeModal()
  render () {
    let {
      isEditModal,
      modalState,
      updateModalState
    } = this.props

    let { activeTab } = modalState

    return <div className='Nav'>
      <div className='Nav-button-container'>
        <button className={`Nav-button${activeTab === 'scheduling' ? ' active' : ''}`}
          onClick={() => updateModalState({ activeTab: 'scheduling' })}>
            Scheduling
        </button>
      </div>
      <div className='Nav-button-container'>
        {!isEditModal() ? null : <button className={`Nav-button${activeTab === 'summary' ? ' active' : ''}`}
          onClick={() => updateModalState({ activeTab: 'summary' })}>
            Summary
        </button>}
      </div>
      <div className='Nav-close'>
        <Button
          iconOnly='ion-close'
          onClick={this.closeModal}
          size='small'
          color='#808080'
          textOnly
        />
      </div>
    </div>
  }
}
