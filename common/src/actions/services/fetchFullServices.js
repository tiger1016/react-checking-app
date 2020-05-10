// Constants
import {
  FETCH_FULL_SERVICES_REJECTED,
  FETCH_FULL_SERVICES_REQUESTED,
  FETCH_FULL_SERVICES_SUCCEDED
} from '../../constants/services/Actions'

// Utils
import { api } from '../../utils/api'

export default (params = {}) => async dispatch => {
  try {
    dispatch({ type: FETCH_FULL_SERVICES_REQUESTED, payload: `Fetching full services` })
    const { data: { data: payload } } = await api.get('/setting/services', params)
    dispatch({ type: FETCH_FULL_SERVICES_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_FULL_SERVICES_REJECTED, payload: error.message || error.toString() })
  }
}
