// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

// Controllers
import {
  petsController,
  walksController,
  customersController
} from 'Controllers'

// Components
import FieldGroup from '../../../FieldGroup'

// Styles
import './index.css'

class AddOrEditAWalk extends React.PureComponent {
  onCustomerSelectionChanged = selectedCustomer => {
    // Auto select walker

    if (selectedCustomer) {
      let {
        customers,
        updateModalState,
        walkers,
        pets
      } = this.props

      updateModalState({ selectedCustomer }, () => {
        let _customer = customers.customers.find(w => Number(w.user_id) === Number(selectedCustomer.value))

        if (_customer) {
          if (_customer && _customer.walker_id) {
            let customerWalker = walkers.walkers.find(w => Number(w.user_id) === Number(_customer.walker_id) && w.active)
            if (customerWalker) {
              let selectedWalker = { value: customerWalker.id, label: (customerWalker.first_name + ' ' + customerWalker.last_name) }
              updateModalState({ selectedWalker, selectedPets: [] })
            }
          } else {
            updateModalState({ selectedWalker: null, selectedPets: [] })
          }

          customersController.actions.fetchServiceRates(_customer.user_id)

          // auto select default service
          if (_customer && _customer.default_service && _customer.services && !this.props.modalState.selectedService) {
            let customerService = (_customer.services || []).find(s => s.dropdown_description === _customer.default_service)
            if (customerService) {
              let selectedService = { value: customerService.id, label: customerService.dropdown_description, cost: customerService.customer_cost }
              updateModalState({ selectedService })
            } else {
              let customerService = (_customer.service_types_cost || []).find(s => s.dropdown_description === _customer.default_service)
              if (customerService) {
                let selectedService = { value: customerService.id, label: customerService.dropdown_description, cost: customerService.cost }
                updateModalState({ selectedService })
              } else {
                updateModalState({ selectedService: null })
              }
            }
          } else if (!this.props.modalState.selectedService) {
            updateModalState({ selectedService: null })
          }
          // update selected service and addon as selected customer rates
          if (this.props.modalState.selectedService) {
            let services = customersController.selectCustomerServicesForSelectInput(_customer.user_id, null)
            let updatedSelectedService = services.find(item => Number(item.value) === Number(this.props.modalState.selectedService.value))
            if (updatedSelectedService) {
              updateModalState({ selectedService: updatedSelectedService })
            } else {
              updateModalState({ selectedService: null })
            }
          }
          if (this.props.modalState.selectedAddons) {
            let addons = customersController.selectCustomerAddonsForSelectInput(_customer.user_id, null)
            let updatedSelectedAddons = []
            this.props.modalState.selectedAddons.forEach(a => {
              let updatedSelectedAddon = addons.find(item => Number(item.value) === Number(a.value))
              updatedSelectedAddons.push(updatedSelectedAddon)
            })

            if (updatedSelectedAddons) {
              updateModalState({ selectedAddons: updatedSelectedAddons })
            } else {
              updateModalState({ selectedAddons: [] })
            }
          }

          let _pets = selectedCustomer ? pets.pets.filter(p => Number(p.customer_id) === Number(selectedCustomer.value)) : []
          let allCustomerPets = petsController.formatPetsForDropdown(_pets)

          if (allCustomerPets.length === 1) {
            updateModalState({ selectedPets: allCustomerPets })
          } else {
            updateModalState({ selectedPets: [] })
          }
        } else {
          updateModalState({ selectedWalker: null })
          updateModalState({ selectedPets: [] })
        }
      })
    }
  }

  render () {
    const {
      addons,
      customers,
      isEditModal,
      isCompleted,
      modalState,
      submissionFailedFor,
      updateModalState,
      walk
    } = this.props

    const {
      oldAddons,
      oldAmPm,
      oldDate,
      oldDays,
      oldFrequency,
      oldHour,
      oldMinute,
      oldPets,
      oldService,
      oldWalker,
      selectedAddons,
      selectedAmPm,
      selectedCustomer,
      selectedDate,
      selectedDays,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedWalker,
      selectedEndDate,
      selectedDiscount,
      selectedDiscountType
    } = modalState

    // let disableEditing = walksController.getStatus(walk) === 'completed' && !walk.recurrence_id
    let revision = {}

    if (isEditModal()) {
      revision = walksController.revision(walk)
    }

    return <div className='AddOrEditAWalk'>
      <FieldGroup items={[
        /* Customer */
        {
          error: submissionFailedFor('customer'),
          disabled: isEditModal(),
          hasRevision: false,
          oldValuesString: '',
          onChange: this.onCustomerSelectionChanged,
          loading: customers.loading,
          placeholder: '-choose customer-',
          label: 'Customer',
          type: 'customers',
          value: selectedCustomer
        },
        /* Pets */
        {
          error: submissionFailedFor('pets'),
          disabled: isCompleted,
          hasRevision: revision.hasRevision && oldPets && oldPets.length,
          mark: revision.pendingChanges && revision.pendingChanges.dogs,
          multi: true,
          oldValuesString: oldPets.map(p => p.label).join(', '),
          onChange: selectedPets => updateModalState({ selectedPets }),
          loading: this.props.pets.loading,
          placeholder: '-choose pets-',
          skip: !selectedCustomer,
          label: 'Pets',
          type: 'pets',
          customer: selectedCustomer && selectedCustomer.value,
          value: selectedPets
        },
        /* Walker */
        {
          error: submissionFailedFor('walker'),
          disabled: isCompleted,
          hasRevision: revision.hasRevision && oldWalker,
          mark: false,
          oldValuesString: oldWalker ? oldWalker.label : '',
          onChange: selectedWalker => updateModalState({ selectedWalker }),
          placeholder: '-choose staff-',
          label: 'Staff',
          type: 'walkers',
          value: selectedWalker,
          onlyActive: true,
          sorted: true
        },
        /* Service */
        {
          error: submissionFailedFor('service'),
          disabled: isCompleted,
          hasRevision: revision.hasRevision && oldService,
          mark: revision.pendingChanges && revision.pendingChanges.service_type,
          oldValuesString: oldService ? oldService.label : '',
          onChange: selectedService => updateModalState({ selectedService }),
          loading: this.props.services.loading,
          placeholder: '-choose services-',
          label: 'Service',
          type: 'services',
          value: selectedService,
          customer: selectedCustomer && selectedCustomer.value
        },
        /* Frequency */
        {
          error: submissionFailedFor('frequency'),
          disabled: isEditModal(),
          hasRevision: revision.hasRevision && oldFrequency,
          oldValuesString: oldFrequency ? oldFrequency.label : '',
          onChange: selectedFrequency => updateModalState({ selectedFrequency }),
          label: 'Frequency',
          placeholder: '-choose frequency-',
          type: 'frequency',
          value: (selectedFrequency && selectedFrequency.value !== 'once' && (walk && (!walk.recurrence_id || walk.recurrence_id === 0))) ? 'once' : selectedFrequency
        },

        /* Days */
        {
          closeOnSelect: false,
          disabled: isCompleted,
          error: submissionFailedFor('days'),
          hasRevision: revision.hasRevision && oldDays && oldDays.length,
          label: 'Days',
          mark: revision.pendingChanges && revision.pendingChanges.days,
          multi: true,
          oldValuesString: oldDate ? moment(oldDate).format('MM/DD/YYYY') : '',
          onChange: selectedDays => updateModalState({ selectedDays }),
          placeholder: '-choose days-',
          skip: !selectedFrequency || (selectedFrequency && selectedFrequency.value === 'once') || (selectedFrequency.value !== 'once' && (walk && (!walk.recurrence_id || walk.recurrence_id === 0))),
          singularValue: true,
          type: 'days-of-week',
          value: selectedDays
        },
        /* Date */
        {
          error: submissionFailedFor('date'),
          dateFormat: 'ddd, MM/D/YYYY',
          disabled: isCompleted,
          hasRevision: revision.hasRevision && oldDate,
          mark: revision.pendingChanges && revision.pendingChanges.date,
          oldValuesString: oldDate ? moment(oldDate).format('MM/DD/YYYY') : '',
          onChange: selectedDate => updateModalState({ selectedDate }),
          placeholder: '-choose date-',
          label: 'Start Date',
          type: 'date',
          value: selectedDate
        },
        /* Date */
        {
          error: submissionFailedFor('end_date'),
          dateFormat: 'ddd, MM/D/YYYY',
          disabled: isCompleted,
          hasRevision: revision.hasRevision && oldDate,
          mark: revision.pendingChanges && revision.pendingChanges.date,
          oldValuesString: oldDate ? moment(oldDate).format('MM/DD/YYYY') : '',
          onChange: selectedEndDate => updateModalState({ selectedEndDate }),
          placeholder: '-choose end date-',
          skip: !selectedFrequency || (selectedFrequency && selectedFrequency.value === 'once') || (selectedFrequency.value !== 'once' && (walk && (!walk.recurrence_id || walk.recurrence_id === 0))),
          label: 'End Date',
          type: 'date',
          value: selectedEndDate
        },
        /* Time */
        {
          error: submissionFailedFor('hour') || submissionFailedFor('minute') || submissionFailedFor('ampm'),
          amPmOnChange: selectedAmPm => updateModalState({ selectedAmPm: selectedAmPm.value }),
          amPmValue: selectedAmPm,
          disabled: isCompleted,
          hasRevision: revision.hasRevision && (oldHour || oldMinute || oldAmPm),
          hourOnChange: selectedHour => updateModalState({ selectedHour: selectedHour.value }),
          hourValue: selectedHour,
          mark: revision.pendingChanges && revision.pendingChanges.time && (oldHour || oldMinute || oldAmPm),
          minuteOnChange: selectedMinute => updateModalState({ selectedMinute: selectedMinute.value }),
          minuteValue: selectedMinute,
          oldValuesString: `${oldHour || ''}:${oldMinute || ''} ${oldAmPm || ''}`,
          label: 'Time',
          separator: ' ',
          timeFormat: 12,
          type: 'hour-minute'
        },
        {
          error: submissionFailedFor('addons'),
          disabled: isCompleted,
          hasRevision: revision.hasRevision && oldAddons && oldAddons.length,
          mark: revision.pendingChanges && revision.pendingChanges.addons,
          multi: true,
          oldValuesString: oldAddons.map(p => p.label).join(', '),
          onChange: selectedAddons => updateModalState({ selectedAddons }),
          loading: addons.loading,
          placeholder: '-choose add-ons-',
          label: 'Add-ons',
          type: 'addons',
          value: selectedAddons,
          customer: selectedCustomer && selectedCustomer.value
        },
        {
          disabled: isCompleted,
          onDiscountChange: selectedDiscount => updateModalState({ selectedDiscount }),
          onDiscountTypeChange: selectedDiscountType => updateModalState({ selectedDiscountType }),
          placeholder: '-apply discount-',
          label: 'Discount',
          type: 'discount',
          discountValue: selectedDiscount,
          discountTypeValue: selectedDiscountType
        }
      ]} />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    addons: state.addons,
    customers: state.customers,
    modal: state.app.modal,
    pets: state.pets,
    services: state.services,
    walkers: state.walkers,
    walks: state.walks
  }
}

export default connect(mapStateToProps)(AddOrEditAWalk)
