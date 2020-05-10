// Constants
import {
  FETCH_BILLING_REQUESTED,
  FETCH_BILLING_SUCCEDED,
  FETCH_BILLING_REJECTED
} from '../../constants/payments/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId) => async dispatch => {
  try {
    dispatch({ type: FETCH_BILLING_REQUESTED, payload: `Fetching Billing for customer ${customerId}` })
    const { data: { customer: payload } } = await api.get('/billing_info', {
      customer_id: customerId,
      transaction_type: 'receive'
    })
    dispatch({ type: FETCH_BILLING_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_BILLING_REJECTED, payload: error.message || error.toString() })
  }
}
