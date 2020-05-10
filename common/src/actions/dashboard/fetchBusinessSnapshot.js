// Constants
import {
  FETCH_BUSINESS_SNAPSHOT_REJECTED,
  FETCH_BUSINESS_SNAPSHOT_REQUESTED,
  FETCH_BUSINESS_SNAPSHOT_SUCCEDED
} from '../../constants/dashboard/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_BUSINESS_SNAPSHOT_REQUESTED, payload: `Fetching business snapshot` })
    const { data: { data: payload } } = await api.get('/dashboard/business_snapshot')
    dispatch({ type: FETCH_BUSINESS_SNAPSHOT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_BUSINESS_SNAPSHOT_REJECTED, payload: error.message || error.toString() })
  }
}
