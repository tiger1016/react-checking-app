// Constants
import {
  FETCH_PAYMENTS_REQUESTED,
  FETCH_PAYMENTS_SUCCEDED,
  FETCH_PAYMENTS_REJECTED
} from '../../constants/payments/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId) => async dispatch => {
  try {
    dispatch({ type: FETCH_PAYMENTS_REQUESTED, payload: `Fetching payments for customer ${customerId}` })
    const { data: { data: payload } } = await api.get(`/customers/payment_info/${customerId}`)
    dispatch({ type: FETCH_PAYMENTS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PAYMENTS_REJECTED, payload: error.message || error.toString() })
  }
}
