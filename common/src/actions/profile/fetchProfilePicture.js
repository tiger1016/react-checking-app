// Constants
import {
  FETCH_PROFILE_PROFILE_PICTURE_REQUESTED,
  FETCH_PROFILE_PROFILE_PICTURE_SUCCEDED,
  FETCH_PROFILE_PROFILE_PICTURE_REJECTED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_PROFILE_PICTURE_REQUESTED, payload: `Fetching profile profile pic` })
    const { data: { data: payload } } = await api.get('/profile/profilepic')
    dispatch({ type: FETCH_PROFILE_PROFILE_PICTURE_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_PROFILE_PICTURE_REJECTED, payload: error.message || error.toString() })
  }
}
