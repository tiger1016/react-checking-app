// Constants
import {
  TOGGLE_WALKER_PROFILE_STATUS_REQUESTED,
  TOGGLE_WALKER_PROFILE_STATUS_SUCCEDED,
  TOGGLE_WALKER_PROFILE_STATUS_REJECTED
} from '../../constants/walkers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walkerId, status, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_WALKER_PROFILE_STATUS_REQUESTED, payload: `change  walkers profile status` })
    const { data: { data: payload } } = await api.delete(`/walkers/${walkerId}/${status}`)
    dispatch({ type: TOGGLE_WALKER_PROFILE_STATUS_SUCCEDED, payload, walkerId })

    // Notify
    if (notification) notify('success', payload.message)

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: TOGGLE_WALKER_PROFILE_STATUS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
