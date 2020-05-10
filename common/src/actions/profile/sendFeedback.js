// Constants
import {
  SEND_FEEDBACK_REJECTED,
  SEND_FEEDBACK_REQUESTED,
  SEND_FEEDBACK_SUCCEDED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (feedBackInfo, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: SEND_FEEDBACK_REQUESTED, payload: `Sending feedback` })

    const feedback = {
      message: `${feedBackInfo.name} - ${feedBackInfo.email} - ${feedBackInfo.message}`,
      page: feedBackInfo.page
    }
    const { data: { data: payload } } = await api.post('/send_feedback', feedback)
    dispatch({ type: SEND_FEEDBACK_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Fedback sent')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: SEND_FEEDBACK_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
