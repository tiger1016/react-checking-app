// Libraries
import { createSelector } from 'reselect'

// Functions
import { petsFunctions } from '../../functions'

// Pure Selectors
export const errorSelector = state => state.pets.error
export const loadingSelector = state => state.pets.loading
export const loadingMessageSelector = state => state.pets.loadingMessage
export const petsSelector = state => state.pets.pets

export const customerPetsSelector = (state, customerId) => {
  return state.pets && state.pets.pets ? state.pets.pets.filter(p => Number(p.customer_id) === Number(customerId)) : []
}
/**
 * [description]
 * @param  {[type]} pets [description]
 * @return {[type]}      [description]
 */
export const formatPetsArrayForWalkEditModal = createSelector(
  petsSelector,
  pets => petsFunctions.formatPetsArrayForWalkEditModal(pets)
)

/**
 * [description]
 * @param  {[type]} pets [description]
 * @return {[type]}      [description]
 */
export const formatPetsArrayForSchedulerFilterDropdown = createSelector(
  petsSelector,
  pets => petsFunctions.formatPetsArrayForSchedulerFilterDropdown(pets)
)

/**
 * [description]
 * @param  {[type]} pets [description]
 * @return {[type]}      [description]
 */
export const formatPetsArrayForSchedulerSearchDropdown = createSelector(
  petsSelector,
  pets => petsFunctions.formatPetsArrayForSchedulerSearchDropdown(pets)
)

/**
 * [description]
 * @param  {[type]} pets [description]
 * @return {[type]}           [description]
 */
export const selectPetsForSelectInput = createSelector(
  petsSelector,
  pets => pets.map(p => ({ label: p.name, value: Number(p.id) }))
)

/**
 * [description]
 * @param  {[type]} pets [description]
 * @return {[type]}           [description]
 */
export const selectUniquePetsByNameForSelectInput = createSelector(
  petsSelector,
  pets => {
    const _uniquePets = []
    pets.forEach(pet => {
      if (!_uniquePets.find(p => p.value.toUpperCase() === pet.name.toUpperCase())) {
        _uniquePets.push({ label: pet.name, value: pet.name })
      }
    })
    return _uniquePets
  }
)

/**
 * [description]
 * @param  {[type]} pets [description]
 * @return {[type]}           [description]
 */
export const selectCustomerPetsForSelectInput = createSelector(
  customerPetsSelector,
  pets => pets.map(p => ({ label: p.name, value: Number(p.id) }))
)
