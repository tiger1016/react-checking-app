
// Models
import BaseModel from '../baseModel'

export default class PetsModel extends BaseModel {
  /**
   * [description]
   * @param  {[type]} state          [description]
   * @param  {[type]} options.newPet [description]
   * @return {[type]}                [description]
   */
  addPet = (state, { newPet }) => {
    const _index = state.pets.findIndex(p => p.id.toString() === newPet.id.toString())
    if (_index > -1) {
      console.error('Warning: Api returned duplicated id for new pets', state.pets[_index].id, newPet.id)
    }
    const pets = [...state.pets, newPet]
    return this.updatePets(state, { pets })
  }

  /**
   * [description]
   * @param  {[type]} state       [description]
   * @param  {[type]} options.pet [description]
   * @return {[type]}             [description]
   */
  deletePet = (state, { pet }) => {
    const pets = state.pets.filter(p => p.id.toString() !== pet[0].id.toString())
    return this.updatePets(state, { pets })
  }

  /**
  * [description]
  * @param  {[type]} state       [description]
  * @param  {[type]} options.customer_id [description]
  * @return {[type]}             [description]
  */
  deleteCustomerPet = (state, { customer_id, archive }) => { // eslint-disable-line camelcase
    let pets = []
    let deletedPets = []
    if (archive === 1) {
      deletedPets = state.deletedPets.filter(p => Number(p.customer_id) !== Number(customer_id))
      let _pets = state.deletedPets.filter(p => Number(p.customer_id) === Number(customer_id))
      if (!_pets) { _pets = [] }
      pets = [...state.pets, ..._pets]
    } else {
      pets = state.pets.filter(p => Number(p.customer_id) !== Number(customer_id))
      let _deletedPets = state.pets.filter(p => Number(p.customer_id) === Number(customer_id))
      if (!_deletedPets) { _deletedPets = [] }
      deletedPets = [...state.deletedPets, ..._deletedPets]
    }

    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      pets,
      deletedPets
    }
  }

  /**
   * [description]
   * @param  {[type]} state              [description]
   * @param  {[type]} options.updatedPet [description]
   * @return {[type]}                    [description]
   */
  updatePet = (state, { updatedPet }) => {
    const pets = [...state.pets]
    const index = pets.findIndex(item => Number(item.id) === Number(updatedPet.id))
    if (index >= -1) {
      pets[index] = updatedPet
    } else {
      pets.push(updatedPet)
    }
    return this.updatePets(state, { pets })
  }

  /**
   * [updatePetBreeds description]
   * @param  {Object} state             [description]
   * @param  {[type]} options.petBreeds [description]
   * @return {[type]}                   [description]
   */
  updatePetBreeds (state = {}, { petBreeds }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      petBreeds
    }
  }

  /**
   * Updates pets, turns of loading & loading message, and resets error
   * @param  {Object} state           Pets reducer state
   * @param  {Array}  options.pets    Pets action payload
   * @return {Object}                 Return new reducer state
   */
  updatePets = (state = {}, { pets }) => {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      pets
    }
  }

  updatePetEditMode = (state = {}, { isEditMode }) => ({
    ...state,
    isPetProfileEditing: isEditMode
  })
}

export const petsModel = new PetsModel()
