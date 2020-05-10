// Constants
import {
  FETCH_PROFILE_QR_CODES_REQUESTED,
  FETCH_PROFILE_QR_CODES_SUCCEDED,
  FETCH_PROFILE_QR_CODES_REJECTED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_QR_CODES_REQUESTED, payload: `Fetching profile QR Codes` })
    const { data: { data: payload } } = await api.get('/profile/licensee_qr')
    dispatch({ type: FETCH_PROFILE_QR_CODES_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_QR_CODES_REJECTED, payload: error.message || error.toString() })
  }
}
