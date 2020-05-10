// Constants
import {
  FETCH_WALKER_PROFILE_REJECTED,
  FETCH_WALKER_PROFILE_REQUESTED,
  FETCH_WALKER_PROFILE_SUCCEDED
} from '../../constants/walkers/Actions'

// Utils
import { api } from '../../utils/api'

export default (walkerId) => async dispatch => {
  try {
    dispatch({ type: FETCH_WALKER_PROFILE_REQUESTED, payload: `Fetching walker ${walkerId}` })
    const { data: { data: payload } } = await api.get('/walkers/' + walkerId)
    dispatch({ type: FETCH_WALKER_PROFILE_SUCCEDED, payload, inactive: true })
  } catch (error) {
    dispatch({ type: FETCH_WALKER_PROFILE_REJECTED, payload: error.message || error.toString() })
  }
}
