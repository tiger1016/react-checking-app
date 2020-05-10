// Constants
import {
  EDIT_WALKER_PAYRATE_REQUESTED,
  EDIT_WALKER_PAYRATE_SUCCEDED,
  EDIT_WALKER_PAYRATE_REJECTED
} from '../../constants/walkers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'

export default (walkerId, payloadType, data, notification = true) => async dispatch => {
  try {
    dispatch({ type: EDIT_WALKER_PAYRATE_REQUESTED, payload: `Fetching walkers` })
    const { data: { data: payload } } = await api.put(`/walkers/${walkerId}/${payloadType}/rates`, data)
    dispatch({ type: EDIT_WALKER_PAYRATE_SUCCEDED, payload, walkerId, payloadType })

    // Notify
    if (notification) notify('success', `${payloadType} Rate updated`)
  } catch (error) {
    dispatch({ type: EDIT_WALKER_PAYRATE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())
  }
}
