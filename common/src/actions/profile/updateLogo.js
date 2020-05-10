// Constants
import {
  UPDATE_LOGO_REQUESTED,
  UPDATE_LOGO_SUCCEDED,
  UPDATE_LOGO_REJECTED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (file, cb, notification = true) => async dispatch => {
  try {
    const data = new window.FormData()
    data.append('image', file)
    dispatch({ type: UPDATE_LOGO_REQUESTED, payload: `updating PROFILEPIC` })

    const { data: { data: { filename: logo } } } = await api.post('/setting/logo', data)
    dispatch({ type: UPDATE_LOGO_SUCCEDED, payload: { logo } })

    // Notify
    if (notification) notify('success', 'Logo Updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, logo)
  } catch (error) {
    dispatch({ type: UPDATE_LOGO_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify.error('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
