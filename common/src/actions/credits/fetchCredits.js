// Constants
import {
  FETCH_CREDITS_REQUESTED,
  FETCH_CREDITS_SUCCEDED,
  FETCH_CREDITS_REJECTED
} from '../../constants/credits/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_CREDITS_REQUESTED, payload: `Fetching credits` })
    const { data: { data: payload } } = await api.get('/credits')
    dispatch({ type: FETCH_CREDITS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_CREDITS_REJECTED, payload: error.message || error.toString() })
  }
}
