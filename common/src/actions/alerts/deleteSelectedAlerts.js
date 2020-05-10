// Constants
import {
  DELETE_SELECTED_ALERTS_REQUESTED,
  DELETE_SELECTED_ALERTS_SUCCEDED,
  DELETE_SELECTED_ALERTS_REJECTED
} from '../../constants/alerts/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (alertIds, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: DELETE_SELECTED_ALERTS_REQUESTED, payload: `Deleting alerts ${alertIds.join(',')}` })
    const { data: { data: payload } } = await api.delete('/alerts/selected', { ids: alertIds })
    dispatch({ type: DELETE_SELECTED_ALERTS_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Alerts deleted')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: DELETE_SELECTED_ALERTS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
