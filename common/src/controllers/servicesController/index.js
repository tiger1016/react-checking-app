// Libraries
import { bindActionCreators } from 'redux'
import _ from 'lodash'

// Controllers
import BaseController from '../baseController'
// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/services'

// Selectors
import { servicesSelector } from '../../selectors'

// Functions
import { servicesFunctions } from '../../functions'

class ServicesController extends BaseController {
  /**
   * Initializes services controller
   * @return {Void}
   */
  constructor () {
    /**
     * Required super call to use `this` in constructor
     */
    super()
    /**
     * Creates references to action creatores and binds them to store dispatch for eaiser access and usage
     * @type {Object}
     */

    this.actions = bindActionCreators(actions, store.dispatch)
  }

  fetchServices=() => {
    if (store.getState() && store.getState().session && store.getState().session.user && store.getState().session.user.type === 2) {
      this.actions.fetchFullServices({ archived: '1' })
    } else {
      this.actions.fetchServices()
    }
  }

  /**
   * Returns collection of services that are active
   * memoized selector and hydrated state
   * @param  {Array}  services Services array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of services for use in edit modal.
   */
  selectActiveServices = (state = null) => servicesSelector.selectActiveServices(state || this.state())

  /**
   * Returns collection of services formated for use in walk edit modal, using
   * memoized selector and hydrated state
   * @param  {Array}  services Services array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of services for use in edit modal.
   */
  selectFormatServicesArrayForWalkEditModal = (state = null) => servicesSelector.formatServicesArrayForWalkEditModal(state || this.state())

  /**
   * Returns collection of services formated for use in scheduler dropdown filter, using
   * memoized selector and hydrated state
   * @param  {Array}  services Services array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of services for usscheduler dropdown filter.
   */
  selectFormatServicesArrayForSchedulerFilterDropdown = (state = null) => servicesSelector.formatServicesArrayForSchedulerFilterDropdown(state || this.state())

  /**
   * Returns collection of services formated for use in scheduler dropdown search, using
   * memoized selector and hydrated state
   * @param  {Array}  services Services array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of services for usscheduler dropdown search.
   */
  selectFormatServicesArrayForSchedulerSearchDropdown = (state = null) => servicesSelector.formatServicesArrayForSchedulerSearchDropdown(state || this.state())

  /**
   * Returns services array that includes services that match provided dropdown description
   * @param  {String} description description to search for
   * @param  {Object} state       store's state
   * @return {Array}              Array with matching services objects
   */
  selectServicesArrayThatMatchesDescription = (description = '', state = null) => {
    const services = servicesSelector.servicesSelector(state || this.state())
    return _.filter(services, s => s.dropdown_description.toLowerCase() === description.toLowerCase())
  }

  /**
   * Returns services array (in walk edit dropdown modal format) that includes services
   * that match provided dropdown description
   * @param  {String} description description to search for
   * @param  {Objcet} state       store's state
   * @return {Array}              Array with matching services objects
   */
  selectServiceArrayInWalkEditModalFormatThatMatchesDescription = (description = '', state = null) => {
    return servicesFunctions.formatServicesArrayForWalkEditModal(this.selectServicesArrayThatMatchesDescription(description, state || this.state()))
  }

  /**
   * Returns services array that includes services that match provided dropdown description
   * @param  {String} description description to search for
   * @param  {Object} state       store's state
   * @return {Array}              Array with matching services objects
   */
  selectServicesArrayThatMatchesId = (id = -1, state = null) => {
    const services = servicesSelector.servicesSelector(state || this.state())
    return _.filter(services, s => s.id === Number(id))
  }

  /**
   * [description]
   * @param  {[type]} state    [description]
   * @param  {[type]} serviceId [description]
   * @return {[type]}          [description]
   */
  selectServiceById = (state = null, serviceId) => servicesSelector.servicesSelector(state).find(w => Number(w.id) === Number(serviceId))

  /**
   * Returns services array (in walk edit dropdown modal format) that includes services
   * that match provided dropdown description
   * @param  {String} description description to search for
   * @param  {Objcet} state       store's state
   * @return {Array}              Array with matching services objects
   */
  selectServiceArrayThatMatchesIdInWalkEditModalFormat = (id = -1, state = null) => {
    return servicesFunctions.formatServicesArrayForWalkEditModal(this.selectServicesArrayThatMatchesId(id, state || this.state()))
  }

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectServicesForSelectInput = (state = null) => servicesSelector.selectServicesForSelectInput(state)
  //
}

export const servicesController = new ServicesController()
