// Constants
import {
  UPDATE_PROFILE_PROFILE_PICTURE_REQUESTED,
  UPDATE_PROFILE_PROFILE_PICTURE_SUCCEDED,
  UPDATE_PROFILE_PROFILE_PICTURE_REJECTED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (file, cb, notification = true) => async dispatch => {
  try {
    const formData = new window.FormData()
    formData.append('photo', file)
    dispatch({ type: UPDATE_PROFILE_PROFILE_PICTURE_REQUESTED, payload: `updating PROFILEPIC` })

    const { data: { data: payload } } = await api.post('/profile/profilepic', formData)
    dispatch({ type: UPDATE_PROFILE_PROFILE_PICTURE_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Profile picture saved')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_PROFILE_PICTURE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify.error('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
