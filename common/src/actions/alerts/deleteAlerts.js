// Constants
import {
  DELETE_ALERTS_REQUESTED,
  DELETE_ALERTS_SUCCEDED,
  DELETE_ALERTS_REJECTED
} from '../../constants/alerts/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (alertIds, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: DELETE_ALERTS_REQUESTED, payload: `Deleting alerts` })
    const { data: { data } } = await api.delete('/alerts', { ids: alertIds })

    dispatch({ type: DELETE_ALERTS_SUCCEDED })

    // Notify
    if (notification) notify('success', 'Alerts deleted')

    // Callback
    if (utility.isAFunction(cb)) cb(null, data)
  } catch (error) {
    dispatch({ type: DELETE_ALERTS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
