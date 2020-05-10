// Constants
import {
  FETCH_PROFILE_BILLING_INFORMATION_REJECTED,
  FETCH_PROFILE_BILLING_INFORMATION_REQUESTED,
  FETCH_PROFILE_BILLING_INFORMATION_SUCCEDED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_BILLING_INFORMATION_REQUESTED, payload: `Fetching profile billing information` })
    const { data: { data: payload } } = await api.get('/setting/customer_billing')
    dispatch({ type: FETCH_PROFILE_BILLING_INFORMATION_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_BILLING_INFORMATION_REJECTED, payload: error.message || error.toString() })
  }
}
