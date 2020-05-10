// Constants
import {
  FETCH_TOP_ZIPS_REJECTED,
  FETCH_TOP_ZIPS_REQUESTED,
  FETCH_TOP_ZIPS_SUCCEDED
} from '../../constants/dashboard/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_TOP_ZIPS_REQUESTED, payload: `Fetching top zips` })
    const { data: { data: payload } } = await api.get('/dashboard/top_zip')
    dispatch({ type: FETCH_TOP_ZIPS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_TOP_ZIPS_REJECTED, payload: error.message || error.toString() })
  }
}
