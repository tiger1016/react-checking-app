// Libraries
import React from 'react'

// Controllers
import {
  walksController
} from 'Controllers'

// Components
import NotesComments from './components/NotesComments'
import CostSummary from './components/CostSummary'
import ModalSaveCancel from './components/ModalSaveCancel'

// Styles
import './index.css'

export default class Scheduling extends React.Component {
  handleSubmitFormForCreate = () => {
    this.props.submitForm('create')
  }

  handleSubmitFormForCancel = () => {
    this.props.submitForm('cancel')
  }

  handleSubmitFormForDecline = () => {
    this.props.submitForm('decline')
  }

  handleSubmitFormForSave = () => {
    this.props.submitForm('save')
  }

  render () {
    const {
      walk,
      modalState,
      isEditModal,
      isCompleted,
      updateModalState,
      userType
    } = this.props

    const {
      selectedAddons,
      selectedService,
      selectedDiscount,
      selectedDiscountType,
      serviceSaving
    } = modalState

    const walkStatus = walksController.getStatus(walk)

    return <div id='Scheduling' className='Scheduling'>
      <div className='cost-summary-and-save-container'>
        <NotesComments userType={userType} isCompleted={isCompleted} updateModalState={updateModalState} modalState={modalState} isEditModal={isEditModal} walk={walk} />
        <div className='cost-summary-and-save'>
          <CostSummary
            isEditModal={isEditModal}
            selectedAddons={selectedAddons}
            selectedService={selectedService}
            selectedDiscount={selectedDiscount}
            selectedDiscountType={selectedDiscountType}
            walk={walk}
          />
          <ModalSaveCancel
            isCompleted={isCompleted}
            walkStatus={walkStatus}
            serviceSaving={serviceSaving}
            addAction={this.handleSubmitFormForCreate}
            cancelAction={this.handleSubmitFormForCancel}
            declineAction={this.handleSubmitFormForDecline}
            isEditModal={isEditModal}
            submitAction={this.handleSubmitFormForSave}
          />
        </div>
      </div>
    </div>
  }
}
