// Constants
import {
  EDIT_WALKER_PROFILE_REQUESTED,
  EDIT_WALKER_PROFILE_SUCCEDED,
  EDIT_WALKER_PROFILE_REJECTED
} from '../../constants/walkers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walkerId, data, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: EDIT_WALKER_PROFILE_REQUESTED, payload: `Updating walker ${walkerId}` })
    const { data: { data: payload } } = await api.put(`/walkers/${walkerId}`, data)
    dispatch({ type: EDIT_WALKER_PROFILE_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Staff member updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: EDIT_WALKER_PROFILE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
