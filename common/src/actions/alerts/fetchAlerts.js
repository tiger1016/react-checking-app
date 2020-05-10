// Constants
import {
  FETCH_ALERTS_REQUESTED,
  FETCH_ALERTS_SUCCEDED,
  FETCH_ALERTS_REJECTED
} from '../../constants/alerts/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_ALERTS_REQUESTED, payload: `Fetching alerts` })
    const { data: { data: { alerts: payload } } } = await api.get('/alerts')
    dispatch({ type: FETCH_ALERTS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_ALERTS_REJECTED, payload: error.message || error.toString() })
  }
}
