// Libraries
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

// Controllers
import { walksController, appController } from 'Controllers'

// Components
import Img from 'GlobalComponents/Img'
import TextBox from 'GlobalComponents/input/TextBox'

// Styles
import './index.css'

export default class NotesComments extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editAppointmentNotes: false,
      editCustomerComment: false
    }
  }
  toggleComments = () => this.setState({ editCustomerComment: !this.state.editCustomerComment })
  toggleNotes = () => this.setState({ editAppointmentNotes: !this.state.editAppointmentNotes })

  render () {
    let {
      isEditModal,
      isCompleted,
      modalState,
      updateModalState,
      walk,
      userType
    } = this.props

    let {
      oldAmPm,
      oldDate,
      oldHour,
      oldMinute,
      oldPets,
      oldService,
      oldAddons,
      selectedAmPm,
      selectedDate,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedAddons
    } = modalState

    let revision = {}
    if (isEditModal()) {
      revision = walksController.revision(walk)
    }

    return <div className='NotesComments'>
      <div className='left-container'>
        <div className='row-container'>
          {(isCompleted || !isEditModal()) && <span className='label'>Appointment Notes </span>}
          {!isCompleted && isEditModal() && <span className='label'>Appointment Notes (<span className='edit' onClick={this.toggleNotes}>Edit</span>)</span>}
          <div className='value'>{(this.state.editAppointmentNotes || !isEditModal()) && <TextBox onChange={(e) => updateModalState({ selectedNotes: e.target.value })} value={modalState.selectedNotes} />}
            {!this.state.editAppointmentNotes && isEditModal() && <span>{modalState.selectedNotes !== '' ? modalState.selectedNotes : 'No appointment notes provided.' }</span>}
          </div>
        </div>
        {(userType === 'customer' || isEditModal()) && <div className='row-container'>
          <span className='label'>Customer Comments {userType === 'customer' ? '(' && <span className='edit' onClick={this.toggleComments}>Edit</span> && ')' : ''}</span>
          <div className='value'>{this.state.editCustomerComment && <TextBox onChange={(e) => updateModalState({ selectedCustomerComments: e.target.value })} value={modalState.selectedCustomerComments} />}
            {!this.state.editCustomerComment && <span>{modalState.selectedCustomerComments !== '' ? modalState.selectedCustomerComments : isEditModal() ? 'No customer comments provided.' : 'Lots of space here to type just about anything you need to regarding how well the appointment went.'}</span>}
          </div>
        </div>}
        {isEditModal() && revision.hasRevision && <div className='row-container'>
          <span className='label red'>{revision.revisionMessage.replace(/^Edit/, 'Change')}</span>
          <div className='value'>

            {/* Customer noted as no change allowed */}
            {revision.pendingChanges.date && <span>{`- Date changed from ${moment(oldDate).format()} to ${moment(selectedDate).format()}`}</span>}
            {/* Days initial state needs review */}
            {revision.pendingChanges.dogs && <span>{`- Pets changed from ${oldPets.map(p => p.label).join(',')} to ${selectedPets.map(p => p.label).join(',')}`}</span>}
            {/* Frequency noted as no change allowed */}
            {revision.pendingChanges.service_type && <span>{`- Service updated from ${oldService && (oldService.label || oldService)} to ${selectedService && (selectedService.label || selectedService)}`}</span>}
            {/* Addons initial state needs review */}
            {revision.pendingChanges.addons && <span>{`- Addons updated from ${oldAddons && (oldAddons.map(a => a.label).join(',') || 'None')} to ${selectedAddons && (selectedAddons.map(a => a.label).join(',') || 'None')}`}</span>}
            {revision.pendingChanges.time && <span>{`- Time updated from ${oldHour}:${oldMinute < 10 ? `0${oldMinute}` : oldMinute} ${oldAmPm} to ${selectedHour}:${selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute} ${selectedAmPm}`}</span>}
            {/* Walker noted as no change allowed */}
            <span />
          </div>
        </div>}
      </div>
      {isEditModal() && <div className='right-container'>
        {walk.pets && walk.pets.map((pet, i) => <Link onClick={() => appController.closeModal()} to={'/customer/' + walk.customer.id + '/pets#' + pet.name.replace(' ', '')} key={i}><div className='pets-Container'>
          <div className='pet-image'><Img /></div>
          <div className='pet-name'>({pet.name})</div>
        </div></Link>)}
      </div>}
    </div>
  }
}
