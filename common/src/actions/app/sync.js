// Constants
import {
  SYNC_REQUESTED,
  SYNC_SUCCEEDED,
  SYNC_REJECTED
} from '../../constants/app/Actions'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (lastSyncId = null, cb) => async dispatch => {
  try {
    dispatch({ type: SYNC_REQUESTED, payload: `Fetching sync` })
    const { data: { data: payload } } = await api.get('/sync_events', { id: lastSyncId })
    dispatch({ type: SYNC_SUCCEEDED, payload, cb })
  } catch (error) {
    dispatch({ type: SYNC_REJECTED, payload: error.message || error.toString() })
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
