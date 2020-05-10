// Constants
import {
  UPDATE_PROFILE_PASSWORD_REQUESTED,
  UPDATE_PROFILE_PASSWORD_SUCCEDED,
  UPDATE_PROFILE_PASSWORD_REJECTED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (passwordForm, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PROFILE_PASSWORD_REQUESTED, payload: `Update password` })
    const { data: { data: payload } } = await api.put('/setting/reset_global_password', passwordForm)
    dispatch({ type: UPDATE_PROFILE_PASSWORD_SUCCEDED, payload: { passwordMessage: payload.message } })

    // Notify
    if (notification) notify('success', 'Password updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_PASSWORD_REJECTED, payload: (error.message || error.toString()) })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
