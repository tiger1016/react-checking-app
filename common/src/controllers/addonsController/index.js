// Controllers
import BaseController from '../baseController'

// Actions
import fetchAddons from '../../actions/addons/fetchAddons'
import fetchFullAddons from '../../actions/addons/fetchFullAddons'

// Store
import { store } from '../../store'

// Selectors
import { addonsSelector } from '../../selectors'

class AddonsController extends BaseController {
  fetchAddons = () => {
    const state = store.getState()
    if (state && state.session && state.session.user && state.session.user.type === 2) {
      store.dispatch(fetchFullAddons({ archived: '1' }))
    } else {
      store.dispatch(fetchAddons())
    }
  }

  /**
   * Returns collection of addons formated for use in walk edit modal, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of addons for use in edit modal.
   */
  selectFormatAddonsArrayForWalkEditModal = (state = null) => addonsSelector.formatAddonsArrayForWalkEditModal(state || this.state())

  /**
   * Returns collection of addons formated for use in scheduler dropdown filter, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of addons for usscheduler dropdown filter.
   */
  selectFormatAddonsArrayForSchedulerFilterDropdown = (state = null) => addonsSelector.formatAddonsArrayForSchedulerFilterDropdown(state || this.state())

  /**
   * Returns collection of addons formated for use in scheduler dropdown search, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of addons for usscheduler dropdown search.
   */
  selectFormatAddonsArrayForSchedulerSearchDropdown = (state = null) => addonsSelector.formatAddonsArrayForSchedulerSearchDropdown(state || this.state())

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectAddonsForSelectInput = (state = null) => addonsSelector.selectAddonsForSelectInput(state)
}

export const addonsController = new AddonsController()
