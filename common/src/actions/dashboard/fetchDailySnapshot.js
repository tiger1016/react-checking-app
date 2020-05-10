// Constants
import {
  FETCH_DAILY_SNAPSHOT_REQUESTED,
  FETCH_DAILY_SNAPSHOT_SUCCEDED,
  FETCH_DAILY_SNAPSHOT_REJECTED
} from '../../constants/dashboard/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_DAILY_SNAPSHOT_REQUESTED, payload: `Fetching daily snapshot` })
    const { data: { data: payload } } = await api.get('/dashboard/daily_snapshot')
    dispatch({ type: FETCH_DAILY_SNAPSHOT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_DAILY_SNAPSHOT_REJECTED, payload: error.message || error.toString() })
  }
}
