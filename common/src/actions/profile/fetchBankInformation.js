// Constants
import {
  FETCH_PROFILE_BANK_INFORMATION_REJECTED,
  FETCH_PROFILE_BANK_INFORMATION_REQUESTED,
  FETCH_PROFILE_BANK_INFORMATION_SUCCEDED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_BANK_INFORMATION_REQUESTED, payload: `Fetching profile bank information` })
    const { data: { data: payload } } = await api.get('/profile/getbankinformation')
    dispatch({ type: FETCH_PROFILE_BANK_INFORMATION_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_BANK_INFORMATION_REJECTED, payload: error.message || error.toString() })
  }
}
