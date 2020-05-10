// Constants
import {
  CANCEL_WALKS_REJECTED,
  CANCEL_WALKS_REQUESTED,
  CANCEL_WALKS_SUCCEEDED
} from '../../constants/walks/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walksIds = [], cb, notification = true) => async dispatch => {
  try {
    const idsToBeDeleted = walksIds.join(', ')
    dispatch({ type: CANCEL_WALKS_REQUESTED, payload: `Cancel walks requested for walks ${idsToBeDeleted}` })
    const { data: { data: payload } } = await api.delete(`/walks`, { ids: idsToBeDeleted })
    if (payload.messages) {
      dispatch({ type: CANCEL_WALKS_SUCCEEDED, payload: { walksIds } })

      // Notify
      if (notification) notify('success', 'Walks canceled')

      // Callback
      if (utility.isAFunction(cb)) cb(null, payload)
    } else {
      throw new Error('Cancel walks failed')
    }
  } catch (error) {
    dispatch({ type: CANCEL_WALKS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
