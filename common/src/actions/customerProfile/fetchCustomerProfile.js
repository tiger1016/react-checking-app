// Constants
import {
  FETCH_CUSTOMER_PROFILE_REQUESTED,
  FETCH_CUSTOMER_PROFILE_SUCCEDED,
  FETCH_CUSTOMER_PROFILE_REJECTED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId) => async dispatch => {
  try {
    dispatch({ type: FETCH_CUSTOMER_PROFILE_REQUESTED, payload: `Fetching customer profile for customer ${customerId}` })
    const { data: { data: payload } } = await api.get('/customers', { id: customerId })
    dispatch({ type: FETCH_CUSTOMER_PROFILE_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMER_PROFILE_REJECTED, payload: error.message || error.toString() })
  }
}
