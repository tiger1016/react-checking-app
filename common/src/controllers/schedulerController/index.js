// Libraries
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import Fuse from 'fuse.js'

// Controllers
import BaseController from '../baseController'
import { customersController } from '../customersController'
import { petsController } from '../petsController'
import { servicesController } from '../servicesController'
import { walkersController } from '../walkersController'
import { walksController } from '../walksController'
import { sessionController } from '../sessionController'

// Actions
import fetchAddons from '../../actions/addons/fetchAddons'

// Utils
// import { utility } from '../../utils'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/scheduler'

// Selectors
import * as selectors from '../../selectors'

class SchedulerController extends BaseController {
  /**
   * Initializes scheduler controller
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
   * Fetches all data needed to populate scheduler filters
   * @param  {Object} state Store's state
   * @return {Void}
   */
  fetchAllFilterData (state = null) {
    // Fetch addons if not present in storage
    if (!selectors.addonsSelector.addonsSelector(state).length && !selectors.addonsSelector.loadingSelector(state)) {
      store.dispatch(fetchAddons())
    }
    // Fetch customers if not present in storage
    if (!selectors.customersSelector.customersSelector(state).length && !selectors.customersSelector.loadingSelector(state)) {
      customersController.actions.fetchCustomers()
    }
    // Fetch pets if not present in storage
    if (!selectors.petsSelector.petsSelector(state).length && !selectors.petsSelector.loadingSelector(state)) {
      petsController.actions.fetchPets()
    }
    // Fetch services if not present in storage
    if (!selectors.servicesSelector.servicesSelector(state).length && !selectors.servicesSelector.loadingSelector(state)) {
      servicesController.fetchServices()
    }
    // Fetch walkers if not present in storage
    if (!selectors.walkersSelector.walkersSelector(state).length && !selectors.walkersSelector.loadingSelector(state)) {
      walkersController.actions.fetchWalkers()
    }
  }

  /**
   * Calls action creator to filter store on dropdown filter change
   * @param  {Mixed}  value         Current dropdown filter scheduler value
   * @param  {String} filterType    Filter for (walks, walkers, statuses, pets, customers, etc)
   * @param  {Array} filterState    Current filter state in store
   * @return {Void}
   */
  handleDropDownSelectFilter = (value, filterType, filterState) => {
    const values = value.map(a => a.value)
    const alreadyExists = filterState.find(s => values.includes(s.value))

    if (alreadyExists) {
      this.actions.filterWalks({ filterType, value: filterState.filter(a => a.value !== alreadyExists.value) })
    } else {
      const all = value.map(a => a.label).filter(a => /All/.test(a)).length
      if (all > 0) {
        this.actions.filterWalks({ filterType, value: [] })
      } else {
        const newArray = [...filterState, ...value]
        this.actions.filterWalks({ filterType, value: _.uniqBy(newArray, 'value') })
      }
    }
  }

  /**
   * [isView description]
   * @param  {[type]}  pathname [description]
   * @return {Boolean}          [description]
   */
  isView (pathname) {
    const isDay = /scheduler\/day/.test(pathname)
    if (isDay) {
      return 'day'
    }
    const isMonth = /scheduler\/month/.test(pathname)
    if (isMonth) {
      return 'month'
    }
    return 'week'
  }

  /**
   * Checks if the scheduler is currently filtering
   * @param  {Object}  filter [description]
   * @return {Boolean}        [description]
   */
  isFiltering (state = null) {
    if (
      selectors.schedulerSelector.filtersAddonsSelector(state).length ||
      selectors.schedulerSelector.filtersCustomersSelector(state).length ||
      selectors.schedulerSelector.filtersPetsSelector(state).length ||
      selectors.schedulerSelector.filtersSearchSelector(state).length ||
      selectors.schedulerSelector.filtersServicesSelector(state).length ||
      selectors.schedulerSelector.filtersStatusesSelector(state).length ||
      selectors.schedulerSelector.filtersWalkersSelector(state).length
    ) {
      return true
    }
    return false
  }

  /**
   * Filter walks by addon
   * @param  {[type]} state [description]
   * @param  {[type]} walks [description]
   * @return {[type]}       [description]
   */
  filterWalksByAddons (addonsFilter, walks) {
    if (addonsFilter ? addonsFilter.length > 0 : false) {
      const addonsIds = addonsFilter.map(a => Number(a))
      return walks.filter(w => {
        if (w.addons.find(item => addonsIds.includes(Number(item.active_addon_id)))) {
          return true
        } else {
          return false
        }
      })
    }
    return walks
  }

  /**
   * Filter walks by customer
   * @param  {[type]} state [description]
   * @param  {[type]} walks [description]
   * @return {[type]}       [description]
   */
  filterWalksByWalkers (walkersFilter, walks) {
    if (walkersFilter ? walkersFilter.length > 0 : false) {
      const walkersIds = walkersFilter.map(a => Number(a))
      return walks.filter(w => {
        return walkersIds.includes(Number(w.walker_id))
      })
    }
    return walks
  }

  /**
   * Filter walks by customer
   * @param  {[type]} state [description]
   * @param  {[type]} walks [description]
   * @return {[type]}       [description]
   */
  filterWalksByCustomers (customersFilter, walks) {
    if (customersFilter ? customersFilter.length > 0 : false) {
      const customersIds = customersFilter.map(a => Number(a))
      return walks.filter(w => {
        return customersIds.includes(Number(w.customer.id))
      })
    }
    return walks
  }

  /**
   * Filter walks by pet
   * @param  {[type]} state [description]
   * @param  {[type]} walks [description]
   * @return {[type]}       [description]
   */
  filterWalksByPets (petsFilter, walks) {
    if (petsFilter ? petsFilter.length > 0 : false) {
      const petsNames = petsFilter.map(a => a.toLowerCase())
      return walks.filter(w => {
        const walkPetsNames = w.pets.map(p => p.name.toLowerCase())
        return petsNames.filter(p => walkPetsNames.includes(p)).length > 0
      })
    }
    return walks
  }

  /**
   * [filterWalksByServices description]
   * @param  {[type]} servicesFilter [description]
   * @param  {[type]} walks          [description]
   * @return {[type]}                [description]
   */
  filterWalksByServices (servicesFilter, walks) {
    if (servicesFilter ? servicesFilter.length > 0 : false) {
      const servicesIds = servicesFilter.map(s => Number(s))
      return walks.filter(w => {
        return servicesIds.includes(Number(w.billing_price_group_id))
      })
    }
    return walks
  }

  /**
   * [filterWalksByStatus description]
   * @param  {[type]} statusFilter [description]
   * @param  {[type]} walks        [description]
   * @return {[type]}              [description]
   */
  filterWalksByStatus (statusFilter, walks) {
    if (statusFilter ? statusFilter.length > 0 : false) {
      return walks.filter(w => {
        return statusFilter.includes(walksController.getStatus(w))
      })
    }
    return walks
  }

  /**
   DO NO USE UNLESS YOU KNOW WHAT YOU ARE DOING
   * [filterWalksByWalkerIds description]
   * @param  {[type]} walkersFilter [description]
   * @param  {[type]} walks         [description]
   * @return {[type]}               [description]
   */
  filterWalksByWalkerIds (walkersFilter, walks) {
    if (!walkersFilter || !walkersFilter.length || Number(walkersFilter[0]) < 0) {
      return walks
    }

    const walksIds = walkersFilter.map(a => Number(a))
    return walks.filter(w => {
      return walksIds.includes(Number(w.walker_id))
    })
  }

  /**
   * Prepares data to be used by scheduler's dropdown filter's
   * @param  {Array}  choices             Dropdown filter options
   * @param  {Array}  selectedValues      Current dropdown filter selected values
   * @param  {String} filterType          Filter for (walks, walkers, statuses, pets, customers, etc)
   * @return {Object} Object,choices      Processed dropdown filter options
   * @return {String} Object.,placeholder Placeholder to display at dropdown filter element
   */
  preProcessDropDownFilterProps = (choices = [], selectedValues = [], filterType = '') => {
    selectedValues = selectedValues.map(s => s.label)
    // Update placeholder depending on selected options
    let placeholder = selectedValues.length ? (selectedValues[1] ? selectedValues.slice(0, 2).join(', ') + '...' : selectedValues[0]) : 'All ' + filterType
    placeholder = placeholder.trim().toLowerCase() === 'all walkers' ? 'Staff' : placeholder
    // Give special class name to selected options
    const highlighted = 'highlighted-options'
    choices = choices.map(choice => {
      if (_.indexOf(selectedValues, choice.label) > -1) {
        return { ...choice, label: `*${choice.label}`, className: highlighted }
      }
      return choice
    })
    const selected = choices.filter(c => c.className === highlighted)
    const notSelected = this.sortDropDownFilterOptions(choices.filter(c => c.className !== highlighted))
    choices = walkersController.placeAllFirstInDropdownFilter([...selected, ...notSelected])
    return { choices, placeholder }
  }

  /**
   * [description]
   * @param  {[type]} state         [description]
   * @param  {Array}  walksByWalker [description]
   * @return {[type]}               [description]
   */
  processWalks = (state, walksByWalker = [], filters) => {
    const userType = sessionController.selectUserType(state)
    // walksByWalker = this.filterWalksByWalkerIds(filters.walkers, walksByWalker)
    // walksByWalker = this.searchWalks(filters.walkers, walksByWalker)

    walksByWalker = this.filterWalksByAddons(filters.addons, walksByWalker).map(w => ({ ...w, filterSelected: true }))
    walksByWalker = this.filterWalksByCustomers(filters.customers, walksByWalker).map(w => ({ ...w, filterSelected: true }))
    walksByWalker = this.filterWalksByPets(filters.pets, walksByWalker).map(w => ({ ...w, filterSelected: true }))
    walksByWalker = this.filterWalksByServices(filters.services, walksByWalker).map(w => ({ ...w, filterSelected: true }))
    walksByWalker = this.filterWalksByStatus(filters.status, walksByWalker).map(w => ({ ...w, filterSelected: true }))

    walksByWalker = walksController.uniqueWalksOnly(walksByWalker)
    walksByWalker = walksController.walksGroupedByWalker(walksByWalker)
    walksByWalker = walksController.addAllWalkersToWalks(state, walksByWalker)

    walksByWalker = _.sortBy(walksByWalker, w => {
      const arr = w.walker_name.split(' ')
      return arr[arr.length - 1].toLowerCase()
    })

    let walkersFilter = filters.walkers || []
    walkersFilter = walkersFilter.map(f => Number(f))
    const walkers = walksByWalker.slice()

    if (walkersFilter.indexOf(-2) > -1) {
      const selectedWalkers = _.remove(walkers, w => w.walks.length > 0).map(w => ({
        ...w,
        filterSelected: true,
        walker_name: `*${w.walker_name}`
      }))
      walksByWalker = [...selectedWalkers, ...walkers]
      walksByWalker = walksController.moveUnassignedToTop(walksByWalker)
      walksByWalker = this.selectOnlyActiveWalkers(state, walksByWalker)
      return walksByWalker
    }

    const selectedWalkers = _.remove(walkers, w => walkersFilter.includes(Number(w.walker_id))).map(w => ({
      ...w,
      filterSelected: true,
      walker_name: `*${w.walker_name}`
    }))
    walksByWalker = [...selectedWalkers, ...walkers]

    walksByWalker = walksController.moveUnassignedToTop(walksByWalker)
    if (userType !== 'walker') { walksByWalker = this.selectOnlyActiveWalkers(state, walksByWalker) }

    return walksByWalker
  }

  /**
   * [description]
   * @param  {[type]} state   [description]
   * @param  {[type]} walkers [description]
   * @return {[type]}         [description]
   */
  selectOnlyActiveWalkers = (state, walkers) => {
    const activeWalkers = state.walkers.walkers.filter(w => w.active).map(w => Number(w.user_id))
    const walksByWalker = walkers.filter(w => activeWalkers.includes(Number(w.walker_id)) || w.walker_id === 0)
    return walksByWalker
  }

  /**
   * [searchWalks description]
   * @param  {[type]} state [description]
   * @param  {Array}  walks [description]
   * @return {[type]}       [description]
   */
  searchWalks (state, walks = []) {
    const { filters } = state.scheduler
    if (
      !filters.search.length &&
      !filters.services.length &&
      !filters.statuses.length &&
      !filters.walkers.length
    ) {
      return walks
    }
    const fuseOptions = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: []
    }
    if (filters.search.length) {
      fuseOptions.keys.push('customer_first')
      fuseOptions.keys.push('customer_last')
      fuseOptions.keys.push('customer_name')
    }
    if (filters.search.length) {
      fuseOptions.keys.push('pets.name')
    }
    if (filters.statuses.length || filters.search.length) {
      fuseOptions.keys.push('status')
    }
    if (filters.services.length || filters.search.length) {
      fuseOptions.keys.push('dropdown_description')
    }
    if (filters.walkers.length || filters.search.length) {
      fuseOptions.keys.push('walker_name')
    }
    if (filters.search.length) {
      fuseOptions.keys.push('addons.name')
    }
    const fuse = new Fuse(walks, fuseOptions)
    const results = []
    for (const filter in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, filter)) {
        const searchTerms = filters[filter].map(f => f.label)
        if (searchTerms.length) {
          const result = searchTerms.map(s => {
            return fuse.search(s)
          })
          results.push(_.flatten(result))
        }
      }
    }
    return _.flatten(results)
  }

  /**
   * Sorts scheduler's dropdown filter menu options
   * @param  {Array}  options Dropdown filter menu options array
   * @return {Array}          Sorted options array
   */
  sortDropDownFilterOptions (options = []) {
    const all = options.shift()
    const sorted = _.sortBy(_.uniqBy(options, 'value'), option => option.label.toLowerCase(), 'label')
    sorted.unshift(all)
    return sorted
  }

  /**
   * Calls redux action to change scheduler view between day and week (month not implemented)
   * @param  {String} view day, week or month (month not implemented)
   * @return {Void}
   */
  toggleView = view => this.actions.changeView(view)

  /**
   * Calls action to show or hide the hidden scheduler dropdown filters
   * @param  {[Object} state Store's state
   * @return {Void}
   */
  toggleExpandedFilter = (state = null) => this.actions.toggleFiltersView(selectors.schedulerSelector.showFiltersSelector(state || this.state()))
}

export const schedulerController = new SchedulerController()
