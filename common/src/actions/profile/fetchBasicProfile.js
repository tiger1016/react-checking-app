// Constants
import {
  FETCH_PROFILE_BASIC_PROFILE_REQUESTED,
  FETCH_PROFILE_BASIC_PROFILE_SUCCEDED,
  FETCH_PROFILE_BASIC_PROFILE_REJECTED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_BASIC_PROFILE_REQUESTED, payload: `Fetching basic profile` })
    const { data: { data: payload } } = await api.get('profile/licensee')
    dispatch({ type: FETCH_PROFILE_BASIC_PROFILE_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_BASIC_PROFILE_REJECTED, payload: error.message || error.toString() })
  }
}
