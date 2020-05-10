// Constants
import {
  DELETE_SERVICE_REQUESTED,
  DELETE_SERVICE_SUCCEDED,
  DELETE_SERVICE_REJECTED
} from '../../constants/services/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (serviceId, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: DELETE_SERVICE_REQUESTED, payload: `Archive service ${serviceId}` })
    const { data: { data: payload } } = await api.delete(`/services/${serviceId}`)
    dispatch({ type: DELETE_SERVICE_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Service deleted')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: DELETE_SERVICE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
