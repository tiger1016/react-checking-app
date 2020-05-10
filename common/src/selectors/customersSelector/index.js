// Libraries
import { createSelector } from 'reselect'

// Functions
import { customersFunctions } from '../../functions'

// Pure Selectors
export const errorSelector = state => state.customers.error
export const loadingSelector = state => state.customers.loading
export const loadingMessageSelector = state => state.customers.loadingMessage
export const customersSelector = state => state.customers.customers
export const ActiveCustomersSelector = state => state.customers.customers.filter(item => Number(item.active) !== 0)

/**
 * [description]
 * @param  {[type]} customers [description]
 * @return {[type]}           [description]
 */
export const formatCustomersArrayForWalkEditModal = createSelector(
  customersSelector,
  customers => customersFunctions.formatCustomersArrayForWalkEditModal(customers)
)

/**
 * [description]
 * @param  {[type]} customers [description]
 * @return {[type]}           [description]
 */
export const formatCustomersArrayForSchedulerFilterDropdown = createSelector(
  customersSelector,
  customers => customersFunctions.formatCustomersArrayForSchedulerFilterDropdown(customers)
)

/**
 * [description]
 * @param  {[type]} customers [description]
 * @return {[type]}           [description]
 */
export const formatCustomersArrayForSchedulerSearchDropdown = createSelector(
  customersSelector,
  customers => customersFunctions.formatCustomersArrayForSchedulerSearchDropdown(customers)
)

/**
 * [description]
 * @param  {[type]} customers [description]
 * @return {[type]}           [description]
 */
export const selectCustomersForSelectInput = createSelector(
  ActiveCustomersSelector,
  customers => customers.map(c => {
    return { label: c.first_name + ' ' + c.last_name, lastName: c.last_name, value: Number(c.user_id), billingTiming: c.billing_timing }
  })
)
