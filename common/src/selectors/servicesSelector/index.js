// Libraries
import { createSelector } from 'reselect'

// Functions
import { servicesFunctions } from '../../functions'

// Base Selectors
export const errorSelector = state => state.services.error
export const loadingSelector = state => state.services.loading
export const loadingMessageSelector = state => state.services.loadingMessage
export const servicesSelector = state => state.services.services

/**
 * [description]
 * @param  {[type]} services [description]
 * @return {[type]}          [description]
 */
export const formatServicesArrayForWalkEditModal = createSelector(
  servicesSelector,
  services => servicesFunctions.formatServicesArrayForWalkEditModal(services.filter(s => !s.archive || s.archive === 0))
)

/**
 * [description]
 * @param  {[type]} services [description]
 * @return {[type]}          [description]
 */
export const formatServicesArrayForSchedulerFilterDropdown = createSelector(
  servicesSelector,
  services => servicesFunctions.formatServicesArrayForSchedulerFilterDropdown(services.filter(s => !s.archive || s.archive === 0))
)

/**
 * [description]
 * @param  {[type]} services [description]
 * @return {[type]}          [description]
 */
export const formatServicesArrayForSchedulerSearchDropdown = createSelector(
  servicesSelector,
  services => servicesFunctions.formatServicesArrayForSchedulerSearchDropdown(services.filter(s => !s.archive || s.archive === 0))
)
/**
 * [description]
 * @param  {[type]} services [description]
 * @return {[type]}           [description]
 */
export const selectServicesForSelectInput = createSelector(
  servicesSelector,
  services => services.filter(s => !s.archive || s.archive === 0).map(s => ({ label: s.dropdown_description, value: Number(s.id), cost: s.cost }))
)
/**
 * [description]
 * @param  {[type]} services [description]
 * @return {[type]}           [description]
 */
export const selectActiveServices = createSelector(
  servicesSelector,
  services => services.filter(s => !s.archive || s.archive === 0)
)
