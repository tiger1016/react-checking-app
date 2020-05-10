// Libraries
import { createSelector } from 'reselect'

// Functions
import { addonsFunctions } from '../../functions'

// Pure Selectors
export const addonsSelector = state => state.addons.addons
export const errorSelector = state => state.addons.error
export const loadingSelector = state => state.addons.loading
export const loadingMessageSelector = state => state.addons.loadingMessage

/**
 * Returns addons format for use in walk edit modal
 * @param  {Array} addons  Array of addons as stored in reducer or returned by Api
 * @return {Array}         Collection of arrays in format compatible for edit modal
 */
export const formatAddonsArrayForWalkEditModal = createSelector(
  addonsSelector,
  addons => addonsFunctions.formatAddonsArrayForWalkEditModal(addons)
)

/**
 * Returns addons format for use in dropdown filters of scheduler
 * @param  {Array} addons  Array of addons as stored in reducer or returned by Api
 * @return {Array}         Collection of arrays in format compatible for filter dropdown
 */
export const formatAddonsArrayForSchedulerFilterDropdown = createSelector(
  addonsSelector,
  addons => addonsFunctions.formatAddonsArrayForSchedulerFilterDropdown(addons)
)

/**
 * Returns addons format for use in search dropdown of scheduler
 * @param  {Array} addons  Array of addons as stored in reducer or returned by Api
 * @return {Array}         Collection of arrays in format compatible for search dropdown
 */
export const formatAddonsArrayForSchedulerSearchDropdown = createSelector(
  addonsSelector,
  addons => addonsFunctions.formatAddonsArrayForSchedulerSearchDropdown(addons)
)
/**
 * [description]
 * @param  {[type]} addons [description]
 * @return {[type]}           [description]
 */
export const selectAddonsForSelectInput = createSelector(
  addonsSelector,
  addons => addons.filter(s => !s.archived || Number(s.archived) === 0).map(a => ({ label: a.name || a.addon_name, value: Number(a.active_addon_id), id: a.id, addon_price: a.addon_price }))
)
