// Constants
import {
  FETCH_BUSY_HOURS_REJECTED,
  FETCH_BUSY_HOURS_REQUESTED,
  FETCH_BUSY_HOURS_SUCCEDED
} from '../../constants/dashboard/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_BUSY_HOURS_REQUESTED, payload: `Fetching busy hours` })
    const { data: { data: payload } } = await api.get('/dashboard/busy_hours')
    dispatch({ type: FETCH_BUSY_HOURS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_BUSY_HOURS_REJECTED, payload: error.message || error.toString() })
  }
}
