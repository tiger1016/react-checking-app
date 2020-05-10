// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/pets'

// Selectors
import { petsSelector } from '../../selectors'

class PetsController extends BaseController {
  /**
   * Initializes pets controller
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
   * Formats pets array for react-select dropdown
   * @param  {Object} state state
   * @param  {Number} customerId Customer Id
   * @return {Array}  Array of pets for specific customer
   */
  selectPetsForSpecificCustomer = (state = null, customerId = null) => petsSelector.customerPetsSelector(state, customerId)

  /**
   * Formats pets array for react-select dropdown
   * @param  {Array} pets Pets array
   * @return {Array}      Formated array to be used in react-select
   */
  formatPetsForDropdown = pets => pets.map(p => ({ value: p.id, label: p.name }))

  /**
   * Returns collection of pets formated for use in walk edit modal, using
   * memoized selector and hydrated state
   * @param  {Array}  pets Pets array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of pets for use in edit modal.
   */
  selectFormatPetsArrayForWalkEditModal = (state = null) => petsSelector.formatPetsArrayForWalkEditModal(state || this.state())

  /**
   * Returns collection of pets formated for use in scheduler dropdown filter, using
   * memoized selector and hydrated state
   * @param  {Array}  pets Pets array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of pets for usscheduler dropdown filter.
   */
  selectFormatPetsArrayForSchedulerFilterDropdown = (state = null) => petsSelector.formatPetsArrayForSchedulerFilterDropdown(state || this.state())

  /**
   * Returns collection of pets formated for use in scheduler dropdown search, using
   * memoized selector and hydrated state
   * @param  {Array}  pets Pets array as stored by reducer or as returned by api.
   * @return {Array}         Formatted collection of pets for usscheduler dropdown search.
   */
  selectFormatPetsArrayForSchedulerSearchDropdown = (state = null) => petsSelector.formatPetsArrayForSchedulerSearchDropdown(state || this.state())

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectPetBreedForSelectInput = (state = null) => state.pets.petBreeds.map(breed => { return { label: breed.name, value: breed.id } })

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectPetBreedNameById = (breedId = null, state = null) => {
    if (!state) {
      state = this.state()
    }
    const _petBreed = state.pets.petBreeds.find(breed => Number(breed.id) === Number(breedId))
    if (_petBreed) {
      return _petBreed.name
    }
    return ''
  }

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectPetsForSelectInput = (state = null) => petsSelector.selectPetsForSelectInput(state)

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectUniquePetsByNameForSelectInput = (state = null) => petsSelector.selectUniquePetsByNameForSelectInput(state)

  /**
   * [description]
   * @param  {[type]} state [description]
   * @param  {[type]} customerId [description]
   * @return {[type]}       [description]
   */
  selectCustomerPetsForSelectInput = (state = null, customerId = null) => petsSelector.selectCustomerPetsForSelectInput(state, customerId)

  /**
   * Creates generator for a bank information object.
   * @return {Func} Bank information data object generator
   */
  petStructGenerator () {
    return PetStruct
  }
}

/**
 * Structure of pet information
 * @param {Object} pet initial values
 */
const PetStruct = function (pet = {}) {
  this.name = pet.name || ''
  this.type = pet.type || ''
  this.breed_id = pet.breed_id || ''
  this.breed_name = pet.breed_name || ''
  this.gender = pet.gender || ''
  this.color = pet.color || ''
  this.weight = pet.weight || ''
  this.energy_level = pet.energy_level !== 0 ? pet.energy_level || '' : 0
  this.aggression_towards_dogs = pet.aggression_towards_dogs !== 0 ? pet.aggression_towards_dogs || '' : 0
  this.aggression_towards_humans = pet.aggression_towards_humans !== 0 ? pet.aggression_towards_humans || '' : 0
  this.birthday = pet.birthday || ''
  this.collar_info = pet.collar_info || ''
  this.notes = pet.notes || ''
  this.feeding_instructions = pet.feeding_instructions || ''
  this.feeding_time = pet.feeding_time || ''
  this.food_amount = pet.food_amount || ''
  this.treats = pet.treats || ''
  this.medicine_info = pet.medicine_info || ''
  this.rabies_expiration = pet.rabies_expiration || ''
  this.animal_hospital = pet.animal_hospital || ''
  this.vet_name = pet.vet_name || ''
  this.vet_phone = pet.vet_phone || ''
  this.vet_address = pet.vet_address || ''
  this.vet_address2 = pet.vet_address2 || ''
  this.vet_city = pet.vet_city || ''
  this.vet_state = pet.vet_state || ''
  this.vet_zip = pet.vet_zip || ''
  this.photo = pet.photo || ''
}

export const petsController = new PetsController()
