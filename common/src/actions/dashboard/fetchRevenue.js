// Constants
import {
  FETCH_REVENUE_REJECTED,
  FETCH_REVENUE_REQUESTED,
  FETCH_REVENUE_SUCCEDED
} from '../../constants/dashboard/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_REVENUE_REQUESTED, payload: `Fetching revenue` })
    const { data: { data: payload } } = await api.get('/dashboard/revenue')
    dispatch({ type: FETCH_REVENUE_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_REVENUE_REJECTED, payload: error.message || error.toString() })
  }
}
