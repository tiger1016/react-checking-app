// Constants
import {
  UPDATE_PROFILE_BASIC_PROFILE_REQUESTED,
  UPDATE_PROFILE_BASIC_PROFILE_SUCCEDED,
  UPDATE_PROFILE_BASIC_PROFILE_REJECTED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (data, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PROFILE_BASIC_PROFILE_REQUESTED, payload: `updating basic profile` })

    const { data: { data: payload } } = await api.put('/profile/licensee', data)
    dispatch({ type: UPDATE_PROFILE_BASIC_PROFILE_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Profile saved')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_BASIC_PROFILE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
