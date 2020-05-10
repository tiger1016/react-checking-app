// Constants
import {
  FETCH_ADDONS_REQUESTED,
  FETCH_ADDONS_SUCCEDED,
  FETCH_ADDONS_REJECTED
} from '../../constants/addons/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_ADDONS_REQUESTED, payload: `Fetching addons` })
    const { data: { data: payload } } = await api.get('/addons')
    dispatch({ type: FETCH_ADDONS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_ADDONS_REJECTED, payload: error.message || error.toString() })
  }
}
