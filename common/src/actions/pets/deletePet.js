// Constants
import {
  DELETE_CUSTOMER_PET_REJECTED,
  DELETE_CUSTOMER_PET_REQUESTED,
  DELETE_CUSTOMER_PET_SUCCEEDED
} from '../../constants/customers/Actions'
import {
  DELETE_PET_SUCCEDED,
  DELETE_PET_REJECTED,
  DELETE_PET_REQUESTED
} from '../../constants/pets/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (petId, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: DELETE_CUSTOMER_PET_REQUESTED, payload: `Deleting Customer Pet Information` })
    dispatch({ type: DELETE_PET_REQUESTED, payload: `Deleting Pet Information` })

    const { data: { data: pet } } = await api.delete(`/pets/${petId}`)

    dispatch({ type: DELETE_CUSTOMER_PET_SUCCEEDED, payload: pet })
    dispatch({ type: DELETE_PET_SUCCEDED, payload: pet })

    // Notify
    if (notification) notify('success', 'Pet Deleted Successfully.')

    // Callback
    if (utility.isAFunction(cb)) cb(null, pet)
  } catch (error) {
    dispatch({ type: DELETE_CUSTOMER_PET_REJECTED, payload: (error.message || error.toString()) })
    dispatch({ type: DELETE_PET_REJECTED, payload: (error.message || error.toString()) })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
