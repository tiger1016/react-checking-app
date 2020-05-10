// Libraries
import { createSelector } from 'reselect'

// Functions
import { walkersFunctions } from '../../functions'

export const walkersSelector = state => state.walkers.walkers
export const errorSelector = state => state.walkers.error
export const loadingSelector = state => state.walkers.loading
export const loadingMessageSelector = state => state.walkers.loadingMessage

/**
 * Returns walkers format for use in dropdown filters of scheduler
 * @param  {Array} walkers  Array of walkers as stored in reducer or returned by Api
 * @return {Array}          Collection of arrays in format compatible for filter dropdown
 */
export const formatWalkersArrayForSchedulerFilterDropdown = createSelector(
  walkersSelector,
  walkers => walkersFunctions.formatWalkersArrayForSchedulerFilterDropdown(walkers)
)

/**
 * Returns walkers format for use in search dropdown of scheduler
 * @param  {Array} walkers  Array of walkers as stored in reducer or returned by Api
 * @return {Array}          Collection of arrays in format compatible for search dropdown
 */
export const formatWalkersArrayForSchedulerSearchDropdown = createSelector(
  walkersSelector,
  walkers => walkersFunctions.formatWalkersArrayForSchedulerSearchDropdown(walkers)
)

/**
 * [description]
 * @param  {[type]} walkers [description]
 * @return {[type]}           [description]
 */
export const selectWalkersForSelectInput = createSelector(
  walkersSelector,
  walkers => walkers.map(c => ({ label: c.first_name + ' ' + c.last_name, value: Number(c.user_id) }))
)

/**
 * [description]
 * @param  {[type]} walkers [description]
 * @return {[type]}           [description]
 */
export const selectActiveWalkersForSelectInput = createSelector(
  walkersSelector,
  walkers => walkers.filter(w => w.active).map(c => ({ label: c.first_name + ' ' + c.last_name, value: Number(c.user_id) }))
)
