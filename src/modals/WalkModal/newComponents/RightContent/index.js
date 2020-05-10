// Libraries
import React from 'react'

// Controllers
import {
  appController
} from 'Controllers'

// Components
import MapAndPhotos from './components/MapAndPhotos'
import Nav from './components/Nav'
import Scheduling from './components/Scheduling'

// Styles
import './index.css'

export default class RightContent extends React.Component {
  closeModal = () => appController.closeModal()
  renderContent = () => {
    const {
      walk,
      modalState,
      isEditModal,
      updateModalState,
      submitForm,
      userType,
      isCompleted
    } = this.props

    switch (modalState.activeTab) {
      case 'summary':
        return <MapAndPhotos modalState={modalState} isEditModal={isEditModal} />
    }
    return <Scheduling walk={walk}
      submitForm={submitForm}
      updateModalState={updateModalState}
      modalState={modalState}
      isEditModal={isEditModal}
      isCompleted={isCompleted}
      userType={userType}
    />
  }

  render () {
    const {
      isEditModal,
      modalState,
      updateModalState
    } = this.props

    return <div id='RightContent'>
      <Nav
        isEditModal={isEditModal}
        modalState={modalState}
        updateModalState={updateModalState}
      />
      {this.renderContent()}
    </div>
  }
}
