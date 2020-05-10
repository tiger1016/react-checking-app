// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/settings'

class SettingsController extends BaseController {
  /**
   * Initializes photos controller
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
   * Returns frequency dropdown select type base on frequency label
   * For use in InputGroup
   * @param  {String} recurrenceType Type of frequency
   * @return {String}                Type of dropdown select
   */
  resolveRecurrenceDropdownType (recurrenceType = '') {
    switch (recurrenceType.strToLower()) {
      case 'weekly':
      case 'bi-weekly':
        return 'weekday-select'
    }
    return 'custom-select'
  }
}

export const settingsController = new SettingsController()
