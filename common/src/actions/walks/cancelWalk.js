// Constants
import {
  CANCEL_WALK_REQUESTED,
  CANCEL_WALK_SUCCEEDED,
  CANCEL_WALK_REJECTED
} from '../../constants/walks/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walkId, applyToAll, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: CANCEL_WALK_REQUESTED, payload: `Cancel walk requested for walk ${walkId}` })
    const { data: { data: payload } } = await api.delete(`/walks/${walkId}`, { apply_to_all: applyToAll ? 1 : 0 })
    if (payload.message) {
      dispatch({ type: CANCEL_WALK_SUCCEEDED, payload: { walkId, applyToAll } })

      // Notify
      if (notification) notify('success', 'Service canceled')

      // Callback
      if (utility.isAFunction(cb)) cb(null, payload.message)
    } else {
      throw new Error(payload.message)
    }
  } catch (error) {
    dispatch({ type: CANCEL_WALK_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
