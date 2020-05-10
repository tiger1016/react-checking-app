// Constants

import {
  UPDATE_CUSTOMER_PET_REJECTED,
  UPDATE_CUSTOMER_PET_REQUESTED,
  UPDATE_CUSTOMER_PET_SUCCEEDED
} from '../../constants/customers/Actions'
import {
  UPDATE_PET_REJECTED,
  UPDATE_PET_REQUESTED,
  UPDATE_PET_SUCCEDED
} from '../../constants/pets/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (petId, petsData, cb, notification = true) => async dispatch => {
  try {
    const formData = new window.FormData()
    for (var key in petsData) {
      formData.append(key, petsData[key])
    }

    dispatch({ type: UPDATE_PET_REQUESTED, payload: `Updating Pet ${petId}` })
    dispatch({ type: UPDATE_CUSTOMER_PET_REQUESTED, payload: `Updating Customer Pet ${petId}` })

    const { data: { data: payload } } = await api.post(`/update_pet/${petId}`, formData)
    dispatch({ type: UPDATE_CUSTOMER_PET_SUCCEEDED, payload })
    dispatch({ type: UPDATE_PET_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Pet Updated successfully.')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_PET_REJECTED, payload: error.message || error.toString() })
    dispatch({ type: UPDATE_PET_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
