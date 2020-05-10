// Constants
import {
  UPDATE_PROFILE_QR_CODES_REQUESTED,
  UPDATE_PROFILE_QR_CODES_SUCCEDED,
  UPDATE_PROFILE_QR_CODES_REJECTED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (data, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PROFILE_QR_CODES_REQUESTED, payload: `updating qrcodes` })
    const { data: { data: payload } } = await api.put('/profile/licensee_qr', data)
    dispatch({ type: UPDATE_PROFILE_QR_CODES_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'QR Codes Ordered')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_QR_CODES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
