// Constants
import {
  UPDATE_BILLING_PAYMENTS_REQUESTED,
  UPDATE_BILLING_PAYMENTS_SUCCEDED,
  UPDATE_BILLING_PAYMENTS_REJECTED
} from '../../constants/payments/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId, paymentData) => async dispatch => {
  try {
    dispatch({ type: UPDATE_BILLING_PAYMENTS_REQUESTED, payload: `Updating Billing Payments for customer ${customerId}` })
    const { data: { data: payload } } = await api.put(`/customers/billing_info/${customerId}`, paymentData)
    dispatch({ type: UPDATE_BILLING_PAYMENTS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: UPDATE_BILLING_PAYMENTS_REJECTED, payload: error.message || error.toString() })
  }
}
