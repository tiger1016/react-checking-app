// Constants
import {
  FETCH_PROFILE_SCHEDULER_SETTINGS_REJECTED,
  FETCH_PROFILE_SCHEDULER_SETTINGS_REQUESTED,
  FETCH_PROFILE_SCHEDULER_SETTINGS_SUCCEDED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_SCHEDULER_SETTINGS_REQUESTED, payload: `Fetching setting/scheduler` })
    const { data: { data: payload } } = await api.get('/setting/scheduler')
    dispatch({ type: FETCH_PROFILE_SCHEDULER_SETTINGS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_SCHEDULER_SETTINGS_REJECTED, payload: error.message || error.toString() })
  }
}
