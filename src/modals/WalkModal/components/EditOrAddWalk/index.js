// Libraries
import React from 'react'
import moment from 'moment-timezone'
import _ from 'lodash'
import SweetAlert from 'sweetalert-react'
import { connect } from 'react-redux'

// Controllers
import {
  appController,
  customersController,
  servicesController,
  walksController,
  petsController
} from 'Controllers'

// actions
import fetchAddons from 'Actions/addons/fetchAddons'

// Components
import AddonsSection from '../AddonsSection'
import CostSummary from '../CostSummary'
import ModalContainer from '../ModalContainer'
import ModalSaveCancel from '../ModalSaveCancel'
import ServiceDetail from '../ServiceDetail'
import Title from '../Title'

// Utils
import { dateTimeUtil } from 'Utils'

// Styles
import './index.css'

class EditOrAddWalk extends React.Component {
  constructor () {
    super()
    this.errorColor = '#cc9f9f'
    this.state = {
      alertAction: null,
      alertOpened: false,
      formReadyForSubmit: false,
      formSubmitted: false,
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
      selectedNotes: ''
    }
  }
  componentDidMount () {
    let { app } = this.props

    if (this.isEditModal()) {
      if (walksController.revision(app.modal.data.walk).hasRevision) {
        this.initializeRevisionEdit()
      } else {
        this.initializeEdit()
      }
    } else {
      this.initializeAdd()
    }
  }
  componentWillMount () {
    if (!this.props.customers.customers || this.props.customers.customers.length === 0) {
      customersController.actions.fetchCustomers()
    }
    if (!this.props.pets.pets || this.props.pets.pets.length === 0) {
      petsController.actions.fetchPets()
    }
    if (!this.props.services.services || this.props.services.services.length === 0) {
      servicesController.fetchServices()
    }
    if (!this.props.addons.addons || this.props.addons.addons.length === 0) {
      this.props.fetchAddons()
    }
  }
  /**
   * Cuts and adds ellipsis to string greater than 37
   * @param {String} text Text to be shrunken
   */
  addEllipsis (text = '') {
    if (text.length > 37) {
      return `${text.substr(0, 37)}...`
    }
    return text
  }
  /**
   * Close modal
   * @return {Void}
   */
  closeModal () { appController.closeModal() }
  /**
   * Close sweet alert popup
   * @return {Void}
   */
  closePopUp = () => {
    let { canCloseModal } = this.props

    this.setState({ alertOpened: false }, () => {
      document.removeEventListener('keydown', this.handleESC)
      let x = document.querySelector('#alert-custom-close span')
      x.removeEventListener('click', this.closePopUp)
      canCloseModal(true)
    })
  }
  /**
   * Confirm sweet alert popup
   * @param  {[type]} includeAll [description]
   * @return {Void}
   */
  confirmPopUp = includeAll => {
    let { app } = this.props
    let { alertAction } = this.state

    this.closePopUp()
    if (alertAction === 'cancel') {
      walksController.actions.cancelWalk(app.modal.data.walk.walk_id, includeAll)
    } else if (alertAction === 'save') {
      this.updateWalk(includeAll)
    }
    this.closeModal()
  }
  /**
   * Create a new walk setup and action
   * @return {Void}
   */
  createWalk = () => {
    // let { app } = this.props

    let {
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
      selectedNotes
    } = this.state

    // let originalDate = dateTimeUtil.toWalkKeyFormat(app.modal.data.walk.requested_time)
    let newWalk = {
      ampm: selectedAmPm ? selectedAmPm.toLowerCase() : null,
      addons: selectedAddons && selectedAddons.length ? selectedAddons.join(',') : null,
      billing_price_group_id: selectedService && selectedService.value ? selectedService.value : null,
      customer_id: selectedCustomer ? selectedCustomer.value : null,
      days: selectedDays && selectedDays.length ? selectedDays.map(d => d.value).join(',') : null,
      frequency: selectedFrequency && selectedFrequency.value ? selectedFrequency.value : null,
      pets: selectedPets ? selectedPets.map(p => p.value).join(',') : null,
      requested_date: selectedDate ? dateTimeUtil.toRequestedDateFormat(selectedDate) : null,
      end_date: selectedEndDate ? dateTimeUtil.toRequestedDateFormat(selectedEndDate) : null,
      time_hour: selectedHour,
      time_minute: selectedMinute,
      walker_id: selectedWalker ? selectedWalker.value : null,
      notes: selectedNotes
    }
    if (!this.submissionFailed()) {
      walksController.actions.createWalk({ newWalk })
      this.closeModal()
    }
  }
  /**
   * Action and setup for update a walk
   * @return {Void}
   */
  updateWalk = applyToAll => {
    let { app } = this.props

    let {
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
      selectedNotes
    } = this.state

    let hour = Number(selectedHour)
    if (selectedAmPm === 'pm') hour += 12
    let requestedTime = moment(selectedDate).set({ hour: hour, minute: selectedMinute }).format('YYYY-MM-DD HH:mm:ss')

    const updatedWalk = {
      ...app.modal.data.walk,
      billing_price_group_id: selectedService.value,
      frequency: (selectedFrequency && selectedFrequency.value) ? selectedFrequency.value : app.modal.data.walk.frequency,
      walker_id: selectedWalker.value,
      walker_name: selectedWalker.label,
      requestedTime,
      end_date: selectedEndDate ? dateTimeUtil.toRequestedDateFormat(selectedEndDate) : null,
      addons: selectedAddons && selectedAddons.length ? selectedAddons.join() : null,
      days: selectedDays && selectedDays.length ? selectedDays.map(d => d.value).join(',') : null,
      apply_to_all: applyToAll ? 1 : 0,
      notes: selectedNotes
    }

    if (!this.submissionFailed()) {
      walksController.actions.updateWalk({ updatedWalk }, (err) => {
        if (!err || err === null) {
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
      // selectedEndDate,
      selectedFrequency,
      selectedHour,
      selectedMinute,
      selectedPets,
      selectedService,
      selectedWalker
    } = this.state

    if (!selectedCustomer) return false
    if (!selectedDate) return false
    if (!selectedFrequency) return false
    if (selectedFrequency && selectedFrequency.value !== 'once' && !selectedDays.length) return false
    if (!selectedHour || !selectedMinute || !selectedAmPm) return false
    if (!selectedPets.length) return false
    if (!selectedService) return false
    if (!selectedWalker) return false
    //  if (selectedFrequency !== 'once' && !selectedEndDate) return false
    return true
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  dropdownFilterAlertStyle = () => ({ borderColor: this.errorColor })
  /**
   * [description]
   * @return {[type]} [description]
   */
  dropdownIconAlertStyle = () => ({ borderColor: this.errorColor, background: this.errorColor, color: '#FFF' })
  /**
   * Checks if the form is valid for submission
   * @return {Void}
   */
  formValidForSubmission = () => this.checkRequiredFields()
  /**
   * Returns cost of all addons plus all services selected
   * @return {Number} Total costs.
   */
  getTotalCosts = () => Number(this.getTotalAddonsCost(this.state.selectedAddons) + this.getTotalServicesCost(this.state.selectedService))
  /**
   * Returns total cost of all addons selected
   * @param  {Array} selectedAddons Selected Addons
   * @return {Number}               Total addons cost
   */
  getTotalAddonsCost = selectedAddons => {
    let { addons } = this.props
    let walkAddons = _.filter(addons.addons, a => _.includes(selectedAddons, a.id))
    let totalCost = 0
    walkAddons.forEach(a => {
      if (a && a.addon_price) totalCost += Number(a.addon_price)
    })
    return totalCost || 0
  }
  /**
   * Returns cost service selected (can only select one)
   * @param  {Object} selectedService Selected service
   * @return {Number}                 Service cost
   */
  getTotalServicesCost = selectedService => selectedService && selectedService.cost ? selectedService.cost : 0
  /**
   * Handles ESC keyboard keey behavior depending on which of the following
   * is opened -> modal or sweet alert.
   * @param  {Object} e Esc event
   * @return {Void}
   */
  handleESC = e => {
    let { canCloseModal } = this.props
    if (e.keyCode === 27) {
      canCloseModal(true)
      document.removeEventListener('keydown', this.handleESC)
      this.setState({ alertOpened: false })
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
      app,
      walkers,
      walks
    } = this.props

    // customer initial state
    this.setState({
      selectedCustomer: {
        value: app.modal.data.walk.customer.id,
        label: app.modal.data.walk.customer.name
      }
    })

    let pets = app.modal.data.walk.pets || []

    // pets initial state
    this.setState({ selectedPets: this.formatPetsForDropdown(pets) })

    // service initial state
    let selectedServiceArray = servicesController.selectServiceArrayInWalkEditModalFormatThatMatchesDescription(app.modal.data.walk.dropdown_description)
    let selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
    this.setState({ selectedService })

    // frequencies initial state
    let selectedFrequencyRaw = _.find(walks.frequencies, f => f.id === app.modal.data.walk.frequency)
    if (selectedFrequencyRaw) {
      let selectedFrequency = { value: selectedFrequencyRaw.id, label: selectedFrequencyRaw.name }
      this.setState({ selectedFrequency })
    }

    // walker initial state
    let selectedWalkerRaw = _.find(walkers.walkers, w => Number(w.id) === Number(app.modal.data.walk.walker_id))
    if (selectedWalkerRaw) {
      let selectedWalker = { value: app.modal.data.walk.walker_id, label: (selectedWalkerRaw.first_name + ' ' + selectedWalkerRaw.last_name) }
      this.setState({ selectedWalker })
    } else {
      // default customer walker
      let _selectedWalkerRaw = _.find(walkers.walkers, w => Number(w.user_id) === Number(app.modal.data.walk.customer.walker_id))
      if (_selectedWalkerRaw) {
        let selectedWalker = { value: app.modal.data.walk.customer.walker_id, label: (_selectedWalkerRaw.first_name + ' ' + _selectedWalkerRaw.last_name) }
        this.setState({ selectedWalker })
      }
    }

    // days initial state
    // let day = moment(app.modal.data.walk.requested_time).format('dddd')
    // this.setState({ selectedDays: [{ label: day, value: day.toLowerCase() }] })

    // date inital state
    this.setState({ selectedDate: moment(app.modal.data.walk.requested_time) })

    // addons initial state
    let selectedAddons = _.map(app.modal.data.walk.addons, a => {
      if (a.active_addon_id !== 'None') {
        return Number(a.active_addon_id)
      }
      return null
    })
    _.remove(selectedAddons, a => a == null)
    this.setState({ selectedAddons })

    // hours initial state
    let selectedHour = moment(app.modal.data.walk.requested_time).format('h')
    this.setState({ selectedHour })

    // minute initial state
    let selectedMinute = moment(app.modal.data.walk.requested_time).format('mm')
    this.setState({ selectedMinute })

    // am/pm initial state
    let selectedAmPm = moment(app.modal.data.walk.requested_time).format('a')
    this.setState({ selectedAmPm })

    // days initial
    let _selectedDays = []
    if (app.modal.data.walk.sunday && app.modal.data.walk.sunday !== '') {
      _selectedDays.push({ label: 'Sunday', value: 'sunday' })
    }
    if (app.modal.data.walk.monday && app.modal.data.walk.monday !== '') {
      _selectedDays.push({ label: 'Monday', value: 'monday' })
    }
    if (app.modal.data.walk.tuesday && app.modal.data.walk.tuesday !== '') {
      _selectedDays.push({ label: 'Tuesday', value: 'tuesday' })
    }
    if (app.modal.data.walk.wednesday && app.modal.data.walk.wednesday !== '') {
      _selectedDays.push({ label: 'Wednesday', value: 'wednesday' })
    }
    if (app.modal.data.walk.thursday && app.modal.data.walk.thursday !== '') {
      _selectedDays.push({ label: 'Thursday', value: 'thursday' })
    }
    if (app.modal.data.walk.friday && app.modal.data.walk.friday !== '') {
      _selectedDays.push({ label: 'Friday', value: 'friday' })
    }
    if (app.modal.data.walk.saturday && app.modal.data.walk.saturday !== '') {
      _selectedDays.push({ label: 'Saturday', value: 'saturday' })
    }
    this.setState({ selectedDays: _selectedDays })

    // End date
    this.setState({ selectedEndDate: dateTimeUtil.format(app.modal.data.walk.end) })

    // notes initials
    if (app.modal.data.walk.notes && app.modal.data.walk.notes !== '') {
      this.setState({ selectedNotes: app.modal.data.walk.notes })
    }
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  initializeRevisionEdit = () => {
    let {
      app,
      pets,
      walkers,
      walks
    } = this.props

    pets.pets = pets.pets || []
    let walk = app.modal.data.walk
    walk.pets = walk.pets || []

    // Customer initial state (not sure if this will be able to be modified)
    this.setState({
      oldCustomer: {
        value: walk.customer.id,
        label: walk.customer.name
      }
    })

    // Pets initial state
    if (walksController.revision(walk).pendingChanges.dogs) {
      let petIdArray = walksController.revision(walk).pendingChanges.dogs.split(',').map(p => Number(p))
      let selectedPets = this.formatPetsForDropdown(_.filter(pets.pets, p => _.includes(petIdArray, p.id)))
      this.setState({ oldPets: this.formatPetsForDropdown(walk.pets), selectedPets })
    } else {
      this.setState({ selectedPets: this.formatPetsForDropdown(walk.pets) })
    }

    // Service initial state
    if (walksController.revision(walk).pendingChanges.service_type) {
      let oldServiceArray = servicesController.selectServiceArrayInWalkEditModalFormatThatMatchesDescription(walk.dropdown_description)
      let oldService = oldServiceArray && oldServiceArray.length ? oldServiceArray[0] : null
      let selectedServiceArray = servicesController.selectFormatServicesArrayForWalkEditModal(Number(walksController.revision(walk).pendingChanges.service_type))
      let selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
      this.setState({ oldService, selectedService })
    } else {
      let selectedServiceArray = servicesController.selectServiceArrayInWalkEditModalFormatThatMatchesDescription(app.modal.data.walk.dropdown_description)
      let selectedService = selectedServiceArray && selectedServiceArray.length ? selectedServiceArray[0] : null
      this.setState({ oldService: null, selectedService })
    }

    // Frequencies initial state (frequency cannot be modified on test dash)
    if (walksController.revision(walk).pendingChanges.frequency) {
      let oldFrequencyRaw = _.find(walks.frequencies, f => f.id === walk.frequency)
      if (oldFrequencyRaw) {
        let oldFrequency = { value: oldFrequencyRaw.id, label: oldFrequencyRaw.name }
        this.setState({ oldFrequency })
      }
    } else {
      let selectedFrequencyRaw = _.find(walks.frequencies, f => f.id === app.modal.data.walk.frequency)
      if (selectedFrequencyRaw) {
        let selectedFrequency = { value: selectedFrequencyRaw.id, label: selectedFrequencyRaw.name }
        this.setState({ selectedFrequency })
      }
    }

    // Walker initial state (walker cannot be modified on test dash)
    if (walksController.revision(walk).pendingChanges.walker) {
      let oldWalkerRaw = _.find(walkers.walkers, w => Number(w.user_id) === Number(walk.walker_id))
      if (oldWalkerRaw) {
        let oldWalker = { value: walk.walker_id, label: (oldWalkerRaw.first_name + ' ' + oldWalkerRaw.last_name) }
        this.setState({ oldWalker })
      }
    } else {
      let selectedWalkerRaw = _.find(walkers.walkers, w => Number(w.user_id) === Number(app.modal.data.walk.walker_id))
      if (selectedWalkerRaw) {
        let selectedWalker = { value: app.modal.data.walk.walker_id, label: (selectedWalkerRaw.first_name + ' ' + selectedWalkerRaw.last_name) }
        this.setState({ selectedWalker })
      }
    }

    // Days initial state (not receiving days in original walk object)
    if (walksController.revision(walk).pendingChanges.days) {
      let day = moment(walk.requested_time).format('dddd')
      let selectedDays = walksController.revision(walk).pendingChanges.days.split(',').map(d => ({ label: d, value: d.toLowerCase() }))
      this.setState({ oldDays: [{ label: day, value: day.toLowerCase() }], selectedDays })
    } else {
      let day = moment(app.modal.data.walk.requested_time).format('dddd')
      this.setState({ selectedDays: [{ label: day, value: day.toLowerCase() }] })
    }

    // Date inital state
    if (walksController.revision(walk).pendingChanges.date) {
      this.setState({ oldDate: moment(walk.requested_time), selectedDate: moment(walksController.revision(walk).pendingChanges.date) })
    } else {
      this.setState({ selectedDate: moment(walk.requested_time) })
    }

    // addons initial state
    let oldAddons = _.map(walk.addons, a => {
      if (a.active_addon_id !== 'None') {
        return Number(a.active_addon_id)
      }
      return null
    })
    _.remove(oldAddons, a => a == null)
    this.setState({ oldAddons })

    // hours initial state
    if (walksController.revision(walk).pendingChanges.time) {
      let selectedHour = moment(walksController.revision(walk).pendingChanges.time).format('h')
      let oldHour = moment(walk.requested_time).format('h')
      this.setState({ oldHour, selectedHour })
    } else {
      let selectedHour = moment(walk.requested_time).format('h')
      this.setState({ selectedHour })
    }

    // minute initial state
    if (walksController.revision(walk).pendingChanges.time) {
      let selectedMinute = moment(walksController.revision(walk).pendingChanges.time).format('mm')
      let oldMinute = moment(walk.requested_time).format('mm')
      this.setState({ oldMinute, selectedMinute })
    } else {
      let selectedMinute = moment(walk.requested_time).format('mm')
      this.setState({ selectedMinute })
    }

    // am/pm initial state
    if (walksController.revision(walk).pendingChanges.time) {
      let selectedAmPm = moment(walksController.revision(walk).pendingChanges.time).format('a')
      let oldAmPm = moment(walk.requested_time).format('a')
      this.setState({ oldAmPm, selectedAmPm })
    } else {
      let selectedAmPm = moment(walk.requested_time).format('a')
      this.setState({ selectedAmPm })
    }
  }
  /**
   * Checks if curent modal is an Edit Walk Modal (as opposed
   * to a New Walk modal)
   * @return {Bool} True if edit modal, false otherwise
   */
  isEditModal = () => this.props.app.modal.identifier === appController.constants.EDIT_WALK_MODAL_IDENTIFIER
  /**
   * Formats frequencies array for react-select dropdown
   * @param  {Array} frequencies Recurrency frequency array
   * @return {Array}             Formated array to be used in react-select
   */
  formatFrequenciesForDropdown = frequencies => _.map(frequencies, f => ({ value: f.id, label: f.name }))
  /**
   * Formats pets array for react-select dropdown
   * @param  {Array} pets Pets array
   * @return {Array}      Formated array to be used in react-select
   */
  formatPetsForDropdown = pets => _.map(pets, p => ({ value: p.id, label: p.name }))

  /**
   * Formats walkers array for react-select dropdown
   * @param  {Array} walkers Walker array
   * @return {Array}         Formated array to be used in react-select
   */
  formatWalkersForDropdown = walkers => _.map(walkers, w => ({ value: w.user_id, label: (w.first_name + ' ' + w.last_name) }))
  /**
   * Formats weekdays array for react-select dropdown
   * @param  {Array} weekdays Weekday array
   * @return {Array}          Formated array to be used in react-select
   */
  formatWeekDaysForDropdown = weekdays => _.map(weekdays, wd => ({ value: wd.toLowerCase(), label: wd }))
  /**
   * Opens sweet alert dialog
   * @param  {[type]} action [description]
   * @return {[type]}        [description]
   */
  openPopUp = action => {
    let { canCloseModal, app } = this.props
    if (app.modal.data.walk.frequency === 'once') {
      canCloseModal(false)
      document.addEventListener('keydown', this.handleESC)
      this.setState({ alertAction: action }, () => {
        this.confirmPopUp(false)
      })
    } else {
      canCloseModal(false)
      document.addEventListener('keydown', this.handleESC)
      this.setState({ alertOpened: true, alertAction: action }, () => {
        let x = document.querySelector('#alert-custom-close span')
        x.addEventListener('click', this.closePopUp)
      })
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
      ((!selectedHour || !selectedMinute || !selectedAmPm) && formSubmitted) ||
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
        return !selectedDate && formSubmitted
      case 'frequency':
        return !selectedFrequency && formSubmitted
      case 'days':
        return selectedFrequency && selectedFrequency.value !== 'once' && !selectedDays.length && formSubmitted
      case 'ampm':
      case 'hour':
      case 'minute':
        return (!selectedHour || !selectedMinute || !selectedAmPm) && formSubmitted
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
        case 'create':
          if (this.formValidForSubmission()) this.createWalk()
          break
      }
    })
  }
  walkerSortByName (a, b) {
    if (a.first_name < b.first_name) return -1
    if (a.first_name > b.first_name) return 1
    return 0
  }
  render () {
    let {
      app,
      addons,
      customers,
      pets,
      services,
      title,
      walkers,
      walks
    } = this.props

    let {
      alertAction,
      alertOpened,
      formSubmitted,
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
      selectedNotes
    } = this.state

    pets.pets = pets.pets || []

    let walk = null
    if (this.isEditModal()) walk = app.modal.data.walk
    let walkStatus = walksController.getStatus(walk)
    let allCustomerPets = []
    let revision = {}

    if (this.isEditModal()) {
      allCustomerPets = _.filter(pets.pets, p => Number(p.customer_id) === Number(walk.customer.id))
      revision = walksController.revision(walk)
    } else if (selectedCustomer) {
      allCustomerPets = _.filter(pets.pets, p => Number(p.customer_id) === Number(selectedCustomer.value))
    }

    let disableEditing = walksController.getStatus(walk) === 'completed' && !walk.recurrence_id

    return <div id='EditOrAddWalk' className='EditOrAddWalk'>
      <SweetAlert
        cancelButtonText='Only this walk'
        confirmButtonColor='#3DA647'
        confirmButtonText='All walks'
        onCancel={() => this.confirmPopUp(false)}
        onConfirm={() => this.confirmPopUp(true)}
        onKeyDown={e => console.log(e.keyCode)}
        show={alertOpened}
        showCancelButton
        text=''
        title={`${alertAction === 'cancel' ? 'Cancel' : 'Update'} all walks in this series or just this walk?`}
        type='warning'
      />
      {revision.hasRevision ? <div className='revision-changes-message-container'>
        <span>{revision.revisionMessage}</span>
      </div> : null}
      <ModalContainer>
        <div className='service-details-container'>
          <Title
            isEditModal={this.isEditModal}
            title={title}
            walk={walk}
          />
          <div className='service-details-dropdowns'>
            {[
              /* Customer */
              {
                alert: this.submissionFailedFor('customer'),
                clearable: false,
                disabled: disableEditing,
                hasRevision: false,
                iconClassname: 'ion-android-person',
                inputWidth: '210px',
                mark: null,
                multi: false,
                oldValuesString: '',
                onChange: selectedCustomer => {
                  // Auto select walker
                  this.setState({ selectedCustomer }, () => {
                    if (this.state.selectedCustomer) {
                      if (selectedCustomer && selectedCustomer.walker_id) {
                        let customerWalker = _.find(walkers.walkers, w => Number(w.user_id) === Number(selectedCustomer.walker_id))
                        if (customerWalker) {
                          let selectedWalker = { value: customerWalker.id, label: (customerWalker.first_name + ' ' + customerWalker.last_name) }
                          this.setState({ selectedWalker, selectedPets: [] })
                        }
                      } else {
                        this.setState({ selectedWalker: null, selectedPets: [] })
                      }
                      // auto select default service
                      if (selectedCustomer && selectedCustomer.default_service) {
                        let customerService = _.find(services.services, s => Number(s.id) === Number(selectedCustomer.default_service))
                        if (customerService) {
                          let selectedService = { value: selectedCustomer.default_service, label: customerService.dropdown_description }
                          this.setState({ selectedService })
                        } else {
                          this.setState({ selectedService: null })
                        }
                      } else {
                        this.setState({ selectedService: null })
                      }
                      // Auto select pet if customer only have one pet
                      let allCustomerPets = _.filter(pets.pets, p => Number(p.customer_id) === Number(this.state.selectedCustomer.value))
                      if (allCustomerPets.length === 1) {
                        this.setState({ selectedPets: this.formatPetsForDropdown(allCustomerPets) })
                      } else {
                        this.setState({ selectedPets: [] })
                      }
                    } else {
                      this.setState({ selectedWalker: null })
                      this.setState({ selectedPets: [] })
                    }
                  })
                },
                options: customersController.selectCustomersArrayFormatForEditModal(),
                loading: customers.loading,
                placeholder: '-choose customer-',
                skip: this.isEditModal(),
                title: 'Customer',
                value: selectedCustomer
              },
              /* Pets */
              {
                alert: this.submissionFailedFor('pets'),
                clearable: false,
                disabled: disableEditing,
                hasRevision: revision.hasRevision && oldPets && oldPets.length,
                iconClassname: 'ion-ios-paw',
                inputWidth: '210px',
                mark: revision.pendingChanges && revision.pendingChanges.dogs,
                multi: true,
                oldValuesString: oldPets.map(p => p.label).join(', '),
                onChange: selectedPets => this.setState({ selectedPets }),
                options: this.formatPetsForDropdown(allCustomerPets),
                loading: this.props.pets.loading,
                placeholder: '-choose pets-',
                skip: !this.isEditModal() && !selectedCustomer,
                title: 'Pets',
                value: selectedPets
              },
              /* Walker */
              {
                alert: this.submissionFailedFor('walker'),
                clearable: false,
                hasRevision: revision.hasRevision && oldWalker,
                iconClassname: 'ion-loop',
                inputWidth: '210px',
                mark: false,
                multi: false,
                oldValuesString: oldWalker ? oldWalker.label : '',
                onChange: selectedWalker => this.setState({ selectedWalker }),
                options: this.formatWalkersForDropdown(walkers.walkers.sort(this.walkerSortByName)),
                placeholder: '-choose walker-',
                skip: false,
                title: 'Walker',
                value: selectedWalker
              },
              /* Service */
              {
                alert: this.submissionFailedFor('service'),
                clearable: false,
                disabled: disableEditing,
                hasRevision: revision.hasRevision && oldService,
                iconClassname: 'ion-checkmark',
                inputWidth: '210px',
                mark: revision.pendingChanges && revision.pendingChanges.service_type,
                multi: false,
                oldValuesString: oldService ? oldService.label : '',
                onChange: selectedService => this.setState({ selectedService }),
                options: servicesController.selectFormatServicesArrayForWalkEditModal(),
                loading: this.props.services.loading,
                placeholder: '-choose services-',
                skip: false,
                title: 'Service',
                value: selectedService
              },
              /* Frequency */
              {
                alert: this.submissionFailedFor('frequency'),
                clearable: false,
                disabled: disableEditing,
                hasRevision: revision.hasRevision && oldFrequency,
                iconClassname: 'ion-loop',
                mark: null,
                inputWidth: '210px',
                multi: false,
                oldValuesString: oldFrequency ? oldFrequency.label : '',
                onChange: selectedFrequency => this.setState({ selectedFrequency }),
                options: this.formatFrequenciesForDropdown(walks.frequencies),
                title: 'Frequency',
                placeholder: '-choose frequency-',
                skip: false,
                noEdit: this.isEditModal(),
                value: selectedFrequency
              },

              /* Days */
              {
                alert: this.submissionFailedFor('days'),
                clearable: false,
                disabled: disableEditing,
                hasRevision: revision.hasRevision && oldDays && oldDays.length,
                iconClassname: 'ion-android-calendar',
                inputWidth: '210px',
                mark: revision.pendingChanges && revision.pendingChanges.days,
                multi: true,
                closeOnSelect: false,
                oldValuesString: oldDate ? moment(oldDate).format('MM/DD/YYYY') : '',
                onChange: selectedDays => this.setState({ selectedDays }),
                options: this.formatWeekDaysForDropdown(appController.constants.WEEK_DAYS),
                placeholder: '-choose days-',
                skip: selectedFrequency && selectedFrequency.value === 'once',
                title: 'Days',
                value: selectedDays
              },

              /* Date */
              {
                alert: this.submissionFailedFor('end_date'),
                clearable: false,
                dateFormat: 'ddd, MM/D/YYYY',
                disabled: disableEditing,
                hasRevision: revision.hasRevision && oldDate,
                iconClassname: 'ion-android-calendar',
                inputWidth: '210px',
                mark: revision.pendingChanges && revision.pendingChanges.date,
                multi: false,
                oldValuesString: oldDate ? moment(oldDate).format('MM/DD/YYYY') : '',
                onChange: selectedEndDate => this.setState({ selectedEndDate }),
                options: null,
                placeholder: '-choose end date-',
                skip: !selectedFrequency || (selectedFrequency && selectedFrequency.value === 'once'),
                title: 'End Date',
                type: 'date',
                value: selectedEndDate
              },
              /* Date */
              {
                alert: this.submissionFailedFor('date'),
                clearable: false,
                dateFormat: 'ddd, MM/D/YYYY',
                disabled: disableEditing,
                hasRevision: revision.hasRevision && oldDate,
                iconClassname: 'ion-android-calendar',
                inputWidth: '210px',
                mark: revision.pendingChanges && revision.pendingChanges.date,
                multi: false,
                oldValuesString: oldDate ? moment(oldDate).format('MM/DD/YYYY') : '',
                onChange: selectedDate => this.setState({ selectedDate }),
                options: null,
                placeholder: '-choose date-',
                skip: false,
                title: 'Select Date',
                type: 'date',
                value: selectedDate
              },
              /* Time */
              {
                amPmAlert: this.submissionFailedFor('ampm'),
                amPmOnChange: selectedAmPm => this.setState({ selectedAmPm }),
                amPmValue: selectedAmPm,
                clearable: false,
                disabled: disableEditing,
                hasRevision: revision.hasRevision && (oldHour || oldMinute || oldAmPm),
                hourAlert: this.submissionFailedFor('hour'),
                hourOnChange: selectedHour => this.setState({ selectedHour }),
                hourValue: selectedHour,
                iconClassname: 'ion-clock',
                minuteAlert: this.submissionFailedFor('minute'),
                minuteOnChange: selectedMinute => this.setState({ selectedMinute }),
                minuteValue: selectedMinute,
                oldValuesString: `${oldHour || ''}:${oldMinute || ''} ${oldAmPm || ''}`,
                title: 'Start Time',
                type: 'time'
              },
              /* Notes */
              {
                onChange: e => this.setState({ selectedNotes: e.target.value }),
                skip: false,
                title: 'Notes',
                type: 'textarea',
                value: selectedNotes
              }
            ].map((detail, i) => {
              if (detail.skip) return null

              return <div className='detail-section' key={i}>
                {detail.hasRevision ? <div className='service-details revision'>
                  <div className='name'>{`Old ${detail.title}`}</div>
                  <div className='value' title={detail.oldValuesString}>
                    {this.addEllipsis(detail.oldValuesString)}
                  </div>
                </div> : null}
                <ServiceDetail detail={detail} />
              </div>
            })}
          </div>
          <div className='modal-cancel'>
            <div className='cancel-error'>
              {/* <button className='cancel' onClick={this.closeModal}>cancel</button> */}
              <div className='mandatory-field' style={{ color: this.errorColor }}>{formSubmitted && !this.formValidForSubmission() ? 'Please fill out all mandatory fields' : ''}</div>
            </div>
          </div>
        </div>
        <div className='addons-and-summary-container'>
          <div className='addons-and-summary'>
            <div className='addons-title'>Addons</div>
            <AddonsSection
              loading={addons.loading}
              addons={addons.addons}
              selectAddons={selectedAddons => this.setState({ selectedAddons })}
              selectedAddons={selectedAddons}
            />
            <div className='modal-confirm'>
              <div className='CostSummaryContainer'>
                <CostSummary
                  addons={addons}
                  getTotalAddonsCost={this.getTotalAddonsCost}
                  getTotalCosts={this.getTotalCosts}
                  getTotalServicesCost={this.getTotalServicesCost}
                  isEditModal={this.isEditModal}
                  selectedAddons={selectedAddons}
                  selectedService={selectedService}
                  walk={walk}
                />
              </div>
              <ModalSaveCancel
                walkStatus={walkStatus}
                addAction={() => this.submitForm('create')}
                cancelAction={() => this.submitForm('cancel')}
                declineAction={() => this.submitForm('decline')}
                isEditModal={this.isEditModal}
                submitAction={() => this.submitForm('save')}
              />
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  }
}

let mapStateToProps = state => {
  let targetStartDay = state.walks.start_time || new Date()
  let targetEndDay = state.walks.end_time || new Date()
  return {
    targetStartDay,
    targetEndDay,
    addons: state.addons,
    app: state.app,
    customers: state.customers,
    pets: state.pets,
    services: state.services,
    walkers: state.walkers,
    walks: state.walks
  }
}

const mapDispatchToProps = {
  fetchAddons
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrAddWalk)
