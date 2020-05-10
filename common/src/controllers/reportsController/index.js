// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'
import { customersController } from '../customersController'
import { petsController } from '../petsController'
import { servicesController } from '../servicesController'
import { walkersController } from '../walkersController'

// Actions
import fetchAddons from '../../actions/addons/fetchAddons'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/reports'

class ReportsController extends BaseController {
  /**
   * Initializes reports controller
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

  /**
   * Fetches all data needed to populate reports filters
   * NOTE: this might chenge to use internal state from middleware
   * @param  {Object} props Redux props
   * @return {Void}
   */
  fetchAllFilterData (props = {}) {
    // Fetch addons if not present in storage
    if (!props.addons.addons.length || !props.addons.loading) {
      store.dispatch(fetchAddons())
    }
    // Fetch customers if not present in storage
    if (!props.customers.customers.length || !props.customers.loading) {
      customersController.actions.fetchCustomers()
    }
    // Fetch pets if not present in storage
    if (!props.pets.pets.length || !props.pets.loading) {
      petsController.actions.fetchPets()
    }
    // Fetch services if not present in storage
    if (!props.services.services.length || !props.services.loading) {
      servicesController.fetchServices()
    }
    // Fetch walkers if not present in storage
    if (!props.walkers.walkers.length || !props.walkers.loading) {
      walkersController.actions.fetchWalkers()
    }
  }

  downloadReport (url) {
    // his.actions.downloadReport(reportType, data)
    // let jwt = sessionController.selectSessionToken()
    window.open(url)
  }
}

export const reportsController = new ReportsController()
