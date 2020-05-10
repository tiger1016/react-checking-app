// Constants
import {
  FETCH_SERVICE_REJECTED,
  FETCH_SERVICE_REQUESTED,
  FETCH_SERVICE_SUCCEDED
} from '../../constants/services/Actions'

// Utils
import { api } from '../../utils/api'

export default (id) => async dispatch => {
  try {
    dispatch({ type: FETCH_SERVICE_REQUESTED, payload: `Fetching services` })
    const { data: { data: payload } } = await api.get('/services/' + id)
    dispatch({ type: FETCH_SERVICE_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_SERVICE_REJECTED, payload: error.message || error.toString() })
  }
}
