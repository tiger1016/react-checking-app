// Constants
import {
  FETCH_SERVICES_REJECTED,
  FETCH_SERVICES_REQUESTED,
  FETCH_SERVICES_SUCCEDED
} from '../../constants/services/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_SERVICES_REQUESTED, payload: `Fetching services` })
    const { data: { data: payload } } = await api.get('/services')
    dispatch({ type: FETCH_SERVICES_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_SERVICES_REJECTED, payload: error.message || error.toString() })
  }
}
