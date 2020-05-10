// Constants
import {
  FETCH_PROFILE_PAYMENT_INFORMATION_REQUESTED,
  FETCH_PROFILE_PAYMENT_INFORMATION_SUCCEDED,
  FETCH_PROFILE_PAYMENT_INFORMATION_REJECTED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_PAYMENT_INFORMATION_REQUESTED, payload: `Fetching profile payment information` })
    const { data: { data: payload } } = await api.get('profile/getpaymentinformation')
    dispatch({ type: FETCH_PROFILE_PAYMENT_INFORMATION_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_PAYMENT_INFORMATION_REJECTED, payload: error.message || error.toString() })
  }
}
