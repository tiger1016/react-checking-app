// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'

// Controllers
import {
  appController,
  walksController,
  servicesController,
  sessionController,
  customersController
} from 'Controllers'

// Components
import LeftContent from './newComponents/LeftContent'
import RightContent from './newComponents/RightContent'
import Title from './newComponents/Title'

// Utils
import { dateTimeUtil, UrlUtil } from 'Utils'

// Styles
import './index.css'
class WalkModal extends React.Component {
  constructor () {
    super()
    this.updateModalState = this.setState.bind(this)
    this.state = {
      activeTab: 'scheduling', // 'scheduling' || 'summary'
      oldAddons: [],
      oldCustomer: null,
      oldDate: null,
      oldDays: [],
      oldFrequency: null,
      oldHour: null,
      oldMinute: null,
      oldAmPm: null,
      oldPets: [],
      oldService: null,
      selectedAddons: [],
      selectedCustomer: null,
      selectedDate: null,
      selectedEndDate: null,
      selectedDays: [],
      selectedFrequency: null,
      selectedHour: null,
      selectedMinute: '00',
      selectedAmPm: null,
      selectedPets: [],
      selectedService: null,
      selectedNotes: '',
      selectedCustomerComments: '',
      selectedDiscount: null,
      selectedDiscountType: 'dollar',
      serviceSaving: false
    }
  }
  componentDidMount () {
    const { modal, location } = this.props
    const { search } = location
    if (this.isEditModal()) {
      if (walksController.revision(modal.data.walk).hasRevision) {
        this.initializeRevisionEdit()
      } else {
        this.initializeEdit()
      }
      if (walksController.getStatusTitle(modal.data.walk) === 'Completed') {
        this.setState({ activeTab: 'summary' })
      }
    } else {
      this.initializeAdd()
      const filters = UrlUtil.parseQuesryString(search) || {}

      if (filters.customers) {
        const selectedCustomers = this.props.customers.customers.filter(c => filters.customers.map(c => Number(c)).includes(Number(c.user_id))).map(c => ({ label: `${c.first_name} ${c.last_name}`, value: Number(c.user_id) }))
        if (selectedCustomers && selectedCustomers.length > 0) {
          this.setState({
            selectedCustomer: selectedCustomers[0]
          })
        }
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    const {
      modal
    } = this.props
    const _walk1 = modal.data.walk
    if (_walk1) {
      const _walk2 = nextProps.walks.walks.find(item => Number(item.walk_id) === Number(_walk1.walk_id))
      if (!_.isEqual(_walk1, _walk2)) {
        modal.data.walk = _walk2
      }
    }
    if (!_.isEqual(this.props.customers, nextProps.customers)) {
      // service initial state
      if (this.isEditModal() && modal.data.walk && modal.data.walk.customer && modal.data.walk.customer.id && modal.data.walk.dropdown_description) {
        const selectedServiceArray = customersController.selectCustomerServicesForSelectInput(modal.data.walk.customer.id, modal.data.walk.dropdown_description)
        const selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
        this.setState({ selectedService })
      }
    }
  }
  /**
   * Initializes values for new walk modal
   * @return {Void}
   */
  initializeAdd = () => {
    // date inital state
    this.setState({ selectedDate: moment(new Date()) })
  }
  /**
   * Initializes values for edit walk modal
   * @return {Void}
   */
  initializeEdit = () => {
    let {
      modal,
      walkers,
      walks
    } = this.props

    // customer initial state
    this.setState({
      selectedCustomer: {
        value: modal.data.walk.customer.id,
        label: modal.data.walk.customer.name
      }
    })

    let pets = modal.data.walk.pets || []

    // pets initial state
    this.setState({ selectedPets: this.formatPetsForDropdown(pets) })

    // service initial state
    let selectedServiceArray = customersController.selectCustomerServicesForSelectInput(modal.data.walk.customer.id, modal.data.walk.dropdown_description)
    let selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
    this.setState({ selectedService })

    // frequencies initial state
    if (modal.data.walk && (!modal.data.walk.recurrence_id || modal.data.walk.recurrence_id === 0)) {
      let selectedFrequencyRaw = _.find(walks.frequencies, f => f.id === 'once')
      if (selectedFrequencyRaw) {
        let selectedFrequency = { value: selectedFrequencyRaw.id, label: selectedFrequencyRaw.name }
        this.setState({ selectedFrequency })
      }
    } else {
      let selectedFrequencyRaw = _.find(walks.frequencies, f => f.id === modal.data.walk.frequency)
      if (selectedFrequencyRaw) {
        let selectedFrequency = { value: selectedFrequencyRaw.id, label: selectedFrequencyRaw.name }
        this.setState({ selectedFrequency })
      }
    }

    // walker initial state
    let selectedWalkerRaw = _.find(walkers.walkers, w => Number(w.id) === Number(modal.data.walk.walker_id) && w.active)
    if (selectedWalkerRaw) {
      let selectedWalker = { value: modal.data.walk.walker_id, label: (selectedWalkerRaw.first_name + ' ' + selectedWalkerRaw.last_name) }
      this.setState({ selectedWalker })
    } else {
      // default customer walker
      let _selectedWalkerRaw = _.find(walkers.walkers, w => Number(w.user_id) === Number(modal.data.walk.customer.walker_id) && w.active)
      if (_selectedWalkerRaw) {
        let selectedWalker = { value: modal.data.walk.customer.walker_id, label: (_selectedWalkerRaw.first_name + ' ' + _selectedWalkerRaw.last_name) }
        this.setState({ selectedWalker })
      }
    }

    // date inital state
    this.setState({ selectedDate: moment(modal.data.walk.requested_time) })

    // addons initial state
    const selectedAddons = _.map(modal.data.walk.addons, a => {
      const selectAddonsRaw = customersController.selectCustomerAddonsForSelectInput(modal.data.walk.customer.id, a.active_addon_id)
      if (a.active_addon_id !== 'None' && selectAddonsRaw) {
        return selectAddonsRaw
      }
      return null
    })
    _.remove(selectedAddons, a => a == null)
    this.setState({ selectedAddons })

    // hours initial state
    let selectedHour = parseInt(moment(modal.data.walk.requested_time).format('h'))
    this.setState({ selectedHour })

    // minute initial state
    let selectedMinute = parseInt(moment(modal.data.walk.requested_time).format('m'))
    this.setState({ selectedMinute })

    // am/pm initial state
    let selectedAmPm = moment(modal.data.walk.requested_time).format('a')
    this.setState({ selectedAmPm })

    // days initial
    let _selectedDays = []
    if (modal.data.walk.sunday && modal.data.walk.sunday !== '') {
      _selectedDays.push({ label: 'Sunday', value: 'sunday' })
    }
    if (modal.data.walk.monday && modal.data.walk.monday !== '') {
      _selectedDays.push({ label: 'Monday', value: 'monday' })
    }
    if (modal.data.walk.tuesday && modal.data.walk.tuesday !== '') {
      _selectedDays.push({ label: 'Tuesday', value: 'tuesday' })
    }
    if (modal.data.walk.wednesday && modal.data.walk.wednesday !== '') {
      _selectedDays.push({ label: 'Wednesday', value: 'wednesday' })
    }
    if (modal.data.walk.thursday && modal.data.walk.thursday !== '') {
      _selectedDays.push({ label: 'Thursday', value: 'thursday' })
    }
    if (modal.data.walk.friday && modal.data.walk.friday !== '') {
      _selectedDays.push({ label: 'Friday', value: 'friday' })
    }
    if (modal.data.walk.saturday && modal.data.walk.saturday !== '') {
      _selectedDays.push({ label: 'Saturday', value: 'saturday' })
    }
    this.setState({ selectedDays: _selectedDays })

    // End date
    this.setState({ selectedEndDate: dateTimeUtil.format(modal.data.walk.end_date) })

    // notes initials
    if (modal.data.walk.licensee_comments && modal.data.walk.licensee_comments !== '') {
      this.setState({ selectedNotes: modal.data.walk.licensee_comments })
    }

    // customerComments initials
    if (modal.data.walk.customer_comments && modal.data.walk.customer_comments !== '') {
      this.setState({ selectedCustomerComments: modal.data.walk.customer_comments })
    }
    // discount initials
    if (modal.data.walk.discount_amount && modal.data.walk.discount_amount !== '') {
      this.setState({ selectedDiscount: modal.data.walk.discount_amount })
    }
    // discountType initials
    if (modal.data.walk.discount_type && modal.data.walk.discount_type !== '') {
      this.setState({ selectedDiscountType: modal.data.walk.discount_type })
    }
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  initializeRevisionEdit = () => {
    let {
      modal,
      pets,
      walkers,
      walks,
      addons
    } = this.props

    pets.pets = pets.pets || []
    let walk = modal.data.walk
    walk.pets = walk.pets || []

    // Customer initial state (not sure if this will be able to be modified)
    this.setState({
      selectedCustomer: {
        value: walk.customer.id,
        label: walk.customer.name
      }
    })
    let _pendingChanges = walksController.revision(walk).pendingChanges
    // Pets initial state
    if (_pendingChanges.dogs) {
      let petIdArray = _pendingChanges.dogs.split(',').map(p => Number(p))
      let selectedPets = this.formatPetsForDropdown(pets.pets.filter(p => _.includes(petIdArray, p.id)))
      this.setState({ oldPets: this.formatPetsForDropdown(walk.pets), selectedPets })
    } else {
      this.setState({ selectedPets: this.formatPetsForDropdown(walk.pets) })
    }

    // Service initial state
    if (_pendingChanges.service_type) {
      let oldServiceArray = servicesController.selectServiceArrayInWalkEditModalFormatThatMatchesDescription(walk.dropdown_description)
      let oldService = oldServiceArray && oldServiceArray.length ? oldServiceArray[0] : null
      let selectedServiceArray = servicesController.selectServiceArrayThatMatchesIdInWalkEditModalFormat(Number(_pendingChanges.service_type))
      let selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
      this.setState({ oldService, selectedService })
    } else {
      let selectedServiceArray = servicesController.selectServiceArrayInWalkEditModalFormatThatMatchesDescription(modal.data.walk.dropdown_description)
      let selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
      this.setState({ oldService: null, selectedService })
    }

    // Frequencies initial state (frequency cannot be modified on test dash)
    if (_pendingChanges.frequency) {
      let oldFrequencyRaw = _.find(walks.frequencies, f => f.id === walk.frequency)
      if (oldFrequencyRaw) {
        let oldFrequency = { value: oldFrequencyRaw.id, label: oldFrequencyRaw.name }
        this.setState({ oldFrequency })
      }
    } else {
      let selectedFrequencyRaw = _.find(walks.frequencies, f => f.id === modal.data.walk.frequency)
      if (selectedFrequencyRaw) {
        let selectedFrequency = { value: selectedFrequencyRaw.id, label: selectedFrequencyRaw.name }
        this.setState({ selectedFrequency })
      }
    }

    // Walker initial state (walker cannot be modified on test dash)
    if (_pendingChanges.walker) {
      let oldWalkerRaw = _.find(walkers.walkers, w => Number(w.user_id) === Number(walk.walker_id) && w.active)
      if (oldWalkerRaw) {
        let oldWalker = { value: walk.walker_id, label: (oldWalkerRaw.first_name + ' ' + oldWalkerRaw.last_name) }
        this.setState({ oldWalker })
      }
    } else {
      let selectedWalkerRaw = _.find(walkers.walkers, w => Number(w.user_id) === Number(modal.data.walk.walker_id) && w.active)
      if (selectedWalkerRaw) {
        let selectedWalker = { value: modal.data.walk.walker_id, label: (selectedWalkerRaw.first_name + ' ' + selectedWalkerRaw.last_name) }
        this.setState({ selectedWalker })
      }
    }

    // Days initial state (not receiving days in original walk object)
    // ###### THIS PROBABLY NEEDS TO BE FIXED TO WORK WITH NEW DAYS FORMAT
    if (_pendingChanges.days) {
      let day = moment(walk.requested_time).format('dddd')
      let selectedDays = _pendingChanges.days.split(',').map(d => ({ label: d, value: d.toLowerCase() }))
      this.setState({ oldDays: [{ label: day, value: day.toLowerCase() }], selectedDays })
    } else {
      let day = moment(modal.data.walk.requested_time).format('dddd')
      this.setState({ selectedDays: [{ label: day, value: day.toLowerCase() }] })
    }

    // Date inital state
    if (_pendingChanges.date) {
      this.setState({ oldDate: moment(walk.requested_time), selectedDate: moment(_pendingChanges.date) })
    } else {
      this.setState({ selectedDate: moment(walk.requested_time) })
    }

    // // addons initial state
    const selectedAddons = _.map(modal.data.walk.addons, a => {
      const selectAddonsRaw = customersController.selectCustomerAddonsForSelectInput(modal.data.walk.customer.id, a.active_addon_id)
      if (a.active_addon_id !== 'None' && selectAddonsRaw) {
        return selectAddonsRaw
      }
      return null
    })
    _.remove(selectedAddons, a => a == null)

    // addons initial state
    if (_pendingChanges.addons) {
      const newSelectedAddons = _.map(_pendingChanges.addons.split(','), a => {
        const selectAddonsRaw = _.find(addons.addons, addon => Number(addon.id) === Number(a))

        if (a !== 'None' && selectAddonsRaw) {
          return { value: selectAddonsRaw.active_addon_id, id: selectAddonsRaw.id, label: selectAddonsRaw.name || selectAddonsRaw.addon_name, addon_price: selectAddonsRaw.addon_price }
        }
        return null
      })
      _.remove(newSelectedAddons, a => a == null)
      this.setState({ selectedAddons: newSelectedAddons })
    } else {
      this.setState({ selectedAddons })
    }

    // hours initial state
    if (_pendingChanges.time) {
      let selectedHour = moment(_pendingChanges.time).format('h')
      let oldHour = moment(walk.requested_time).format('h')
      this.setState({ oldHour, selectedHour })
    } else {
      let selectedHour = moment(walk.requested_time).format('h')
      this.setState({ selectedHour })
    }

    // minute initial state
    if (_pendingChanges.time) {
      let selectedMinute = moment(_pendingChanges.time).format('m')
      let oldMinute = moment(walk.requested_time).format('m')
      this.setState({ oldMinute, selectedMinute })
    } else {
      let selectedMinute = moment(walk.requested_time).format('m')
      this.setState({ selectedMinute })
    }

    // am/pm initial state
    if (_pendingChanges.time) {
      let selectedAmPm = moment(_pendingChanges.time).format('a')
      let oldAmPm = moment(walk.requested_time).format('a')
      this.setState({ oldAmPm, selectedAmPm })
    } else {
      let selectedAmPm = moment(walk.requested_time).format('a')
      this.setState({ selectedAmPm })
    }

    // customerComments initials
    if (modal.data.walk.customer_comments && modal.data.walk.customer_comments !== '') {
      this.setState({ selectedCustomerComments: modal.data.walk.customer_comments })
    }
  }
  /**
   * Formats pets array for react-select dropdown
   * @param  {Array} pets Pets array
   * @return {Array}      Formated array to be used in react-select
   */
  formatPetsForDropdown = pets => pets.map(p => ({ value: p.id, label: p.name }))
  /**
   * Checks if curent modal is an Edit Walk Modal (as opposed
   * to a New Walk modal)
   * @return {Bool} True if edit modal, false otherwise
   */
  isEditModal = () => this.props.modal.identifier === appController.constants.EDIT_WALK_MODAL_IDENTIFIER
  /**
   * Close modal
   * @return {Void}
   */
  closeModal () { appController.closeModal() }

  /**
   * Confirm sweet alert popup
   * @param  {[type]} includeAll [description]
   * @return {Void}
   */
  confirmPopUp = (includeAll, alertAction) => {
    let { modal, targetStartDay, targetEndDay } = this.props
    if (alertAction === 'cancel') {
      this.closeModal()
      walksController.actions.cancelWalk(modal.data.walk.walk_id, includeAll, (err) => {
        if (!err || err === null) {
          walksController.actions.fetchWalks(targetStartDay, targetEndDay, false)
        }
      })
    } else if (alertAction === 'save') {
      this.updateWalk(includeAll)
    } else if (alertAction === 'decline') {
      this.updateWalk(includeAll, true)
    }
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  submissionFailed = () => {
    let {
      formSubmitted,
      selectedAmPm,
      selectedCustomer,
      selectedDate,
      selectedDays,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedWalker
    } = this.state

    if (
      (!selectedCustomer && formSubmitted) ||
      (!selectedDate && formSubmitted) ||
      (!selectedFrequency && formSubmitted) ||
      (selectedFrequency && selectedFrequency.value !== 'once' && !selectedDays.length && formSubmitted) ||
      ((!selectedHour || (!selectedMinute && selectedMinute !== 0) || !selectedAmPm) && formSubmitted) ||
      (!selectedPets.length && formSubmitted) ||
      (!selectedService && formSubmitted) ||
      (!selectedWalker && formSubmitted)
    ) {
      return true
    }
    return false
  }

  /**
   * Checks if form submission is invalid for the provided field
   * @param  {String} field Form field identifier
   * @return {Bool}         True if failed for provided form field
   */
  submissionFailedFor = field => {
    let {
      formSubmitted,
      selectedAmPm,
      selectedCustomer,
      selectedDate,
      selectedEndDate,
      selectedDays,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedWalker
    } = this.state

    switch (field.toLowerCase()) {
      case 'customer':
        return !selectedCustomer && formSubmitted
      case 'date':
        return (!selectedDate || moment(new Date()).isAfter(selectedDate, 'day')) && formSubmitted
      case 'end_date':
        return selectedEndDate && selectedFrequency && selectedFrequency.value !== 'once' && selectedEndDate < selectedDate && formSubmitted
      case 'frequency':
        return !selectedFrequency && formSubmitted
      case 'days':
        return selectedFrequency && selectedFrequency.value !== 'once' && !selectedDays.length && formSubmitted
      case 'ampm':
      case 'hour':
      case 'minute':
        return (!selectedHour || (!selectedMinute && selectedMinute !== 0) || !selectedAmPm) && formSubmitted
      case 'pets':
        return !selectedPets.length && formSubmitted
      case 'service':
        return !selectedService && formSubmitted
      case 'walker':
        return !selectedWalker && formSubmitted
    }
    return false
  }
  /**
   * decline change_request or walk request
   * @return {Void}
   */
  declineWalk = () => {
    walksController.actions.updateWalk({ decline: true }, (err) => {
      if (!err) {
        walksController.actions.fetchWalks(this.props.targetStartDay, this.props.targetEndDay, false)
      }
    })
  }
  /**
   * Create a new walk setup and action
   * @return {Void}
   */
  createWalk = () => {
    const {
      selectedAddons,
      selectedAmPm,
      selectedCustomer,
      selectedDate,
      selectedEndDate,
      selectedDays,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedWalker,
      selectedNotes,
      selectedCustomerComments,
      selectedDiscount,
      selectedDiscountType
    } = this.state

    const newWalk = {
      ampm: selectedAmPm ? selectedAmPm.toLowerCase() : null,
      addons: selectedAddons ? selectedAddons.map(p => p.id).join(',') : null,
      billing_price_group_id: selectedService && selectedService.value ? selectedService.value : null,
      customer_id: selectedCustomer ? selectedCustomer.value : null,
      days: selectedDays && selectedDays.length ? selectedDays.map(d => d.value).join(',') : null,
      frequency: selectedFrequency && selectedFrequency.value ? selectedFrequency.value : null,
      pets: selectedPets ? selectedPets.map(p => p.value).join(',') : null,
      requestedTime: selectedDate,
      end_date: selectedEndDate ? dateTimeUtil.toRequestedDateFormat(selectedEndDate) : null,
      time_hour: selectedHour,
      time_minute: selectedMinute,
      walker_id: selectedWalker ? selectedWalker.value : null,
      notes: selectedNotes,
      customer_comments: selectedCustomerComments,
      discount_type: selectedDiscountType,
      discount_amount: selectedDiscount
    }
    if (!this.submissionFailed()) {
      this.setState({ serviceSaving: true })
      walksController.actions.createWalk({ newWalk }, () => { this.closeModal() })
    }
  }
  /**
   * Action and setup for update a walk
   * @return {Void}
   */
  updateWalk = (applyToAll, decline = false) => {
    const { modal } = this.props

    const {
      selectedAmPm,
      selectedDate,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedAddons,
      selectedService,
      selectedWalker,
      selectedDays,
      selectedEndDate,
      selectedNotes,
      selectedPets,
      selectedCustomerComments,
      selectedDiscount,
      selectedDiscountType
    } = this.state

    const updatedWalk = {
      ...modal.data.walk,
      addons: selectedAddons ? selectedAddons.map(p => p.id).join(',') : null,
      ampm: selectedAmPm,
      apply_to_all: applyToAll ? 1 : 0,
      billing_price_group_id: selectedService.value,
      customer_comments: selectedCustomerComments,
      days: selectedDays && selectedDays.length ? selectedDays.map(d => d.value).join(',') : null,
      pets: selectedPets ? selectedPets.map(p => p.value).join(',') : null,
      end_date: selectedEndDate ? dateTimeUtil.toRequestedDateFormat(selectedEndDate) : null,
      frequency: (selectedFrequency && selectedFrequency.value) ? selectedFrequency.value : modal.data.walk.frequency,
      notes: selectedNotes,
      requestedTime: selectedDate,
      time_hour: selectedHour,
      time_minute: selectedMinute,
      walker_id: selectedWalker ? selectedWalker.value : '',
      walker_name: selectedWalker ? selectedWalker.label : '',
      discount_type: selectedDiscountType,
      discount_amount: selectedDiscount
    }

    if (decline) {
      updatedWalk.update_action = 'decline'
    }

    if (!this.submissionFailed() || decline) {
      this.setState({ serviceSaving: true })
      walksController.actions.updateWalk({ updatedWalk }, err => {
        if (!err) {
          walksController.actions.fetchWalks(this.props.targetStartDay, this.props.targetEndDay, false)
        }
      })
      this.closeModal()
    }
  }
  /**
   * Checks that required fields are filled out
   * @return {Void}
   */
  checkRequiredFields = () => {
    let {
      selectedAmPm,
      selectedCustomer,
      selectedDate,
      selectedDays,
      selectedEndDate,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedWalker
    } = this.state

    if (!selectedCustomer) return false
    if (!selectedDate || moment(new Date()).isAfter(selectedDate, 'day')) return false
    if (selectedEndDate && selectedFrequency && selectedFrequency.value !== 'once' && selectedEndDate < selectedDate) return false
    if (!selectedFrequency) return false
    if (selectedFrequency && selectedFrequency.value !== 'once' && !selectedDays.length) return false
    if (!selectedHour || (!selectedMinute && selectedMinute !== 0) || !selectedAmPm) return false
    if (!selectedPets.length) return false
    if (!selectedService) return false
    if (!selectedWalker) return false
    //  if (selectedFrequency !== 'once' && !selectedEndDate) return false
    return true
  }
  /**
   * Checks if the form is valid for submission
   * @return {Void}
   */
  formValidForSubmission = () => this.checkRequiredFields()
  /**
   * Submits form to edit, create or cancel a walk
   * @param  {String} submitFor Indicates what submit action to execute
   * @return {Void}
   */
  submitForm = submitFor => {
    this.setState({ formSubmitted: true }, () => {
      switch (submitFor.toLowerCase()) {
        case 'save':
          if (this.formValidForSubmission()) this.openPopUp('save')
          break
        case 'cancel':
          this.openPopUp('cancel')
          break
        case 'decline':
          this.openPopUp('decline')
          break
        case 'create':
          if (this.formValidForSubmission()) this.createWalk()
          break
      }
    })
  }
  /**
   * Opens sweet alert dialog
   * @param  {[type]} action [description]
   * @return {[type]}        [description]
   */
  openPopUp = action => {
    const { canCloseModal, modal: { data: { walk } } } = this.props
    const walkStatus = walksController.getStatus(walk)
    const isPaidCancelRequest = (walkStatus === 'cancel_requested' || action === 'cancel') && (walk.billing_status === 'paid' || walk.paid_ts !== '0000-00-00 00:00:00')
    const isInvoicedCancelRequest = (walkStatus === 'cancel_requested' || action === 'cancel') && (walk.billing_status === 'none' && walk.paid_ts === '0000-00-00 00:00:00' && walk.invoiced_ts !== '0000-00-00 00:00:00')

    let _alertData = {
      confirmButtonText: 'Only this one',
      cancelButtonText: 'All appointments',
      onCancel: () => { appController.closeAlert(); this.confirmPopUp(true, action) },
      onConfirm: () => { appController.closeAlert(); this.confirmPopUp(false, action) },
      onKeyDown: () => appController.closeAlert(),
      show: true,
      showCancelButton: true,
      text: `${action === 'cancel' ? 'Cancel' : 'Update'} all future appointments in this series from this date or just this one?
        ${isPaidCancelRequest ? 'Please note - this service has been paid for by the customer so you may want to issue them a credit.'
        : (isInvoicedCancelRequest ? 'Please note - this service has already been invoiced so you may want to send them an updated invoice.' : '')}`,
      type: 'warning'
    }

    if ((this.state.selectedFrequency && (this.state.selectedFrequency.value === 'once' || this.state.selectedFrequency === 'once')) || action === 'decline' || walkStatus === 'change_requested' || walkStatus === 'cancel_requested' || walkStatus === 'pending') {
      const pendingRevision = _.find(walk.revision_history, r => r.revision_status === 'pending')
      const isRecurrence = (pendingRevision && pendingRevision.recurrence_id) || (walk.revision_history && walk.revision_history.length === 1 && walk.recurrence_id)

      _alertData = {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onConfirm: () => { appController.closeAlert(); this.confirmPopUp(isRecurrence, action) },
        onCancel: () => { appController.closeAlert() },
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: `You are about to ${action === 'save' ? (walkStatus === 'cancel_requested' ? 'cancel' : 'update') : action} this ${action === 'decline' ? 'request' : 'service'}.  Proceed?
          ${isPaidCancelRequest ? 'Please note - this service has been paid for by the customer so you may want to issue them a credit.'
          : (isInvoicedCancelRequest ? 'Please note - this service has already been invoiced so you may want to send them an updated invoice.' : '')}`,
        type: 'warning'
      }
    }

    canCloseModal(false)
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: _alertData
    })
  }
  render () {
    let {
      modal,
      userType,
      customers
    } = this.props

    let walk = null
    if (this.isEditModal()) {
      walk = modal.data.walk
      var customer = _.find(customers.customers, c => Number(c.customer_id) === Number(walk.customer.id))
      var customerAddress = customer ? `${customer.address ? customer.address : ''}${customer.address2 ? (' ' + customer.address2) : ''}${customer.city ? (' ' + customer.city) : ''}${customer.zip ? (' ' + customer.zip) : ''}` : ''
      var customerName = walk.customer.name || 'Unidentified customer'
    }

    let title = !this.isEditModal() ? 'Create an Appointment' : customerName + ', ' + (walk.requested_time ? moment(walk.requested_time).format('MM/DD/YYYY @h:mm A') : 'No time scheduled')
    if (customerAddress && customerAddress !== '') {
      title = title + ',' + customerAddress
    }
    let isCompleted = false
    if (walk && walk.status === 'completed') {
      isCompleted = true
    }
    return <div className='WalkModal'>
      <div className='left'>
        <Title isEditModal={this.isEditModal} title={title} walk={walk} />
        <LeftContent
          isEditModal={this.isEditModal}
          isCompleted={isCompleted}
          modalState={this.state}
          submissionFailedFor={this.submissionFailedFor}
          updateModalState={this.updateModalState}
          walk={walk}
        />
      </div>
      <div className='right'>
        <RightContent
          userType={userType}
          isEditModal={this.isEditModal}
          isCompleted={isCompleted}
          modalState={this.state}
          submissionFailedFor={this.submissionFailedFor}
          updateModalState={this.updateModalState}
          submitForm={this.submitForm}
          walk={walk}
        />
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  let targetStartDay = state.walks.start_time || new Date()
  let targetEndDay = state.walks.end_time || new Date()
  let userType = sessionController.selectUserType(state)
  return {
    targetStartDay,
    targetEndDay,
    customers: state.customers,
    modal: state.app.modal,
    walkers: state.walkers,
    addons: state.addons,
    walks: state.walks,
    pets: state.pets,
    userType
  }
}

export default withRouter(connect(mapStateToProps)(WalkModal))
