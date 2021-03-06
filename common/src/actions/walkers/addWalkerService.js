// Constants
import {
  ADD_WALKER_SERVICE_REQUESTED,
  ADD_WALKER_SERVICE_SUCCEDED,
  ADD_WALKER_SERVICE_REJECTED
} from '../../constants/walkers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walkerId, data, cb, notification = false) => async dispatch => {
  try {
    dispatch({ type: ADD_WALKER_SERVICE_REQUESTED, payload: `add walker add` })
    const { data: { data: payload } } = await api.post(`/walkers/add_services/${walkerId}`, data)

    dispatch({ type: ADD_WALKER_SERVICE_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Addon created')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: ADD_WALKER_SERVICE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
