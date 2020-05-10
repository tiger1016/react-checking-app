// Constants
import {
  FETCH_WALKER_PAYRATE_REQUESTED,
  FETCH_WALKER_PAYRATE_SUCCEDED,
  FETCH_WALKER_PAYRATE_REJECTED
} from '../../constants/walkers/Actions'

// Utils
import { api } from '../../utils/api'

export default (walkerId) => async dispatch => {
  try {
    dispatch({ type: FETCH_WALKER_PAYRATE_REQUESTED, payload: `Fetching walkers` })
    const { data: { data: payload } } = await api.get(`/walkers/payrates/${walkerId}`)
    dispatch({ type: FETCH_WALKER_PAYRATE_SUCCEDED, payload, walkerId })
  } catch (error) {
    dispatch({ type: FETCH_WALKER_PAYRATE_REJECTED, payload: error.message || error.toString() })
  }
}
