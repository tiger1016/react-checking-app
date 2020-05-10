// Constants
import {
  FETCH_CUSTOMER_BASE_REJECTED,
  FETCH_CUSTOMER_BASE_REQUESTED,
  FETCH_CUSTOMER_BASE_SUCCEDED
} from '../../constants/dashboard/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_CUSTOMER_BASE_REQUESTED, payload: `Fetching customer base` })
    const { data: { data: payload } } = await api.get('/dashboard/customer_base')
    dispatch({ type: FETCH_CUSTOMER_BASE_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMER_BASE_REJECTED, payload: error.message || error.toString() })
  }
}
