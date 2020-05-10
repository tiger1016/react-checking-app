// Constants
import {
  FETCH_WALKERS_REJECTED,
  FETCH_WALKERS_REQUESTED,
  FETCH_WALKERS_SUCCEDED
} from '../../constants/walkers/Actions'

// Utils
import { api } from '../../utils/api'

export default (ids) => async dispatch => {
  try {
    dispatch({ type: FETCH_WALKERS_REQUESTED, payload: `Fetching walkers` })
    const params = {}
    if (ids) {
      params['ids'] = ids
    }
    const { data: { data: payload } } = await api.get('/walkers', params)
    dispatch({ type: FETCH_WALKERS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_WALKERS_REJECTED, payload: error.message || error.toString() })
  }
}
