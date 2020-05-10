// Constants
import {
  FETCH_REFUNDS_REQUESTED,
  FETCH_REFUNDS_SUCCEDED,
  FETCH_REFUNDS_REJECTED
} from '../../constants/refunds/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_REFUNDS_REQUESTED, payload: `Fetching refunds` })
    const { data: { data: payload } } = await api.get('/refunds')
    dispatch({ type: FETCH_REFUNDS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_REFUNDS_REJECTED, payload: error.message || error.toString() })
  }
}
