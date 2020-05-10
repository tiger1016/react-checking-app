// Constants
import {
  FETCH_USER_PAYMENT_INFORMATION_REQUESTED,
  FETCH_USER_PAYMENT_INFORMATION_SUCCEEDED,
  FETCH_USER_PAYMENT_INFORMATION_REJECTED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

export default customerId => async dispatch => {
  try {
    dispatch({
      type: FETCH_USER_PAYMENT_INFORMATION_REQUESTED,
      payload: `Fetching payments for customer ${customerId}`
    })
    const { data: { data: payload } } = await api.get(`/customers/payment_info/${customerId}`)
    dispatch({
      type: FETCH_USER_PAYMENT_INFORMATION_SUCCEEDED,
      payload
    })
  } catch (error) {
    dispatch({
      type: FETCH_USER_PAYMENT_INFORMATION_REJECTED,
      payload: error.message || error.toString()
    })
  }
}
