// Constants
import {
  ADD_WALKER_REJECTED,
  ADD_WALKER_REQUESTED,
  ADD_WALKER_SUCCEDED
} from '../../constants/walkers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walkerData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: ADD_WALKER_REQUESTED, payload: `adding walker` })
    const { data: { data: payload } } = await api.post('/walkers', walkerData)
    dispatch({ type: ADD_WALKER_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Staff Created')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: ADD_WALKER_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
