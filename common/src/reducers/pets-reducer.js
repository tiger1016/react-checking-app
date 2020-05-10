// Constants
import {
  ADD_PET_REJECTED,
  ADD_PET_REQUESTED,
  ADD_PET_SUCCEDED,

  FETCH_PETS_REJECTED,
  FETCH_PETS_REQUESTED,
  FETCH_PETS_SUCCEDED,

  FETCH_PET_REJECTED,
  FETCH_PET_REQUESTED,
  FETCH_PET_SUCCEDED,

  FETCH_PET_BREEDS_REJECTED,
  FETCH_PET_BREEDS_REQUESTED,
  FETCH_PET_BREEDS_SUCCEDED,

  UPDATE_PET_REJECTED,
  UPDATE_PET_REQUESTED,
  UPDATE_PET_SUCCEDED,

  DELETE_PET_REJECTED,
  DELETE_PET_REQUESTED,
  DELETE_PET_SUCCEDED,
  ARCHIVE_PETS_OF_CUSTOMER_SUCCEEDED,

  UPDATE_PET_EDIT_MODE
} from '../constants/pets/Actions'

// Model
import { petsModel } from '../models'

// Initial state
import initialstate from '../initialstate/pets-init'

export default (state = initialstate, action) => {
  const { payload, type } = action
  switch (type) {
    /*
    Requested
     */
    case ADD_PET_REQUESTED:
    case FETCH_PET_BREEDS_REQUESTED:
    case FETCH_PETS_REQUESTED:
    case FETCH_PET_REQUESTED:
    case UPDATE_PET_REQUESTED:
    case DELETE_PET_REQUESTED:
      return petsModel.loadingWithMessage(state, { message: payload })

    /*
    Rejected
     */
    case ADD_PET_REJECTED:
    case FETCH_PET_BREEDS_REJECTED:
    case FETCH_PETS_REJECTED:
    case FETCH_PET_REJECTED:
    case UPDATE_PET_REJECTED:
    case DELETE_PET_REJECTED:
      return petsModel.error(state, { error: payload })

    /*
    Succeeded
    */
    case ADD_PET_SUCCEDED:
      return petsModel.addPet(state, { newPet: payload })
    case DELETE_PET_SUCCEDED:
      return petsModel.deletePet(state, { pet: payload })
    case ARCHIVE_PETS_OF_CUSTOMER_SUCCEEDED:
      return petsModel.deleteCustomerPet(state, { customer_id: payload.customer_id, archive: payload.archive })
    case FETCH_PET_BREEDS_SUCCEDED:
      return petsModel.updatePetBreeds(state, { petBreeds: payload })
    case UPDATE_PET_SUCCEDED:
      return petsModel.updatePet(state, { updatedPet: payload })
    case FETCH_PETS_SUCCEDED:
      return petsModel.updatePets(state, { pets: payload })
    case FETCH_PET_SUCCEDED:
      return petsModel.updatePet(state, { updatedPet: payload })
    case UPDATE_PET_EDIT_MODE:
      return petsModel.updatePetEditMode(state, { isEditMode: payload.isEditMode })
  }
  return state
}
