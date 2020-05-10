// Constants
import {
  FETCH_FULL_ADDONS_REJECTED,
  FETCH_FULL_ADDONS_REQUESTED,
  FETCH_FULL_ADDONS_SUCCEDED
} from '../../constants/addons/Actions'

// Utils
import { api } from '../../utils/api'

export default (params = {}) => async dispatch => {
  try {
    dispatch({ type: FETCH_FULL_ADDONS_REQUESTED, payload: `Fetching full addons` })
    const { data: { data: payload } } = await api.get('/setting/addons', params)
    dispatch({ type: FETCH_FULL_ADDONS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_FULL_ADDONS_REJECTED, payload: error.message || error.toString() })
  }
}
