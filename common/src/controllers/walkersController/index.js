// Libraries
import _ from 'lodash'
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/walkers'

// Selectors
import { walkersSelector } from '../../selectors'

// Utils
import { utility } from '../../utils'

class WalkersController extends BaseController {
  /**
   * Initializes walkers controller
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
   * Creates generator for a bank information object.
   * @return {Func} Bank information data object generator
   */
  walkerStructGenerator () {
    return WalkerStruct
  }

  /**
   * [walkerSecurityStructGenerator description]
   * @return {[type]} [description]
   */
  walkerSecurityStructGenerator () {
    return WalkerSecurityStruct
  }

  /**
   * Reorders walks by walker array to place the All walkers and All walkers with walks first in dropdown filter
   * @param  {Array}  walkers Walks by walker array
   * @return {Array}          Reorganized walks by walker array
   */
  placeAllFirstInDropdownFilter (walkers = []) {
    const newWalkers = walkers.slice()
    const all = _.remove(newWalkers, w => w.label && (w.label.match(/^All\s/i) || w.label.match(/^\*All\s/i)))
    return [...all, ...newWalkers]
  }

  /**
   * Reorders walks by walker array to place the unassigned Walker entries first
   * @param  {Array}  walkers Walks by walker array
   * @return {Array}          Reorganized walks by walker array
   */
  placeUnassignedWalkersFirst (walkers = []) {
    const unassigned = _.remove(walkers, w => (w.walker_name === 'No walker assigned' || Number(w.walker_id) === 0))
    utility.mutateSortCollectionBy(unassigned, 'walker_name')
    return unassigned.concat(walkers)
  }

  /**
   * [description]
   * @param  {[type]} state    [description]
   * @param  {[type]} walkerId [description]
   * @return {[type]}          [description]
   */
  selectWalkerById = (state = null, walkerId) => walkersSelector.walkersSelector(state).find(w => Number(w.user_id) === Number(walkerId))

  /**
   * Returns collection of walkers formated for use in scheduler dropdown filter, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of walkers for usscheduler dropdown filter.
   */
  selectFormatWalkersArrayForSchedulerFilterDropdown = (state = null) => walkersSelector.formatWalkersArrayForSchedulerFilterDropdown(state || this.state())

  /**
   * Returns collection of walkers formated for use in scheduler dropdown search, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of walkers for usscheduler dropdown search.
   */
  selectFormatWalkersArrayForSchedulerSearchDropdown = (state = null) => walkersSelector.formatWalkersArrayForSchedulerSearchDropdown(state || this.state())

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectWalkersForSelectInput = (state = null) => walkersSelector.selectWalkersForSelectInput(state)

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectActiveWalkersForSelectInput = (state = null) => walkersSelector.selectActiveWalkersForSelectInput(state)
}
/**
 * Structure of walker information
 * @param {Object} walker initial values
 */
const WalkerSecurityStruct = function (walker = {}) {
  this.password = walker.password || ''
  this.security_question = walker.security_question || ''
  this.security_answer = walker.security_answer || ''
}

/**
 * Structure of walker information
 * @param {Object} walker initial values
 */
const WalkerStruct = function (walker = {}) {
  this.first_name = walker.first_name || ''
  this.last_name = walker.last_name || ''
  this.email = walker.email || ''
  this.phone_mobile = walker.phone_mobile || ''
  this.phone_work = walker.phone_work || ''
  this.phone_home = walker.phone_home || ''
  this.address = walker.address || ''
  this.address2 = walker.address2 || ''
  this.city = walker.city || ''
  this.state = walker.state || ''
  this.zip = walker.zip || ''
  this.hire_date = walker.hire_date || ''
  this.transportation_type = walker.transportation_type || ''
  this.license_plate = walker.license_plate || ''
  this.payroll_frequency = walker.payroll_frequency || ''
  this.payroll_date = walker.payroll_date || ''
  this.payroll_email = walker.payroll_email || 0
  this.alerts_email = walker.alerts_email || 0
  this.admin_full = walker.admin_full || ''
  this.notes = walker.notes || ''
  this.bio = walker.bio || ''
  this.name_emergency = walker.name_emergency || ''
  this.phone_emergency = walker.phone_emergency || ''
  this.walker_admin = walker.walker_admin || ''
}

export const walkersController = new WalkersController()
